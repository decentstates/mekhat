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
(()=>{function k({basePrefix:t,version:o},r,x=5,a=null,m=null,i=Math.max(navigator.hardwareConcurrency/2,1)){console.debug("fast algo");let g=window.crypto!==void 0?"webcrypto":"purejs";return(navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna"))&&(console.log("Firefox detected, using pure-JS fallback"),g="purejs"),new Promise((E,f)=>{let p=`${t}/.within.website/x/cmd/anubis/static/js/worker/sha256-${g}.mjs?cacheBuster=${o}`;console.log(p);let c=[],_=!1,w=()=>{_||(_=!0,c.forEach(l=>l.terminate()),a?.removeEventListener("abort",b))},b=()=>{console.log("PoW aborted"),w(),f(new DOMException("Aborted","AbortError"))};if(a!=null){if(a.aborted)return b();a.addEventListener("abort",b,{once:!0})}for(let l=0;l<i;l++){let h=new Worker(p);h.onmessage=n=>{typeof n.data=="number"?m?.(n.data):(w(),E(n.data))},h.onerror=n=>{w(),f(n)},h.postMessage({data:r,difficulty:x,nonce:l,threads:i}),c.push(h)}})}var B={fast:k,slow:k};var L=(t="",o={})=>{let r=new URL(t,window.location.href);return Object.entries(o).forEach(([x,a])=>r.searchParams.set(x,a)),r.toString()},M=(t,o,r)=>L(`${r}/.within.website/x/cmd/anubis/static/img/${t}.webp`,{cacheBuster:o});var C=async()=>document.documentElement.lang,I=async t=>{let o=JSON.parse(document.getElementById("anubis_base_prefix").textContent);try{return await(await fetch(`${o}/.within.website/x/cmd/anubis/static/locales/${t}.json`)).json()}catch(r){if(console.warn(`Failed to load translations for ${t}, falling back to English`),t!=="en")return await I("en");throw r}},v={},S,N=async()=>{S=await C(),v=await I(S)},s=t=>v[`js_${t}`]||v[t]||t;(async()=>{await N();let t=[{name:"Web Workers",msg:s("web_workers_error"),value:window.Worker},{name:"Cookies",msg:s("cookies_error"),value:navigator.cookieEnabled}],o=document.getElementById("status"),r=document.getElementById("image"),x=document.getElementById("title"),a=document.getElementById("progress"),m=JSON.parse(document.getElementById("anubis_version").textContent),i=JSON.parse(document.getElementById("anubis_base_prefix").textContent),g=document.querySelector("details"),E=!1;g&&g.addEventListener("toggle",()=>{g.open&&(E=!0)});let f=({titleMsg:n,statusMsg:d,imageSrc:u})=>{x.innerHTML=n,o.innerHTML=d,r.src=u,a.style.display="none"};o.innerHTML=s("calculating");for(let{value:n,name:d,msg:u}of t)if(!n){f({titleMsg:`${s("missing_feature")} ${d}`,statusMsg:u,imageSrc:M("reject",m,i)});return}let{challenge:p,rules:c}=JSON.parse(document.getElementById("anubis_challenge").textContent),_=B[c.algorithm];if(!_){f({titleMsg:s("challenge_error"),statusMsg:s("challenge_error_msg"),imageSrc:M("reject",m,i)});return}o.innerHTML=`${s("calculating_difficulty")} ${c.report_as}, `,a.style.display="inline-block";let w=document.createTextNode(`${s("speed")} 0kH/s`);o.appendChild(w);let b=0,l=!1,h=Math.pow(16,-c.report_as);try{let n=Date.now(),{hash:d,nonce:u}=await _({basePrefix:i,version:m},p.randomData,c.difficulty,null,e=>{let y=Date.now()-n;y-b>1e3&&(b=y,w.data=`${s("speed")} ${(e/y).toFixed(3)}kH/s`);let $=Math.pow(1-h,e),T=(1-Math.pow($,2))*100;a["aria-valuenow"]=T,a.firstElementChild.style.width=`${T}%`,$<.1&&!l&&(o.append(document.createElement("br"),document.createTextNode(s("verification_longer"))),l=!0)}),j=Date.now();if(console.log({hash:d,nonce:u}),E){let y=function(){let $=window.location.href;window.location.replace(L(`${i}/.within.website/x/cmd/anubis/api/pass-challenge`,{id:p.id,response:d,nonce:u,redir:$,elapsedTime:j-n}))},e=document.getElementById("progress");e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.height="2rem",e.style.borderRadius="1rem",e.style.cursor="pointer",e.style.background="#b16286",e.style.color="white",e.style.fontWeight="bold",e.style.outline="4px solid #b16286",e.style.outlineOffset="2px",e.style.width="min(20rem, 90%)",e.style.margin="1rem auto 2rem",e.innerHTML=s("finished_reading"),e.onclick=y,setTimeout(y,3e4)}else{let e=window.location.href;window.location.replace(L(`${i}/.within.website/x/cmd/anubis/api/pass-challenge`,{id:p.id,response:d,nonce:u,redir:e,elapsedTime:j-n}))}}catch(n){f({titleMsg:s("calculation_error"),statusMsg:`${s("calculation_error_msg")} ${n.message}`,imageSrc:M("reject",m,i)})}})();})();
//# sourceMappingURL=main.mjs.map
