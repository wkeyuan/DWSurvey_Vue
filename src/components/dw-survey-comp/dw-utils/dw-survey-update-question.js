import {v4 as uuidv4} from 'uuid'
import {parseQuestion} from './dw-survey-parse'

export function dwSurveyQuAddMatrixColOption (survey, index, quOption) {
  const quType = survey.questions[index].quType
  if (quType === 'MATRIX_RADIO') {
    const quOptions = survey.questions[index].quCols
    quOptions.push(quOption)
  } else if (quType === 'MATRIX_CHECKBOX') {
    const quOptions = survey.questions[index].quCols
    quOptions.push(quOption)
  } else if (quType === 'MATRIX_INPUT') {
    const quOptions = survey.questions[index].quCols
    quOptions.push(quOption)
  }
  return survey
}
export function dwSurveyQuAddOption (survey, index, quOption) {
  /*
  // 从组件中抽取的原代码片段备注
  const quType = this.survey.questions[this.index].quType
  // const quOption = {id: null, optionTitleObj: {dwHtml: '', dwText: '', dwPlaceholder: '请输入内容'}, itemClick: false}
  if (quType === 'RADIO') {
    const quOptions = this.survey.questions[this.index].quRadios
    quOptions.push(quOption)
    this.survey.questions[this.index].quRadios = quOptions
  } else if (quType === 'CHECKBOX') {
    const quOptions = this.survey.questions[this.index].quCheckboxs
    quOptions.push(quOption)
    this.survey.questions[this.index].quCheckboxs = quOptions
  }
  console.debug('question', this.survey.questions[this.index])
  */
  const quType = survey.questions[index].quType
  // const quOption = {id: null, optionTitleObj: {dwHtml: '', dwText: '', dwPlaceholder: '请输入内容'}, itemClick: false}
  if (quType === 'RADIO') {
    const quOptions = survey.questions[index].quRadios
    quOptions.push(quOption)
    survey.questions[index].quRadios = quOptions
  } else if (quType === 'CHECKBOX') {
    const quOptions = survey.questions[index].quCheckboxs
    quOptions.push(quOption)
    survey.questions[index].quCheckboxs = quOptions
  } else if (quType === 'SCORE') {
    const quOptions = survey.questions[index].quScores
    quOptions.push(quOption)
    survey.questions[index].quScores = quOptions
  } else if (quType === 'ORDERQU') {
    const quOptions = survey.questions[index].quOrderbys
    quOptions.push(quOption)
    survey.questions[index].quOrderbys = quOptions
  } else if (quType === 'MULTIFILLBLANK') {
    const quOptions = survey.questions[index].quMultiFillblanks
    quOptions.push(quOption)
    survey.questions[index].quMultiFillblanks = quOptions
  } else if (quType === 'MATRIX_RADIO') {
    const quOptions = survey.questions[index].quRows
    quOptions.push(quOption)
  } else if (quType === 'MATRIX_CHECKBOX') {
    const quOptions = survey.questions[index].quRows
    quOptions.push(quOption)
  } else if (quType === 'MATRIX_INPUT') {
    const quOptions = survey.questions[index].quRows
    quOptions.push(quOption)
  } else if (quType === 'MATRIX_SCALE' || quType === 'MATRIX_SLIDER') {
    const quOptions = survey.questions[index].quRows
    if (quType==='MATRIX_SCALE' || quType === 'MATRIX_SLIDER') {
      quOption.lr = {
        left: {optionTitleObj: {dwHtml: `极不可能`, dwText: `不可能`, dwPlaceholder: '请输入选项内容'}},
        right: {optionTitleObj: {dwHtml: `极有可能`, dwText: `极有可能`, dwPlaceholder: '请输入选项内容'}}
      }
    }
    quOptions.push(quOption)
  }
  // console.debug('question', survey.questions[index])
  parseQuestion(survey.questions[index], true)
  return survey
}

/**
 * 重置对应题目选项，一般用于清空选项重新设置时。
 * @param survey
 * @param index
 * @param callback
 */
export function dwResetQuOptions (survey, index, callback) {
  // 进行重置
  const quType = survey.questions[index].quType
  if (quType === 'RADIO') survey.questions[index].quRadios = []
  else if (quType === 'CHECKBOX') survey.questions[index].quCheckboxs = []
  else if (quType === 'SCORE') survey.questions[index].quOrderbys = []
  callback(survey)
}

/**
 * 将对应的题目选项转换成回车分隔的纯文本，对于可能有html标签的题目选项不合适。
 * @param survey
 * @param index
 * @returns {string}
 */
export function dwOption2Texts (survey, index) {
  const quType = survey.questions[index].quType
  let quOptions = []
  if (quType === 'RADIO') quOptions = survey.questions[index].quRadios
  else if (quType === 'CHECKBOX') quOptions = survey.questions[index].quCheckboxs
  let optionText = ''
  quOptions.forEach((item, index) => {
    optionText += item.optionTitleObj.dwText + '\r\n'
  })
  return optionText
}

/**
 * 刷新question刷新状态
 * @param question
 * @param callback
 */
export function dwResetQuestionRefreshValue (question) {
  // 进行重置
  question.quTitleObj.isRefreshValue = true
  question.quNoteObj.isRefreshValue = true
  if (!question.hasOwnProperty('dwId')) question.dwId = uuidv4()
  const quType = question.quType
  if (quType === 'RADIO') {
    question.quRadios.forEach((item, index) => {
      item.optionTitleObj.isRefreshValue = true
      return item
    })
  } else if (quType === 'CHECKBOX') {
    question.quCheckboxs.forEach((item, index) => {
      item.optionTitleObj.isRefreshValue = true
      return item
    })
  } else if (quType === 'SCORE') {
    question.quScores.forEach((item, index) => {
      item.optionTitleObj.isRefreshValue = true
      return item
    })
  } else if (quType === 'ORDERQU') {
    question.quOrderbys.forEach((item, index) => {
      item.optionTitleObj.isRefreshValue = true
      return item
    })
  }
  return question
}

/**
 * 刷新所有question
 * @param survey
 * @returns {*}
 */
export function dwResetSurveyQuestionRefreshValue (survey) {
  // 进行重置
  const questions = survey.questions
  questions.forEach((item, index) => {
    return dwResetQuestionRefreshValue(item)
  })
  survey.questions = questions
  return survey
}
