<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'


</script>

<template>
    <div class="common-layout">
        <LayoutHeader />
        <div class="w">
            <RouterView />
            <LayoutFooter /> 
        </div>
    </div>
</template>

<style lang="less">
    .common-layout {
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(to bottom, #082E54, #000);
        .w {
            width: 1420px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
        }
    }
    
    .custom-message-box {
  p {
    color: black;
    /* 修改为你想要的字体颜色 */

  }
}

el-dialog {
  p {
    color: black;
  }
}

div {
  padding: 0%;
}

p {
  color: #FFFFFF;
  //font-size: 16px
}
</style>