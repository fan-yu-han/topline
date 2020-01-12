// 用户相关的请求模块

import request from '@/utils/request'

export const login = (data) => {
  return request({
    // 请求方法
    method: 'POST',

    // 请求路径
    url: '/app/v1_0/authorizations',

    // 请求头
    // headers: {},

    // Query 查询参数
    // parsms: {},

    // Body 请求提参数
    data: data
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}

// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'

  })
}

// 获取用户频道列表
// * 如果登录了：获取用户频道列表
// * 没有登录：获取默认推荐的频道列表
// */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
