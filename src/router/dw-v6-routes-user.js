import DwAnswerWeixin from '../views/dw-survey/dw-collect/DwAnswerWeixin'
import DwUser from '../views/dw-user/DwUser'
import DwUserPwd from '../views/dw-user/DwUserPwd'
import DwSurveyAnswerDataListV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerDataListV6.vue'
import DwAnswerUrlV6 from '../views/dw-survey-v6/dw-collect-v6/DwAnswerUrlV6'
import DwSurveyListV6 from '../views/dw-survey-v6/DwSurveyListV6.vue'
import DwSurveyChartsV6 from '../views/dw-survey-v6/dw-data-v6/DwSurveyChartsV6.vue'
import DwSurveyAttrSet from '../views/dw-survey-v6/dw-design/DwSurveyAttrSet.vue'
import DwSiteCompV6 from '../views/dw-survey-v6/dw-collect-v6/DwSiteCompV6.vue'
import DwSiteShareV6 from '../views/dw-survey-v6/dw-collect-v6/DwSiteShareV6.vue'

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
    path: 'survey/c/attr/:dwSurveyId',
    meta: {
      title: '问卷属性'
    },
    component: DwSurveyAttrSet
  },
  {
    path: 'survey/c/url/:dwSurveyId',
    meta: {
      title: '答卷地址'
    },
    component: DwAnswerUrlV6
  },
  {
    path: 'survey/c/comp/:dwSurveyId',
    meta: {
      title: '网站组件'
    },
    component: DwSiteCompV6
  },
  {
    path: 'survey/c/share/:dwSurveyId',
    component: DwSiteShareV6
  },
  {
    path: 'survey/c/weixin/:dwSurveyId',
    component: DwAnswerWeixin
  },
  {
    path: 'survey/d/chart/:dwSurveyId',
    meta: {
      title: '统计分析'
    },
    component: DwSurveyChartsV6
  },
  {
    path: 'survey/d/data/:dwSurveyId',
    meta: {
      title: '原始数据'
    },
    component: DwSurveyAnswerDataListV6
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
