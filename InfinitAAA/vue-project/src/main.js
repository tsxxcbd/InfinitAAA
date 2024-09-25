import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/fonts/iconfont.css'

import App from './App.vue'
import router from '@/router'
import axios from "axios"
axios.defaults.withCredentials = true


const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios

app.mount('#app')

