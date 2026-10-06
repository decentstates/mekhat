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
(()=>{var R=()=>navigator.hardwareConcurrency!==void 0?navigator.hardwareConcurrency:1;function w(e,t,n=5,r=null,o,l=Math.trunc(Math.max(R()/2,1))){console.debug("fast algo");let a="purejs";return window.isSecureContext&&(a="webcrypto"),(navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna"))&&(console.log("Firefox detected, using pure-JS fallback"),a="purejs"),new Promise((c,m)=>{let i=`${e.basePrefix}/.within.website/x/cmd/anubis/static/js/worker/sha256-${a}.mjs?cacheBuster=${e.version}`,u=[],E=!1,x=()=>{console.log("PoW aborted"),M(),m(new DOMException("Aborted","AbortError"))},M=()=>{E||(E=!0,u.forEach(d=>d.terminate()),r!=null&&r.removeEventListener("abort",x))};if(r!=null){if(r.aborted)return x();r.addEventListener("abort",x,{once:!0})}for(let d=0;d<l;d++){let y=new Worker(i);y.onmessage=p=>{typeof p.data=="number"?o==null||o(p.data):(M(),c(p.data))},y.onerror=p=>{M(),m(p)},y.postMessage({data:t,difficulty:n,nonce:d,threads:l}),u.push(y)}})}var k={fast:w,slow:w};var A=4,f=document.getElementById("status"),S=document.getElementById("difficulty-input"),g=document.getElementById("algorithm-select"),H=document.getElementById("compare-select"),P=document.getElementById("table-header"),I=document.getElementById("table-header-compare"),s=document.getElementById("results"),F=()=>{if(A!=null){S.value=A.toString();for(let e of Object.keys(k)){let t=document.createElement("option");g==null||g.append(t);let n=document.createElement("option");H.append(n),t.value=t.innerText=n.value=n.innerText=e}}},B=async(e,t,n,r)=>{if(!(t>=1))throw new Error(`Invalid difficulty: ${t}`);let o=k[n];if(o==null)throw new Error(`Unknown algorithm: ${n}`);let l=new Uint8Array(32);crypto.getRandomValues(l);let a=Array.from(l).map(E=>E.toString(16).padStart(2,"0")).join(""),c=performance.now(),{hash:m,nonce:i}=await o({basePrefix:"/",version:"devel"},a,Number(t),r),u=performance.now();return console.log({hash:m,nonce:i}),e.time+=u-c,e.iters+=i,{time:u-c,nonce:i}},b={time:0,iters:0},h={time:0,iters:0},C=()=>{let e=b.iters/b.time,t=h.iters/h.time;if(Number.isFinite(e)){if(f.innerText=`Average hashrate: ${e.toFixed(3)}kH/s`,Number.isFinite(t)){let n=(e-t)/e*100;f.innerText+=` vs ${t.toFixed(3)}kH/s (${n.toFixed(2)}% change)`}}else f.innerText="Benchmarking..."},T=e=>{let t=document.createElement("td");return t.innerText=e,t.style.padding="0 0.25rem",t},$=async e=>{let t=S.value,n=g.value,r=H.value;C();try{let{time:o,nonce:l}=await B(b,t,n,e.signal),a=document.createElement("tr");a.style.display="contents",a.append(T(`${o}ms`),T(l));let c=s.scrollHeight-s.clientHeight<=s.scrollTop;if(s.append(a),c&&(s.scrollTop=s.scrollHeight-s.clientHeight),C(),r!=="NONE"){let{time:m,nonce:i}=await B(h,t,r,e.signal);a.append(T(`${m}ms`),T(i))}}catch(o){o!==!1&&(f.innerText=o);return}await $(e)},v=null,L=()=>{b.time=b.iters=0,h.time=h.iters=0,s.innerHTML=f.innerText="";let e=s.parentElement;H.value!=="NONE"?(e.style.gridTemplateColumns="repeat(4,auto)",P.style.display="none",I.style.display="contents"):(e.style.gridTemplateColumns="repeat(2,auto)",P.style.display="contents",I.style.display="none"),v!=null&&v.abort(),v=new AbortController,$(v)};F();S.addEventListener("change",L);g.addEventListener("change",L);H.addEventListener("change",L);L();})();
//# sourceMappingURL=bench.mjs.map
