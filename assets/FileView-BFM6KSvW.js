import{d as C,l as y,m as x,n as P,p as B,h as I,o as A,w as F,c as l,a as t,t as p,b as i,f as L,F as R,i as z,g as d,q as D}from"./index-DDmw_Hqj.js";const M={class:"h-full flex content-width"},N={class:"flex flex-col py-2 grow gap-2"},O={class:"p-2 bg-white rounded-sm shadow-sm flex items-center"},V={class:"font-bold"},W={class:"h-full bg-white rounded-sm shadow-sm"},j={key:0,class:"middle bg-gray-300"},S={class:"p-2 bg-white rounded-sm shadow-sm flex items-center justify-between"},q={class:"flex overflow-auto footer-pagination"},E=["onClick"],J=C({__name:"FileView",setup(G){const w=y(),a=x(),f=P();let n;const k=B(),u=I();let o;const c=()=>{const s=a.params.id;o=u.getOrAddContentInfo(s,k)},r=()=>{u.renderPage(a.params.id,n,w)};A(()=>{c()}),F(()=>a.params.id,()=>{c(),r(),n&&(n.contentWindow.document.open(),n.contentWindow.document.write(""),n.contentWindow.document.close())});const b=()=>{u.close(o.value.id),f.push({name:"library"})},v=s=>{n=s,c(),r()},g=()=>{o.value.page++,r()},h=()=>{o.value.page--,r()},_=s=>{o.value.page=s,r()};return(s,e)=>(d(),l("div",M,[t("div",N,[t("div",O,[t("span",V,p(i(o).fileInfo.name),1),e[1]||(e[1]=t("div",{class:"grow"},null,-1)),t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-link with-underline",onClick:b},e[0]||(e[0]=[t("span",{class:"k-button-text"},"Close",-1)]))]),t("div",W,[i(o).loading?(d(),l("div",j,e[2]||(e[2]=[t("div",null,"LOADING",-1)]))):L("",!0),t("iframe",{src:"javascript:void(0);",ref:v,style:{width:"100%",border:"none",height:"100%"}})]),t("div",S,[t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary w-8",onClick:h},e[3]||(e[3]=[t("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 20 20",class:"w-5 h-5","aria-hidden":"true",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"fill-rule":"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"})],-1)])),t("div",q,[(d(!0),l(R,null,z([...Array(i(o).maxPage).keys()],(T,m)=>(d(),l("button",{type:"button",class:D(["k-button k-button-md k-rounded-md k-button-link k-button-link-base px-2",{"k-button-active":i(o).page==m}]),onClick:()=>_(m)},p(m+1),11,E))),256))]),t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary w-8",onClick:g},e[4]||(e[4]=[t("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 20 20",class:"w-5 h-5","aria-hidden":"true",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1)]))])])]))}});export{J as default};
