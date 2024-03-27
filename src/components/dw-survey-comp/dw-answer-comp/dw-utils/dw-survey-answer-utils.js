import {
  buildSurveyLocalStorageKey,
  getLocalStorageByKey, saveJsonObj2LocalStorage
} from '../../dw-utils/dw-common/dw-common-0'
import {answerSurveyProgress} from "./dw-survey-answer-progress";

export const surveyLocalStorageKeyType = {INIT: 'survey_init', AN_HISTORY: 'survey_answer_history', AN_HISTORY_ACTION: 'survey_answer_history_action'}

export const surveyInitLocalStorage = {
  saveSurvey2LocalStorage (survey) {
    if (survey!==null) {
      const sid = survey.sid
      const answerId = getEsId(survey)
      this.saveSurvey2LocalStorageByParams(sid, answerId, survey)
    }
  },
  saveSurvey2LocalStorageByParams (sid, answerId, survey) {
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.INIT}${getAnswerId(answerId)}`)
    saveJsonObj2LocalStorage(storageKey, survey)
    console.debug('storageKey', storageKey)
  },
  getSurveyByLocalStorage (sid, answerId) {
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.INIT}${getAnswerId(answerId)}`)
    console.debug('storageKey', storageKey)
    const surveyJsonText = getLocalStorageByKey(storageKey)
    const surveyJsonObj = JSON.parse(surveyJsonText)
    console.debug('surveyJsonObj', surveyJsonObj)
    return surveyJsonObj
  }
}

export const surveyAnswerLocalStorage = {
  saveSurveyAnswer2LocalStorage (survey) {
    // const sid = survey.sid
    if (survey!==null) {
      const sid = survey.sid
      const answerId = getEsId(survey)
      this.saveSurveyAnswer2LocalStorageByParams(sid, answerId, survey)
    }
  },
  saveSurveyAnswer2LocalStorageByParams (sid, answerId, survey) {
    // const sid = survey.sid
    // 进行进度计算
    answerSurveyProgress(survey)
    // 本地存储
    const actionNum = parseInt(this.getSurveyAnswerActionNum(sid, answerId))+1
    const historySurveyText = this.getSurveyAnswerTextByLocalStorage(sid, answerId)
    if (JSON.stringify(survey)!==historySurveyText) {
      const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY}${getAnswerId(answerId)}_${actionNum}`)
      saveJsonObj2LocalStorage(storageKey, survey)
      this.saveSurveyAnswerActionNum(sid, answerId, actionNum)
      console.debug('storageKey', storageKey)
      // 防止历史数据过多进行定量清理
      if (actionNum>=100) this.deleteAnswerHistoryLtNum(sid, answerId, actionNum-100)
    }
  },
  getSurveyAnswerTextByLocalStorage (sid, answerId, actionNum=null) {
    if (actionNum===undefined || actionNum===null) actionNum = this.getSurveyAnswerActionNum(sid, answerId)
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY}${getAnswerId(answerId)}_${actionNum}`)
    console.debug('storageKey', storageKey)
    const surveyJsonText = getLocalStorageByKey(storageKey)
    console.debug('surveyJsonText', surveyJsonText)
    return surveyJsonText
  },
  getSurveyAnswerObjByLocalStorage (sid, answerId, actionNum=null) {
    const surveyJsonObj = JSON.parse(this.getSurveyAnswerTextByLocalStorage(sid, answerId, actionNum))
    console.debug('surveyJsonObj', surveyJsonObj)
    return surveyJsonObj
  },
  saveSurveyAnswerActionNum (sid, answerId, num) {
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY_ACTION}${getAnswerId(answerId)}`)
    const dateTime = (new Date()).getTime()
    return saveJsonObj2LocalStorage(storageKey, {num, dateTime})
  },
  getSurveyAnswerActionNum (sid, answerId) {
    const historyAction = this.getSurveyAnswerAction(sid, answerId)
    if (historyAction!==null && historyAction.hasOwnProperty('num')) {
      return historyAction.num
    }
    return 0
  },
  getSurveyAnswerActionTime (survey) {
    if (survey!==null) {
      const sid = survey.sid
      const answerId = getEsId(survey)
      return this.getSurveyAnswerActionTimeBySid(sid, answerId)
    }
    return 0
  },
  getSurveyAnswerActionTimeBySid (sid, answerId) {
    const historyAction = this.getSurveyAnswerAction(sid, answerId)
    if (historyAction!==null && historyAction.hasOwnProperty('dateTime')) {
      return historyAction.dateTime
    }
    return 0
  },
  getSurveyAnswerAction (sid, answerId) {
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY_ACTION}${getAnswerId(answerId)}`)
    if (localStorage.hasOwnProperty(storageKey)) {
      const historyActionText = getLocalStorageByKey(storageKey)
      if (historyActionText!==null) {
        return JSON.parse(historyActionText)
      }
    }
    return null
  },
  deleteAnswerHistoryLtNum (sid, answerId, actionNum) {
    for (let i=1; i<actionNum; i++) {
      const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY}${getAnswerId(answerId)}_${i}`)
      localStorage.removeItem(storageKey)
    }
  },
  clearAnswerHistory (sid, answerId) {
    // const storageKey1 = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.INIT}${getAnswerId(answerId)}`)
    const storageKey2 = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY_ACTION}${getAnswerId(answerId)}`)
    const storageKey3 = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.AN_HISTORY}${getAnswerId(answerId)}`)
    const localStorageSize = localStorage.length
    const keys = []
    for (let i=0; i<localStorageSize; i++) {
      const key = localStorage.key(i)
      if (key!=null) if (key.indexOf(storageKey2)>=0 || key.indexOf(storageKey3)>=0) keys.push(key)
    }
    for (let i=0; i<keys.length; i++) localStorage.removeItem(keys[i])
  }
}

export const surveyAnswerResultLocalStorage = {
  saveSurvey2LocalStorage (sid, answerId, survey) {
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.INIT}${getAnswerId(answerId)}`)
    saveJsonObj2LocalStorage(storageKey, survey)
    console.debug('storageKey', storageKey)
  },
  getSurveyByLocalStorage (sid, answerId) {
    const storageKey = buildSurveyLocalStorageKey(sid, `${surveyLocalStorageKeyType.INIT}${getAnswerId(answerId)}`)
    console.debug('storageKey', storageKey)
    const surveyJsonText = getLocalStorageByKey(storageKey)
    const surveyJsonObj = JSON.parse(surveyJsonText)
    console.debug('surveyJsonObj', surveyJsonObj)
    return surveyJsonObj
  }
}

function getAnswerId (answerId) {
  if (answerId===undefined || answerId===null) return ''
  return '_'+answerId
}

export function getEsId (survey) {
  if (survey.hasOwnProperty('dwEsSurveyAnswer') && survey.dwEsSurveyAnswer.hasOwnProperty('esId')) {
    return survey.dwEsSurveyAnswer.esId
  }
  return null
}
