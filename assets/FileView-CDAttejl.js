import{d as _,s as C,v as x,m as y,u as B,n as P,w as I,c as l,g as t,t as p,j as i,l as A,F,e as L,f as d,x as M}from"./index-D7IcR962.js";const R={class:"h-full flex content-width"},j={class:"flex flex-col py-2 grow gap-2"},z={class:"p-2 bg-white rounded-sm shadow-sm flex items-center"},D={class:"font-bold"},N={class:"h-full bg-white rounded-sm shadow-sm"},O={key:0,class:"middle bg-gray-300"},V={class:"p-2 bg-white rounded-sm shadow-sm flex items-center justify-between"},W={class:"flex overflow-auto footer-pagination"},E=["onClick"],q=_({__name:"FileView",setup(G){const a=C(),w=x();let n;const k=y(),u=B();let o;const c=()=>{const s=a.params.id;o=u.getOrAddContentInfo(s,k)},r=()=>{u.renderPage(a.params.id,n)};P(()=>{c(),console.log("onBeforeMount")}),I(()=>a.params.id,()=>{c(),r(),n&&(n.contentWindow.document.open(),n.contentWindow.document.write(""),n.contentWindow.document.close())});const f=()=>{u.close(o.value.id),w.push({name:"library"})},v=s=>{n=s,c(),r()},b=()=>{o.value.page++,r()},g=()=>{o.value.page--,r()},h=s=>{o.value.page=s,r()};return(s,e)=>(d(),l("div",R,[t("div",j,[t("div",z,[t("span",D,p(i(o).fileInfo.name),1),e[1]||(e[1]=t("div",{class:"grow"},null,-1)),t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-link with-underline",onClick:f},e[0]||(e[0]=[t("span",{class:"k-button-text"},"Close",-1)]))]),t("div",N,[i(o).loading?(d(),l("div",O,e[2]||(e[2]=[t("div",null,"LOADING",-1)]))):A("",!0),t("iframe",{src:"javascript:void(0);",ref:v,style:{width:"100%",border:"none",height:"100%"}})]),t("div",V,[t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary w-8",onClick:g},e[3]||(e[3]=[t("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 20 20",class:"w-5 h-5","aria-hidden":"true",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"fill-rule":"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"})],-1)])),t("div",W,[(d(!0),l(F,null,L([...Array(i(o).maxPage).keys()],(S,m)=>(d(),l("button",{type:"button",class:M(["k-button k-button-md k-rounded-md k-button-link k-button-link-base px-2",{"k-button-active":i(o).page==m}]),onClick:()=>h(m)},p(m+1),11,E))),256))]),t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary w-8",onClick:b},e[4]||(e[4]=[t("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 20 20",class:"w-5 h-5","aria-hidden":"true",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1)]))])])]))}});export{q as default};