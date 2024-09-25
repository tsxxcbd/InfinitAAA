//导入request.js请求工具
import request from '@/utils/request.js'

//注册接口
export const registerAPI = ({account, password})=>{
    return request({
        url:'/api/user/register',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

//登录接口
export const loginAPI = ({account, password}) => {
    return request({
        url:'/api/user/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}




