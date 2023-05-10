/**
 * 解析原始survey，使之能符合前端设计器相关规则
 * @param survey
 */
export function parseSurvey (survey) {
  /* survey: {
    // font-size: 22px;font-weight: bold;
    surveyNameObj: {dwHtml: '<h1>Hello DWSurvey</h1>', dwText: 'Hello DWSurvey'},
    surveyDetail: {
      surveyNodeObj: {dwHtml: '<div>非常感谢您的参与！如有涉及个人信息，我们将严格保密。</div>', dwText: '非常感谢您的参与！如有涉及个人信息，我们将严格保密。'}
    },
    questions: [
      {quTitleObj: {dwHtml: '<p>aaaa</p>', dwText: 'aaaa'}, quType: 'CHECKBOX', quCheckboxs: [{id: '1', optionTitleObj: {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj:  {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj:  {dwHtml: '<p>cc</p>', dwText: 'aaaa'}, itemClick: false}]},
      {quTitleObj: {dwHtml: '<p>abcd</p>', dwText: 'abcd'}, quType: 'RADIO', quRadios: [{id: '1', optionTitleObj:  {dwHtml: '<p>bb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj:  {dwHtml: '<p>bbb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj:  {dwHtml: '<p>ddd</p>', dwText: 'aaaa'}, itemClick: false}]},
      {quTitleObj: {dwHtml: '<p>abcd</p>', dwText: 'abcd'}, quType: 'RADIO', quRadios: [{id: '1', optionTitleObj:  {dwHtml: '<p>bb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj:  {dwHtml: '<p>bbb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj:  {dwHtml: '<p>ddd</p>', dwText: 'aaaa'}, itemClick: false}]}
    ],
      surveyTest: '',
      curEditObj: [{itemClick: false}]
  } */
  if (survey !== null) {
    survey.surveyNameObj = {dwHtml: survey.surveyName, dwText: survey.surveyNameText, dwPlaceholder: '请输入问卷标题'}
    const surveyDetail = survey.surveyDetail
    if (surveyDetail !== null) {
      const surveyNoteText = surveyDetail.surveyNoteText !== null ? surveyDetail.surveyNoteText : ''
      // surveyDetail.surveyNodeObj = {dwHtml: surveyDetail.surveyNote, dwText: surveyNoteText}
      survey.surveyDetail.surveyNodeObj = {dwHtml: surveyDetail.surveyNote, dwText: surveyNoteText, dwPlaceholder: '请输入问卷介绍'}
    }
    parseQuestion(survey.questions)
    survey.surveyTest = ''
    survey.curEditObj = [{itemClick: false}]
  }
  return survey
}

/**
 * 解析题目
 * @param questions
 */
function parseQuestion (questions) {
  if (questions !== null && questions.length > 0) {
    // 循环然后定义以上内容
    questions.forEach((question, quIndex) => {
      const quName = question.quName !== null ? question.quName : question.quTitle
      question.quTitleObj = {dwHtml: question.quTitle, dwText: quName, dwPlaceholder: '请输入题目标题'}
      const quNote = question.quNote
      question.quNoteObj = {dwHtml: quNote, dwText: quNote, dwPlaceholder: '请输入题目备注'}
      const quType = question.quType
      if (quType === 'RADIO') {
        parseQuRadio(question)
      } else if (quType === 'CHECKBOX') {
        parseQuCheckbox(question)
      } else if (quType === 'ORDERQU') {
        parseQuOrderbys(question)
      } else if (quType === 'MULTIFILLBLANK') {
        parseQuMultiFillblanks(question)
      } else if (quType === 'SCORE') {
        parseQuScores(question)
      } else if (quType === 'FILLBLANK') {
        parseQuFbk(question)
      }
    })
  }
}

/**
 * 解析单选题
 * @param question
 */
function parseQuRadio (question) {
  question.quTypeName = '单选题'
  parseQuOptionType1(question.quRadios)
}

/**
 * 解析多选题
 * @param question
 */
function parseQuCheckbox (question) {
  question.quTypeName = '多选题'
  parseQuOptionType1(question.quCheckboxs)
}

/**
 * 解析排序题
 * @param question
 */
function parseQuOrderbys (question) {
  question.quTypeName = '排序题'
  parseQuOptionType1(question.quOrderbys)
}

/**
 * 解析多项填空题
 * @param question
 */
function parseQuMultiFillblanks (question) {
  question.quTypeName = '多项填空题'
  parseQuOptionType1(question.quMultiFillblanks)
}

/**
 * 解析评分题
 * @param question
 */
function parseQuScores (question) {
  question.quTypeName = '评分题'
  parseQuOptionType1(question.quScores)
}

/**
 * 解析填空题
 * @param question
 */
function parseQuFbk (question) {
  question.quTypeName = '填空题'
}

/**
 * 用于解析单选、多选、排序、多项填空题的选项
 * @param quOptions
 */
function parseQuOptionType1 (quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      const optionTitle = quOption.optionTitle !== null ? quOption.optionTitle : quOption.optionName
      // oss版本把html保存在 optionTitle
      const optionName = quOption.optionName !== null ? quOption.optionName : optionTitle
      quOption.optionTitleObj = {dwHtml: optionName, dwText: optionTitle, dwPlaceholder: '请输入选项内容'}
    })
  }
}

// 如果SurveyJson没有，则从结构化的数据中取问卷数据。
// 编辑的时候只保存JSON结构副本，直到发布好一步才生成结构化数据。
// 发布时保存的方案，结构化数据提交到数据库，如果有ID则更新对应的数据，如果没有ID，则新增，同时把最新的结构化数据返回。
// 对于新增在保存的时候需要进行生复判断，防止生成重复数据。
// 对于已经删除的数据，如果同步呢，删除的时候真删除，直接调用后台删除功能。

/*
      <div>{{ item.optionTitleObj.dwText }}</div>
          <el-tooltip class="item" effect="dark" content="排序选项" placement="top">
            <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQuOption dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i></div>
          </el-tooltip>
 */
