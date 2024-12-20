import '@/assets/scss/styles.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { HtmlStore } from './utils/HtmlStore';
import vue3GoogleLogin from 'vue3-google-login'
import googleAuthPlugin from './plugins/auth';
import googleDrivePlugin from './plugins/drive';
import bookPlugin from './plugins/book';
import filePlugin from './plugins/file';

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '192037497972-7ervgpvt65ks51p02n8cbfmmqf2mdbeo'
})

app.use(googleAuthPlugin);
app.use(googleDrivePlugin);
app.use(bookPlugin);
app.use(filePlugin);
app.provide('htmlStore', new HtmlStore())

app.use(createPinia())
app.use(router)

app.mount('#app')
