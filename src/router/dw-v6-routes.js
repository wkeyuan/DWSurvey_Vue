import Layout from '@/components/layouts/Layout.vue'
import NoTopLayout from '@/components/layouts/NoTopLayout.vue'
import DwAnswerWeixin from '@/views/dw-survey/dw-collect/DwAnswerWeixin'
import DwUser from '@/views/dw-user/DwUser'
import DwUserPwd from '@/views/dw-user/DwUserPwd'
import AdminUserList from '@/views/dw-admin/AdminUserList'
import DwDesign from '../views/dw-survey/dw-design1/DwDesign'
import DwSurveyDesignContent from '../views/dw-survey-v6/dw-design/DwSurveyDesignContent'
import DwSurveyAnswerDataListV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerDataListV6.vue'
import DwSurveyAnswerReview
  from '../components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerReview.vue'
import DwAnswerUrlV6 from '../views/dw-survey-v6/dw-collect-v6/DwAnswerUrlV6'
import DwAnswerSurveyV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyV6'
import DwSurveyListV6 from '../views/dw-survey-v6/DwSurveyListV6.vue'
import DwSurveyChartsV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyChartsV6.vue'
import DwAnswerSurveyMobileV6 from '../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyMobileV6.vue'
import DwSurveyAttrSet from '../views/dw-survey-v6/dw-design/DwSurveyAttrSet.vue'
import DwSiteCompV6 from '../views/dw-survey-v6/dw-collect-v6/DwSiteCompV6.vue'
import DwSiteShareV6 from '../views/dw-survey-v6/dw-collect-v6/DwSiteShareV6.vue'
import DwLrLayout from '../components/layouts/DwLRLayout/DwLrLayout.vue'
import DwSurveyStyle from "../views/dw-survey-v6/dw-design/DwSurveyStyle.vue";

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
        path: 'dw-design/survey1',
        name: 'DwDesignV6',
        meta: {
          title: '问卷设计'
        },
        component: DwDesign
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
        component: DwSurveyAnswerReview
      }
    ]
  }
]

const v6Route = {v6Routes, v6RouteRoots}

export {v6Route}
