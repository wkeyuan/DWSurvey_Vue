import {validateQuestion} from '../../dw-utils/dw-survey-answer-validate'

export function initAnswerSurveyProgress (survey) {
  // 如果没有进度信息的情况下执行初始化
  if (!survey.hasOwnProperty('answerProgress')) {
    answerSurveyProgressCommon(survey, (question) => {
      validateQuestion(question)
      question.validateObj.isOk = true // 初始状态必须设置为true, 不用管真实是否答过，不然会直接触发未答提醒
      return question.validateObj.isAnswerOk
    })
  }
}

export function answerSurveyProgress (survey) {
  answerSurveyProgressCommon(survey, (question) => question.validateObj.isAnswerOk)
}

function answerSurveyProgressCommon (survey, quIsAnOkFun) {
  const questions = survey.questions
  // 遍历所有题，根据题目状态计算答题进度
  const answerProgress = {totalAnQu: 0, completeAnQu: 0, percentage: 0}
  questions.forEach((question, quIndex) => {
    if (!continueQuType(question) && question.hasOwnProperty('quAttr')) {
      const quAttr = question.quAttr
      if (quAttr.hasOwnProperty('isRequired') && quAttr.isRequired && !question.logicIsHide) {
        answerProgress.totalAnQu = answerProgress.totalAnQu+1
        // 初始化时用question.validateObj.isAnswerOk不行，还是得调用原始的方法判断是否真的回答
        if (quIsAnOkFun(question)) {
          answerProgress.completeAnQu = answerProgress.completeAnQu+1
        }
      }
    }
  })
  if (answerProgress.totalAnQu>0) {
    answerProgress.percentage = (answerProgress.completeAnQu/answerProgress.totalAnQu * 100).toFixed(2)
  }
  survey.answerProgress.totalAnQu = answerProgress.totalAnQu
  survey.answerProgress.completeAnQu = answerProgress.completeAnQu
  survey.answerProgress.percentage = answerProgress.percentage
}

function continueQuType (question) {
  const quType = question.quType
  if (quType==='PAGETAG' || quType==='PARAGRAPH' || quType==='DIVIDER' || quType==='CAROUSEL' || quType ==='MAP') return true
  return false
}
