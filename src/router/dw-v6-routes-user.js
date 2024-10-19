import DwUser from '../views/dw-user/DwUser'
import DwUserPwd from '../views/dw-user/DwUserPwd'
import DwSurveyListV6 from '../views/dw-survey-v6/DwSurveyListV6.vue'
import EmptyRouterView from '../components/layouts/EmptyRouterView.vue'
import {v6RouteSurvey} from './dw-v6-routes-survey'

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
