import {querySurveyAll, surveyJsonBySurveyId} from '../dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api'
import {parseSurvey} from './dw-survey-parse'

/**
 * 根据SurveyId 取 surveyJson
 * @param params
 * @param successCallback
 */
export function getSurveyJsonBySurveyId (params, successCallback) {
  // 先看看有没有JSON，有就取JSON数据。没有再取原来的Survey结构数据进行转换
  surveyJsonBySurveyId(params).then((response) => {
    console.debug('surveyJsonBySurveyId', response)
    const httpResult = response.data
    if (httpResult.resultCode === 200) {
      const surveyJson = httpResult.data
      if (surveyJson!==null && surveyJson.hasOwnProperty('surveyJsonText') && surveyJson.surveyJsonText!==null && surveyJson.surveyJsonText!=='') {
        successCallback(parseSurvey(JSON.parse(surveyJson.surveyJsonText)))
      } else {
        getQuerySurvey(params, successCallback)
      }
    }
  })
}

/**
 * 根据SurveyId取Survey
 * @param params
 * @param successCallback
 */
export function getQuerySurvey (params, successCallback) {
  querySurveyAll(params).then((response) => {
    console.debug('querySurveyAll', response)
    const httpResult = response.data
    if (httpResult.resultCode === 200) {
      // this.survey = httpResult.data
      console.debug('httpResult.data', httpResult.data)
      const surveyData = parseSurvey(httpResult.data)
      console.debug('parseResultData', surveyData)
      // this.survey = surveyData
      successCallback(surveyData)
      // quRadios
    }
  })
}
