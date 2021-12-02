// dw-role
import Vue from 'vue'
import DwAuthorized from './dw-authorized'

function changeHasRole (el, binding) {
  if (!roleCheck(binding.value)) {
    el.parentNode.removeChild(el)
  }
  function roleCheck (value) {
    const authority = DwAuthorized.getAuthority()
    for (let i=0; i<authority.length; i++) {
      if (value === authority[i]) {
        return true
      }
    }
    return false
  }
}
Vue.directive('hasDwRole', {
  inserted: function (el, binding) {
    changeHasRole(el, binding)
  }
})
