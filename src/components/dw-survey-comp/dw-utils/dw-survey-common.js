import {
  querySurveyAll,
  surveyJsonDesignBySurveyId
} from '../dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api'
import {parseSurvey} from './dw-survey-parse'

/**
 * 根据SurveyId 取 surveyJson
 * @param params
 * @param successCallback
 * @param noJsonCallback
 */
export function getSurveyJsonBySurveyId (params, successCallback, noJsonCallback) {
  // 先看看有没有JSON，有就取JSON数据。没有再取原来的Survey结构数据进行转换
  surveyJsonDesignBySurveyId(params).then((response) => {
    console.debug('surveyJsonBySurveyId', response)
    const httpResult = response.data
    if (httpResult.resultCode === 200) {
      const surveyJson = httpResult.data
      // const surveyJson = null
      if (surveyJson!==null && surveyJson.hasOwnProperty('surveyJsonText') && surveyJson.surveyJsonText!==null && surveyJson.surveyJsonText!=='') {
        successCallback(parseSurvey(JSON.parse(surveyJson.surveyJsonText)))
      } else {
        noJsonCallback()
      }
    }
  })
}

export function getDesignSurveyJsonBySurveyId (params, successCallback) {
  // 先看看有没有JSON，有就取JSON数据。没有再取原来的Survey结构数据进行转换
  getSurveyJsonBySurveyId(params, successCallback, () => {
    getQuerySurvey(params, successCallback)
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

export const surveyPageUtils= {
  pageSize (survey) {
    const questions = survey.questions
    let pageSize = 1
    questions.forEach((item, index) => {
      if (item.quType === 'PAGETAG') pageSize++
    })
    return pageSize
  },
  quInPageNum (survey, quIndex) {
    const questions = survey.questions
    let pageNum = 0
    questions.forEach((item, index) => {
      if (item.quType === 'PAGETAG' && index <= quIndex) pageNum++
    })
    return pageNum
  }
}
