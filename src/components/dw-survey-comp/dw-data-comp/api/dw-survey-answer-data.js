import request from '@/utils/request'
export function dwSurveyAnswerListV6 (params) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/list.do',
    method: 'get',
    params
  })
}

export function dwSurveyAnswerStatsV6 (params) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/survey-stats.do',
    method: 'get',
    params
  })
}

/**
 * 执行异步答卷信息导出
 * @param params
 * @returns {*}
 */
export function dwSurveyAnswerExportSync (params) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/export-by-sync.do',
    method: 'get',
    params
  })
}

/**
 * 查询异步答卷信息进度信息
 * @param params
 * @returns {*}
 */
export function dwSurveyAnswerExportLogInfo (params) {
  return request({
    url: '/api/dwsurvey/app/v6/answer/export-log/export-log-info.do',
    method: 'get',
    params
  })
}
