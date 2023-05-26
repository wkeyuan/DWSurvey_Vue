<template>
  <div>
    <!--    :class="hover || survey.curEditObj[itemIndex].itemClick ? 'focus-question':''" -->
    <div class="dw-question-root dw-padding-tb-5" @mouseover="mouseover" @mouseleave="mouseleave">
      <div class="dw-question-top dw-height-20px" style="display: none;" >
        <div class="">
          <div class="dw-margin-left-right-10" style="font-size: 14px;"></div>
          <div v-show="hover || survey.curEditObj[itemIndex].itemClick" class="dw-display-flex-right">
            <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="复制本题" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10" ><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa fa-copy" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="向上移" placement="top">
              <div class="dw-question-toolbar dw-margin-right-5"><i class="dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="向下移" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa el-icon-bottom" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="dw-question-body" >
        <div class="dw-question-body-left dw-text-align-center dw-padding-top-2">
          <div v-show="hover || survey.curEditObj[itemIndex].itemClick">
            <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="移动本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-arrows" aria-hidden="true"></i></div>
            </el-tooltip>
            <template v-if="survey.questions[index].quType !== 'PARAGRAPH' && survey.questions[index].quType !== 'PAGETAG'" >
              <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="题目设置" placement="left">
                <dw-popover-qu-attrs v-model="survey" :index="index" add-or-edit="add" @click-item="clickItem">
                  <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-cog" aria-hidden="true"></i></div>
                </dw-popover-qu-attrs>
              </el-tooltip>
              <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="题目逻辑" placement="left">
                <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-code-fork" aria-hidden="true"></i></div>
              </el-tooltip>
            </template>
            <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="删除本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10" @click="deleteQu" ><i class="dw-cursor-pointer dw-event-color fa fa-trash-alt" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
        <div class="dw-question-body-center">
          <div class="dw-question-body-center-body dw-color-333" >
            <div class="dw-qu-content">
              <div v-if="survey.questions[index].quType !== 'PAGETAG'" class="dw-qu-title-body dw-display-flex dw-width-100bf">
                <div v-show="survey.questions[index].quType !== 'PARAGRAPH'" class="dw-qu-num">{{ index+1 }}、</div>
                <div class="dw-flex-item-auto">
                  <dw-text-edit-label-common ref="dwQuTitle" v-model="survey.questions[index].quTitleObj" :survey="survey" ></dw-text-edit-label-common>
                </div>
                <div class="dw-qu-type-name dw-padding-left-10" >
                  <div v-show="hover" class="dw-font-12 dw-color-grey-10">{{ survey.questions[index].quTypeName }}</div>
                </div>
              </div>
              <div style="font-size: 12px;color: grey;margin-bottom: 5px;" >
                <dw-text-edit-label-common ref="dwQuNote" v-model="survey.questions[index].quNoteObj" :survey="survey" ></dw-text-edit-label-common>
              </div>
              <div class="dw-qu-content-body">

                <div class="dw-qu-content-body-content">
                  <slot name="editQuContent" ></slot>
                </div>

                <div class="dw-question-body-bottom dw-padding-top-10 dw-height-20px">
                  <div v-if="survey.questions[index].quType !== 'PARAGRAPH' && survey.questions[index].quType !== 'PAGETAG'">
                    <div v-show="hover || survey.curEditObj[itemIndex].itemClick">
                      <div v-if="survey.questions[index].quType!=='FILLBLANK' && survey.questions[index].quType!=='UPLOADFILE'" class="dw-display-flex-left">
                        <template v-if="survey.questions[index].hv===4">
                          <el-tooltip :open-delay="openDelay" class="item dw-margin-right-10" effect="dark" content="修改选项" placement="left">
                            <dw-popover-more-options v-model="survey" :index="index" add-or-edit="edit" popover-title="修改题目选项" text-placeholder="请输入修改的内容" @click-item="clickItem" >
                              <div class="dw-question-toolbar" ><i class="dw-cursor-pointer dw-event-color fa fa-pencil" aria-hidden="true"></i></div>
                            </dw-popover-more-options>
                          </el-tooltip>
                        </template>
                        <template v-else>
                          <el-tooltip :open-delay="openDelay" class="item dw-margin-right-10" effect="dark" content="单项添加选项" placement="left">
                            <div class="dw-question-toolbar" @click.stop="dwAddQuItemEvent"><i class="dw-cursor-pointer dw-event-color fa fa-plus" aria-hidden="true"></i></div>
                          </el-tooltip>
                        </template>
                        <template>
                          <el-tooltip :disabled="survey.curEditObj[itemIndex].itemClick" :open-delay="openDelay" class="item dw-margin-right-10" effect="dark" content="批量添加选项" placement="right">
                            <dw-popover-more-options v-model="survey" :index="index" add-or-edit="add" @click-item="clickItem">
                              <div class="dw-question-toolbar" ><i class="dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
                            </dw-popover-more-options>
                          </el-tooltip>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="dw-question-body-right dw-text-align-center dw-padding-top-2">
          <div v-show="hover || survey.curEditObj[itemIndex].itemClick">
            <div class="dw-question-toolbar dw-margin-bottom-10" @click.stop="copyQu"><i class="dw-cursor-pointer dw-event-color fa fa-clipboard" aria-hidden="true"></i></div>
            <div v-show="index>0" class="dw-question-toolbar dw-margin-bottom-10" @click.stop="upQu"><i class="dw-cursor-pointer dw-event-color fa fa-arrow-up" aria-hidden="true"></i></div>
            <div v-show="(index+1)<survey.questions.length" class="dw-question-toolbar dw-margin-bottom-10" @click.stop="downQu"><i class="dw-cursor-pointer dw-event-color fa fa-arrow-down" aria-hidden="true"></i></div>
            <!--<div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-top" aria-hidden="true"></i></div>-->
            <!--<div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-bottom" aria-hidden="true"></i></div>-->
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import DwTextEditLabel from '../dw-design-survey-common/DwTextEditLabel'
import DwTextEditLabelCommon from '../dw-design-survey-common/DwTextEditLabelCommon'
import DwPopoverMoreOptions from './dw-design-questions/dw-desing-qestion-common-comp/DwPopoverMoreOptions.vue'
import {
  dwResetQuestionRefreshValue,
  dwSurveyQuAddOption
} from '../../../dw-utils/dw-update-survey-question'
import {clickQuItem, upAllItemClick} from '../../../dw-utils/dw-update-survey-item-click'
import DwPopoverQuAttrs from './dw-design-questions/dw-desing-qestion-common-comp/DwPopoverQuAttrs.vue'

export default {
  name: 'DwDesignQuestionCommon',
  components: {DwPopoverQuAttrs, DwPopoverMoreOptions, DwTextEditLabelCommon, DwTextEditLabel},
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
  grid-template-columns: 40px auto 40px;
  padding: 2px 0 0 0;
  margin: 0;
}
.dw-qu-title-body .dw-qu-num{
  min-width: 20px;
  max-width: 60px;
}
.dw-qu-title-body .dw-qu-type-name{
  min-width: 60px;
  text-align: right;
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
