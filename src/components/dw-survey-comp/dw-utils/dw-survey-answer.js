import {v4 as uuidV4} from 'uuid'

export function getSurveyAnswerData (survey) {
  // 基于survey questions 构建答题数据模型
  const surveyDwId = survey.dwId
  const anUser = {userId: null, userName: null}
  const anTime = {bgAnDate: null, endAnDate: null, totalTime: 0}
  const anIp = {ip: null, city: null, addr: null}
  const anState = {anQuNum: 0, isEff: 1, handleState: 0}
  const isDelete = 0
  const answerDwId = uuidV4() // 答卷ID，记录在数据库原始记录表中,实现没有起对作用
  const surveyId = survey.id
  const sid = survey.sid
  const answerCommon = {surveyId, sid, surveyDwId, answerDwId, anUser, anTime, anIp, anState, isDelete}
  const surveyAnswer = {answerCommon, anQuestions: []}
  const questions = survey.questions
  if (questions !== undefined) {
    console.debug('questions', questions)
    surveyAnswer.anQuestions = questions.map((item, index) => {
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
  } else if (quType === 'MATRIX_RADIO') {
    getQuMatrixRadioAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_CHECKBOX') {
    getQuMatrixCheckboxAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_INPUT') {
    getQuMatrixInputAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_SCALE') {
    getQuMatrixScaleAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_SLIDER') {
    getQuMatrixScaleAnswerData(question, anQuestion)
  }
  question.anQuestion = anQuestion
  return anQuestion
}

function getQuRadioAnswerData (question, anQuestion) {
  const quRadios = question.quRadios
  quRadios.map((option, index) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anRadio = {optionDwId: option.dwId, otherText: option.otherText}
    }
  })
}

function getQuCheckboxAnswerData (question, anQuestion) {
  const quCheckboxs = question.quCheckboxs
  anQuestion.anCheckboxs = []
  quCheckboxs.map((option, index) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anCheckboxs.push({optionDwId: option.dwId, otherText: option.otherText})
    }
  })
}

function getQuFbkAnswerData (question, anQuestion) {
  anQuestion.anFbk = {answer: question.answer}
  console.debug('anFillblank', anQuestion.anFbk.answer)
}

function getQuMFbkAnswerData (question, anQuestion) {
  const quMultiFillblanks = question.quMultiFillblanks
  anQuestion.anMFbks = []
  quMultiFillblanks.map((option, index) => {
    if (option.hasOwnProperty('inputText') && option.inputText!=='') {
      anQuestion.anMFbks.push({optionDwId: option.dwId, answer: option.inputText})
    }
  })
}

function getQuUploadAnswerData (question, anQuestion) {
  anQuestion.anUploadFiles = []
  if (question.hasOwnProperty('upFileList')) {
    const quUpFileList = question.upFileList
    console.debug('quUpFileList', quUpFileList)
    if (quUpFileList!==undefined && quUpFileList!==null) {
      quUpFileList.forEach((item, index) => {
        if (item.hasOwnProperty('response') && item.response.hasOwnProperty('data')) {
          if (item.response.data!=null) {
            const responseData = item.response.data
            responseData.forEach((responseItem) => {
              const anUploadFile = {filePath: responseItem.location, fileName: responseItem.filename}
              anQuestion.anUploadFiles.push(anUploadFile)
            })
          }
        }
      })
    }
    console.debug('anQuestion.anUploadFiles', anQuestion.anUploadFiles)
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

function getQuMatrixRadioAnswerData (question, anQuestion) {
  const quRows = question.quRows
  const anQuRows = []
  quRows.map((rowOption, index) => {
    const rowCols = rowOption.rowCols
    rowCols.map((rowColOption, index) => {
      if (rowColOption.hasOwnProperty('checked') && rowColOption.checked) {
        // anQuestion.anRadio = {optionDwId: option.dwId, otherText: option.otherText}
        anQuRows.push({rowDwId: rowOption.dwId, colDwId: rowColOption.dwId, quAnScore: 0})
      }
    })
  })
  anQuestion.anMatrixRadios = anQuRows
}

function getQuMatrixCheckboxAnswerData (question, anQuestion) {
  const quRows = question.quRows
  const anQuRows = []
  quRows.map((rowOption, index) => {
    const rowCols = rowOption.rowCols
    const anQuRowCols = []
    rowCols.map((rowColOption, index) => {
      if (rowColOption.hasOwnProperty('checked') && rowColOption.checked) {
        // anQuestion.anRadio = {optionDwId: option.dwId, otherText: option.otherText}
        anQuRowCols.push({optionDwId: rowColOption.dwId, otherText: null})
      }
    })
    if (anQuRowCols.length>0) {
      anQuRows.push({rowDwId: rowOption.dwId, rowAnCheckboxs: anQuRowCols, rowAnScore: 0})
    }
  })
  anQuestion.anMatrixCheckboxes = anQuRows
}

function getQuMatrixInputAnswerData (question, anQuestion) {
  const quRows = question.quRows
  const anQuRows = []
  quRows.map((rowOption, index) => {
    const rowCols = rowOption.rowCols
    const anQuRowCols = []
    rowCols.map((rowColOption, index) => {
      if (rowColOption.answerValue!==null && rowColOption.answerValue!==undefined && rowColOption.answerValue.length>0) {
        anQuRowCols.push({optionDwId: rowColOption.dwId, answer: rowColOption.answerValue})
      }
    })
    anQuRows.push({rowDwId: rowOption.dwId, rowAnFbks: anQuRowCols})
  })
  anQuestion.anMatrixFbks = anQuRows
}

function getQuMatrixScaleAnswerData (question, anQuestion) {
  const quRows = question.quRows
  const anQuRows = []
  quRows.map((rowOption, index) => {
    const answerValue = rowOption.answerValue
    if (answerValue!==null && answerValue!==undefined) {
      anQuRows.push({rowDwId: rowOption.dwId, answerScore: answerValue, rowAnScore: 0})
    }
  })
  console.debug('anQuRows', anQuRows)
  anQuestion.anMatrixScales = anQuRows
}
