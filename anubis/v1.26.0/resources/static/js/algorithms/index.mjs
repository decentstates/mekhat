/*
@licstart  The following is the entire license notice for the
JavaScript code in this page.

Copyright (c) 2025 Xe Iaso <xe.iaso@techaro.lol>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Includes code from https://github.com/aws/aws-sdk-js-crypto-helpers which is
used under the terms of the Apache 2 license.

@licend  The above is the entire license notice
for the JavaScript code in this page.
*/
(()=>{var x=()=>navigator.hardwareConcurrency!==void 0?navigator.hardwareConcurrency:1;function n(c,w,m=5,e=null,s,f=Math.trunc(Math.max(x()/2,1))){console.debug("fast algo");let a="purejs";return window.isSecureContext&&(a="webcrypto"),(navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna"))&&(console.log("Firefox detected, using pure-JS fallback"),a="purejs"),new Promise((g,d)=>{let p=`${c.basePrefix}/.within.website/x/cmd/anubis/static/js/worker/sha256-${a}.mjs?cacheBuster=${c.version}`,l=[],b=!1,i=()=>{console.log("PoW aborted"),u(),d(new DOMException("Aborted","AbortError"))},u=()=>{b||(b=!0,l.forEach(r=>r.terminate()),e!=null&&e.removeEventListener("abort",i))};if(e!=null){if(e.aborted)return i();e.addEventListener("abort",i,{once:!0})}for(let r=0;r<f;r++){let t=new Worker(p);t.onmessage=o=>{typeof o.data=="number"?s==null||s(o.data):(u(),g(o.data))},t.onerror=o=>{u(),d(o)},t.postMessage({data:w,difficulty:m,nonce:r,threads:f}),l.push(t)}})}var v={fast:n,slow:n};})();
//# sourceMappingURL=index.mjs.map
