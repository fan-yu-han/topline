import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // null、{ token, refresh_token }
    user: getItem('user')
    // user: JSON.parse(window.localStorage.getItem('user'))
    // user: null
    // 我的理解是 把user放到容器中
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止刷新数据丢失，这里还需要把数据放到本地存储持久化
      setItem('user', state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
