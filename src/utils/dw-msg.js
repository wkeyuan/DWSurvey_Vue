import {Message, MessageBox} from 'element-ui'

export function msgError (message) {
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
}
export function msgInfo (message) {
  Message({
    message: message,
    type: 'info',
    duration: 5 * 1000
  })
}

export function msgWarning (message) {
  Message({
    message: message,
    type: 'warning',
    duration: 5 * 1000
  })
}

export function msgBoxNoLogin () {
  MessageBox.confirm('未登录状态，是否重新登录', '系统提示', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  }
  ).then(() => {
    window.location.href = '/#/login'
  }).catch(() => {})
}

export function msgBoxNoRole () {
  MessageBox.confirm('账号没有相关操作权限', '系统提示', {
    confirmButtonText: '确认',
    showCancelButton: false,
    showClose: false,
    type: 'warning'
  }
  ).then(() => {
    window.location.href = '/#/'
  }).catch(() => {})
}
