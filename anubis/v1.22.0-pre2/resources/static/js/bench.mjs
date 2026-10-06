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
(()=>{function b({basePrefix:e,version:t},o,i=5,n=null,l=null,r=Math.trunc(Math.max(navigator.hardwareConcurrency/2,1))){console.debug("fast algo");let c=window.crypto!==void 0?"webcrypto":"purejs";return(navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna"))&&(console.log("Firefox detected, using pure-JS fallback"),c="purejs"),new Promise((d,a)=>{let m=`${e}/.within.website/x/cmd/anubis/static/js/worker/sha256-${c}.mjs?cacheBuster=${t}`;console.log(m);let y=[],C=!1,T=()=>{C||(C=!0,y.forEach(u=>u.terminate()),n?.removeEventListener("abort",A))},A=()=>{console.log("PoW aborted"),T(),a(new DOMException("Aborted","AbortError"))};if(n!=null){if(n.aborted)return A();n.addEventListener("abort",A,{once:!0})}for(let u=0;u<r;u++){let w=new Worker(m);w.onmessage=p=>{typeof p.data=="number"?l?.(p.data):(T(),d(p.data))},w.onerror=p=>{T(),a(p)},w.postMessage({data:o,difficulty:i,nonce:u,threads:r}),y.push(w)}})}var B={fast:b,slow:b};var S=4,f=document.getElementById("status"),$=document.getElementById("difficulty-input"),I=document.getElementById("algorithm-select"),x=document.getElementById("compare-select"),L=document.getElementById("table-header"),F=document.getElementById("table-header-compare"),s=document.getElementById("results"),j=()=>{$.value=S;for(let e of Object.keys(B)){let t=document.createElement("option");I.append(t);let o=document.createElement("option");x.append(o),t.value=t.innerText=o.value=o.innerText=e}},H=async(e,t,o,i)=>{if(!(t>=1))throw new Error(`Invalid difficulty: ${t}`);let n=B[o];if(n==null)throw new Error(`Unknown algorithm: ${o}`);let l=new Uint8Array(32);crypto.getRandomValues(l);let r=Array.from(l).map(y=>y.toString(16).padStart(2,"0")).join(""),c=performance.now(),{hash:d,nonce:a}=await n({basePrefix:"/",version:"devel"},r,Number(t),i),m=performance.now();return console.log({hash:d,nonce:a}),e.time+=m-c,e.iters+=a,{time:m-c,nonce:a}},g={time:0,iters:0},h={time:0,iters:0},N=()=>{let e=g.iters/g.time,t=h.iters/h.time;if(Number.isFinite(e)){if(f.innerText=`Average hashrate: ${e.toFixed(3)}kH/s`,Number.isFinite(t)){let o=(e-t)/e*100;f.innerText+=` vs ${t.toFixed(3)}kH/s (${o.toFixed(2)}% change)`}}else f.innerText="Benchmarking..."},E=e=>{let t=document.createElement("td");return t.innerText=e,t.style.padding="0 0.25rem",t},M=async e=>{let t=$.value,o=I.value,i=x.value;N();try{let{time:n,nonce:l}=await H(g,t,o,e.signal),r=document.createElement("tr");r.style.display="contents",r.append(E(`${n}ms`),E(l));let c=s.scrollHeight-s.clientHeight<=s.scrollTop;if(s.append(r),c&&(s.scrollTop=s.scrollHeight-s.clientHeight),N(),i!=="NONE"){let{time:d,nonce:a}=await H(h,t,i,e.signal);r.append(E(`${d}ms`),E(a))}}catch(n){n!==!1&&(f.innerText=n);return}await M(e)},v=null,k=()=>{g.time=g.iters=0,h.time=h.iters=0,s.innerHTML=f.innerText="";let e=s.parentElement;x.value!=="NONE"?(e.style.gridTemplateColumns="repeat(4,auto)",L.style.display="none",F.style.display="contents"):(e.style.gridTemplateColumns="repeat(2,auto)",L.style.display="contents",F.style.display="none"),v?.abort(),v=new AbortController,M(v)};j();$.addEventListener("change",k);I.addEventListener("change",k);x.addEventListener("change",k);k();})();
//# sourceMappingURL=bench.mjs.map
