import{d as r,p,i as c,c as k,a as t,q as s,v as o,b as a,g as m}from"./index-Dd6rZvZd.js";const _={class:"middle"},b={class:"bg-main p-4 rounded-lg shadow-md w-96"},v={class:"mt-4 flex flex-col gap-4"},y=["disabled"],f=["disabled"],I=r({__name:"AuthView",setup(g){const e=p(),l=c(),u=async()=>{!e.client_secret.value||!e.api_key.value||(localStorage.setItem("api_key",e.api_key.value),await e.redirectSignIn(e.client_secret.value),e.auth_data&&await l.push({name:"library"}))},d=async()=>{!e.client_secret.value||!e.api_key.value||(localStorage.setItem("api_key",e.api_key.value),await e.popUpSignIn(e.client_secret.value),e.auth_data&&await l.push({name:"library"}))};return(x,n)=>(m(),k("div",_,[t("div",b,[n[4]||(n[4]=t("h1",{class:"text-2xl font-semibold text-center"},"Login",-1)),t("div",v,[t("fieldset",null,[n[2]||(n[2]=t("span",{class:"text-sm font-bold"},"Client secret",-1)),s(t("input",{class:"k-input k-input-md k-input-solid k-rounded-md","onUpdate:modelValue":n[0]||(n[0]=i=>a(e).client_secret.value=i)},null,512),[[o,a(e).client_secret.value]])]),t("fieldset",null,[n[3]||(n[3]=t("span",{class:"text-sm font-bold"},"Api Key",-1)),s(t("input",{class:"k-input k-input-md k-input-solid k-rounded-md","onUpdate:modelValue":n[1]||(n[1]=i=>a(e).api_key.value=i)},null,512),[[o,a(e).api_key.value]])]),t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary",disabled:!a(e).client_secret.value||!a(e).api_key.value,onClick:u}," Redirect Sign In ",8,y),t("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary",disabled:!a(e).client_secret.value||!a(e).api_key.value,onClick:d}," Pop up sign In ",8,f)])])]))}});export{I as default};
