
export function clearSurveyAnswer (survey) {
  const questions = survey.questions
  if (questions !== undefined) {
    console.debug('questions', questions)
    questions.map((item, index) => {
      console.debug('item', item)
      clearQuestionAnswerData(item)
    })
  }
}

export function clearQuestionAnswerData (question) {
  const quType = question.quType
  if (quType === 'RADIO') {
    clearQuRadioAnswerData(question)
  } else if (quType === 'CHECKBOX') {
    clearQuCheckboxAnswerData(question)
  } else if (quType === 'ORDERQU') {
    clearQuOrderByAnswerData(question)
  } else if (quType === 'MULTIFILLBLANK') {
    clearQuMFbkAnswerData(question)
  } else if (quType === 'SCORE') {
    // anQuestion.anScores = []
    clearQuScoreAnswerData(question)
  } else if (quType === 'FILLBLANK') {
    clearQuFbkAnswerData(question)
  } else if (quType === 'UPLOADFILE') {
    clearQuUploadAnswerData(question)
  }
  if (question.hasOwnProperty('anQuestion')) delete question.anQuestion
  // if (question.hasOwnProperty('validateObj')) delete question.validateObj
  question.validateObj = {errorText: '', isOk: true, isAnswerOk: false}
}

function clearQuRadioAnswerData (question, anQuestion) {
  const quRadios = question.quRadios
  quRadios.map((option, index) => {
    option.checked = false
  })
}

function clearQuCheckboxAnswerData (question) {
  const quCheckboxs = question.quCheckboxs
  quCheckboxs.map((option, index) => {
    option.checked = false
  })
}

function clearQuOrderByAnswerData (question) {
  const quOrderbys = question.quOrderbys
  quOrderbys.forEach((option, itemIndex) => {
    option.checked = false
    option.orderIndex = 0
  })
}

function clearQuMFbkAnswerData (question) {
  const quMultiFillblanks = question.quMultiFillblanks
  quMultiFillblanks.map((option, index) => {
    option.inputText = ''
  })
}

function clearQuScoreAnswerData (question) {
  const quScores = question.quScores
  quScores.map((option, index) => {
    option.checked = false
    option.answerScore = 0
  })
}

function clearQuFbkAnswerData (question) {
  question.answer = null
}

function clearQuUploadAnswerData (question) {
  if (question.hasOwnProperty('upFileList')) {
    question.upFileList = null
  }
}
