import request from '@/utils/request'

export function questionComps () {
  return request({
    url: '/api/dwsurvey/app/dw-design-survey/toolbar-qus.do',
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
 * 获取问卷设计原始JSON
 * @param params
 * @returns {*}
 */
export function surveyJsonBySurveyId (params) {
  return request({
    url: '/api/dwsurvey/none/dw-answer-survey/survey-json-by-survey-id.do',
    method: 'get',
    params
  })
}

/**
 * 保存问卷设计原始JSON
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
