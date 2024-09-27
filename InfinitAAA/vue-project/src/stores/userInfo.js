import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import { registerAPI, loginAPI} from '@/api/user.js'

const useUserInfoStore = defineStore('userInfo',()=>{
    //定义状态相关的内容

    const info = ref({
        name: 'orange',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkYRMy3ifBgjxbF_p-NU1eyIpB8WZ_FQqB7YTV5SVPd8rCvVVI"
    })


    const setInfo = (newInfo)=>{
        info.value = newInfo
    }


    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        info.value = res.result
    }

    const register = async ({account, password}) => {
        const res = await registerAPI({account, password})
    }

    const clearUserInfo = () => {
        info.value = {}
    }



    return {info,getUserInfo, register,clearUserInfo}

},{persist:true})

export default useUserInfoStore;