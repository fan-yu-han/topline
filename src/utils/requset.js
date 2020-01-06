/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

export default request
