import {clearQuestionAnswerData} from "./dw-survey-answer-clear";

/**
 * 逻辑初始化
 * @param survey
 */
export function dwSurveyAnswerLogicLoad (survey) {
  const questions = survey.questions
  if (questions !== undefined) {
    questions.map((item, index) => {
      dwSurveyAnswerLogic(survey, index)
    })
  }
}

/**
 * 逻辑检查入口
 * @param survey
 * @param quIndex
 */
export function dwSurveyAnswerLogic (survey, quIndex) {
  const questions = survey.questions
  if (!survey.hasOwnProperty('surveyLogicControl')) {
    survey.surveyLogicControl = {hideQus: []} // hideQus 所有要逻辑隐藏题目信息
  }
  if (questions !== undefined) {
    questionLogicData(survey, questions[quIndex])
    // questions.map((item, index) => {})
  }
  surveyLogicControlExe(survey)
  // 对于隐藏的题目需要先清除答卷数据，然后触发这题的逻辑事件递归执行
}

/**
 * 执行logic检查工作，把触发显示与隐藏的逻辑题标记出来
 * 弄一个总的逻辑控制器对象，里面分别存放逻辑隐藏的题目标记，不在里面的就不用考虑。
 * 题目显示的时候就根据这个控制对象里去判断，判断是否存在标记，有标记就隐藏起来。
 * @param survey
 * @param question
 */
function questionLogicData (survey, question) {
  const quType = question.quType
  const questionLogics = question.questionLogics
  questionLogics.forEach((logicItem, index) => {
    const logicType = logicItem.logicType
    const logicDwId = logicItem.dwId
    const cgQuItemId = logicItem.cgQuItemId
    const skQuId = logicItem.skQuId
    if (question.hasOwnProperty('anQuestion') && question.anQuestion!==undefined) {
      if (quType === 'RADIO') {
        quRadioAnLogics(survey, question, logicItem)
      } else if (quType === 'CHECKBOX') {
        quCheckboxAnLogics(survey, question, logicItem)
      } else if (quType === 'ORDERQU') {
        quOrderAnLogics(survey, question, logicItem)
      } else if (quType === 'MULTIFILLBLANK') {
        quMFbkAnLogics(survey, question, logicItem)
      } else if (quType === 'SCORE') {
        quScoreAnLogics(survey, question, logicItem)
      } else if (quType === 'FILLBLANK') {
        quFbkAnLogics(survey, question, logicItem)
      } else if (quType === 'UPLOADFILE') {
        quUploadAnLogics(survey, question, logicItem)
      }
    } else {
      // 本题没有触发任何选项，被题目触发的逻辑也要清除，目前只有选择答案才有可能触发某个逻辑
      removeNoActionLogic(logicItem)
    }
  })

  function quRadioAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    if (anQuestion.hasOwnProperty('anRadio') && anQuestion.anRadio.hasOwnProperty('optionDwId') && cgQuItemId.includes(anQuestion.anRadio.optionDwId)) {
      // 有回答
      addLogicGoOrShow2Control(survey, question, logicItem)
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  function quCheckboxAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    if (anQuestion.hasOwnProperty('anCheckboxs') && anQuestion.anCheckboxs!=null && anQuestion.anCheckboxs.length>0) {
      // 有回答
      const anCheckboxs = anQuestion.anCheckboxs
      let logicIsOk = false // 是否触发
      anCheckboxs.forEach((anCheckbox, anQuestionIndex) => {
        if (anCheckbox.hasOwnProperty('optionDwId') && cgQuItemId.includes(anCheckbox.optionDwId)) {
          // const optionDwId = anCheckbox.optionDwId
          // console.debug('optionDwId', optionDwId)
          logicIsOk = true
        }
      })
      if (logicIsOk) {
        addLogicGoOrShow2Control(survey, question, logicItem)
      } else {
        removeNoActionLogic(logicItem)
      }
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  function quOrderAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    if (anQuestion.hasOwnProperty('anOrders') && anQuestion.anOrders!=null && anQuestion.anOrders.length>0) {
      // 有回答
      const anOrders = anQuestion.anOrders
      let logicIsOk = false // 是否触发
      anOrders.forEach((anOrder, anQuestionIndex) => {
        if (anOrder.hasOwnProperty('optionDwId') && cgQuItemId.includes(anOrder.optionDwId)) {
          const optionDwId = anOrder.optionDwId
          const orderNum = anOrder.orderNum
          const logicGeLe = logicItem.geLe
          const logicScoreNum = logicItem.scoreNum
          if (logicGeLe==='LTE' && orderNum >= logicScoreNum) {
            // 小于等于
            logicIsOk = true
          } else if (logicGeLe==='GTE' && orderNum <= logicScoreNum) {
            // 大于等于
            logicIsOk = true
          } else if (logicGeLe==='LT' && orderNum > logicScoreNum) {
            // 小于
            logicIsOk = true
          } else if (logicGeLe==='GT' && orderNum < logicScoreNum) {
            // 大于
            logicIsOk = true
          }
        }
      })
      if (logicIsOk) {
        addLogicGoOrShow2Control(survey, question, logicItem)
      } else {
        removeNoActionLogic(logicItem)
      }
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  function quScoreAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    if (anQuestion.hasOwnProperty('anScores') && anQuestion.anScores!=null && anQuestion.anScores.length>0) {
      // 有回答
      const anOptions = anQuestion.anScores
      let logicIsOk = false // 是否触发
      anOptions.forEach((anOption, anQuestionIndex) => {
        if (anOption.hasOwnProperty('optionDwId') && cgQuItemId.includes(anOption.optionDwId)) {
          const optionDwId = anOption.optionDwId
          const answerNum = anOption.answerScore
          const logicGeLe = logicItem.geLe
          const logicScoreNum = logicItem.scoreNum
          if (logicGeLe==='LTE' && answerNum <= logicScoreNum) {
            // 小于等于
            logicIsOk = true
          } else if (logicGeLe==='GTE' && answerNum >= logicScoreNum) {
            // 大于等于
            logicIsOk = true
          } else if (logicGeLe==='LT' && answerNum < logicScoreNum) {
            // 小于
            logicIsOk = true
          } else if (logicGeLe==='GT' && answerNum > logicScoreNum) {
            // 大于
            logicIsOk = true
          }
        }
      })
      if (logicIsOk) {
        addLogicGoOrShow2Control(survey, question, logicItem)
      } else {
        removeNoActionLogic(logicItem)
      }
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  function quMFbkAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    if (anQuestion.hasOwnProperty('anMFbks') && anQuestion.anMFbks!=null && anQuestion.anMFbks.length>0) {
      // 有回答
      const anMFbks = anQuestion.anMFbks
      let logicIsOk = false // 是否触发
      anMFbks.forEach((anMFbk, anQuestionIndex) => {
        if (anMFbk.hasOwnProperty('optionDwId') && cgQuItemId.includes(anMFbk.optionDwId)) {
          const optionDwId = anMFbk.optionDwId
          const answerValue = anMFbk.answer
          if (answerValue!==undefined && answerValue!==null && answerValue!=='') logicIsOk = true
        }
      })
      if (logicIsOk) {
        addLogicGoOrShow2Control(survey, question, logicItem)
      } else {
        removeNoActionLogic(logicItem)
      }
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  function quFbkAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    if (anQuestion.hasOwnProperty('anFbk') && anQuestion.anFbk.hasOwnProperty('answer') && anQuestion.anFbk.answer!==undefined && anQuestion.anFbk.answer!==null && anQuestion.anFbk.answer!=='') {
      // 有回答
      addLogicGoOrShow2Control(survey, question, logicItem)
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  function quUploadAnLogics (survey, question, logicItem) {
    const anQuestion = question.anQuestion
    const cgQuItemId = logicItem.cgQuItemId
    console.debug('anUploadFiles', anQuestion.anUploadFiles)
    if (anQuestion.hasOwnProperty('anUploadFiles') && anQuestion.anUploadFiles!=null && anQuestion.anUploadFiles.length>0) {
      // 有回答
      addLogicGoOrShow2Control(survey, question, logicItem)
    } else {
      // 未回答
      removeNoActionLogic(logicItem)
    }
  }

  /**
   * 选了选项中
   * @param survey
   * @param question
   * @param logicItem
   */
  function addLogicGoOrShow2Control (survey, question, logicItem) {
    const logicDwId = logicItem.dwId
    const logicType = logicItem.logicType
    const skQuId = logicItem.skQuId
    if (logicType === 'GO') {
      // 逻辑触发，加载到逻辑池
      // 跳题逻辑，找到所有要隐藏的quId
      // survey.surveyLogicQus.hideQus.push({idType: 'quId', id: skQuId, trigger: optionDwId})
      const curQuDwId = question.dwId
      const hideQuIds = getLogicGoHideQuId(survey, skQuId, curQuDwId)
      survey.surveyLogicControl.hideQus.push({idType: 'quId', hideQuDwId: hideQuIds, trigger: logicDwId})
    } else if (logicType === 'SHOW') {
      // 逻辑触发，显示逻辑，其中skQuId为数组，选中了则需要显示，移除对应逻辑控制
      // hideQuIds.push(skQuId[0])
      // survey.surveyLogicControl.hideQus.push({idType: 'quId', hideQuDwId: skQuId, trigger: logicDwId})
      const hideQus = survey.surveyLogicControl.hideQus
      survey.surveyLogicControl.hideQus = hideQus.filter(item => item.trigger !== logicDwId)
    }
  }

  /**
   * 未选选项时
   * @param logicItem
   */
  function removeNoActionLogic (logicItem) {
    const logicDwId = logicItem.dwId
    const logicType = logicItem.logicType
    const skQuId = logicItem.skQuId
    if (logicType === 'GO') {
      // 逻辑未触发，逻辑池移除
      const hideQus = survey.surveyLogicControl.hideQus
      survey.surveyLogicControl.hideQus = hideQus.filter(item => item.trigger !== logicDwId)
    } else if (logicType === 'SHOW') {
      // 显示逻辑，逻辑未选，加入逻辑池
      survey.surveyLogicControl.hideQus.push({idType: 'quId', hideQuDwId: skQuId, trigger: logicDwId})
    }
  }

  function getLogicGoHideQuId (survey, skQuId, curQuDwId) {
    const hideQuIds = []
    let isFindFirstQu = false
    const questions = survey.questions
    for (let i = 0; i < questions.length; i++) {
      const quDwId = questions[i].dwId
      if (quDwId === skQuId) {
        isFindFirstQu = false
        break
      }
      if (quDwId === curQuDwId) {
        isFindFirstQu = true
      } else if (isFindFirstQu) {
        hideQuIds.push(quDwId)
      }
    }
    return hideQuIds
  }
}

export function surveyLogicControlExe (survey) {
  const questions = survey.questions
  if (questions !== undefined) {
    questions.map((question, index) => {
      const isHide = quLogicIsHide(survey, question)
      if (!question.logicIsHide && isHide) {
        if (!survey.hasOwnProperty('firstLoadAnswer') || !survey.firstLoadAnswer) clearQuestionAnswerData(question)
        questionLogicData(survey, question)
      }
      question.logicIsHide = isHide
    })
  }
}

export function quLogicIsHide (survey, question) {
  // 计算题目最终逻辑表现
  let isHide = false // 表示显示
  if (survey.hasOwnProperty('surveyLogicControl')) {
    const surveyLogicControl = survey.surveyLogicControl
    if (surveyLogicControl.hasOwnProperty('hideQus')) {
      const hideQus = survey.surveyLogicControl.hideQus
      for (let i=0; i<hideQus.length; i++) {
        const hideQuItem = hideQus[i]
        const hideQuDwIds = hideQuItem.hideQuDwId
        if (hideQuDwIds.includes(question.dwId)) {
          isHide = true // 表示隐藏
          break
        }
      }
    }
  }
  return isHide
}
