<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
 

//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

//准备表单对象
const form = ref({
    account:'',
    password:'',
    rePassword:''
})

//校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== form.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}

//表单校验规则
const rules = {
    account:[
        { required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur'}
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur'},
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur'}
    ],
    rePassword:[
        {validator:checkRePassword,trigger:'blur'}
    ]
}


import {useRouter} from 'vue-router'
import useUserInfoStore from '../../stores/userInfo';

const userStore = useUserInfoStore();


//获取form实例做统一校验
const formRef = ref(null)

const router = useRouter()

const doRegister = () => {
    const { account, password, rePassword } = form.value;
    //调用实例方法
    formRef.value.validate(async (valid)=>{

        //以valid作为判断条件，通过校验实现登录逻辑
        if(valid) {
            await userStore.register({account, password})
            ElMessage({type: 'success', message:'注册成功'})
        }
    //注册后清空form的数据
        form.value={
            account:'',
            password:'',
            rePassword:''
        }   
    })
}


const doLogin = () => {
    const {account, password} = form.value
    //调用实例方法
    formRef.value.validate(async (valid)=>{

        //以valid作为判断条件，通过校验实现登录逻辑
        if(valid) {
            //TODO
            await userStore.getUserInfo({account, password})
            //1. 提示用户
            ElMessage({type: 'success', message:'登录成功'})
            //2. 跳转首页
            router.replace({path: '/'})
        }
    })
}

</script>

<template>
    <div class="login-layout">
        <el-row class="login-page"  align="middle">
            <el-col :span="12" :offset="6" class="form">
                <!-- 注册表单 -->
                <el-form ref="formRef" size="large" autocomplete="off" v-if="isRegister" :model="form" :rules="rules" label-position="top" label-width="100px">
                    <el-form-item>
                        <h1>注册</h1>
                    </el-form-item>
                    <el-form-item prop="account" label="用户名" class="item">
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码" class="item">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="rePassword" label="再次确认密码">
                        <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="form.rePassword"></el-input>
                    </el-form-item>
                    <!-- 注册按钮 -->
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="doRegister" >
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                            ← 返回
                        </el-link>
                    </el-form-item>
                </el-form>
                <!-- 登录表单 -->
                <el-form ref="formRef"  size="large" autocomplete="off" v-else :model="form" label-position="top" label-width="100px" :rules="rules">
                    <el-form-item>
                        <h1>登录到 InfiniteMusic</h1>
                    </el-form-item>
                    <el-form-item label="用户名" prop="account" class="item">
                        <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" class="item">
                        <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item class="flex">
                        <div class="flex">
                            <el-checkbox>记住我</el-checkbox>
                            <el-link type="primary" :underline="false">忘记密码？</el-link>
                        </div>
                    </el-form-item>
                    <!-- 登录按钮 -->
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="doLogin">登录</el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = true" >
                            注册 →
                        </el-link>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        

    </div>

</template>

<style lang="less" scoped>
.login-layout {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to bottom, #082E54, #000);
    overflow: hidden;
}


.login-page {
    height: 800px;
    width: 800px;
    background-color: #0A0C0B;
    border-radius: 20px;
    margin: 0 auto;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
   
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        background-color: #0A0C0B;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
            height: 50px;
            margin-top: 50px;
            border-radius: 40px;
            font-size: 20px;
            font-weight: 700; 
            color: black;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        h1 {
            font-size: 40px;
            color: #F2F2F2;
        }
    }
}

</style>

<style>
 .item .el-form-item__label{
    color:#fff;
    font-weight: 700;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size:18px  
  }
</style>