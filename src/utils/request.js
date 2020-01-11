/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在 JavaScript 模块中直接 import 获取容器即可
// 这里得到的 store 和你在组件中的 this.$store 是一样一样的
import store from '@/store'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// transformResponse 是 axios 专门提供的一个 API
// 它支持由用户来决定如何转换后端返回的数据
request.defaults.transformResponse = [function (data) {
  try {
    // 正常的话它使用的 JSON.parse 对数据进行转换
    // return JSON.parse(data)

    // 这里我们定制使用 json-bigint 这个第三方工具包来帮我们转换
    // 如果转换成功，就直接返回数据
    // 如果转换失败，就进入 catch 返回一个空对象给用户
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 统一设置token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 相应拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
