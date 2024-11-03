
export default {
  setUserName (userName) {
    localStorage.setItem('dw_oss_user_name', userName)
  },
  getUserName () {
    if (localStorage.hasOwnProperty('dw_oss_user_name')) {
      return localStorage.getItem('dw_oss_user_name')
    }
    return 'none'
  },
  setToken (token) {
    localStorage.setItem('dw_oss_token', token)
  },
  getToken () {
    if (localStorage.hasOwnProperty('dw_oss_token')) {
      return localStorage.getItem('dw_oss_token')
    }
    return null
  },
  setAuthority (authority) {
    const dwAuthority = typeof authority === 'string' ? [authority] : authority
    localStorage.setItem('dw_oss_authority', JSON.stringify(dwAuthority))
  },
  setAuthorityStr (authority) {
    localStorage.setItem('dw_oss_authority', authority)
  },
  getAuthority () {
    let authority = []
    if (localStorage.hasOwnProperty('dw_oss_authority')) {
      const authorityString = localStorage.getItem('dw_oss_authority')
      try {
        if (authorityString) {
          authority = JSON.parse(authorityString)
        }
      } catch (e) {
        authority = authorityString
      }
      if (typeof authority === 'string') {
        return [authority]
      }
    }
    return authority
  },
  getDwSessionId () {
    if (localStorage.hasOwnProperty('dw_oss_session_id')) {
      return localStorage.getItem('dw_oss_session_id')
    }
    return null
  },
  setDwSessionId (sessionId) {
    localStorage.setItem('dw_oss_session_id', sessionId)
  }
}
