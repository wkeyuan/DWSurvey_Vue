import request from '@/utils/request'

export function questionComps () {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/toolbar-qus.do',
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
export function surveyJsonDesignBySurveyId (params) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/survey-json-by-survey-id.do',
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
    url: '/api/dwsurvey/app/v6/dw-design-survey/save-survey-json.do',
    method: 'post',
    data
  })
}

export function dwDevSurvey (params) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/dev-survey.do',
    method: 'post',
    params
  })
}
