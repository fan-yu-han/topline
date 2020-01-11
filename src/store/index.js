import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新数据丢失，这 需要把数据放到本地 存储持久化
      setItem('user', state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
