
export function logicNum (questionLogics, loginType) {
  let loginNum = 0
  if (questionLogics!==null) {
    questionLogics.forEach((item, index) => {
      if (item.logicType === loginType) loginNum++
    })
  }
  return loginNum
}

export function curQuAfterQus (questions, quIndex) {
  const newQuestions = []
  if (questions !== null) {
    let quNum = 1
    questions.forEach((item, index) => {
      if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH') {
        item.quNum = quNum++
        if (index > quIndex) newQuestions.push(item)
      }
    })
  }
  return newQuestions
}

export function getQuOptions (question) {
  const quType = question.quType
  if (quType === 'RADIO') {
    return question.quRadios
  } else if (quType === 'CHECKBOX') {
    return question.quCheckboxs
  } else if (quType === 'ORDERQU') {
    return question.quOrderbys
  } else if (quType === 'MULTIFILLBLANK') {
    return question.quMultiFillblanks
  } else if (quType === 'SCORE') {
    return question.quScores
  }
}

export function clearSurveyJson (survey) {
  const questions = survey.questions
  if (questions !== null) {
    questions.forEach((item, index) => {
    })
  }
}

export function getSurveyJsonSimple (surveyJsonText) {
  const newSurvey = JSON.parse(surveyJsonText)
  newSurvey.questions = []
  return newSurvey
}

export function getSaveSurveyJsonText (surveyJsonText) {
  const newSurvey = JSON.parse(surveyJsonText)
  clearSurveyTempPage(newSurvey)
  return newSurvey
}
export function clearSurveyTempPage (survey) {
  const questions = survey.questions
  if (questions !== null) {
    questions.forEach((item, index) => {
      if (item.quType==='PAGETAG' && item.hasOwnProperty('tempPage')) questions.splice(index, 1)
    })
  }
}
