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
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/wangeditor/view.css'
import './assets/css/dw-common.css'
import './assets/css/dw-element-style-override.css'

Vue.config.productionTip = false

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
