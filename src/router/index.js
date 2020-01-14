import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 登录页面
    // @ 是src 目录的别名 这是 VueCli 项目中特殊的提供
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // 不要给有默认子路由的父路由起名字
    // name: 'tab-bar',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
