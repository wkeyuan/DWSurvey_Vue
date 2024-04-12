import {surveyPageUtils} from './dw-survey-common'

export function parseAnswerData (survey, answer) {
  survey.dwEsSurveyAnswer = answer
  survey.firstLoadAnswer = true
  if (answer!=null && answer.hasOwnProperty('anQuestions')) {
    const questions = survey.questions
    const anQuestions = answer.anQuestions
    if (anQuestions!==null && anQuestions.length>0) {
      anQuestions.forEach((anQuestion, anQuIndex) => {
        const anQuId = anQuestion.quDwId
        questions.forEach((surveyQuestion, quIndex) => {
          const surveyQuId = surveyQuestion.dwId
          if (anQuId===surveyQuId) {
            parseAnQuAnswer2SurveyQu(surveyQuestion, anQuestion)
            console.debug('surveyQuId', surveyQuId)
          }
        })
      })
    }
  }
  console.debug('parseAnswerData survey', survey)
}

export function parseAnQuAnswer2SurveyQu (question, anQuestion) {
  const quType = question.quType
  console.debug('parseAnQuAnswer2SurveyQu', quType)
  // const anQuestion = {quDwId: question.dwId, quType: quType}
  if (quType === 'RADIO') {
    parseQuRadioAnswerData2Qu(question, anQuestion)
  } else if (quType === 'CHECKBOX') {
    parseQuCheckboxAnswerData2Qu(question, anQuestion)
  } else if (quType === 'ORDERQU') {
    parseQuOrderByAnswerData2Qu(question, anQuestion)
  } else if (quType === 'MULTIFILLBLANK') {
    parseQuMFbkAnswerData2Qu(question, anQuestion)
  } else if (quType === 'SCORE') {
    parseQuScoreAnswerData2Qu(question, anQuestion)
  } else if (quType === 'FILLBLANK') {
    parseQuFbkAnswerData2Qu(question, anQuestion)
  } else if (quType === 'UPLOADFILE') {
    parseQuUploadAnswerData2Qu(question, anQuestion)
  }
}

function parseQuRadioAnswerData2Qu (question, anQuestion) {
  const quRadios = question.quRadios
  if (anQuestion.hasOwnProperty('anRadio')) {
    const anRadio = anQuestion.anRadio
    if (anRadio!=null && anRadio.hasOwnProperty('optionDwId')) {
      const optionDwId = anRadio.optionDwId
      if (optionDwId!==undefined && optionDwId!==null) {
        quRadios.map((option, index) => {
          if (optionDwId===option.dwId) {
            option.checked = true
            option.otherText = anRadio.otherText
          }
        })
      }
      question.anQuestion = anQuestion
    }
  }
}
function parseQuCheckboxAnswerData2Qu (question, anQuestion) {
  const quCheckboxs = question.quCheckboxs
  if (anQuestion.hasOwnProperty('anCheckboxs')) {
    const anCheckboxs = anQuestion.anCheckboxs
    if (anCheckboxs!==null && anCheckboxs.length>0) {
      anCheckboxs.forEach((anOption, anOptionIndex) => {
        if (anOption.hasOwnProperty('optionDwId')) {
          const anOptionDwId = anOption.optionDwId
          quCheckboxs.forEach((quOption, quOptionIndex) => {
            if (quOption.dwId === anOptionDwId) {
              quOption.checked = true
              quOption.otherText = anOption.otherText
            }
          })
        }
      })
      question.anQuestion = anQuestion
    }
  }
}
function parseQuOrderByAnswerData2Qu (question, anQuestion) {
  const quOrderbys = question.quOrderbys
  if (anQuestion.hasOwnProperty('anOrders')) {
    const anOrders = anQuestion.anOrders
    if (anOrders!==null && anOrders.length>0) {
      anOrders.forEach((anOption, anOptionIndex) => {
        if (anOption.hasOwnProperty('optionDwId')) {
          const anOptionDwId = anOption.optionDwId
          quOrderbys.forEach((quOption, quOptionIndex) => {
            if (quOption.dwId === anOptionDwId) {
              quOption.checked = true
              quOption.orderIndex = anOption.orderNum
            }
          })
        }
      })
      question.anQuestion = anQuestion
    }
  }
}
function parseQuMFbkAnswerData2Qu (question, anQuestion) {
  const quMultiFillblanks = question.quMultiFillblanks
  if (anQuestion.hasOwnProperty('anMFbks')) {
    const anMFbks = anQuestion.anMFbks
    if (anMFbks!==null && anMFbks.length>0) {
      anMFbks.forEach((anOption, anOptionIndex) => {
        if (anOption.hasOwnProperty('optionDwId')) {
          const anOptionDwId = anOption.optionDwId
          quMultiFillblanks.forEach((quOption, quOptionIndex) => {
            if (quOption.dwId === anOptionDwId) {
              quOption.inputText = anOption.answer
            }
          })
        }
      })
      question.anQuestion = anQuestion
    }
  }
}

function parseQuScoreAnswerData2Qu (question, anQuestion) {
  const quScores = question.quScores
  if (anQuestion.hasOwnProperty('anScores')) {
    const anScores = anQuestion.anScores
    if (anScores!==null && anScores.length>0) {
      anScores.forEach((anOption, anOptionIndex) => {
        if (anOption.hasOwnProperty('optionDwId')) {
          const anOptionDwId = anOption.optionDwId
          quScores.forEach((quOption, quOptionIndex) => {
            if (quOption.dwId === anOptionDwId) {
              quOption.checked = true
              if (anOption.answerScore!==null && anOption.answerScore>=0) quOption.answerScore = parseInt(anOption.answerScore)
            }
          })
        }
      })
      question.anQuestion = anQuestion
    }
  }
}

function parseQuFbkAnswerData2Qu (question, anQuestion) {
  if (anQuestion.hasOwnProperty('anFbk')) {
    const anFbk = anQuestion.anFbk
    if (anFbk!==null) {
      question.answer = anFbk.answer
      question.anQuestion = anQuestion
    }
  }
}
function parseQuUploadAnswerData2Qu (question, anQuestion) {
  if (anQuestion.hasOwnProperty('anUploadFiles')) {
    const anUploadFiles = anQuestion.anUploadFiles
    if (anUploadFiles!==null) {
      const upFileList = []
      anUploadFiles.forEach((anUpFile, index) => {
        // const anUploadFile = {filePath: responseItem.location, fileName: responseItem.filename}
        // const quUpFileList = question.upFileList
        // item.response.data
        upFileList.push({response: {data: [{location: anUpFile.filePath, filename: anUpFile.fileName}]}, name: anUpFile.fileName})
      })
      question.upFileList = upFileList
      question.anQuestion = anQuestion
    }
  }
}

// 生成需要的答卷对象
export function initAnswerBySurvey (survey) {
  const questions = survey.questions
  if (questions !== null && questions.length > 0) {
    let pageSize = 1
    // 循环然后定义以上内容
    questions.forEach((question, quIndex) => {
      // 为答卷生成
      const quType = question.quType
      const quAttr = question.quAttr
      if (quType === 'FILLBLANK') {
        const inputAttr = quAttr.inputAttr
        inputAttrInit(inputAttr)
        const commonAttr = inputAttr.commonAttr
        const checkType = commonAttr.checkType
        if (checkType==='TIME' && inputAttr.dateTimeAttr.attrs.includes('range')) question.answer = {startTime: null, endTime: null}
        const defaultValue = commonAttr.defaultValue
        if (defaultValue!==null && defaultValue!=='') question.answer = defaultValue
      } else if (quType === 'MULTIFILLBLANK') {

      } else if (quType === 'RADIO') {

      } else if (quType === 'CHECKBOX') {

      }
      // 初始化题目辅助参数
      question.showQu = true // 默认显示, 分页控制
      question.logicIsHide = false // 默认不隐藏,逻辑控制
      question.pageIndex = pageSize
      if (question.quType === 'PAGETAG') pageSize++
    })
  }
  // 初始化Page信息
  survey.pageAttr = {pageSize: surveyPageUtils.pageSize(survey), curPage: 1}
  survey.answerProgress = {totalAnQu: 0, completeAnQu: 0, percentage: 0}
}

function inputAttrInit (inputAttr) {
  const commonAttr = inputAttr.commonAttr
  const checkType = commonAttr.checkType
  const placeholder = commonAttr.placeholder
  let newPlaceholder = '请输入'
  if (placeholder===undefined || placeholder===null || placeholder==='' || placeholder==='请输入') {
    if (checkType==='EMAIL') {
      newPlaceholder = '请输入邮箱'
    } else if (checkType==='NUM') {
      newPlaceholder = '请输入数字'
    } else if (checkType==='DIGITS') {
      newPlaceholder = '请输入整数'
    } else if (checkType==='TEL_PHONE') {
      newPlaceholder = '请选择电话或手机'
    } else if (checkType==='TIME') {
      newPlaceholder = '请选择时间'
    } else if (checkType==='DATE') {
      newPlaceholder = '请选择日期'
    } else if (checkType==='DATETIME') {
      newPlaceholder = '请选择日期时间'
    } else if (checkType==='ZIPCODE') {
      newPlaceholder = '请输入邮政编码'
    } else if (checkType==='TEL') {
      newPlaceholder = '请输入电话号码'
    } else if (checkType==='PHONE') {
      newPlaceholder = '请输入手机号码'
    } else if (checkType==='IDENTCODE') {
      newPlaceholder = '请输入身份证号'
    } else if (checkType==='URL') {
      newPlaceholder = '请输入网址'
    } else if (checkType==='UNSTRCN') {
      newPlaceholder = '请输入非中文'
    } else if (checkType==='STRCN') {
      newPlaceholder = '请输入中文'
    }
    commonAttr.placeholder = newPlaceholder
  }
}
export function showPageByIndex (survey, pageIndex) {
  const questions = survey.questions
  questions.forEach((item, index) => {
    console.debug('item.pageIndex === pageIndex', item.pageIndex === pageIndex)
    item.showQu = item.pageIndex === pageIndex
  })
  survey.pageAttr.curPage = pageIndex
}
