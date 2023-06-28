import {v1 as uuidv1} from 'uuid'
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
    if (!survey.hasOwnProperty('surveyNameObj')) survey.surveyNameObj = {dwHtml: survey.surveyName, dwText: survey.surveyNameText, dwPlaceholder: '请输入问卷标题'}
    parseSurveyDetail(survey)
    parseQuestions(survey.questions, true)
    survey.surveyTest = ''
    survey.curEditObj = [{itemClick: false}]
    survey.surveyStyle = {themeColor: 'red'}
    survey.tempDataType = 'none'
    if (!survey.hasOwnProperty('dwId')) survey.dwId = uuidv1()
  }
  return survey
}

export function parseSurveyDetail (survey) {
  const surveyDetail = survey.surveyDetail
  if (surveyDetail !== null) {
    const surveyNoteText = surveyDetail.surveyNoteText !== null ? surveyDetail.surveyNoteText : ''
    // surveyDetail.surveyNodeObj = {dwHtml: surveyDetail.surveyNote, dwText: surveyNoteText}
    if (!survey.surveyDetail.hasOwnProperty('surveyNodeObj')) survey.surveyDetail.surveyNodeObj = {dwHtml: surveyDetail.surveyNote, dwText: surveyNoteText, dwPlaceholder: '请输入问卷介绍'}
  }
  survey.surveyDetail.effective_model = survey.surveyDetail.effective === 1
  survey.surveyDetail.effectiveIp_model = survey.surveyDetail.effectiveIp === 1
  survey.surveyDetail.refresh_model = survey.surveyDetail.refresh === 1
  survey.surveyDetail.rule_model = survey.surveyDetail.rule === 3
  survey.surveyDetail.ynEndNum_model = survey.surveyDetail.ynEndNum === 1
  survey.surveyDetail.endNum_model = survey.surveyDetail.endNum
  survey.surveyDetail.ynEndTime_model = survey.surveyDetail.ynEndTime === 1
  if (!survey.surveyDetail.hasOwnProperty('dwId')) survey.surveyDetail.dwId = uuidv1()
}
/**
 * 解析题目
 * @param noModel 非模型
 * @param questions
 */
export function parseQuestions (questions, noModel) {
  if (questions !== null && questions.length > 0) {
    // 循环然后定义以上内容
    questions.forEach((question, quIndex) => {
      parseQuestion(question, noModel)
    })
  }
  return questions
}

/**
 * 解析题目
 * @param question
 * @param noModel
 */
export function parseQuestion (question, noModel) {
  const quName = question.quName !== null ? question.quName : question.quTitle
  if (!question.hasOwnProperty('quTitleObj')) question.quTitleObj = {dwHtml: question.quTitle, dwText: quName, dwPlaceholder: '请输入题目标题'}
  const quNote = question.quNote
  if (!question.hasOwnProperty('quNoteObj')) question.quNoteObj = {dwHtml: quNote, dwText: quNote, dwPlaceholder: '请输入题目备注'}
  if (question.questionLogics===null) question.questionLogics = []
  if (noModel && !question.hasOwnProperty('dwId')) question.dwId = uuidv1()
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
  } else if (quType === 'UPLOADFILE') {
    parseQuUploadFile(question)
  } else if (quType === 'PAGETAG') {
    question.quTypeName = '分页组件'
  } else if (quType === 'PARAGRAPH') {
    question.quTypeName = '分段组件'
  }
  question.dateAttrs = []
  question.validateObj = {errorText: '', isOk: true}
}

export function initQuestionModels (questions) {
  if (questions !== null && questions.length > 0) {
    // 循环然后定义以上内容
    questions.map((question, quIndex) => {
      question.isRequired = 1
    })
  }
  return questions
}
/**
 * 解析单选题
 * @param question
 */
function parseQuRadio (question) {
  question.quTypeName = '单选题'
  if (question.cellCount === 0) question.cellCount = 2
  parseQuOptionType1(question, question.quRadios)
}

/**
 * 解析多选题
 * @param question
 */
function parseQuCheckbox (question) {
  question.quTypeName = '多选题'
  if (question.cellCount === 0) question.cellCount = 2
  parseQuOptionType1(question, question.quCheckboxs)
}

/**
 * 解析排序题
 * @param question
 */
function parseQuOrderbys (question) {
  question.quTypeName = '排序题'
  parseQuOptionType1(question, question.quOrderbys)
}

/**
 * 解析多项填空题
 * @param question
 */
function parseQuMultiFillblanks (question) {
  question.quTypeName = '多项填空题'
  parseQuOptionType1(question, question.quMultiFillblanks)
}

/**
 * 解析评分题
 * @param question
 */
function parseQuScores (question) {
  question.quTypeName = '评分题'
  parseQuOptionType1(question, question.quScores)
}

/**
 * 解析填空题
 * @param question
 */
function parseQuFbk (question) {
  question.quTypeName = '填空题'
  if (!question.hasOwnProperty('placeholder')) question.placeholder = '请输入'
  if (!question.hasOwnProperty('step')) question.step = '00:05'
}

function parseQuUploadFile (question) {
  question.quTypeName = '上传题'
  if (!question.hasOwnProperty('placeholder')) question.placeholder = '请输入'
  if (!question.hasOwnProperty('step')) question.step = '00:05'
}

/**
 * 用于解析单选、多选、排序、多项填空题的选项
 * @param question
 * @param quOptions
 */
function parseQuOptionType1 (question, quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      const optionTitle = quOption.optionTitle !== null ? quOption.optionTitle : quOption.optionName
      // oss版本把html保存在 optionTitle
      const optionName = quOption.optionName !== null ? quOption.optionName : optionTitle
      if (!quOption.hasOwnProperty('optionTitleObj')) quOption.optionTitleObj = {dwHtml: optionName, dwText: optionTitle, dwPlaceholder: '请输入选项内容'}
      if (!quOption.hasOwnProperty('dateAttrs')) quOption.dateAttrs = []
      if (!quOption.hasOwnProperty('checked')) quOption.checked = false
      if (!quOption.hasOwnProperty('orderIndex')) quOption.orderIndex = 0
      if (question.hasOwnProperty('dwId') && !quOption.hasOwnProperty('dwId')) quOption.dwId = uuidv1()
    })
  }
  // question.quOptions = quOptions // 暂时先不考虑这个方案，还是分别处理更清楚
}

export function resetQuestion (question) {
  question.dwId = uuidv1()
  const quType = question.quType
  if (quType === 'RADIO') {
    resetQuOptionType1(question, question.quRadios)
  } else if (quType === 'CHECKBOX') {
    resetQuOptionType1(question, question.quCheckboxs)
  } else if (quType === 'ORDERQU') {
    resetQuOptionType1(question, question.quOrderbys)
  } else if (quType === 'MULTIFILLBLANK') {
    resetQuOptionType1(question, question.quMultiFillblanks)
  } else if (quType === 'SCORE') {
    resetQuOptionType1(question, question.quScores)
  }
}

/**
 * 重置选项
 * @param question
 * @param quOptions
 */
function resetQuOptionType1 (question, quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      quOption.dwId = uuidv1()
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
/**
 * 1、编辑器工具栏通过布置并从后台返回工具信息 OK
 * 2.0、编辑器问卷基本属性配置 OK
 * 2.1、模板库通过后台返回 OK
 * 2.2、右边题库拖入效果优化 OK
 * 2.3、完善拖动的预览效果 OK
 * 2.4、拖动后index层改变的问题 OK
 * 2.5、编辑器加导航菜单 OK
 * 2.6、编辑器中逻辑配置 OK
 * 2.7、配置各题逻辑 OK
 * 2.8  保存编辑结果，并发布问卷 OK
 * 2.9（编辑时只保存JSON数据，发布时：根据之前的保存的JSON，进行结构化，实现与之前版本兼容(如果需求则进行转换)）
 * 2.10 编辑，答卷都使用最新的JSON数据直接展现。 OK
 * 2.11 简化JSON，编辑保存时对数据进行简化，去掉编辑中保留的一些辅助信息。如题目option选项，统一处理不再分到不同字段上面。如果是原始转化成最新的JSON，最新的也可以转化成原始的，实现双向转换 ？
 * 2.12 结构化数据只在统计页面使用。
 * 2.13 JSON数据中加一个新字段辅助UUID，在前端生成并用于数据KEY，跟后端数据ID不是同一个作用。（对JSON数据格式化的时候统一生成） OK
 * 2.14 完成答卷页面 OK
 * 2.15 答卷表单基本验证 OK
 * 2.17 需要考虑答卷页主题修改的便利性
 * 3、发布问卷并保存 OK
 * 4、回答问卷并保存答案 ?
 * 4.1、整合ES，并完成统计操作
 * 4.2、定义ES索引结构
 * 4.3、数据保存ID的处理，让ES自动生成ID。
 * 5、完善基础版本编辑器未完成的功能
 * 6、升级编辑器与企业版目前提供的功能同步
 * 修改数据结构，把QuOption合并到一起
 * 业务系统内dwId使用V4生成，es document使用自己生成的ID。
 * 如果更新，则先删除之前的document, 再更新。
 * 插入前先查询是否已经同步过，即对应的answerDwId有没有对应的值。
 */
