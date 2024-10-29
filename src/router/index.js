import Vue from 'vue'
import Router from 'vue-router'
// import LoginLayout from '@/components/layouts/LoginLayout.vue'
// import Login from '@/views/Login'
// import EmptyRouterView from '../components/layouts/EmptyRouterView.vue'
// import {v5Route} from './dw-v5-routes'
import {v6Route} from './dw-v6-routes'

const LoginLayout = () => import(/* webpackChunkName: "dwsurvey-layout" */ '../components/layouts/LoginLayout.vue')
const Login = () => import(/* webpackChunkName: "dwsurvey-login" */ '../views/Login')
const EmptyRouterView = () => import(/* webpackChunkName: "dwsurvey-layout" */ '../components/layouts/EmptyRouterView.vue')

Vue.use(Router)

// 所有会被注册的路由
const routes = [
  // v5老版本的路由，新版本不再使用
  /*
  {
    path: '',
    meta: '首页',
    component: EmptyRouterView,
    children: v5Route.v5Routes
  },*/
  {
    path: '/',
    // redirect: '/dw/survey'
    redirect: '/v6'
  },
  // v6新版本的路由
  {
    path: '/v6',
    meta: '首页',
    component: EmptyRouterView,
    children: v6Route.v6RouteRoots
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '/',
        component: Login
      }
    ]
  }
]

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title!==undefined ? to.meta.title+' - 调问网' : '调问网'
  next()
})

export {routes}

export default router
