<template>
  <div @click.stop="clickItem">
    <!--    :class="hover || survey.curEditObj[itemIndex].itemClick ? 'focus-question':''" -->
    <div :class="hover || survey.questions[index].quFocusObj.quFocus ? 'focus-question':''" class="dw-question-root dw-padding-tb-5" @mouseover="mouseover" @mouseleave="mouseleave">
      <div class="dw-question-top dw-height-20px" style="display: none;" >
        <div class="">
          <div class="dw-margin-left-right-10" style="font-size: 14px;"></div>
          <!--          || survey.curEditObj[itemIndex].itemClick-->
          <div v-show="hover || survey.questions[index].quFocusObj.quFocus" class="dw-display-flex-right">
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
          <!--          || survey.curEditObj[itemIndex].itemClick-->
          <div v-show="hover || survey.questions[index].quFocusObj.quFocus">
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
                <dw-popover-qu-logics v-model="survey" :index="index" add-or-edit="add" @click-item="clickItem">
                  <el-badge :hidden="survey.questions[index].questionLogics.length<=0" :value="survey.questions[index].questionLogics.length" class="dw-el-badge-logic-set" >
                    <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-code-fork" aria-hidden="true"></i></div>
                  </el-badge>
                </dw-popover-qu-logics>
              </el-tooltip>
            </template>
            <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="删除本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10" @click="deleteQu" ><i class="dw-cursor-pointer dw-event-color fa fa-trash-alt" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
        <div class="dw-question-body-center" >
          <div class="dw-question-body-center-body dw-color-333" >
            <div class="dw-qu-content">
              <div v-if="survey.questions[index].quType !== 'PAGETAG'" class="dw-qu-title-body dw-display-flex dw-width-100bf">
                <div v-if="survey.questions[index].quType !== 'PARAGRAPH'" class="dw-qu-num">{{ quNum }}、</div>
                <div :class="survey.questions[index].quType !== 'PARAGRAPH' ? '':'dw-qu-paragraph'" class="dw-flex-item-auto" >
                  <dw-text-edit-label-common ref="dwQuTitle" v-model="survey.questions[index].quTitleObj" :survey="survey" :index="index"></dw-text-edit-label-common>
                </div>
                <div class="dw-qu-type-name dw-padding-left-10" >
                  <div v-show="hover" class="dw-font-12 dw-color-grey-10">{{ survey.questions[index].quTypeName }}</div>
                </div>
              </div>

              <div>
                <el-collapse-transition>
                  <div v-show="survey.questions[index].quAttr.hasOwnProperty('showQuNote') && survey.questions[index].quAttr.showQuNote" style="font-size: 12px;color: grey;margin-bottom: 5px;" >
                    <dw-text-edit-label-common ref="dwQuNote" v-model="survey.questions[index].quNoteObj" :survey="survey" :index="index"></dw-text-edit-label-common>
                  </div>
                </el-collapse-transition>
              </div>
              <div class="dw-qu-content-body">

                <div class="dw-qu-content-body-content">
                  <slot name="editQuContent" ></slot>
                </div>

                <div v-if="survey.questions[index].quAttr.scoreAttr.designShowScoreNum && survey.surveyAttrs.scoreAttr.enabled" class="dw-padding-top-5" style="font-size: 12px;color: grey;">
                  最高分：<strong style="">{{ survey.questions[index].quAttr.scoreAttr.maxScore }}</strong> 分
                </div>

                <div class="dw-question-body-bottom dw-padding-top-10 dw-height-20px">
                  <div v-if="survey.questions[index].quType !== 'PARAGRAPH' && survey.questions[index].quType !== 'PAGETAG'">
                    <!--                    || survey.curEditObj[itemIndex].itemClick-->
                    <div v-show="hover || survey.questions[index].quFocusObj.quFocus">
                      <div v-if="survey.questions[index].quType!=='FILLBLANK' && survey.questions[index].quType!=='UPLOADFILE'" class="dw-display-flex-left">
                        <template v-if="survey.questions[index].hv===4">
                          <el-tooltip :open-delay="openDelay" :disabled="survey.questions[index].quFocusObj.quMoreOptionShowEdit" class="item dw-margin-right-20" effect="dark" content="批量修改选项" placement="left">
                            <dw-popover-more-options v-model="survey" :index="index" add-or-edit="edit" popover-title="修改题目选项" text-placeholder="请输入修改的内容" @click-item="clickItem" >
                              <div class="dw-question-toolbar" ><i class="dw-cursor-pointer dw-event-color fa fa-pencil" aria-hidden="true"></i></div>
                            </dw-popover-more-options>
                          </el-tooltip>
                        </template>
                        <template v-else>
                          <el-tooltip :open-delay="openDelay" class="item dw-margin-right-20" effect="dark" content="单项添加选项" placement="left">
                            <div class="dw-question-toolbar" @click.stop="dwAddQuItemEvent"><i class="dw-cursor-pointer dw-event-color fa fa-plus" aria-hidden="true"></i></div>
                          </el-tooltip>
                        </template>
                        <template>
                          <!--                          :disabled="survey.curEditObj[itemIndex].itemClick"-->
                          <el-tooltip :open-delay="openDelay" :disabled="survey.questions[index].quFocusObj.quMoreOptionShow" class="item dw-margin-right-20" effect="dark" content="批量添加选项" placement="bottom">
                            <dw-popover-more-options v-model="survey" :index="index" add-or-edit="add" @click-item="clickItem">
                              <div class="dw-question-toolbar" ><i class="dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
                            </dw-popover-more-options>
                          </el-tooltip>
                        </template>
                        <template v-if="survey.questions[index].quType==='RADIO' || survey.questions[index].quType==='CHECKBOX' || survey.questions[index].quType==='MATRIX_RADIO' || survey.questions[index].quType==='MATRIX_CHECKBOX'">
                          <el-tooltip :open-delay="openDelay" :disabled="survey.questions[index].quFocusObj.quScorePopoverShow" class="item dw-margin-right-20" effect="dark" content="批量配置分值" placement="right">
                            <dw-popover-set-qu-score v-model="survey" :index="index" add-or-edit="add" @click-item="clickItem">
                              <div class="dw-question-toolbar" ><i class="dw-cursor-pointer dw-event-color fa-regular fa-star" aria-hidden="true"></i></div>
                            </dw-popover-set-qu-score>
                          </el-tooltip>
                        </template>
                        <template v-if="survey.questions[index].quType === 'MATRIX_SCALE' || survey.questions[index].quType === 'MATRIX_SLIDER' ">
                          <el-tooltip :open-delay="openDelay" :disabled="survey.questions[index].quFocusObj.quScaleTextPopoverShow" class="item dw-margin-right-20" effect="dark" content="批量配置分值" placement="right">
                            <dw-popover-qu-scale-text v-model="survey" :index="index" add-or-edit="add" @click-item="clickItem">
                              <div class="dw-question-toolbar" ><i class="dw-cursor-pointer dw-event-color el-icon-set-up" aria-hidden="true"></i></div>
                            </dw-popover-qu-scale-text>
                          </el-tooltip>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <el-collapse-transition>
                    <div v-show="survey.questions[index].quFocusObj.quFocus" >
                      <div style="border-top: 1px solid #dadada;margin-top: 10px;padding: 10px 0;">
                        <div class="dw-display-flex" style="font-size: 13px;">
                          <div class="bottomQuAttrItem">
                            <el-switch v-model="survey.questions[index].quAttr.isRequired" active-text="必答题"></el-switch>
                          </div>
                          <template v-if="survey.questions[index].quType === 'SCORE' ">
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <strong>最大值</strong> <el-input-number v-model="survey.questions[index].quAttr.scoreQuAttr.max" size="small" controls-position="right" style="width: 100px;"></el-input-number>
                            </div>
                          </template>
                          <template v-if="survey.questions[index].quType === 'MATRIX_SCALE' ">
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <strong>最小值</strong> <el-input-number v-model="survey.questions[index].quAttr.scaleAttr.min" size="small" controls-position="right" style="width: 100px;"></el-input-number>
                            </div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <strong>最大值</strong> <el-input-number v-model="survey.questions[index].quAttr.scaleAttr.max" size="small" controls-position="right" style="width: 100px;"></el-input-number>
                            </div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <el-switch v-model="survey.questions[index].quAttr.scaleAttr.showLrText" active-text="显示极点"></el-switch>
                            </div>
                          </template>
                          <template v-if="survey.questions[index].quType === 'MATRIX_SLIDER' ">
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <strong>最小值</strong> <el-input-number v-model="survey.questions[index].quAttr.sliderAttr.min" size="small" controls-position="right" style="width: 100px;"></el-input-number>
                            </div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <strong>最大值</strong> <el-input-number v-model="survey.questions[index].quAttr.sliderAttr.max" size="small" controls-position="right" style="width: 100px;"></el-input-number>
                            </div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <strong>步长</strong> <el-input-number v-model="survey.questions[index].quAttr.sliderAttr.step" size="small" controls-position="right" style="width: 100px;"></el-input-number>
                            </div>
                            <el-divider direction="vertical"></el-divider>
                            <div class="bottomQuAttrItem">
                              <el-switch v-model="survey.questions[index].quAttr.sliderAttr.showLrText" active-text="显示极点"></el-switch>
                            </div>
                          </template>
                          <el-divider direction="vertical"></el-divider>
                          <div class="bottomQuAttrItem">
                            <el-switch v-model="survey.questions[index].quAttr.showQuNote" active-text="副标题"></el-switch>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-transition>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="dw-question-body-right dw-text-align-center dw-padding-top-2">
          <!--          || survey.curEditObj[itemIndex].itemClick-->
          <div v-show="hover || survey.questions[index].quFocusObj.quFocus">
            <div class="dw-question-toolbar dw-margin-bottom-10" @click.stop="copyQu" ><i class="dw-cursor-pointer dw-event-color fa fa-clipboard" aria-hidden="true"></i></div>
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
  dwResetQuestionRefreshValue, dwResetSurveyQuestionRefreshValue,
  dwSurveyQuAddOption
} from '../../../dw-utils/dw-survey-update-question'
import DwPopoverQuAttrs from './dw-design-questions/dw-desing-qestion-common-comp/DwPopoverQuAttrs.vue'
import DwPopoverQuLogics from './dw-design-questions/dw-desing-qestion-common-comp/dw-popover-qu-logics/DwPopoverQuLogics.vue'
import {v4 as uuidV4} from 'uuid'
import {parseQuOptionType1Item, parseQuOptionTypeByQu, resetQuestion} from '../../../dw-utils/dw-survey-parse'
import {resetOtherClickItem} from '../../../dw-utils/dw-survey-update-item-click'
import DwPopoverSetQuScore
  from './dw-design-questions/dw-desing-qestion-common-comp/dw-popover-qu-score/DwPopoverSetQuScore.vue'
import DwPopoverQuScaleText
  from './dw-design-questions/dw-desing-qestion-common-comp/dw-popover-qu-scale-text/DwPopoverQuScaleText.vue'

export default {
  name: 'DwDesignQuestionCommon',
  components: {
    DwPopoverQuScaleText,
    DwPopoverSetQuScore,
    DwPopoverQuLogics, DwPopoverQuAttrs, DwPopoverMoreOptions, DwTextEditLabelCommon, DwTextEditLabel},
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
      itemClick: false,
      hover: false,
      itemHover: false,
      quTitle: 'text',
      itemIndex: 0,
      moreOptionText: '',
      openDelay: 300,
      tempValue: 0
    }
  },
  computed: {
    quNum () {
      const questions = this.survey.questions
      let quNum = 0
      questions.forEach((item, index) => {
        if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH' && index <= this.index) quNum++
      })
      return quNum
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
  mounted () {
    // console.debug('itemIndex', this.optionIndex)
    if (this.survey.questions[this.index].hasOwnProperty('isNew') && this.survey.questions[this.index].isNew) {
      if (this.$refs.hasOwnProperty('dwQuTitle')) {
        this.$refs.dwQuTitle.clickItem()
        this.$refs.dwQuTitle.editFocus()
        this.survey.questions[this.index].quFocusObj = {
          quFocus: true,
          quSetShow: false,
          quLogicShow: false,
          quMoreOptionShow: false,
          quMoreOptionShowEdit: false,
          quScorePopoverShow: false,
          quMoreOptionColShow: false
        }
        resetOtherClickItem(this.survey, this.index)
      }
      this.survey.questions[this.index].isNew = false
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
      /*
      clickQuItem(this.survey, this.itemIndex, this.index, (survey, itemIndex) => {
        this.survey = survey
        this.itemIndex = itemIndex
      })*/
      resetOtherClickItem(this.survey, this.index)
      this.survey.questions[this.index].quFocusObj = {
        quFocus: true,
        quSetShow: false,
        quLogicShow: false,
        quMoreOptionShow: false,
        quMoreOptionShowEdit: false,
        quScorePopoverShow: false,
        quScaleTextPopoverShow: false,
        quMoreOptionColShow: false
      }
      // 显示特定的tab
      this.survey.surveyFocusObj = {
        rightFocusTab: 'quSet',
        focusQuIndex: this.index
      }
    },
    dwAddQuItemEvent () {
      const quOption = {id: null, optionTitleObj: {dwHtml: '选项内容', dwText: '选项内容', dwPlaceholder: '请输入内容', isRefreshValue: true}, itemClick: true}
      quOption.dwId = uuidV4()
      // parseQuOptionType1Item(quOption)
      parseQuOptionTypeByQu(this.survey.questions[this.index], quOption)
      const newSurvey = dwSurveyQuAddOption(this.survey, this.index, quOption)
      this.$emit('update-survey', newSurvey)
      // upAllItemClick(this.survey, null, (survey) => { this.survey = survey })
      resetOtherClickItem(this.survey, -1)
      // 要刷新通知下层排序项
    },
    deleteQu () {
      this.$confirm('此操作将永久删除该题目, 是否继续？', {
        type: 'warning',
        confirmButtonText: '是，确定删除',
        cancelButtonText: '否，放弃删除'
      }).then(_ => {
        this.survey.questions.splice(this.index, 1)
        // 需要强制触发所有题目刷新
        this.survey = dwResetSurveyQuestionRefreshValue(this.survey)
        this.survey.isRefreshAllQu = true // 实际中没有使用
      }).catch(_ => {})
    },
    copyQu () {
      // 复制题
      /*
      const question = this.survey.questions[this.index]
      const newQu = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(question)))
      resetQuestion(newQu)
      this.survey.questions.splice(this.index+1, 0, newQu)
      // 需要强制触发所有题目刷新
      this.survey = dwResetSurveyQuestionRefreshValue(this.survey)
      this.survey.isRefreshAllQu = true // 实际中没有使用
      */
      const loading = this.$loading({
        lock: true,
        text: '复制中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const question = this.survey.questions[this.index]
      const newQu = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(question)))
      resetQuestion(newQu)
      const newSurvey = dwResetSurveyQuestionRefreshValue(this.survey)
      newSurvey.questions.splice(this.index+1, 0, newQu)
      this.survey = newSurvey
      this.survey.isRefreshAllQu = true
      loading.close()
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
.dw-qu-title-body{
  margin-bottom: 5px;
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
  background: #e5f1ff;
}
.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
.dw-qu-paragraph{
  font-weight: bold;
}
.dw-el-badge-logic-set /deep/ .el-badge__content{
  border-radius: 3px;
  font-size: 8px;
  height: 14px;
  line-height: 14px;
  padding: 0 4px;
  border: none;
}
.dw-el-badge-logic-set /deep/ .el-badge__content.is-fixed{
  /*top: -3px;
  right: 30px;*/
  top: -5px;
  right: 5px;
}
.bottomQuAttrItem{
  padding: 0 5px;
}
.bottomQuAttrItem:first-child{
  padding-left: 0;
}
</style>
