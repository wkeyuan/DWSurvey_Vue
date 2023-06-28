import {v1 as uuidV1} from 'uuid'

export function getSurveyAnswerData (survey) {
  // 基于survey questions 构建答题数据模型
  const surveyAnswer = {answerDwId: null, surveyDwId: survey.dwId, answerQuestions: []}
  surveyAnswer.answerDwId = uuidV1() // 答卷ID，记录在数据库原始记录表中
  const questions = survey.questions
  if (questions !== undefined) {
    console.debug('questions', questions)
    surveyAnswer.answerQuestions = questions.map((item, index) => {
      console.debug('item', item)
      return getQuestionAnswerData(item)
    })
  }
  return surveyAnswer
}

export function getQuestionAnswerData (question) {
  const quType = question.quType
  const anQuestion = {quDwId: question.dwId, quType: quType}
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
      anQuestion.anRadio = {optionDwId: option.dwId, name: option.optionTitleObj.dwHtml}
    }
  })
}

function getQuCheckboxAnswerData (question, anQuestion) {
  const quCheckboxs = question.quCheckboxs
  anQuestion.anCheckboxs = []
  quCheckboxs.map((option, index) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anCheckboxs.push({optionDwId: option.dwId, name: option.optionTitleObj.dwHtml})
    }
  })
}

function getQuFbkAnswerData (question, anQuestion) {
  // anQuestion.anFillblank = question.anFillblank
  anQuestion.anFillblank = {answer: question.anFillblank.answer}
  console.debug('anFillblank', anQuestion.anFillblank.answer)
}

function getQuMFbkAnswerData (question, anQuestion) {
  const quMultiFillblanks = question.quMultiFillblanks
  anQuestion.anDFillblanks = []
  quMultiFillblanks.map((option, index) => {
    if (option.hasOwnProperty('inputText') && option.inputText!=='') {
      anQuestion.anDFillblanks.push({optionDwId: option.dwId, answer: option.inputText})
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
          const anUploadFile = {filePath: responseItem.location, fileName: responseItem.filename}
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
      anQuestion.anScores.push({optionDwId: option.dwId, answerScore: option.answerScore})
    }
  })
}

function getQuOrderByAnswerData (question, anQuestion) {
  console.debug('getQuOrderByAnswerData question', question)
  // anQuestion = question.anQuestion
  console.debug('anQuestion', anQuestion)
  const quOrderbys = question.quOrderbys
  anQuestion.anOrders = []
  quOrderbys.forEach((option, itemIndex) => {
    if (option.hasOwnProperty('checked') && option.checked && option.orderIndex>0) anQuestion.anOrders.push({optionDwId: option.dwId, orderNum: option.orderIndex})
    // , optionName: option.optionTitleObj.dwHtml
  })
}
