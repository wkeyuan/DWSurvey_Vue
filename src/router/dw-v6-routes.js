import Layout from '../components/layouts/Layout.vue'
import NoTopLayout from '../components/layouts/NoTopLayout.vue'
import DwSurveyDesignContent from '../views/dw-survey-v6/dw-design/DwSurveyDesignContent'
import DwAnswerSurveyV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyV6'
import DwAnswerSurveyMobileV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyMobileV6.vue'
import DwLrLayout from '../components/layouts/DwLRLayout/DwLrLayout.vue'
import DwSurveyAnswerReviewV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerReviewV6.vue'
import DwSurveyStyle from '../views/dw-survey-v6/dw-design/DwSurveyStyle.vue'
import {v6RouteUser} from './dw-v6-routes-user'
import {v6RouteAdmin} from './dw-v6-routes-admin'
import EmptyRouterView from '../components/layouts/EmptyRouterView.vue'

// v6版本的新路由数组
const v6Routes = [
  {
    path: '',
    redirect: 'dw/survey'
  },
  {
    // 默认上下风格布局
    path: 'dw/',
    component: EmptyRouterView,
    children: v6RouteUser.routesUserChildren
  },
  {
    path: 'dw/admin/',
    component: EmptyRouterView,
    children: v6RouteAdmin.routesAdminChildren
  }
]

// v6版本的总集
const v6RouteRoots = [
  {
    // 默认上下风格布局
    path: '/v6',
    meta: '首页',
    component: Layout,
    children: v6Routes
  },
  {
    // 默认左右风格布局
    path: '/v6/lr/',
    meta: '首页',
    component: DwLrLayout,
    children: v6Routes
  },
  {
    // 无页头整页布局
    path: '/v6/diaowen',
    name: 'NoTopLayoutV6',
    component: NoTopLayout,
    children: [
      {
        path: 'dw-design/survey/:dwSurveyId',
        name: 'DwSurveyDesignContentV6',
        meta: {
          title: '问卷设计'
        },
        component: DwSurveyDesignContent
      },
      {
        path: 'dw-preview-style/survey/:dwSurveyId',
        name: 'DwSurveyStyle',
        meta: {
          title: '问卷样式'
        },
        component: DwSurveyStyle
      },
      {
        path: 'an/:sid',
        name: 'DwAnswerSidSurveyV6',
        meta: {
          title: '欢迎答卷'
        },
        component: DwAnswerSurveyV6
      },
      {
        path: 'an/m/:sid',
        name: 'DwMSidAnswerSurveyV6',
        component: DwAnswerSurveyMobileV6
      },
      {
        path: 'an/:sid/:answerId',
        name: 'DwSidAnswerSurveyV6',
        component: DwAnswerSurveyV6
      },
      {
        path: 'an/review/:sid/:answerId',
        name: 'DwSurveyAnswerReviewV6',
        meta: {
          title: '原始答卷'
        },
        component: DwSurveyAnswerReviewV6
      }
    ]
  }
]

const v6Route = {v6Routes, v6RouteRoots}

export {v6Route}
