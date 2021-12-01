import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function dwLogin(username, password) {
  const params = {
    username,
    password
  }
  return request({
    url: API.loginIn,
    method: 'post',
    params
  })
}

// 退出方法
export function logout() {
  return request({
    url: API.logOut,
    method: 'post'
  })
}

