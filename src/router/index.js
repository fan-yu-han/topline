import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // @ 是src 目录的别名 这是 VueCli 项目中特殊的提供
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
