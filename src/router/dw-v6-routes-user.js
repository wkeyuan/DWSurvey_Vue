// import DwUser from '../views/dw-user/DwUser'
// import DwUserPwd from '../views/dw-user/DwUserPwd'
// import DwSurveyListV6 from '../views/dw-survey-v6/DwSurveyListV6.vue'
// import EmptyRouterView from '../components/layouts/EmptyRouterView.vue'
import {v6RouteSurvey} from './dw-v6-routes-survey'

const DwUser = () => import(/* webpackChunkName: "dwsurvey-user" */ '../views/dw-user/DwUser')
const DwUserPwd = () => import(/* webpackChunkName: "dwsurvey-user" */ '../views/dw-user/DwUserPwd')
const DwSurveyListV6 = () => import(/* webpackChunkName: "dwsurvey-survey-list" */ '../views/dw-survey-v6/DwSurveyListV6.vue')
const EmptyRouterView = () => import(/* webpackChunkName: "dwsurvey-layout" */ '../components/layouts/EmptyRouterView.vue')

// v6版本的新路由数组
const routesUserChildren = [
  {
    path: 'survey',
    meta: {
      title: '我的问卷'
    },
    component: DwSurveyListV6
  },
  {
    path: '',
    component: EmptyRouterView,
    children: v6RouteSurvey.routesSurveyChildren
  },
  {
    path: 'user/pwd',
    component: DwUserPwd
  },
  {
    path: 'user',
    component: DwUser
  }
]

const v6RouteUser = {routesUserChildren}

export {v6RouteUser}
