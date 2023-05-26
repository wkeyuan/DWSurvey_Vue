<template>
  <div>
    <!--    :class="hover || survey.curEditObj[itemIndex].itemClick ? 'focus-question':''" -->
    <div class="dw-question-root dw-padding-tb-5" @mouseover="mouseover" @mouseleave="mouseleave">
      <div class="dw-question-body" >
        <div class="dw-question-body-left dw-text-align-center dw-padding-top-2"></div>
        <div class="dw-question-body-center">
          <div class="dw-question-body-center-body dw-color-333" >
            <div class="dw-qu-content">
              <div class="dw-qu-title-body dw-display-flex dw-width-100bf">
                <div class="dw-qu-num">{{ index+1 }}、</div>
                <div>
                  <dw-html-label-common ref="dwQuTitle" v-model="survey.questions[index].quTitleObj" :survey="survey" ></dw-html-label-common>
                </div>
                <div class="dw-qu-type-name" >
                  <div class="dw-font-12 dw-color-grey-10">【{{ survey.questions[index].quTypeName }}】</div>
                </div>
              </div>
              <div v-show="survey.questions[index].quNoteObj.dwHtml !==null && survey.questions[index].quNoteObj.dwHtml !=='' " style="font-size: 12px;color: grey;margin-bottom: 5px;" >
                <dw-html-label-common ref="dwQuNote" v-model="survey.questions[index].quNoteObj" :survey="survey" ></dw-html-label-common>
              </div>
              <div class="dw-qu-content-body">

                <div class="dw-qu-content-body-content">
                  <slot name="editQuContent" ></slot>
                </div>

                <div class="dw-question-body-bottom dw-padding-top-10 dw-height-20px">
                  <div></div>
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
} from '../../dw-utils/dw-update-survey-question'
import {clickQuItem, upAllItemClick} from '../../dw-utils/dw-update-survey-item-click'
import DwPopoverQuAttrs from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/dw-design-questions/dw-desing-qestion-common-comp/DwPopoverQuAttrs.vue'
import DwHtmlLabelCommon from "../dw-answer-survey-common/DwHtmlLabelCommon.vue";

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
  watch: {
    survey: function (newValue, oldValue) {
      console.log('firstName changed from ' + oldValue + ' to ' + newValue)
      // this.dragOptions = newValue
      // const quCommonItems = this.$refs.quCommonItem
      // for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(null)
    }
  },
  methods: {
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
      const newQu = JSON.parse(JSON.stringify(question))
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
.dw-question-body{
  display: grid;
  /*grid-template-columns: 40px auto 40px;*/
  grid-template-columns: auto;
  padding: 2px 0 0 0;
  margin: 0;
}
.dw-qu-title-body .dw-qu-num{
  min-width: 20px;
  max-width: 60px;
}
.dw-qu-title-body .dw-qu-type-name{
  text-align: left;
}
.focus-question{
  background: #f8f8f8;
}
.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
</style>
<style>

</style>
