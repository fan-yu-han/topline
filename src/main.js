import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css' //
import 'amfe-flexible' // 动态设置 REM 基准值

// 注册 Vant 组件
import './utils/register-vant'
// 加载全局样式
// 注意 ：该样式文件要放到第三方样式后
import './styles/index.less'

// 加载表单验证插件初始化配置
import './utils/validation'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
