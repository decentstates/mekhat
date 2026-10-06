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
(()=>{var W=()=>navigator.hardwareConcurrency!==void 0?navigator.hardwareConcurrency:1;function _(e,n,s=5,i=null,a,u=Math.trunc(Math.max(W()/2,1))){console.debug("fast algo");let o="purejs";return window.isSecureContext&&(o="webcrypto"),(navigator.userAgent.includes("Firefox")||navigator.userAgent.includes("Goanna"))&&(console.log("Firefox detected, using pure-JS fallback"),o="purejs"),new Promise((E,x)=>{let M=`${e.basePrefix}/.within.website/x/cmd/anubis/static/js/worker/sha256-${o}.mjs?cacheBuster=${e.version}`,p=[],d=!1,b=()=>{console.log("PoW aborted"),h(),x(new DOMException("Aborted","AbortError"))},h=()=>{d||(d=!0,p.forEach(c=>c.terminate()),i!=null&&i.removeEventListener("abort",b))};if(i!=null){if(i.aborted)return b();i.addEventListener("abort",b,{once:!0})}for(let c=0;c<u;c++){let m=new Worker(M);m.onmessage=g=>{typeof g.data=="number"?a==null||a(g.data):(h(),E(g.data))},m.onerror=g=>{h(),x(g)},m.postMessage({data:n,difficulty:s,nonce:c,threads:u}),p.push(m)}})}var j={fast:_,slow:_};var $=(e="",n={})=>{let s=new URL(e,window.location.href);return Object.entries(n).forEach(([i,a])=>s.searchParams.set(i,a)),s.toString()},L=e=>{let n=document.getElementById(e);return n===null?null:JSON.parse(n.textContent)},v=(e,n,s)=>$(`${s}/.within.website/x/cmd/anubis/static/img/${e}.webp`,{cacheBuster:n});var A=async()=>document.documentElement.lang,I=async e=>{let n=L("anubis_base_prefix");if(n!==null)try{return await(await fetch(`${n}/.within.website/x/cmd/anubis/static/locales/${e}.json`)).json()}catch(s){if(console.warn(`Failed to load translations for ${e}, falling back to English`),e!=="en")return await I("en");throw s}},D=()=>{let e=L("anubis_public_url");if(e!==null)return e&&window.location.href.startsWith(e)?new URLSearchParams(window.location.search).get("redir"):window.location.href},H={},S,B=async()=>{S=await A(),H=await I(S)},r=e=>H[`js_${e}`]||H[e]||e;(async()=>{await B();let e=[{name:"Web Workers",msg:r("web_workers_error"),value:window.Worker},{name:"Cookies",msg:r("cookies_error"),value:navigator.cookieEnabled}],n=document.getElementById("status"),s=document.getElementById("image"),i=document.getElementById("title"),a=document.getElementById("progress"),u=L("anubis_version"),o=L("anubis_base_prefix"),E=document.querySelector("details"),x=!1;E&&E.addEventListener("toggle",()=>{E.open&&(x=!0)});let M=({titleMsg:l,statusMsg:f,imageSrc:w})=>{i.innerHTML=l,n.innerHTML=f,s.src=w,a.style.display="none"};n.innerHTML=r("calculating");for(let{value:l,name:f,msg:w}of e)if(!l){M({titleMsg:`${r("missing_feature")} ${f}`,statusMsg:w,imageSrc:v("reject",u,o)});return}let{challenge:p,rules:d}=L("anubis_challenge"),b=j[d.algorithm];if(!b){M({titleMsg:r("challenge_error"),statusMsg:r("challenge_error_msg"),imageSrc:v("reject",u,o)});return}n.innerHTML=`${r("calculating_difficulty")} ${d.difficulty}, `,a.style.display="inline-block";let h=document.createTextNode(`${r("speed")} 0kH/s`);n.appendChild(h);let c=0,m=!1,g=Math.pow(16,-d.difficulty);try{let l=Date.now(),{hash:f,nonce:w}=await b({basePrefix:o,version:u},p.randomData,d.difficulty,null,t=>{let y=Date.now()-l;y-c>1e3&&(c=y,h.data=`${r("speed")} ${(t/y).toFixed(3)}kH/s`);let T=Math.pow(1-g,t),P=(1-Math.pow(T,2))*100;a["aria-valuenow"]=P,a.firstElementChild!==null&&(a.firstElementChild.style.width=`${P}%`),T<.1&&!m&&(n.append(document.createElement("br"),document.createTextNode(r("verification_longer"))),m=!0)}),k=Date.now();if(console.log({hash:f,nonce:w}),x){let y=function(){let T=D();window.location.replace($(`${o}/.within.website/x/cmd/anubis/api/pass-challenge`,{id:p.id,response:f,nonce:w,redir:T,elapsedTime:k-l}))},t=document.getElementById("progress");t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.height="2rem",t.style.borderRadius="1rem",t.style.cursor="pointer",t.style.background="#b16286",t.style.color="white",t.style.fontWeight="bold",t.style.outline="4px solid #b16286",t.style.outlineOffset="2px",t.style.width="min(20rem, 90%)",t.style.margin="1rem auto 2rem",t.innerHTML=r("finished_reading"),t.onclick=y,setTimeout(y,3e4)}else{let t=D();window.location.replace($(`${o}/.within.website/x/cmd/anubis/api/pass-challenge`,{id:p.id,response:f,nonce:w,redir:t,elapsedTime:k-l}))}}catch(l){M({titleMsg:r("calculation_error"),statusMsg:`${r("calculation_error_msg")} ${l.message}`,imageSrc:v("reject",u,o)})}})();})();
//# sourceMappingURL=main.mjs.map
