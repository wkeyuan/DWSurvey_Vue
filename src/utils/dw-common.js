// dw-role
import Vue from 'vue'
import DwAuthorized from './dw-authorized'

function changeHasRole (el, binding) {
  const {value} = binding
  const permissionRoles = value
  if (!hasRoleOrPermCode(permissionRoles)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
  /* function roleCheck (permissionRoles) {
    const authority = DwAuthorized.getAuthority()
    for (let i=0; i<authority.length; i++) {
      console.debug(authority[i])
      console.debug(permissionRoles.includes(authority[i]))
      if (permissionRoles.includes(authority[i])) {
        return true
      }
    }
    return false
  } */
}

export function hasRoleOrPermCode (permissionRoles) {
  if (permissionRoles===null || permissionRoles === undefined) return true
  const authority = DwAuthorized.getAuthority()
  console.debug('authority')
  console.debug(authority)
  if (authority!=null) {
    const hasPermission = authority.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  }
  return false
}

Vue.directive('hasDwRole', {
  inserted: function (el, binding) {
    changeHasRole(el, binding)
  }
})

export function getBrowser () {
  const ua = navigator.userAgent.toLowerCase()
  console.debug('browser ua', ua)
  if (ua!==null && ua!==undefined && ua!=='') {
    let btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0]
    if ((ua.match(/msie|trident/g) || [])[0]) {
      btypeInfo = 'msie'
    }
    let pc = ''
    let prefix = ''
    let plat = ''
    // 如果没有触摸事件 判定为PC
    const isTocuh = ('ontouchstart' in window) || (ua.indexOf('touch') !== -1) || (ua.indexOf('mobile') !== -1)
    console.debug('isTouch', isTocuh)
    if (isTocuh) {
      if (ua.indexOf('ipad') !== -1) {
        pc = 'pad'
      } else if (ua.indexOf('mobile') !== -1) {
        pc = 'mobile'
      } else if (ua.indexOf('android') !== -1) {
        pc = 'androidPad'
      } else {
        pc = 'pc'
      }
    } else {
      pc = 'pc'
    }
    switch (btypeInfo) {
      case 'chrome':
      case 'safari':
      case 'mobile':
        prefix = 'webkit'
        break
      case 'msie':
        prefix = 'ms'
        break
      case 'firefox':
        prefix = 'Moz'
        break
      case 'opera':
        prefix = 'O'
        break
      default:
        prefix = 'webkit'
        break
    }
    plat = (ua.indexOf('android') > 0) ? 'android' : navigator.platform.toLowerCase()
    console.debug('platform', plat)
    return {
      // version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[/: ]([\d.]+)/) || [])[1],
      version: 0,
      plat: plat,
      type: btypeInfo,
      pc: pc,
      prefix: prefix,
      isMobile: pc !== 'pc'
    }
  }
  return {
    version: 0,
    plat: 'a',
    type: '',
    pc: 'pc',
    prefix: '',
    isMobile: false
  }
}
