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
  const quType = question.quType
  const anQuestion = {quId: null, quType: quType}
  if (quType === 'RADIO') {
    getQuRadioAnswerData(question, anQuestion)
  } else if (quType === 'CHECKBOX') {
    getQuCheckboxAnswerData(question, anQuestion)
  } else if (quType === 'ORDERQU') {
    getQuOrderByAnswerData(question, anQuestion)
  } else if (quType === 'MULTIFILLBLANK') {
    getQuMFbkAnswerData(question, anQuestion)
  } else if (quType === 'SCORE') {
    // anQuestion.anScores = []
    getQuScoreAnswerData(question, anQuestion)
  } else if (quType === 'FILLBLANK') {
    getQuFbkAnswerData(question, anQuestion)
  } else if (quType === 'UPLOADFILE') {
    getQuUploadAnswerData(question, anQuestion)
  }
  question.anQuestion = anQuestion
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

function getQuFbkAnswerData (question, anQuestion) {
  anQuestion.anFillblank = question.anFillblank
  console.debug('anFillblank', anQuestion.anFillblank.answer)
}

function getQuMFbkAnswerData (question, anQuestion) {
  const quMultiFillblanks = question.quMultiFillblanks
  anQuestion.anDFillblanks = []
  quMultiFillblanks.map((option, index) => {
    if (option.hasOwnProperty('inputText') && option.inputText!=='') {
      anQuestion.anDFillblanks.push({quItemId: null, name: option.optionTitleObj.dwHtml, text: option.inputText})
    }
  })
}

function getQuUploadAnswerData (question, anQuestion) {
  anQuestion.anUplodFiles = []
  if (question.hasOwnProperty('upFileList')) {
    const quUpFileList = question.upFileList
    console.debug('quUpFileList', quUpFileList)
    quUpFileList.forEach((item, index) => {
      if (item.hasOwnProperty('response') && item.response.hasOwnProperty('data')) {
        const responseData = item.response.data
        responseData.forEach((responseItem) => {
          const anUploadFile = {belongId: null, belongAnswerId: null, quId: null, filePath: responseItem.location, fileName: responseItem.filename, randomCode: ''}
          anQuestion.anUplodFiles.push(anUploadFile)
        })
      }
    })
    console.debug('anQuestion.anUplodFiles', anQuestion.anUplodFiles)
  }
}

function getQuScoreAnswerData (question, anQuestion) {
  const quScores = question.quScores
  anQuestion.anScores = []
  quScores.map((option, index) => {
    if (option.hasOwnProperty('checked') && option.checked && option.hasOwnProperty('answerScore')) {
      anQuestion.anScores.push({quRowId: null, name: option.optionTitleObj.dwHtml, answerScore: option.answerScore})
    }
  })
}

function getQuOrderByAnswerData (question, anQuestion) {
  const quOrderbys = question.quOrderbys
  anQuestion.anOrderby = []
}
