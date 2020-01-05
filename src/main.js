import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 注册 Vant 组件
import './utils/register-vant'
// // 加载
// // 按需注册 Vant 组件
// import {
//   Button,
//   Cell,
//   CellGroup
// } from 'vant'

// Vue
//   .use(Button)
//   .use(Cell)
//   .use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
