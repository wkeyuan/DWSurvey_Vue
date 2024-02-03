import request from '@/utils/request'

/**
 * 保存答卷原始JSON
 * @param data
 * @returns {*}
 */
export function dwSaveSurveyAnswerJson (data) {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/save-survey-answer.do',
    method: 'post',
    data
  })
}

export function dwSurveyAnswerById (params) {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/get-survey-answer.do',
    method: 'get',
    params
  })
}
