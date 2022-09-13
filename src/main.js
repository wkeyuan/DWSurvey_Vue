// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import './utils/dw-common'
import Casdoor from 'casdoor-vue-sdk'

Vue.config.productionTip = false

const casdoorConfig = {
  serverUrl: 'http://localhost:8000',
  clientId: '4262bea2b293539fe45e',
  organizationName: 'casbin',
  appName: 'app-casnode',
  redirectPath: '/#/callback/casdoor'
}
Vue.use(Casdoor, casdoorConfig)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
