import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Comment from '@/views/Comment/index.vue'
import Player from '@/views/Player/index.vue'
import Person from '@/views/Person/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和components对应关系的位置
  routes: [
    {
        path: '/',
        redirect: '/player',
        component: Layout,
        
        children: [
          {
            path: 'comment',
            component: Comment
          },
          {
            path: 'player',
            component: Player
          },
          {
            path: 'person',
            component: Person
          }
        ]
    },

    {
      path: '/login',
      component: Login
    }
  ],
    //路由行为定制
    scrollBehavior() {
        return {
          top: 0
        }
      }
})




export default router
