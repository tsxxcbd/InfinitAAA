<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { Avatar } from '@element-plus/icons-vue'
import ChatWindow  from '../../../components/ChatWindow.vue'


const dialogVisible = ref(false);


// 路由跳转
const router = useRouter();


//退出登录
const handleLog= () => {
    ElMessageBox.confirm(
      '是否确定退出登录?',
      'InfiniteMusic',
      {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'custom-message-box'
      }
    ).then(async () => {
      // Perform logout actions
      router.push('/login')
      userInfo.clearUserInfo()

      ElMessage({
        type: 'success',
        message: '成功退出登录',
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '用户取消登录',
      })
    })

};


//搜索跳转
const keyword = ref();
const navigateToSearch = () => {
  // 使用 $router.push 将 keyword 作为参数传递给 search.vue
  router.push({
    path: '/search',
    // query: { keyword: keyword }
  });
};



//用户信息
import useUserInfoStore from '../../../stores/userInfo.js'
import { storeToRefs } from 'pinia'

const userInfo = useUserInfoStore();
const  {info} = storeToRefs(userInfo);


</script>



<template>
      <el-header class="top">
        <div class="w">
          <div class="title" width="290px">
          <img src="../../../assets/logo.png" class="logo">
          <h3 class="logoname">InfiniteMusic</h3>
        </div>
        <div class="search-box">
          <input class="search-txt" type='text' id='inp' v-model="keyword" placeholder="搜索音乐" />
            <el-button type="primary" round class="search iconfont icon-sousuo"
            @click="navigateToSearch">
          </el-button>
        </div>
        <div class="chatSearch" width="150px">
          <el-button type="primary" round :icon="Avatar" class="assistant" @click="dialogVisible = true">
            Assistant
          </el-button>
        </div>


        <el-dropdown placement="bottom-end" >
          <div class="self el-dropdown-link" style="outline: none">
            <el-image :src=info.photo alt="photo" class="avatar " fit="cover" />
            <p class="username">{{info.name}}</p>
          </div>
          <!-- 下拉菜单 -->
          <!-- command：条目被点击触发后，在事件函数上可以声明一个参数，接收条目对应的指令 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item  @click="$router.push('/person')">个人主页</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/login')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        </div>
      </el-header>
              <!-- 音乐对话功能 -->
              <el-dialog v-model="dialogVisible" width="40%" class="chatWindow" title="音乐对话">
          <!-- <div slot="title" class="custom-box-title">
                音乐对话
            </div> -->
          <span>
            <ChatWindow />
          </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogVisible = false">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
</template>



<style lang="less" >


.top {
  .w {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      line-height: 100px;
  }

  height: 100px;
  background-color: #000;
  
}





.logo {
  width: 60px;
  height: 60px;
  margin: auto;
  position: relative;
  margin-left: 10px;
  border-radius: 50%;
}

.title {
  display: flex;
  align-items: center;
}

.logoname {
  margin: auto;
  margin-left: 20px;
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
  color: #FFFFFF;
}

.search-box {
  width: 350px;
  padding: 0;
  display: flex;
  margin-left: 90px;
  background: #ffffff;
  height: 40px;
  border: none;
  border-radius: 40px;
  align-items: center;
}

.search {
  background-color: transparent;
  margin-left: 5px;
  font-size: 26px;
  color: #797979;
  border: none;
}

.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  color: #000;
  font-size: 16px;
  transition: 0.6s;
  line-height: 32px;
  width: 252px;
  margin-left: 20px;
}

.blank {
  position: relative;
  width: 20%;
}

.chatSearch {
  display: flex;
  align-items: center;
}

.assistant {
  margin-left: 40px;
  width: 160px;
  height: 40px;
  outline: #797979 1px;
  border-radius: 40px;
  font-size: 16px;
  line-height: 40px;
  font-weight: bold;
  background-color: transparent;
}

.assistant i {
  color: dodgerblue;
  font-size: 22px;
  margin-right: 6px
}


.self {
  display: flex;
  align-items: center;
  margin-left: 250px;
}



.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;

}

.username {
  width: 30px;
  margin-left: 30px;
  font-size: 20px;
  color: #FFFFFF;

}


.example-showcase .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-dropdown-item {
  background: #091014;
  text-align: center;
  font-size: 13px;
  color: #F2F2F2;
  width: 114px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  border: none;
}

.el-dropdown-item:hover {
  cursor: pointer;
  border: #F2F2F2 1px;
}







.chatWindow {
  background-image: linear-gradient(to bottom right, #f05b72, #009ad6);

  // display: flex;
  .el-dialog__title {
    font-size: 20px;
    font-weight: 550;
    color: #fff;
    margin-top: 0%
  }
}
</style>





