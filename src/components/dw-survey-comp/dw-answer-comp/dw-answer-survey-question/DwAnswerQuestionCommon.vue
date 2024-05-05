<template>
  <div>
    <!--    {{ survey.questions[index].anQuestion }}-->
    <!--    :class="hover || survey.curEditObj[itemIndex].itemClick ? 'focus-question':''" -->
    <div class="dw-question-root" @mouseover="mouseover" @mouseleave="mouseleave">
      <div class="dw-question-body" >
        <!--        <div class="dw-question-body-left dw-text-align-center dw-padding-top-2"></div>-->
        <!--        {{ survey.questions[index].validateObj }}-->
        <div class="dw-question-body-center">
          <div class="dw-question-body-center-body dw-color-333" >
            <div class="dw-qu-content">
              <div class="dw-qu-title-body dw-display-flex dw-width-100bf" style="align-items: baseline;flex-wrap: wrap;">
                <template v-if="survey.questions[index].quType !== 'PAGETAG'" >
                  <div class="dw-display-flex" style="align-items: baseline;">
                    <!--<div v-if="survey.questions[index].quType !== 'PARAGRAPH'" class="dw-qu-num" >
                      <span v-show="survey.questions[index].isRequired === 1" style="color: #f56c6c;">*</span>{{ quNum }}、
                    </div>-->
                    <div class="dw-display-flex" style="align-items: baseline;flex-wrap: wrap;">
                      <div v-if="survey.questions[index].quType !== 'PARAGRAPH'" class="dw-qu-title">
                        <dw-html-label-common ref="dwQuTitle" v-model="survey.questions[index].quTitleObj" :survey="survey" :qu-num="quNum" :is-required="survey.questions[index].isRequired === 1"></dw-html-label-common>
                      </div>
                      <div v-else class="dw-qu-title dw-qu-paragraph">
                        <dw-html-label-common ref="dwQuTitle" v-model="survey.questions[index].quTitleObj" :survey="survey" :is-required="false"></dw-html-label-common>
                      </div>
                      <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showQuTypeName') && survey.surveyStyle.showQuTypeName" class="dw-qu-type-name" >
                        <div class="dw-font-12 dw-color-grey-10">【{{ survey.questions[index].quTypeName }}】</div>
                      </div>
                      <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showQuScoreNum') && survey.surveyStyle.showQuScoreNum" style="margin-left: 2px;">
                        <div class="dw-font-12 dw-color-grey-10">满分{{ survey.questions[index].quAttr.scoreAttr.maxScore }}分</div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="dw-width-100bf">
                    <template v-if="survey.hasOwnProperty('pageAttr') && survey.pageAttr.hasOwnProperty('curPage') && !survey.readonly">
                      <el-button type="primary" class="dw-answer-button-style1" @click="nextPage(survey.pageAttr.curPage+1)" >下一页（{{ survey.pageAttr.curPage }}/{{ survey.pageAttr.pageSize }}）</el-button>
                      <el-button v-show="survey.pageAttr.curPage>1" type="primary" plain class="dw-answer-button-style1" @click="nextPage(survey.pageAttr.curPage-1)" >上一页</el-button>
                    </template>
                  </div>
                </template>
              </div>
              <div v-show="survey.questions[index].quNoteObj.dwHtml !==null && survey.questions[index].quNoteObj.dwHtml !=='' " style="font-size: 12px;color: grey;margin-bottom: 5px;" >
                <dw-html-label-common ref="dwQuNote" v-model="survey.questions[index].quNoteObj" :survey="survey" ></dw-html-label-common>
              </div>
              <div class="dw-qu-content-body" style="padding-top: 5px;">

                <div class="dw-qu-content-body-content">
                  <slot name="editQuContent" ></slot>
                </div>

                <div class="dw-question-body-bottom">
                  <div>
                    <transition enter-active-class="animate__animated animate__flipInX" leave-active-class="animate__animated animate__flipOutX">
                      <div v-show="!survey.questions[index].validateObj.isOk && survey.questions[index].validateObj.errorText!==''" class="dw-answer-question-error">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        {{ survey.questions[index].validateObj.errorText }}
                      </div>
                    </transition>
                    <div v-show="survey.dwDebug">{{ survey.questions[index].validateObj }}</div>
                  </div>
                  <div v-if="survey.hasOwnProperty('isShowScore') && survey.isShowScore && survey.questions[index].hasOwnProperty('anQuestion') && survey.questions[index].anQuestion.hasOwnProperty('quAnScore')" class="dw-qu-answer-score">
                    本题得：
                    <template v-if="survey.questions[index].quAttr.scoreAttr.maxScore === survey.questions[index].anQuestion.quAnScore" >
                      <span style="color: red;">
                        满分{{ survey.questions[index].anQuestion.quAnScore }}分 <i class="el-icon-check"></i>
                      </span>
                    </template>
                    <template v-else-if="survey.questions[index].quAttr.scoreAttr.maxScore>0 && survey.questions[index].anQuestion.quAnScore===0" >
                      <span style="color: red;">
                        {{ survey.questions[index].anQuestion.quAnScore }}分 <i class="el-icon-close"></i>
                      </span>
                    </template>
                    <template v-else >
                      <span style="color: red;">
                        {{ survey.questions[index].anQuestion.quAnScore }}分
                      </span>
                    </template>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="dw-question-body-right dw-text-align-center dw-padding-top-2">
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import DwTextEditLabel from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/DwTextEditLabel'
import DwTextEditLabelCommon from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/DwTextEditLabelCommon'
import DwPopoverMoreOptions from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/dw-design-questions/dw-desing-qestion-common-comp/DwPopoverMoreOptions.vue'
import {
  dwResetQuestionRefreshValue,
  dwSurveyQuAddOption
} from '../../dw-utils/dw-survey-update-question'
import {clickQuItem, upAllItemClick} from '../../dw-utils/dw-survey-update-item-click'
import DwPopoverQuAttrs from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/dw-design-questions/dw-desing-qestion-common-comp/DwPopoverQuAttrs.vue'
import DwHtmlLabelCommon from '../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {showPageByIndex} from '../../dw-utils/dw-survey-answer-data'
import {validateQuestionsBool} from '../../dw-utils/dw-survey-answer-validate'

export default {
  name: 'DwAnswerQuestionCommon',
  components: {DwHtmlLabelCommon, DwPopoverQuAttrs, DwPopoverMoreOptions, DwTextEditLabelCommon, DwTextEditLabel},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    options: {
      type: Object,
      default () {
        return {themeColor: 'red'}
      }
    },
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      hover: false,
      itemHover: false,
      quTitle: 'text',
      itemIndex: 0,
      moreOptionText: '',
      openDelay: 300
    }
  },
  computed: {
    quNum () {
      if (this.survey.hasOwnProperty('surveyStyle')) {
        const surveyStyle = this.survey.surveyStyle
        if (surveyStyle!=null && surveyStyle.hasOwnProperty('showQuNum') && surveyStyle.showQuNum) {
          const questions = this.survey.questions
          let quNum = 0
          questions.forEach((item, index) => {
            if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH' && index <= this.index && !item.logicIsHide) quNum++
          })
          return quNum
        }
      }
      return null
    }
  },
  watch: {
    survey: function (newValue, oldValue) {
      console.log('firstName changed from ' + oldValue + ' to ' + newValue)
      // this.dragOptions = newValue
      // const quCommonItems = this.$refs.quCommonItem
      // for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(null)
    }
  },
  methods: {
    nextPage (pageIndex) {
      if (pageIndex < this.survey.pageAttr.curPage || validateQuestionsBool(this.survey.questions)) {
        showPageByIndex(this.survey, pageIndex)
      }
    },
    mouseleave () {
      this.hover = false
    },
    mouseover () {
      this.hover = true
    },
    mouseleaveItem () {
      this.itemHover = false
    },
    mouseoverItem () {
      this.itemHover = true
    },
    clickItem () {
      clickQuItem(this.survey, this.itemIndex, this.index, (survey, itemIndex) => {
        this.survey = survey
        this.itemIndex = itemIndex
      })
    },
    dwAddQuItemEvent () {
      const quOption = {id: null, optionTitleObj: {dwHtml: '', dwText: '', dwPlaceholder: '请输入内容', isRefreshValue: true}, itemClick: true}
      const newSurvey = dwSurveyQuAddOption(this.survey, this.index, quOption)
      this.$emit('update-survey', newSurvey)
      upAllItemClick(this.survey, null, (survey) => { this.survey = survey })
      // 要刷新通知下层排序项
    },
    deleteQu () {
      this.$confirm('确认删除？').then(_ => { this.survey.questions.splice(this.index, 1) }).catch(_ => {})
    },
    copyQu () {
      const question = this.survey.questions[this.index]
      const newQu = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(question)))
      this.survey.questions.splice(this.index+1, 0, newQu)
    },
    upQu () {
      // this.survey.questions.splice(this.index-1, 1, ...this.survey.questions.splice(this.index, 1, this.survey.questions[this.index-1]))
      const curQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(this.survey.questions[this.index])))
      const prevQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(this.survey.questions[this.index-1])))
      this.survey.questions.splice(this.index-1, 1, curQuestion)
      this.survey.questions.splice(this.index, 1, prevQuestion)
      // this.$emit('refresh-qu-event')
    },
    downQu () {
      // this.survey.questions.splice(this.index+1, 1, ...this.survey.questions.splice(this.index, 1, this.survey.questions[this.index+1]))
      const curQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(this.survey.questions[this.index])))
      const nextQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(this.survey.questions[this.index+1])))
      this.survey.questions.splice(this.index+1, 1, curQuestion)
      this.survey.questions.splice(this.index, 1, nextQuestion)
      // this.$emit('refresh-qu-event')
    }
  }
}
</script>

<style scoped>
@import '../../../../assets/css/dw-answer.css';

.dw-question-root{
  padding-bottom: 15px;
  font-size: 14px;
  line-height: 19px;
}
.dw-question-body{
  display: grid;
  /*grid-template-columns: 40px auto 40px;*/
  grid-template-columns: auto;
  padding: 2px 0 0 0;
  margin: 0;
}
.dw-qu-title-body{
  padding: 6px 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: #303133;
  font-size: 16px;
  line-height: 26px;
}
.dw-qu-title-body .dw-qu-num{
  /*min-width: 26px;*/
  min-width: 6px;
  max-width: 80px;
}
.dw-qu-title-body .dw-qu-type-name{
  text-align: left;
  /*min-width: 100px;*/
}
@media screen and (max-width: 750px) {
  .dw-qu-type-name{
    display: none;
  }
}
.dw-qu-paragraph{
  font-weight: bold;
}
.dw-qu-answer-score{
  padding: 5px;color: red;background: #f6f6f7;
}
</style>
<style>

</style>
