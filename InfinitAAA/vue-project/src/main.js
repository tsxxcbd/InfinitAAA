import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/fonts/iconfont.css'

import App from './App.vue'
import router from '@/router'
import axios from "axios"

import 'element-plus/theme-chalk/dark/css-vars.css'
axios.defaults.withCredentials = true


const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios

app.mount('#app')

