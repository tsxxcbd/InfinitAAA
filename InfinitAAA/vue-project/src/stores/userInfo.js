import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { registerAPI, loginAPI } from '@/api/user.js'

const useUserInfoStore = defineStore('userInfo', () => {
    //定义状态相关的内容

    const info = ref({
        id: 0,
        name: '亲爱的用户',
        token:'',
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkYRMy3ifBgjxbF_p-NU1eyIpB8WZ_FQqB7YTV5SVPd8rCvVVI"
    })


    const login = async (data) => {
        const res = await loginAPI(data)
        info.value.id = res.data.id,
        info.value.name = res.data.name,
        info.value.token = res.data.token
    }

    const register = async (data) => {
        const res = await registerAPI(data)
    }

    const clearUserInfo = () => {
        info.value = {}
    }



    return { info, login, register, clearUserInfo }

}, { persist: true })

export default useUserInfoStore;