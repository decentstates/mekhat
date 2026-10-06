#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import urllib.request
from os import environ
from pathlib import Path

API = "https://api.github.com"
ASSET_SUFFIX = "-linux-amd64.tar.gz"

MIN_VERSION = (1, 17)

assert environ.get("GITHUB_TOKEN")


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def request(url: str, accept: str) -> urllib.request.Request:
    token = environ["GITHUB_TOKEN"]
    headers = {
        "Accept": accept,
        "User-Agent": "mekhat",
        "Authorization": f"Bearer {token}",
    }
    return urllib.request.Request(url, headers=headers)


def releases(repo: str) -> list[dict]:
    url = f"{API}/repos/{repo}/releases?per_page=100"
    out: list[dict] = []
    while url:
        with urllib.request.urlopen(request(url, "application/vnd.github+json")) as resp:
            out += json.load(resp)
            link = resp.headers.get("Link", "")
        match = re.search(r'<([^>]+)>;\s*rel="next"', link)
        url = match.group(1) if match else None
    return out


def version(tag: str) -> tuple[int, int] | None:
    match = re.fullmatch(r"^v(\d+)\.(\d+)\..*", tag)
    return (int(match[1]), int(match[2])) if match else None


def download(url: str, dest: Path) -> None:
    with urllib.request.urlopen(request(url, "application/octet-stream")) as resp:
        with dest.open("wb") as out:
            shutil.copyfileobj(resp, out)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--limit", type=int, default=0, help="0 means unlimited")
    parser.add_argument("--no-commit", action="store_true")
    args = parser.parse_args()

    root = Path(
        subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            check=True,
            capture_output=True,
            text=True,
        ).stdout.strip()
    )

    pending = sorted(
        (
            r
            for r in releases("TecharoHQ/anubis")
            if (v := version(r["tag_name"])) and v >= MIN_VERSION
        ),
        key=lambda r: r["published_at"],
    )
    added = 0

    for release in pending:
        tag_name = release["tag_name"]
        dest_path = root / "anubis" / tag_name / "resources"
        if dest_path.exists():
            log(f"anubis: skipping {tag_name}, already exists")
            continue

        log(f"anubis: adding {tag_name}")
        try:
            asset = next(
                (a for a in release["assets"] if a["name"].endswith(ASSET_SUFFIX)), None
            )
            if not asset:
                raise Exception("Failed to find asset for release")

            with tempfile.TemporaryDirectory() as tmp:
                workdir = Path(tmp)
                tarball_path = workdir / asset["name"]
                unpacked_path = workdir / "unpacked"
                resources_path = workdir / "resources"

                download(asset["browser_download_url"], tarball_path)
                with tarfile.open(tarball_path) as tar:
                    tar.extractall(unpacked_path, filter="data")

                binary = next(unpacked_path.glob("*/bin/anubis"))
                subprocess.run(
                    [str(binary), "--extract-resources", str(resources_path)],
                    check=True,
                    stdout=subprocess.DEVNULL,
                )

                shutil.copytree(resources_path, dest_path)
            if not args.no_commit:
                subprocess.run(["git", "add", "--", str(dest_path)], cwd=root, check=True)
                subprocess.run(["git", "commit", "-m", f"anubis: add {tag_name} static assets"], cwd=root, check=True)
            added += 1
        except Exception as e:
            shutil.rmtree(dest_path, ignore_errors=True)
            log(f"anubis: failed adding {tag_name}: {e}")

        if args.limit and added >= args.limit:
            break

    return 0


if __name__ == "__main__":
    sys.exit(main())
