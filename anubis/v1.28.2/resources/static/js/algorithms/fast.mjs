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
(()=>{var y=[408,425,429,500,502,503,504],m=e=>e!=null&&typeof e=="object"&&e.name==="AbortError",A=()=>new DOMException("Aborted","AbortError"),M=(e,r)=>new Promise((s,t)=>{if(r!=null&&r.aborted){t(A());return}let a=()=>{clearTimeout(n),t(A())},n=setTimeout(()=>{r!=null&&r.removeEventListener("abort",a),s()},e);r!=null&&r.addEventListener("abort",a,{once:!0})}),x=(e,r=750,s=1e4)=>Math.random()*Math.min(s,r*Math.pow(e,2)),S=e=>{let r=e.headers.get("Retry-After");if(r===null)return null;let s=Number(r);if(Number.isFinite(s))return Math.max(0,s*1e3);let t=Date.parse(r);return Number.isNaN(t)?null:Math.max(0,t-Date.now())},E=async(e,r={})=>{var b,p,w,d;let s=(b=r.attempts)!=null?b:5,t=(p=r.baseDelayMs)!=null?p:750,a=(w=r.maxDelayMs)!=null?w:1e4,n=(d=r.signal)!=null?d:null,l=new Error(`anubis: ${e} could not be fetched`),u=null;for(let c=0;c<s;c++){if(c>0){let o=u!==null?u:x(c-1,t,a);u=null,await M(o,n)}let i;try{i=await fetch(e,n===null?{}:{signal:n})}catch(o){if(m(o))throw o;l=o instanceof Error?o:new Error(String(o));continue}if(i.ok)return i;if(l=new Error(`anubis: ${e} returned HTTP ${i.status} (unretryable failure)`),y.indexOf(i.status)===-1)throw l;let f=S(i);f!==null&&(u=Math.min(f,a))}throw l};var k=()=>navigator.hardwareConcurrency!==void 0?navigator.hardwareConcurrency:1,g=e=>({spawn:()=>new Worker(e),dispose:()=>{}}),h=async(e,r)=>{let s=g(e),t;try{let n=await E(e,{signal:r});t=URL.createObjectURL(new Blob([await n.text()],{type:"text/javascript"}))}catch(n){if(m(n))throw n;return console.warn("anubis: could not pre-fetch worker source (server may be under attack) using direct spawner in the vain hope that this works",n),s}let a=!0;return{spawn:()=>{if(a)try{return new Worker(t)}catch(n){console.warn("anubis: blob worker rejected, using direct URL",n),a=!1}return new Worker(e)},dispose:()=>URL.revokeObjectURL(t)}};var D=()=>navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna")?(console.log("Firefox detected, using pure-JS fallback"),"purejs"):window.isSecureContext?"webcrypto":"purejs";async function L(e,r,s=5,t=null,a,n=Math.trunc(Math.max(k()/2,1))){console.debug("fast algo");let l=D(),u=`${e.basePrefix}/.within.website/x/cmd/anubis/static/js/worker/sha256-${l}.mjs?cacheBuster=${e.version}`,b=await h(u,t);try{return await P(b,r,s,t,a,n)}finally{b.dispose()}}function P(e,r,s,t,a,n){return new Promise((l,u)=>{let b=[],p=!1,w=0,d=()=>{console.log("PoW aborted"),c(),u(new DOMException("Aborted","AbortError"))},c=()=>{p||(p=!0,b.forEach(i=>i.terminate()),t!=null&&t.removeEventListener("abort",d))};if(t!=null){if(t.aborted)return d();t.addEventListener("abort",d,{once:!0})}for(let i=0;i<n;i++){let f;try{f=e.spawn()}catch(o){c(),u(new Error(`anubis: could not start proof of work worker: ${o} (is your browser out of date?)`));return}b.push(f),f.onmessage=o=>{typeof o.data=="number"?a==null||a(o.data):(c(),l(o.data))},f.onerror=o=>{w++,console.warn(`anubis: proof of work worker died (${w}/${n})`,o),!(w<n)&&(c(),u(new Error("anubis: all proof of work workers failed at runtime (file a bug?)")))},f.postMessage({data:r,difficulty:s,nonce:i,threads:n})}})}})();
//# sourceMappingURL=fast.mjs.map
