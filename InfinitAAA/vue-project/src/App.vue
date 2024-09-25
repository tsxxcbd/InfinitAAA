<script setup>
import StarBackground from './views/canvas.vue'

</script>

<template>
  <StarBackground/>

  <!-- 一级路由出口组件 -->
  <RouterView />
</template>

<style>
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }

  body {
    overflow-y: hidden;
  }
</style>