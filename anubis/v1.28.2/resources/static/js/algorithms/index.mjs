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
(()=>{var x=[408,425,429,500,502,503,504],A=r=>r!=null&&typeof r=="object"&&r.name==="AbortError",E=()=>new DOMException("Aborted","AbortError"),M=(r,e)=>new Promise((s,t)=>{if(e!=null&&e.aborted){t(E());return}let a=()=>{clearTimeout(n),t(E())},n=setTimeout(()=>{e!=null&&e.removeEventListener("abort",a),s()},r);e!=null&&e.addEventListener("abort",a,{once:!0})}),g=(r,e=750,s=1e4)=>Math.random()*Math.min(s,e*Math.pow(r,2)),S=r=>{let e=r.headers.get("Retry-After");if(e===null)return null;let s=Number(e);if(Number.isFinite(s))return Math.max(0,s*1e3);let t=Date.parse(e);return Number.isNaN(t)?null:Math.max(0,t-Date.now())},k=async(r,e={})=>{var f,w,d,p;let s=(f=e.attempts)!=null?f:5,t=(w=e.baseDelayMs)!=null?w:750,a=(d=e.maxDelayMs)!=null?d:1e4,n=(p=e.signal)!=null?p:null,l=new Error(`anubis: ${r} could not be fetched`),u=null;for(let c=0;c<s;c++){if(c>0){let o=u!==null?u:g(c-1,t,a);u=null,await M(o,n)}let i;try{i=await fetch(r,n===null?{}:{signal:n})}catch(o){if(A(o))throw o;l=o instanceof Error?o:new Error(String(o));continue}if(i.ok)return i;if(l=new Error(`anubis: ${r} returned HTTP ${i.status} (unretryable failure)`),x.indexOf(i.status)===-1)throw l;let b=S(i);b!==null&&(u=Math.min(b,a))}throw l};var h=()=>navigator.hardwareConcurrency!==void 0?navigator.hardwareConcurrency:1,D=r=>({spawn:()=>new Worker(r),dispose:()=>{}}),y=async(r,e)=>{let s=D(r),t;try{let n=await k(r,{signal:e});t=URL.createObjectURL(new Blob([await n.text()],{type:"text/javascript"}))}catch(n){if(A(n))throw n;return console.warn("anubis: could not pre-fetch worker source (server may be under attack) using direct spawner in the vain hope that this works",n),s}let a=!0;return{spawn:()=>{if(a)try{return new Worker(t)}catch(n){console.warn("anubis: blob worker rejected, using direct URL",n),a=!1}return new Worker(r)},dispose:()=>URL.revokeObjectURL(t)}};var L=()=>navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna")?(console.log("Firefox detected, using pure-JS fallback"),"purejs"):window.isSecureContext?"webcrypto":"purejs";async function m(r,e,s=5,t=null,a,n=Math.trunc(Math.max(h()/2,1))){console.debug("fast algo");let l=L(),u=`${r.basePrefix}/.within.website/x/cmd/anubis/static/js/worker/sha256-${l}.mjs?cacheBuster=${r.version}`,f=await y(u,t);try{return await P(f,e,s,t,a,n)}finally{f.dispose()}}function P(r,e,s,t,a,n){return new Promise((l,u)=>{let f=[],w=!1,d=0,p=()=>{console.log("PoW aborted"),c(),u(new DOMException("Aborted","AbortError"))},c=()=>{w||(w=!0,f.forEach(i=>i.terminate()),t!=null&&t.removeEventListener("abort",p))};if(t!=null){if(t.aborted)return p();t.addEventListener("abort",p,{once:!0})}for(let i=0;i<n;i++){let b;try{b=r.spawn()}catch(o){c(),u(new Error(`anubis: could not start proof of work worker: ${o} (is your browser out of date?)`));return}f.push(b),b.onmessage=o=>{typeof o.data=="number"?a==null||a(o.data):(c(),l(o.data))},b.onerror=o=>{d++,console.warn(`anubis: proof of work worker died (${d}/${n})`,o),!(d<n)&&(c(),u(new Error("anubis: all proof of work workers failed at runtime (file a bug?)")))},b.postMessage({data:e,difficulty:s,nonce:i,threads:n})}})}var j={fast:m,slow:m};})();
//# sourceMappingURL=index.mjs.map
