
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
  setAuthority (authority) {
    const dwAuthority = typeof authority === 'string' ? [authority] : authority
    localStorage.setItem('dw_oss_authority', JSON.stringify(dwAuthority))
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
  }
}
