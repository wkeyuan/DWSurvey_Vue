import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layouts/Layout.vue'
import LoginLayout from '@/components/layouts/LoginLayout.vue'
import NoTopLayout from '@/components/layouts/NoTopLayout.vue'
import DwAnswer from '@/views/dw-survey/dw-collect/DwAnswer'
import DwSurveyList from '@/views/dw-survey/DwSurveyList'
import DwSurveyAttr from '@/views/dw-survey/dw-collect/DwSurveyAttr'
import DwAnswerUrl from '@/views/dw-survey/dw-collect/DwAnswerUrl'
import DwSiteComp from '@/views/dw-survey/dw-collect/DwSiteComp'
import DwSiteShare from '@/views/dw-survey/dw-collect/DwSiteShare'
import DwAnswerWeixin from '@/views/dw-survey/dw-collect/DwAnswerWeixin'
import DwSurveyCharts from '@/views/dw-survey/dw-data/DwSurveyCharts'
import DwSurveyAnswer from '@/views/dw-survey/dw-data/DwSurveyAnswer'
import DwSurveyAnswerInfo from '@/views/dw-survey/dw-data/DwSurveyAnswerInfo'
import DwUser from '@/views/dw-user/DwUser'
import DwUserPwd from '@/views/dw-user/DwUserPwd'
import AdminUserList from '@/views/dw-admin/AdminUserList'
import Login from '@/views/Login'
import DwDesign from '../views/dw-survey/dw-design1/DwDesign'
import DwSurveyDesignContent from '../views/dw-survey-v6/dw-design/DwSurveyDesignContent'
import DwSurveyPreview from '../views/dw-survey-v6/dw-design/DwSurveyPreview.vue'
import DwSurveyAnswerDataListV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerDataListV6.vue'
import DwSurveyAnswerReview
  from '../components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerReview.vue'
import DwAnswerUrlV6 from '../views/dw-survey-v6/dw-collect-v6/DwAnswerUrlV6'
import DwAnswerSurveyV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyV6'
import DwSurveyListV6 from "../views/dw-survey-v6/DwSurveyListV6.vue";
import DwSurveyChartsV6 from "../views/dw-survey-v6/dw-data-v6/DwSurveyChartsV6.vue";
import DwAnswerSurveyMobileV6 from "../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyMobileV6.vue";
import DwSurveyAttrSet from "../views/dw-survey-v6/dw-design/DwSurveyAttrSet.vue";
import DwSiteCompV6 from "../views/dw-survey-v6/dw-collect-v6/DwSiteCompV6.vue";
import DwSiteShareV6 from "../views/dw-survey-v6/dw-collect-v6/DwSiteShareV6.vue";
import DwLrLayout from "../components/layouts/DwLRLayout/DwLrLayout.vue";
import EmptyRouterView from "../components/layouts/EmptyRouterView.vue";

Vue.use(Router)

const v6Routes = [
  {
    path: '',
    redirect: 'dw/survey'
  },
  {
    path: 'dw/survey',
    name: 'DwSurveyListV6',
    meta: {
      title: '我的问卷'
    },
    component: DwSurveyListV6
  },
  {
    path: 'dw/survey/c/attr/:id',
    name: 'DwSurveyAttrSet',
    meta: {
      title: '问卷属性'
    },
    component: DwSurveyAttrSet
  },
  {
    path: 'dw/survey/c/url/:id',
    name: 'DwAnswerUrlV6',
    meta: {
      title: '答卷地址'
    },
    component: DwAnswerUrlV6
  },
  {
    path: 'dw/survey/c/comp/:id',
    name: 'DwSiteCompV6',
    meta: {
      title: '网站组件'
    },
    component: DwSiteCompV6
  },
  {
    path: 'dw/survey/c/share/:id',
    name: 'DwSiteShareV6',
    component: DwSiteShareV6
  },
  {
    path: 'dw/survey/c/weixin/:id',
    name: 'DwAnswerWeixin',
    component: DwAnswerWeixin
  },
  {
    path: 'dw/survey/d/chart/:id',
    name: 'DwSurveyChartsV6',
    meta: {
      title: '统计分析'
    },
    component: DwSurveyChartsV6
  },
  {
    path: 'dw/survey/d/data/:id',
    name: 'DwSurveyAnswerDataListV6',
    meta: {
      title: '原始数据'
    },
    component: DwSurveyAnswerDataListV6
  },
  {
    path: 'dw/user/pwd',
    name: 'DwUserPwd',
    component: DwUserPwd
  },
  {
    path: 'dw/user',
    name: 'DwUser',
    component: DwUser
  },
  {
    path: 'dw/admin/user',
    name: 'AdminUserList',
    component: AdminUserList
  }
]

const routesAdminChildren = [
  {
    path: '/v6/lr/dw/survey',
    icon: 'el-icon-s-claim',
    name: '我的问卷',
    meta: {
      title: '问卷设计'
    },
    component: DwSurveyListV6
  },
  {
    path: '/v6/lr/dw/admin/survey',
    icon: 'el-icon-user',
    name: '用户管理',
    meta: {
      title: '问卷设计'
    },
    component: AdminUserList
  }
]

const routes = [
  // 老版本的路由
  {
    path: '/',
    meta: '首页',
    component: Layout,
    children: [
      {
        path: '/',
        // redirect: '/dw/survey'
        redirect: '/v6'
      },
      {
        path: '/dw/survey',
        name: 'DwSurveyList',
        component: DwSurveyList
      },
      {
        path: '/dw/survey/c/attr/:id',
        name: 'DwSurveyAttr',
        component: DwSurveyAttr
      },
      {
        path: '/dw/survey/c/url/:id',
        name: 'DwAnswerUrl',
        component: DwAnswerUrl
      },
      {
        path: '/dw/survey/c/comp/:id',
        name: 'DwSiteComp',
        component: DwSiteComp
      },
      {
        path: '/dw/survey/c/share/:id',
        name: 'DwSiteShare',
        component: DwSiteShare
      },
      {
        path: '/dw/survey/c/weixin/:id',
        name: 'DwAnswerWeixin',
        component: DwAnswerWeixin
      },
      {
        path: '/dw/survey/d/chart/:id',
        name: 'DwSurveyCharts',
        component: DwSurveyCharts
      },
      {
        path: '/dw/survey/d/data/:id',
        name: 'DwSurveyAnswer',
        component: DwSurveyAnswer
      },
      {
        path: '/dw/user/pwd',
        name: 'DwUserPwd',
        component: DwUserPwd
      },
      {
        path: '/dw/user',
        name: 'DwUser',
        component: DwUser
      },
      {
        path: '/dw/admin/user',
        name: 'AdminUserList',
        component: AdminUserList
      },
      {
        path: '/dw/survey/d/data/v6/:id',
        name: 'DwSurveyAnswerDataListV6',
        component: DwSurveyAnswerDataListV6
      },
      {
        path: '/dw/survey/c/url/v6/:id',
        name: 'DwAnswerUrlV6',
        component: DwAnswerUrlV6
      }
    ]
  },
  {
    path: '/diaowen/:sid',
    name: 'DwAnswer',
    component: DwAnswer
  },
  {
    path: '/no-top',
    name: 'NoTopLayout',
    component: NoTopLayout,
    children: [
      {
        path: '/no-top/dw-survey/d/data/:id/:answerId',
        name: 'DwSurveyAnswerInfo',
        component: DwSurveyAnswerInfo
      }
    ]
  },
  {
    path: '/v6',
    meta: '首页',
    component: EmptyRouterView,
    children: [
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
        name: 'NoTopLayout',
        component: NoTopLayout,
        children: [
          {
            path: 'dw-design/survey/:id',
            name: 'DwSurveyDesignContent',
            meta: {
              title: '问卷设计'
            },
            component: DwSurveyDesignContent
          },
          {
            path: 'dw-design/survey1',
            name: 'DwDesign',
            meta: {
              title: '问卷设计'
            },
            component: DwDesign
          },
          {
            path: 'dw-preview/survey/:id',
            name: 'DwSurveyPreview',
            meta: {
              title: '问卷预览'
            },
            component: DwSurveyPreview
          },
          {
            path: 'an/:sid',
            name: 'DwAnswerSurveyV6',
            meta: {
              title: '欢迎答卷'
            },
            component: DwAnswerSurveyV6
          },
          {
            path: 'an/m/:sid',
            name: 'DwAnswerSurveyV6',
            component: DwAnswerSurveyMobileV6
          },
          {
            path: 'an/:sid/:answerId',
            name: 'DwAnswerSurveyV6',
            component: DwAnswerSurveyV6
          },
          {
            path: 'an/review/:sid/:answerId',
            name: 'DwSurveyAnswerReview',
            meta: {
              title: '原始答卷'
            },
            component: DwSurveyAnswerReview
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginLayout',
    component: LoginLayout,
    children: [
      {
        path: '/',
        name: 'Login',
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

export {routes, routesAdminChildren}

export default router
