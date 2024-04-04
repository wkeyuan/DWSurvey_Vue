import {dwCheckValue} from './dw-common/dw-common-1'
import {getQuestionAnswerData} from './dw-survey-answer'

/**
 * 一组题，答卷表单验证，返回是否成功
 * @param questions
 * @returns {boolean}
 */
export function validateQuestionsBool (questions) {
  let isSuccess = true
  submitValidateQuestions(questions, true)
  questions.forEach((question, quIndex) => {
    if (!question.logicIsHide) {
      if (!question.validateObj.isOk) {
        isSuccess = false
        return false
      }
    }
  })
  return isSuccess
}

export function submitValidateQuestions (questions, showOptionError) {
  if (questions !== null && questions.length > 0) {
    // 循环然后定义以上内容
    questions.forEach((question, quIndex) => {
      question.showOptionError = showOptionError
      validateQuestion(question)
    })
  }
  return questions
}

/**
 * 一组题，答卷表单验证
 * @param questions
 * @returns {*}
 */
export function validateQuestions (questions) {
  if (questions !== null && questions.length > 0) {
    // 循环然后定义以上内容
    questions.forEach((question, quIndex) => {
      validateQuestion(question)
    })
  }
  return questions
}

/**
 * 单题，答卷表单验证
 * @param question
 * @returns {*}
 */
export function validateQuestion (question) {
  if (question!==null) {
    const quType = question.quType
    if (question.showQu && !question.logicIsHide) {
      question.validateObj = {errorText: '此题必答', isOk: true, isAnswerOk: false}
      if (quType !== 'PAGETAG' && quType !== 'PARAGRAPH') {
        if (quType === 'RADIO') {
          validateQuRadio(question)
        } else if (quType === 'CHECKBOX') {
          validateCheckbox(question)
        } else if (quType === 'ORDERQU') {
          validateQuOrderbys(question)
        } else if (quType === 'MULTIFILLBLANK') {
          validateQuMultiFillblanks(question)
        } else if (quType === 'SCORE') {
          validateQuScores(question)
        } else if (quType === 'FILLBLANK') {
          validateQuFbk(question)
        } else if (quType === 'UPLOADFILE') {
          validateQuUploadFile(question)
        }
      }
      if (question.validateObj.isOk) question.validateObj.isAnswerOk = true
    }
  }
  return question
}

/**
 * 单选题验证
 * @param question
 */
function validateQuRadio (question) {
  const errorTexts = []
  const validateObj = question.validateObj
  let answerSize = 0
  getQuestionAnswerData(question)
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anRadio')) {
    answerSize = question.anQuestion.anRadio.length
  }
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<=0) {
    // question.validateObj.errorText = '此题必答'
    // question.validateObj.isOk = false
    errorTexts.push('此题必答')
  }
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anRadio')) {
    const anRadio = question.anQuestion.anRadio
    const quRadios = question.quRadios
    for (let i=0; i<quRadios.length; i++) {
      const quRadio = quRadios[i]
      quRadio.validateObj = {errorText: '', isOk: true}
      if (quRadio.dwId === anRadio.optionDwId) {
        // 查看是否需要进行填空验证
        if (quRadio.hasOwnProperty('showOptionNote') && quRadio.showOptionNote===1) {
          if (quRadio.hasOwnProperty('inputAttr')) {
            const inputAttr = quRadio.inputAttr
            const answerValue = anRadio.otherText
            const optionErrorTexts = []
            validateAnswerInput(question, inputAttr, optionErrorTexts, answerValue)
            if (optionErrorTexts.length>0 && question.hasOwnProperty('showOptionError') && question.showOptionError) {
              quRadio.validateObj.errorText = optionErrorTexts.join('，')
              quRadio.validateObj.isOk = false
              validateObj.isOk = false
            }
            // errorTexts.push(optionErrorTexts)
          }
        }
      }
    }
  }
  validateObj.errorText = ''
  if (errorTexts.length>0) {
    validateObj.errorText = errorTexts.join('，')
    validateObj.isOk = false
  }
  question.validateObj = validateObj
}

/**
 * 多选题验证
 * @param question
 */
function validateCheckbox (question) {
  const errorTexts = []
  const validateObj = question.validateObj
  let answerSize = 0
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anCheckboxs')) answerSize = question.anQuestion.anCheckboxs.length
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<=0) {
    // validateObj.errorText = '此题必答'
    // validateObj.isOk = false
    errorTexts.push('此题必答')
  }
  if (validateObj.isOk) {
    if (question.hasOwnProperty('minLimit')) {
      const minLimit = question.minLimit
      if (minLimit!=null && minLimit>0 && answerSize<minLimit) {
        // validateObj.errorText = '至少需要选择'+minLimit+'个选项'
        // validateObj.isOk = false
        errorTexts.push('至少需要选择'+minLimit+'个选项')
      }
    }
    if (question.hasOwnProperty('maxLimit')) {
      const maxLimit = question.maxLimit
      if (maxLimit!=null && maxLimit>0 && answerSize>=maxLimit) {
        // 其它设置成不可用
      }
    }
  }
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anCheckboxs')) {
    const anCheckboxs = question.anQuestion.anCheckboxs
    const quCheckboxs = question.quCheckboxs
    for (let i=0; i<quCheckboxs.length; i++) {
      const quCheckbox = quCheckboxs[i]
      quCheckbox.validateObj = {errorText: '', isOk: true}
      for (let j=0; j< anCheckboxs.length; j++) {
        const anCheckbox = anCheckboxs[j]
        if (quCheckbox.dwId === anCheckbox.optionDwId) {
          // 查看是否需要进行填空验证
          if (quCheckbox.hasOwnProperty('showOptionNote') && quCheckbox.showOptionNote===1) {
            if (quCheckbox.hasOwnProperty('inputAttr')) {
              const inputAttr = quCheckbox.inputAttr
              const answerValue = quCheckbox.otherText
              const optionErrorTexts = []
              validateAnswerInput(question, inputAttr, optionErrorTexts, answerValue)
              if (optionErrorTexts.length>0 && question.hasOwnProperty('showOptionError') && question.showOptionError) {
                quCheckbox.validateObj.errorText = optionErrorTexts.join('，')
                quCheckbox.validateObj.isOk = false
                validateObj.isOk = false
              }
              // errorTexts.push(optionErrorTexts)
            }
          }
        }
      }
    }
  }
  validateObj.errorText = ''
  if (errorTexts.length>0) {
    validateObj.errorText = errorTexts.join('，')
    validateObj.isOk = false
  }
  question.validateObj = validateObj
}

/**
 * 排序题验证
 * @param question
 */
function validateQuOrderbys (question) {
  const quOptions = question.quOrderbys
  const validateObj = question.validateObj
  let answerSize = 0
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anOrders')) answerSize = question.anQuestion.anOrders.length
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<quOptions.length) {
    validateObj.errorText = '此题必答'
    validateObj.isOk = false
  }
  question.validateObj = validateObj
}

/**
 * 填空题验证
 * @param question
 */
function validateQuFbk (question) {
  const validateObj = question.validateObj
  let answerValue = null
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anFbk')) answerValue = question.anQuestion.anFbk.answer
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && (answerValue===null || answerValue===undefined || answerValue.length<=0)) {
    validateObj.errorText = '此题必答'
    validateObj.isOk = false
  }
  const errorTexts = []
  if (answerValue===null || answerValue===undefined) answerValue = ''
  if (question.hasOwnProperty('quAttr')) {
    const quAttr = question.quAttr
    if (quAttr.hasOwnProperty('isRequired') && quAttr.isRequired && answerValue.length <= 0) errorTexts.push('此题必答')
    if (quAttr.hasOwnProperty('inputAttr')) {
      const inputAttr = quAttr.inputAttr
      validateAnswerInput(question, inputAttr, errorTexts, answerValue)
      if (errorTexts.length>0) {
        validateObj.errorText = errorTexts.join('，')
        validateObj.isOk = false
      }
    }
  }
  question.validateObj = validateObj
}

function validateAnswerInput (question, inputAttr, errorTexts, answerValue) {
  if (inputAttr.hasOwnProperty('commonAttr')) {
    const commonAttr = inputAttr.commonAttr
    if (commonAttr.hasOwnProperty('isRequired') && commonAttr.isRequired===1 && (answerValue===undefined || answerValue===null || answerValue.length<=0)) {
      errorTexts.push('此项必答')
      question.showOptionError = true // 只有在必答的情况下才会强制提醒，会覆盖前面的配置，这样就不管是不是首次填写，只要选择了如果是必填就提醒，此方法内优先级最高，
    }
    if ((answerValue!==undefined && answerValue!==null && answerValue.length>0 && commonAttr.hasOwnProperty('checkType')) || commonAttr.hasOwnProperty('isRequired') && commonAttr.isRequired===1) {
      // 必先内容不为空，才进行类型检查，或者必填把规则带出来
      question.showOptionError = true // 如果填了，不管是不是必答都提醒，只要格式不正确都提醒，此方法内优先级最高
      const checkType = commonAttr.checkType
      if (checkType!==null) {
        const checkValueResult = dwCheckValue(checkType, answerValue, null)
        if (checkType === 'DATE') checkValueResult.isOK = true
        if (!checkValueResult.isOK) errorTexts.push(checkValueResult.msg)
      }
      // 公共验证
      if (checkType==='NO' || checkType==='EMAIL' || checkType==='URL' || checkType==='UNSTRCN' || checkType==='STRCN') {
        const answerValueSize = answerValue.length
        if (commonAttr.hasOwnProperty('minlength')) {
          const minlength = commonAttr.minlength
          if (answerValueSize<minlength) errorTexts.push('最少输入'+minlength+'字')
        }
        if (commonAttr.hasOwnProperty('maxlength')) {
          const maxlength = commonAttr.maxlength
          if (answerValueSize>maxlength) errorTexts.push('最多输入'+maxlength+'字')
        }
      } else if (checkType==='NUM' || checkType==='DIGITS') {
        // :min="inputAttr.numAttr.min>0?inputAttr.numAttr.min:undefined" :max="inputAttr.numAttr.max>0?inputAttr.numAttr.max:undefined"
        const numAttr = inputAttr.numAttr
        const answerValueNum = parseFloat(answerValue)
        if (numAttr.hasOwnProperty('min')) {
          const min = numAttr.min
          if (min!==null && min>0 && answerValueNum<min) {
            errorTexts.push('最小值不小于'+min)
          }
        }
        if (numAttr.hasOwnProperty('max')) {
          const max = numAttr.max
          if (max!==null && max>0 && answerValueNum>max) {
            errorTexts.push('最大值不大于'+max)
          }
        }
      }
    }
  }
}
/**
 * 多项填空题验证
 * @param question
 */
function validateQuMultiFillblanks (question) {
  const quOptions = question.quMultiFillblanks
  const validateObj = question.validateObj
  let answerSize = 0
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anMFbks')) answerSize = question.anQuestion.anMFbks.length
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<quOptions.length) {
    validateObj.errorText = '此题必答'
    validateObj.isOk = false
  }
  question.validateObj = validateObj
}

/**
 * 评分题验证
 * @param question
 */
function validateQuScores (question) {
  const quScores = question.quScores
  const validateObj = question.validateObj
  let answerSize = 0
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anScores')) answerSize = question.anQuestion.anScores.length
  console.debug('quScores.answerSize', answerSize)
  console.debug('quScores.length', quScores.length)
  console.debug('question.anQuestion', question.anQuestion)
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<quScores.length) {
    validateObj.errorText = '此题必答'
    validateObj.isOk = false
  }
  question.validateObj = validateObj
}

/**
 * 上传文件题验证
 * @param question
 */
function validateQuUploadFile (question) {
  const validateObj = question.validateObj
  let answerSize = 0
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anUploadFiles')) answerSize = question.anQuestion.anUploadFiles.length
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<=0) {
    validateObj.errorText = '此题必答'
    validateObj.isOk = false
  }
  question.validateObj = validateObj
}
