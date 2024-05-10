<template>
  <div style="padding: 10px 0;">
    <div class="dw-display-flex" style="align-items: flex-start;">
      <div style="flex-grow: 1;">
        <div :style="`width: ${matrixWidth}px`" style="overflow: scroll;" class="dw-matrix-table-content" >
          <div style="padding: 5px 0 5px 0;width: 100%;" >
            <div class="dw-display-flex">
              <div style="position: sticky;left: 0;z-index: 1;padding-left: 5px;font-size: 12px;color: #afafb0;">如显示不全，试试在矩阵表区域左右滑动</div>
              <div style="flex-grow: 1;"></div>
            </div>
          </div>
          <div>
            <table style="text-align: center;border-spacing: 0;min-width: 100%;max-width: none;">
              <dw-col-option-common1 v-model="survey.questions[index].quCols" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-col-option-common1>
              <dw-row-option-common1 v-model="survey.questions[index].quRows" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-row-option-common1>
            </table>
          </div>
        </div>
      </div>
      <div class="dw-text-align-center" style="width: 50px;">
        <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="增加新列" placement="right">
          <div class="dw-question-toolbar dw-margin-bottom-10" @click.stop="dwAddQuItemEvent" ><i class="dw-cursor-pointer dw-event-icon dw-event-color dw-event-color fa fa-plus" aria-hidden="true"></i></div>
        </el-tooltip>
        <el-tooltip :open-delay="openDelay" class="item" effect="dark" content="批量增加" placement="right">
          <dw-popover-more-options v-model="survey" :index="index" add-or-edit="addCol" @click-item="clickItem">
            <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
          </dw-popover-more-options>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>

import DwColOptionCommon1 from './components/DwColOptionCommon1.vue'
import DwRowOptionCommon1 from './components/DwRowOptionCommon1.vue'
import {v4 as uuidV4} from "uuid";
import {
  dwSurveyQuAddMatrixColOption,
  dwSurveyQuAddOption
} from "../../../../../../../dw-utils/dw-survey-update-question";
import {resetOtherClickItem} from "../../../../../../../dw-utils/dw-survey-update-item-click";
import DwPopoverMoreOptions from "../../../dw-desing-qestion-common-comp/DwPopoverMoreOptions.vue";

export default {
  name: 'DwQuMatrixOptionCommon1',
  components: {DwPopoverMoreOptions, DwRowOptionCommon1, DwColOptionCommon1},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      openDelay: 300,
      matrixWidth: 0
    }
  },
  mounted () {
    this.handleResize()
    // window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.handleResize, true)
  },
  beforeDestroy () {
    // 记得在组件销毁前移除事件监听器，以避免潜在的内存泄漏。 考虑提到全局
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      const windowWidth = window.innerWidth
      this.matrixWidth = windowWidth*0.66 - 130
    },
    arraySpanMethod ({row, column, rowIndex, columnIndex}) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    dwAddQuItemEvent () {
      const quOption = {id: null, optionTitleObj: {dwHtml: '选项内容', dwText: '选项内容', dwPlaceholder: '请输入内容', isRefreshValue: true}, itemClick: true, tempEmptyOption: false}
      quOption.dwId = uuidV4()
      const newSurvey = dwSurveyQuAddMatrixColOption(this.survey, this.index, quOption)
      this.$emit('update-survey', newSurvey)
      // upAllItemClick(this.survey, null, (survey) => { this.survey = survey })
      resetOtherClickItem(this.survey, -1)
      // 要刷新通知下层排序项
    },
    clickItem () {
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
    }
  }
}
</script>

<style scoped>
.dw-qu-item-el-checkbox-radio-icon{
  /*background: red;*/
  font-size: 18px;
  width: 28px;
  color: #b2b2b2;
}
table,tbody,tr,th,td{
  border-spacing: 0;
  border: none;
}
table{
  /*border: 1px solid #d8d8d9;*/
}
.dw-matrix-table-content{
  border: 1px solid #d8d8d9;
}
</style>
