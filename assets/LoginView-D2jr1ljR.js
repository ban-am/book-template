import{d as u,y as d,v as r,c,g as e,z as p,A as m,j as s,f as _}from"./index-DdM1q5nQ.js";const b={class:"middle"},k={class:"bg-white p-4 rounded-lg shadow-md w-96"},f={class:"mt-4 flex flex-col gap-4"},v=["disabled"],g=["disabled"],y=u({__name:"LoginView",setup(h){const t=d(),i=r(),o=async()=>{t.client_secret.value&&(await t.redirectSignIn(t.client_secret.value),t.auth_data&&await i.push({name:"library"}))},a=async()=>{t.client_secret.value&&(await t.popUpSignIn(t.client_secret.value),t.auth_data&&await i.push({name:"library"}))};return(w,n)=>(_(),c("div",b,[e("div",k,[n[2]||(n[2]=e("h1",{class:"text-2xl font-semibold text-center"},"Login",-1)),e("div",f,[e("fieldset",null,[n[1]||(n[1]=e("span",{class:"text-sm font-bold"},"Client secret",-1)),p(e("input",{class:"k-input k-input-md k-input-solid k-rounded-md","onUpdate:modelValue":n[0]||(n[0]=l=>s(t).client_secret.value=l)},null,512),[[m,s(t).client_secret.value]])]),e("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary",disabled:!s(t).client_secret.value,onClick:o}," Redirect Sign In ",8,v),e("button",{type:"button",class:"k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary",disabled:!s(t).client_secret.value,onClick:a}," Pop up sign In ",8,g)])])]))}});export{y as default};