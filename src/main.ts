import '@/assets/scss/styles.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { HtmlStore } from './utils/HtmlStore';
import vue3GoogleLogin from 'vue3-google-login'
import googleAuthPlugin from './plugins/auth';
import googleDrivePlugin from './plugins/drive';
import filePlugin from './plugins/file';
import { fileTreePlugin } from './plugins/fileTreePlugin';

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '192037497972-7ervgpvt65ks51p02n8cbfmmqf2mdbeo'
})

app.use(googleAuthPlugin);
app.use(googleDrivePlugin);
app.use(filePlugin);
app.use(fileTreePlugin);
app.provide('htmlStore', new HtmlStore())

app.use(createPinia())
app.use(router)

app.mount('#app')
