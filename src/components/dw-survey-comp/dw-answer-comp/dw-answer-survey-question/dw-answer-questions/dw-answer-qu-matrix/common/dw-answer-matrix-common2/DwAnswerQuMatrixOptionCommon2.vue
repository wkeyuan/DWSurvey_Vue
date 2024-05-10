<template>
  <div>
    <div class="dw-display-flex" style="align-items: flex-start;">
      <div style="flex-grow: 1;">
        <table style="text-align: center;border-spacing: 0;width: 100%;">
          <tbody v-for="(rowOption, rowOptionIndex) in survey.questions[index].quRows" :key="`matrix-rowOption-${rowOption.dwId}`" >
            <tr>
              <td colspan="2" style="text-align: left;" class="matrix-title-td">
                <dw-html-label-common ref="dwEditLabel" :value="rowOption.optionTitleObj" ></dw-html-label-common>
              </td>
            </tr>
            <!--            <tr v-if="quType==='MATRIX_SCALE'" class="dwMoveSortQuOption">
              <td>
                <div class="dw-display-flex" style="width: 100%;">
                  <el-button v-for="number in 10" :key="`scale_${number}`" :type=" number ===3 ? 'primary':''" class="dw-el-scale-btn">{{ number }}</el-button>
                </div>
              </td>
            </tr>-->
            <!--            <tr v-if="quType==='MATRIX_SCALE'" class="dwMoveSortQuOption">
              <td>
                <el-button-group>
                  <el-button v-for="number in 10" :key="`scale_${number}`" size="mini" >{{ number }}</el-button>
                </el-button-group>
              </td>
            </tr>-->
            <template v-if="quType==='MATRIX_SCALE'">
              <tr class="dwMoveSortQuOption">
                <td colspan="2">
                  <div class="dw-display-flex">
                    <div v-for="number in numbers(survey.questions[index].quAttr.scaleAttr.min, survey.questions[index].quAttr.scaleAttr.max)" :key="`scale_${number}`" class="dw-el-scale-div-num" @click="clickItem(rowOptionIndex, number)" >
                      <div v-if=" number === rowOption.answerValue" class="dw-el-scale-div-num-content dw-checked animate__animated animate__tada">{{ number }}</div>
                      <div v-else class="dw-el-scale-div-num-content">{{ number }}</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr style="font-size: 13px;">
                <td colspan="2">
                  <div class="dw-display-flex" style="justify-content: space-between;color: #858585;">
                    <div>
                      <dw-html-label-common ref="dwEditLabel" :value="rowOption.lr.left.optionTitleObj" ></dw-html-label-common>
                    </div>
                    <div>
                      <dw-html-label-common ref="dwEditLabel" :value="rowOption.lr.right.optionTitleObj" ></dw-html-label-common>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-if="quType==='MATRIX_SLIDER'" >
              <tr class="dwMoveSortQuOption" >
                <td style="width: 50px;">
                  <el-input v-model="rowOption.answerValue" type="number" style="width: 50px;" @blur="onBlur"></el-input>
                </td>
                <td>
                  <table style="width: 100%;">
                    <tr>
                      <td><el-slider v-model="rowOption.sliderAnswerValue" :min="survey.questions[index].quAttr.sliderAttr.min" :max="survey.questions[index].quAttr.sliderAttr.max" :step="survey.questions[index].quAttr.sliderAttr.step" :disabled="survey.readonly" style="width: 100%;margin: 0;" @change="sliderChange(rowOptionIndex)"></el-slider></td>
                    </tr>
                    <tr style="font-size: 13px;">
                      <td>
                        <div class="dw-display-flex" style="justify-content: space-between;color: #858585;">
                          <div>
                            <dw-html-label-common ref="dwEditLabel" :value="rowOption.lr.left.optionTitleObj" ></dw-html-label-common>
                          </div>
                          <div>
                            <dw-html-label-common ref="dwEditLabel" :value="rowOption.lr.right.optionTitleObj" ></dw-html-label-common>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import DwHtmlLabelCommon from '../../../../../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {showReadNotify} from '../../../../../../dw-utils/dw-common/dw-msg-common'
import {answerQuEventCommon} from '../../../../../dw-utils/dw-survey-answer-common'
import DwRowOptionCommon2Item
  from '../../../../../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/dw-design-questions/dw-design-qu-matrix/common/dw-design-matrix-common2/components/DwRowOptionCommon2Item.vue'
import {generateNumbers} from "../../../../../../dw-utils/dw-common/dw-common-utils";

export default {
  name: 'DwAnswerQuMatrixOptionCommon2',
  components: {DwRowOptionCommon2Item, DwHtmlLabelCommon},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''}
  },
  data () {
    return {
      numbers (start, end) {
        // this.survey.questions[this.index].quAttr.scaleAttr.min
        // this.survey.questions[this.index].quAttr.scaleAttr.max
        return generateNumbers(start, end)
      }
    }
  },
  methods: {
    clickItem (rowIndex, number) {
      if (this.survey.readonly) return showReadNotify(this)
      // 如果是多选题
      const quType = this.survey.questions[this.index].quType
      console.debug('clickItem quType', quType)
      if (quType === 'MATRIX_SCALE') {
        this.survey.questions[this.index].quRows[rowIndex].answerValue = number
      }
      // 题目检查
      this.onBlur()
    },
    sliderChange (rowIndex) {
      this.survey.questions[this.index].quRows[rowIndex].answerValue = this.survey.questions[this.index].quRows[rowIndex].sliderAnswerValue
      this.onBlur()
    },
    onBlur () {
      // 同步答案
      answerQuEventCommon(this.survey, this.index)
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
.matrix-title-td{
  padding: 20px 5px 5px 0;
}
tbody:first-child .matrix-title-td{
  padding-top: 0;
}
/* 交替行颜色 */
/*tbody:nth-child(odd) tr {
  background-color: #f9f9f9;
}
!* 偶数行颜色 *!
tbody:nth-child(even) tr {
  background-color: #f0f0f0;
}*/
.dw-el-scale-btn {
  flex: 1;box-sizing: border-box;margin: 0;border-radius: 0;
}
.dw-el-scale-btn:not(:first-child){
  border-left: none;
}
.dw-el-scale-btn:first-child{
  border-radius: 3px 0 0 3px;
}
.dw-el-scale-btn:last-child{
  border-radius: 0 3px 3px 0;
}
.dw-el-scale-div-num{
  flex: 1;box-sizing: border-box;
}
.dw-el-scale-div-num-content{
  padding: 5px;
  background: #f6f6f7;
  margin: 1px;
  border: 1px solid #efefef;
  border-radius: 3px;
  cursor: pointer;
  color: #333;
}
.dw-el-scale-div-num-content:hover,.dw-el-scale-div-num-content.dw-checked{
  border-color: var(--dw-answer-primary-color);
  color: var(--dw-answer-primary-color);
  background-color: var(--dw-answer-primary-color);
  color: white;
}
/deep/ .el-slider__runway{
  margin: 5px!important;
}
/deep/ .el-input__inner{
  padding: 0 5px;
  text-align: center;
}
/* input 类型为 number 时去掉数字加减上下箭头 */
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

/deep/ input[type="number"] {
  -moz-appearance: textfield; /* 此处写不写都可以 */
}

</style>
