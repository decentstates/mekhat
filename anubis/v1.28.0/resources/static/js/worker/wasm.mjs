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
(()=>{function f(e){return Array.from(e).map(r=>r.toString(16).padStart(2,"0")).join("")}function c(e){if(e=e.replace(/\s+/g,"").replace(/^0x/,""),e.length%2!==0)throw new Error("Invalid hex string length");if(!/^[0-9a-fA-F]+$/.test(e))throw new Error("Invalid hex characters");let r=new Uint8Array(e.length/2);for(let n=0;n<r.length;n++){let a=parseInt(e.substr(n*2,2),16);r[n]=a}return r}addEventListener("message",async e=>{try{let y=function(t){if(t.length>4096)throw new Error("Data exceeds buffer size");let u=h();new Uint8Array(i.buffer,u,t.length).set(t),g(t.length)},d=function(){let t=p();return new Uint8Array(i.buffer,t,A())},{data:r,difficulty:n,threads:a,module:l}=e.data,{nonce:s}=e.data,o={anubis:{anubis_update_nonce:t=>postMessage(t)}};s!==0&&(o.anubis.anubis_update_nonce=t=>{});let b=await WebAssembly.instantiate(l,o),{anubis_work:m,data_ptr:h,result_hash_ptr:p,result_hash_size:A,set_data_length:g,memory:i}=b.exports;y(c(r)),s=m(n,s,a);let _=d(),w=f(_);postMessage({hash:w,difficulty:n,nonce:s})}catch(r){postMessage({error:String(r)})}});})();
//# sourceMappingURL=wasm.mjs.map
