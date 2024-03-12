import {dwCheckValue} from './dw-common/dw-common-1'
import {getQuestionAnswerData} from "./dw-survey-answer";

/**
 * 一组题，答卷表单验证，返回是否成功
 * @param questions
 * @returns {boolean}
 */
export function validateQuestionsBool (questions) {
  let isSuccess = true
  validateQuestions(questions)
  questions.forEach((question, quIndex) => {
    if (!question.validateObj.isOk) {
      isSuccess = false
      return false
    }
  })
  return isSuccess
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
    if (question.showQu) {
      question.validateObj = {errorText: '此题必答', isOk: true}
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
    }
  }
  return question
}

/**
 * 单选题验证
 * @param question
 */
function validateQuRadio (question) {
  let answerSize = 0
  getQuestionAnswerData(question)
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anRadio')) {
    answerSize = question.anQuestion.anRadio.length
  }
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<=0) {
    question.validateObj.errorText = '此题必答'
    question.validateObj.isOk = false
  }
}

/**
 * 多选题验证
 * @param question
 */
function validateCheckbox (question) {
  const validateObj = question.validateObj
  let answerSize = 0
  if (question.hasOwnProperty('anQuestion') && question.anQuestion.hasOwnProperty('anCheckboxs')) answerSize = question.anQuestion.anCheckboxs.length
  if (question.hasOwnProperty('isRequired') && question.isRequired===1 && answerSize<=0) {
    validateObj.errorText = '此题必答'
    validateObj.isOk = false
  }
  if (validateObj.isOk) {
    if (question.hasOwnProperty('minLimit')) {
      const minLimit = question.minLimit
      if (minLimit!=null && minLimit>0 && answerSize<minLimit) {
        validateObj.errorText = '至少需要选择'+minLimit+'个选项'
        validateObj.isOk = false
      }
    }
    if (question.hasOwnProperty('maxLimit')) {
      const maxLimit = question.maxLimit
      if (maxLimit!=null && maxLimit>0 && answerSize>=maxLimit) {
        // 其它设置成不可用
      }
    }
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
  const errotTexts = []
  if (answerValue===null || answerValue===undefined) answerValue = ''
  if (question.hasOwnProperty('quAttr')) {
    const quAttr = question.quAttr
    if (quAttr.hasOwnProperty('isRequired') && quAttr.isRequired && answerValue.length <= 0) errotTexts.push('此题必答')
    if (quAttr.hasOwnProperty('inputAttr')) {
      const inputAttr = quAttr.inputAttr
      if (inputAttr.hasOwnProperty('commonAttr')) {
        const commonAttr = inputAttr.commonAttr
        if (commonAttr.hasOwnProperty('checkType')) {
          const checkType = commonAttr.checkType
          if (checkType!==null) {
            const checkValueResult = dwCheckValue(checkType, answerValue, null)
            if (!checkValueResult.isOK) errotTexts.push(checkValueResult.msg)
          }
          // 公共验证
          if (checkType==='NO' || checkType==='EMAIL' || checkType==='URL' || checkType==='UNSTRCN' || checkType==='STRCN') {
            const answerValueSize = answerValue.length
            if (commonAttr.hasOwnProperty('minlength')) {
              const minlength = commonAttr.minlength
              if (answerValueSize<minlength) errotTexts.push('最少输入'+minlength+'字')
            }
            if (commonAttr.hasOwnProperty('maxlength')) {
              const maxlength = commonAttr.maxlength
              if (answerValueSize>maxlength) errotTexts.push('最多输入'+maxlength+'字')
            }
          }
        }
      }
      if (errotTexts.length>0) {
        validateObj.errorText = errotTexts.join('，')
        validateObj.isOk = false
      }
    }
  }
  question.validateObj = validateObj
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
