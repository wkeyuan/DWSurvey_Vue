import Layout from '@/components/layouts/Layout.vue'
import NoTopLayout from '@/components/layouts/NoTopLayout.vue'
import DwAnswerWeixin from '@/views/dw-survey/dw-collect/DwAnswerWeixin'
import DwUser from '@/views/dw-user/DwUser'
import DwUserPwd from '@/views/dw-user/DwUserPwd'
import AdminUserList from '@/views/dw-admin/AdminUserList'
import DwSurveyDesignContent from '../views/dw-survey-v6/dw-design/DwSurveyDesignContent'
import DwSurveyPreview from '../views/dw-survey-v6/dw-design/DwSurveyPreview.vue'
import DwSurveyAnswerDataListV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerDataListV6.vue'
import DwAnswerUrlV6 from '../views/dw-survey-v6/dw-collect-v6/DwAnswerUrlV6'
import DwAnswerSurveyV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyV6'
import DwSurveyListV6 from '../views/dw-survey-v6/DwSurveyListV6.vue'
import DwSurveyChartsV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyChartsV6.vue'
import DwAnswerSurveyMobileV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyMobileV6.vue'
import DwSurveyAttrSet from '../views/dw-survey-v6/dw-design/DwSurveyAttrSet.vue'
import DwSiteCompV6 from '../views/dw-survey-v6/dw-collect-v6/DwSiteCompV6.vue'
import DwSiteShareV6 from '../views/dw-survey-v6/dw-collect-v6/DwSiteShareV6.vue'
import DwLrLayout from '../components/layouts/DwLRLayout/DwLrLayout.vue'
import DwSurveyAnswerReviewV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerReviewV6.vue'

// 用于定义左右结构右边菜单，未用于路由注册，相关路由注册在v6Routes里面完成
const routesAdminChildren = [
  {
    path: '/v6/lr/dw/survey',
    icon: 'el-icon-s-claim',
    name: '我的问卷',
    meta: {
      title: '我的问卷'
    },
    component: DwSurveyListV6
  },
  {
    path: '/v6/lr/dw/user',
    icon: 'el-icon-user',
    name: '个人中心',
    meta: {
      title: '个人中心'
    },
    component: AdminUserList
  },
  {
    path: '/v6/lr/dw/admin/user',
    icon: 'el-icon-s-check',
    name: '用户管理',
    meta: {
      title: '用户管理'
    },
    component: AdminUserList
  }
]

// v6版本的新路由数组
const v6Routes = [
  {
    path: '',
    redirect: 'dw/survey'
  },
  {
    path: 'dw/survey',
    meta: {
      title: '我的问卷'
    },
    component: DwSurveyListV6
  },
  {
    path: 'dw/survey/c/attr/:dwSurveyId',
    meta: {
      title: '问卷属性'
    },
    component: DwSurveyAttrSet
  },
  {
    path: 'dw/survey/c/url/:dwSurveyId',
    meta: {
      title: '答卷地址'
    },
    component: DwAnswerUrlV6
  },
  {
    path: 'dw/survey/c/comp/:dwSurveyId',
    meta: {
      title: '网站组件'
    },
    component: DwSiteCompV6
  },
  {
    path: 'dw/survey/c/share/:dwSurveyId',
    component: DwSiteShareV6
  },
  {
    path: 'dw/survey/c/weixin/:dwSurveyId',
    component: DwAnswerWeixin
  },
  {
    path: 'dw/survey/d/chart/:dwSurveyId',
    meta: {
      title: '统计分析'
    },
    component: DwSurveyChartsV6
  },
  {
    path: 'dw/survey/d/data/:dwSurveyId',
    meta: {
      title: '原始数据'
    },
    component: DwSurveyAnswerDataListV6
  },
  {
    path: 'dw/user/pwd',
    component: DwUserPwd
  },
  {
    path: 'dw/user',
    component: DwUser
  },
  {
    path: 'dw/admin/user',
    component: AdminUserList
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
        path: 'dw-preview/survey/:dwSurveyId',
        name: 'DwSurveyPreviewV6',
        meta: {
          title: '问卷预览'
        },
        component: DwSurveyPreview
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

const v6Route = {v6Routes, v6RouteRoots, routesAdminChildren}

export {v6Route}
