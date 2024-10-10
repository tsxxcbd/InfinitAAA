//axios的基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import  useUserInfoStore  from '@/stores/userInfo.js'
import router from '@/router'
import 'element-plus/theme-chalk/el-message.css'
const httpInstance = axios.create({
   // baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    time: 5000
})

//拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    //1. 从pinia获取token数据
    const userStore = useUserInfoStore()
    //2. 按照后端要求拼接token数据
    const token = userStore.info.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserInfoStore()
    //统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })

    //401token失效处理
    //1. 清除本地用户数据
    //2. 跳转到登录页
    if (e.response.status === 401) {
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})


export default httpInstance