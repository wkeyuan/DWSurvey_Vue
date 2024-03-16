import request from '@/utils/request'

/**
 * 获取问卷设计原始JSON
 * @param params
 * @returns {*}
 */
export function dwSurveyJsonBySurveyId (params) {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/survey-json-by-survey-id.do',
    method: 'get',
    params
  })
}

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

export function dwSurveyAnswerCheckPwd (params) {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/check-answer-pwd.do',
    method: 'get',
    params
  })
}
