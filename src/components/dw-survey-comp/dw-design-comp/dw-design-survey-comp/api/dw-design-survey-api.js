import request from '@/utils/request'

export function questionComps () {
  return request({
    url: '/api/dwsurvey/app/dw-design-survey/questions.do',
    method: 'get'
  })
}

export function querySurveyAll (params) {
  return request({
    url: '/api/dwsurvey/app/design/survey-design/surveyAll.do',
    method: 'post',
    params
  })
}

/**
 * 创建用户
 * @param data
 * @returns {*}
 */
export function dwSaveSurveyJson (data) {
  return request({
    url: '/api/dwsurvey/app/dw-design-survey/save-survey-json.do',
    method: 'post',
    data
  })
}
