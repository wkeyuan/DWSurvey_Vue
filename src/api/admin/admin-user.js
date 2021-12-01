import request from '@/utils/request'
import API from '@/api/index.js'

// 登录方法
export function dwAdminUserList(pageSize, current, status, loginName) {
  const params = {
    pageSize,
    current,
    status,
    loginName
  }
  return request({
    url: API.adminUserList,
    method: 'get',
    params
  })
}


/**
 * 创建用户
 * @param data
 * @returns {*}
 */
export function dwUserCreate(data) {
  return request({
    url: API.adminUserCreate,
    method: 'post',
    data
  })
}

export function dwUserUpdate(data) {
  return request({
    url: API.adminUserUpdate,
    method: 'put',
    data
  })
}


export function dwUserDelete(data) {
  return request({
    url: API.adminUserDelete,
    method: 'delete',
    data
  })
}
