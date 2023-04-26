<template>
  <div>
    <div class="dw-question-root" @mouseover="mouseover" @mouseleave="mouseleave">
      <div class="dw-question-top" >
        <div class="">
          <div class="dw-margin-left-right-10" style="font-size: 14px;"></div>
          <div v-show="hover" class="dw-display-flex-right">
            <el-tooltip class="item" effect="dark" content="复制本题" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10" ><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa fa-copy" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="向上移" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa el-icon-top" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="向下移" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa el-icon-bottom" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="dw-question-body" >
        <div class="dw-question-body-left">
          <div v-show="hover">
            <el-tooltip class="item" effect="dark" content="移动本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-arrows" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="题目设置" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-cog" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="题目逻辑" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-code-fork" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-trash fa fa-arrows" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
        <div class="dw-question-body-center">
          <div class="dw-question-body-center-body" >
            <div class="dw-qu-content">
              <div class="dw-qu-title-body dw-display-flex">
                <div class="dw-qu-num">{{ index+1 }}、</div>
                <div class="dw-flex-item-auto">
                  <dw-text-edit-label-common v-model="survey.questions[index].quTitleObj" :survey="survey" ></dw-text-edit-label-common>
                </div>
                <div v-show="hover" class="dw-qu-type-name">
                  <div class="dw-font-12 dw-color-grey-10">{{ survey.questions[index].quTypeName }}</div>
                </div>
              </div>
              <div>
                <dw-text-edit-label-common v-model="survey.questions[index].quTitleObj" :survey="survey" ></dw-text-edit-label-common>
              </div>
              <div class="dw-qu-content-body">

                <div class="dw-qu-content-body-content">
                  <slot name="editQuContent" ></slot>
                </div>

                <div class="dw-question-body-bottom dw-padding-top-10">
                  <div>
                    <div v-show="hover">
                      <div class="dw-display-flex-left">
                        <el-tooltip class="item" effect="dark" content="添加选项" placement="left">
                          <div class="dw-question-toolbar dw-margin-right-10" @click="dwAddQuItem"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-plus" aria-hidden="true"></i></div>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="批量添加选项" placement="right">
                          <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="dw-question-body-right">
          <div v-show="hover">
            <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-clipboard" aria-hidden="true"></i></div>
            <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-arrow-up" aria-hidden="true"></i></div>
            <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-arrow-down" aria-hidden="true"></i></div>
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
export default {
  name: 'DwDesignQuestionCommon',
  components: {DwTextEditLabelCommon, DwTextEditLabel},
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
      quTitle: 'text'
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
    dwAddQuItem () {
      // this.survey.questions[this.index].quTitleObj = {dwHtml: 'wooooooo', dwText: 'wooooooo'}
      // this.survey.surveyDetail.surveyNodeObj = {dwHtml: '更新问卷副标题备注', dwText: '更新问卷副标题备注'}
      const quType = this.survey.questions[this.index].quType
      const quOption = {id: null, optionTitleObj: {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}
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
      this.$emit('update-survey', this.survey)
    }
  }
}
</script>

<style scoped>
.dw-question-root{
  padding: 5px 0px;
}
.dw-question-top{
  height: 20px;
  display: none;
}
.dw-question-body{
  padding: 0px;
  /*background: lightgrey;*/
  margin: 0px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  padding-top: 2px;
}
.dw-question-body-left,.dw-question-body-right{
  /*background: grey;*/
  text-align: center;
  padding-top: 2px;
}
.dw-question-body-left{

}
.dw-question-body-right{

}
.dw-padding-top-10{
  padding-top: 10px;
}
.dw-margin-bottom-10{
  margin-bottom: 10px;
}
.dw-margin-left-right-10{
  margin-right: 10px;
  margin-left: 10px;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-display-flex{
  display: flex;
  align-items: center;
}
.dw-display-flex-left{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.dw-display-flex-right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.dw-event-color{
  color: #095aaa;
}
.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
.dw-bg-white{
  background-color: white;
}
.dw-question-body-center-body{
  color: #333;
}

.dw-qu-title-body{
  width: 100%;
}
.dw-qu-title-body .dw-qu-num{
  min-width: 20px;
  max-width: 60px;
}
.dw-flex-item-auto{
  flex: auto;
}

.dw-question-body-bottom{
  height: 20px;
}
.dw-cursor-pointer{
  cursor: pointer;
}
.dw-qu-type-name{
  padding-left: 8px;
}
.dw-font-12{
  font-size: 12px;
}
.dw-color-grey-10{
  color: #afafb0;
}
.dw-color-12{
  color: lightgrey;
}
</style>
