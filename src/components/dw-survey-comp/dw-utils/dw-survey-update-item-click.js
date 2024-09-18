/**
 * 设置某个组件内ItemClick状态
 * @param survey
 * @param itemIndex
 * @param callback
 */
export function clickItem (survey, itemIndex, callback) {
  clickQuItem(survey, itemIndex, null, callback)
}

/**
 * 设置题目组件内ItemClick状态，一般通过子组件来调用
 * @param survey
 * @param itemIndex
 * @param quIndex
 * @param callback
 */
export function clickQuItem (survey, itemIndex, quIndex, callback) {
  /*
  // 组件内抽取的原代表片段
  if (this.itemIndex === 0) {
    this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
  }
  this.survey.curEditObj[this.itemIndex].itemClick = true
  this.survey.questions[this.index].itemIndex = this.itemIndex
  */
  /*
  if (itemIndex === 0) {
    itemIndex = survey.curEditObj.push({itemClick: true})-1
  }
  survey.curEditObj[itemIndex].itemClick = true
  if (quIndex !== null) survey.questions[quIndex].itemIndex = itemIndex
  callback(survey, itemIndex)
  */
}

/**
 * 重置所有组件的itemClick状态
 * @param survey
 * @param itemClicks 需要点亮的itemClick下标数组
 * @param callback
 */
export function upAllItemClick (survey, itemClicks, callback) {
  /*
  // 组件内抽取的原代表片段
  const curObjs = this.survey.curEditObj
  for (let i = 0; i < curObjs.length; i++) this.survey.curEditObj[i].itemClick = false
  if (itemClicks !== null) for (let j = 0; j < itemClicks.length; j++) this.survey.curEditObj[itemClicks[j]].itemClick = true
  */
  /*
  const curObjs = survey.curEditObj
  for (let i = 0; i < curObjs.length; i++) survey.curEditObj[i].itemClick = false
  if (itemClicks !== null) for (let j = 0; j < itemClicks.length; j++) survey.curEditObj[itemClicks[j]].itemClick = true
  callback(survey)*/
}

export function resetOtherClickItem (survey, quIndex) {
  const questions = survey.questions
  for (let i = 0; i < questions.length; i++) {
    if (survey.questions[i].quFocusObj.quFocus && quIndex!==i) {
      survey.questions[i].quFocusObj.quFocus = false
      survey.questions[i].quFocusObj.quSetShow = false
      survey.questions[i].quFocusObj.quLogicShow = false
      survey.questions[i].quFocusObj.quMoreOptionShow = false
      survey.questions[i].quFocusObj.quMoreOptionShowEdit = false
      survey.questions[i].quFocusObj.quScorePopoverShow = false
      survey.questions[i].quFocusObj.quScaleTextPopoverShow = false
      survey.questions[i].quFocusObj.quMoreOptionColShow = false
    }
  }
  survey.surveyFocusObj = {
    rightFocusTab: 'surveySet',
    focusQuIndex: null
  }
}
