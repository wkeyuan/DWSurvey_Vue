// dw-role
import Vue from 'vue'
import DwAuthorized from './dw-authorized'

function changeHasRole(el, binding){
  console.debug('binding.value:');
  console.debug(binding)
  console.debug(binding.value)
  /*if (roleCheck(binding.value)) {
    el.style.display=""
  }else{
    el.style.display="none"
  }*/
  if(!roleCheck(binding.value)){
    el.parentNode.removeChild(el)
  }
  function roleCheck(value) {
    const authority = DwAuthorized.getAuthority()
    for(let i=0;i<authority.length;i++) {
      if(value===authority[i]) {
        return true;
      }
    }
    return false;
  }
}

Vue.directive('hasDwRole', {
  /*bind: function(el, binding,vnode) {
    changeHasRole(el, binding)
  },
  update(el, binding,vnode){
    changeHasRole(el, binding)
  }*/
  inserted: function(el, binding) {
    changeHasRole(el, binding)
  }
})
