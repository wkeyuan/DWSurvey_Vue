import request from '@/utils/request'

export function questionComps () {
  return request({
    url: '/api/dwsurvey/app/dw-design-survey/questions.do',
    method: 'get'
  })
}

export function querySurveyAll (params) {
  return request({
    url: '/api/dwsurvey/anon/response/design/survey-design/surveyAll.do',
    method: 'post',
    params
  })
}
