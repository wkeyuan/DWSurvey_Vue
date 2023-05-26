export function getSurveyAnswerData (survey) {
  // 基于survey questions 构建答题数据模型
  const questions = survey.questions
  if (questions !== undefined) {
    console.debug('questions', questions)
    const answerQuestions = questions.map((item, index) => {
      console.debug('item', item)
      return getQuestionAnswerData(item)
    })
    return {surveyId: null, questions: answerQuestions}
  }
  return {surveyId: null, questions: []}
}

export function getQuestionAnswerData (question) {
  const anQuestion = {quId: null, quType: quType}
  const quType = question.quType
  if (quType === 'RADIO') {
    getQuRadioAnswerData(question, anQuestion)
  } else if (quType === 'CHECKBOX') {
    getQuCheckboxAnswerData(question, anQuestion)
  } else if (quType === 'ORDERQU') {
    anQuestion.anOrderby = []
  } else if (quType === 'MULTIFILLBLANK') {
    getQuMFbkAnswerData(question, anQuestion)
  } else if (quType === 'SCORE') {
    anQuestion.anScores = []
  } else if (quType === 'FILLBLANK') {
    anQuestion.anFillblank = {}
  } else if (quType === 'UPLOADFILE') {
    anQuestion.anUplodFiles = []
  }
  return anQuestion
}

function getQuRadioAnswerData (question, anQuestion) {
  const quRadios = question.quRadios
  quRadios.map((option, index) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anRadio = {quItemId: null, name: option.optionTitleObj.dwHtml}
    }
  })
}

function getQuCheckboxAnswerData (question, anQuestion) {
  const quCheckboxs = question.quCheckboxs
  anQuestion.anCheckboxs = []
  quCheckboxs.map((option, index) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anCheckboxs.push({quItemId: null, name: option.optionTitleObj.dwHtml})
    }
  })
}

function getQuMFbkAnswerData (question, anQuestion) {
  const quMultiFillblanks = question.quMultiFillblanks
  anQuestion.anDFillblanks = []
  quMultiFillblanks.map((option, index) => {
    if (option.hasOwnProperty('inputText')) {
      anQuestion.anDFillblanks.push({quItemId: null, name: option.optionTitleObj.dwHtml, text: option.inputText})
    }
  })
}
