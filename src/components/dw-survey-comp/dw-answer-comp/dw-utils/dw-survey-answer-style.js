import {dwSurveyColorUtils, getDefaultSurveyStyle} from "../../dw-utils/dw-common/dw-common-utils";

function dwUpImgSrcVar (survey) {
  if (survey.hasOwnProperty('surveyStyle')) {
    const surveyStyle = survey.surveyStyle
    if (surveyStyle.hasOwnProperty('pageTopImg')) {
      const topImg = surveyStyle.pageTopImg
      if (topImg.hasOwnProperty('src')) {
        const topImgSrc = topImg.src
        if (topImgSrc!==undefined && topImgSrc!==null) {
          survey.surveyStyle.pageTopImg.httpSrc = process.env.DW_RESOURCE_URL+topImgSrc
        }
      }
    }
    if (surveyStyle.hasOwnProperty('pageBgImg')) {
      const bgImg = surveyStyle.pageBgImg
      if (bgImg.hasOwnProperty('src')) {
        const bgImgSrc = bgImg.src

        if (bgImgSrc!==undefined && bgImgSrc!==null) {
          if (bgImg.enabled) {
            survey.surveyStyle.pageBgImg.httpSrc = process.env.DW_RESOURCE_URL+bgImgSrc
            document.documentElement.style.setProperty('--dw-answer-page-bg-image', 'url('+survey.surveyStyle.pageBgImg.httpSrc+')')
          } else {
            document.documentElement.style.setProperty('--dw-answer-page-bg-image', 'none')
          }
        }
      }
    }
    if (surveyStyle.hasOwnProperty('logoImg')) {
      const logoImg = surveyStyle.logoImg
      if (logoImg.hasOwnProperty('src')) {
        const logoImgSrc = logoImg.src
        if (logoImgSrc!==undefined && logoImgSrc!==null) {
          survey.surveyStyle.logoImg.httpSrc = process.env.DW_RESOURCE_URL+logoImgSrc
        }
      }
    }
  }
}

function dwUpAnswerStyleVar (survey) {
  // const survey = this.survey
  if (survey.hasOwnProperty('surveyStyle')) {
    const surveyStyle = survey.surveyStyle
    const pageThemeColor = surveyStyle.pageThemeColor
    const pageBgColor = surveyStyle.pageBgColor
    const logoBgColor = surveyStyle.logoBgColor
    const pageThemeColor1 = surveyStyle.pageThemeColor1
    document.documentElement.style.setProperty('--dw-answer-page-bg-color', pageBgColor)
    document.documentElement.style.setProperty('--dw-answer-primary-color', pageThemeColor)
    document.documentElement.style.setProperty('--dw-answer-primary-color-1', pageThemeColor1)
    document.documentElement.style.setProperty('--dw-answer-logo-bg-color', logoBgColor)
    // document.documentElement.style.setProperty('--dw-answer-primary-color', pageThemeColor)
    console.debug('surveyStyle', surveyStyle)
  }
}

function dwUpSurveyStyleMain (survey) {
  if (survey!==null) {
    dwUpImgSrcVar(survey)
    dwUpAnswerStyleVar(survey)
  }
}
export const dwUpSurveyStyle = {dwUpSurveyStyleMain, dwUpImgSrcVar, dwUpAnswerStyleVar}
