import request from '@/utils/request'
export function dwSurveyAnswerListV6 (params) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/list.do',
    method: 'get',
    params
  })
}
