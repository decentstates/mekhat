# mekhat

Browser extension for Anubis and possibly other sites in the future.

Motivation: Anubis and co effectively kill the no-javascript web, this allows
no-js in many circumstances still.

## How it works

In /anubis we keep every version of anubis resources, as extracted from the
binary from the GitHub releases. There is a GitHub action that checks for new
releases every hour - hence why I'm hosting this on GitHub.

The extension detects `script[id=anubis_version]` and
`script[id=anubis_challenge]` and manually runs the script in the extension
environment.

The extension code should be minimal, and the anubis code should be deterministic.
