import{a as L,i as u,S as w}from"./assets/vendor-b0681200.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const x="42574580-2c52a100a2b29f75d1ac631cf";async function y(t){try{return(await L.get("https://pixabay.com/api/",{params:{...t,key:x}})).data}catch(r){throw new Error(r.response.status)}}function g(){u.error({title:"Error",message:"An error occurred. Please try again later.",messageColor:"#FFF",color:"#EF4040",position:"topRight",timeout:3e3})}function E(){u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFF",color:"#EF4040",position:"topRight",timeout:3e3,messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"})}let m;const v=document.getElementById("search-form"),f=document.getElementById("gallery"),i=document.querySelector(".loader"),c=document.getElementById("load-more"),P={messageColor:"#FFF",color:"#EF4040",position:"topRight",timeout:3e3};let o={image_type:"photo",orientation:"horizontal",safesearch:!0,q:"",page:1,per_page:15},p=1;m=new w(".gallery-link");v.addEventListener("submit",async function(t){t.preventDefault(),i.style.display="block";const r=t.target.elements.input.value;o.q=r,o.page=1,p=1;try{const a=await y(o);S(a)}catch{g()}t.target.reset()});c.addEventListener("click",async function(){i.style.display="block",p++,o.page=p;try{const t=await y(o);h(t)}catch{g()}});function S(t){t.hits.length===0?(E(),d(),c.style.display="none"):(d(),h(t),c.style.display="block"),i.style.display="none"}function h(t){i.style.display="block";const r=t.hits.map(({largeImageURL:a,webformatURL:l,tags:e,likes:s,views:n,comments:b,downloads:F})=>`<li class='gallery-item'>
  <a class='gallery-link' href='${a}'>
    <img class='gallery-image' src='${l}' alt='${e}'/>
  </a>
<div class='container-app'>
<p><span>Likes</span> ${s}</p>
<p><span>Views</span> ${n}</p>
<p><span>Comments</span> ${b}</p>
<p><span>Downloads</span> ${F}</p>
</div>
 </li>`).join("");f.insertAdjacentHTML("beforeend",r),i.style.display="none",t.totalHits<=o.page*o.per_page&&(c.style.display="none",u.show({...P,message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"})),m.refresh()}function d(){f.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
