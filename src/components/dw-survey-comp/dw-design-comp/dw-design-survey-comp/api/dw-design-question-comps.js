import request from '@/utils/request'

export function bankQuestions () {
  return request({
    url: '/api/dwsurvey/app/dw-design-survey/bank-qus.do',
    method: 'get'
  })
}
