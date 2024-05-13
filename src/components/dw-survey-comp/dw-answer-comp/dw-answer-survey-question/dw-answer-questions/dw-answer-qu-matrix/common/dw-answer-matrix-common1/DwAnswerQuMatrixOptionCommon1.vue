<template>
  <div style="padding: 0;">
    <div>
      <div v-if="survey.questions[index].hasOwnProperty('quCols') && survey.questions[index].quCols!==null" style="overflow-x: scroll;width: 100%;display: block;">
        <table>
          <thead>
            <tr>
              <td :colspan="survey.questions[index].quCols.length-1" class="dw-matrix-row-title-td" style="padding: 0 0 5px 0;" >
                <div class="dw-display-flex">
                  <div style="position: sticky;left: 0;z-index: 1;padding-left: 5px;font-size: 12px;color: #afafb0;">如显示不全，试试在矩阵表区域左右滑动</div>
                  <div style="flex-grow: 1;"></div>
                </div>
              </td>
            </tr>
            <tr class="dw-el-radio-checkbox-tr">
              <td v-for="(colOption) in survey.questions[index].quCols" v-if="!colOption.tempEmptyOption" :key="`col_${colOption.dwId}`" class="matrix-title-td">
                <dw-html-label-common ref="dwEditLabel" :value="colOption.optionTitleObj" ></dw-html-label-common>
              </td>
            </tr>
          </thead>
          <tbody v-for="(rowOption, rowOptionIndex) in survey.questions[index].quRows" :key="`matrix-rowOption-${rowOption.dwId}`">
            <tr>
              <td :colspan="survey.questions[index].quCols.length-1" class="dw-matrix-row-title-td" style="text-align: left;" >
                <div class="dw-display-flex">
                  <div style="position: sticky;left: 0;z-index: 1;padding-left: 5px;">
                    <dw-html-label-common ref="dwEditLabel" :value="rowOption.optionTitleObj" ></dw-html-label-common>
                  </div>
                  <div style="flex-grow: 1;"></div>
                </div>
              </td>
            </tr>
            <tr class="dw-el-radio-checkbox-tr">
              <td v-for="(colOption, colIndex) in survey.questions[index].quCols" v-if="!colOption.tempEmptyOption" :key="`matrix-colOption-content-${colIndex}`" @click.stop="clickItem(rowOptionIndex,colIndex)" >
                <template v-if="quType === 'MATRIX_RADIO'">
                  <div class="dw-qu-item-el-checkbox-radio dw-item-checked matrix-item">
                    <i v-if="survey.questions[index].quRows[rowOptionIndex].rowCols[colIndex].checked" class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-dot animate__animated animate__tada dw-checked"></i>
                    <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-regular fa-circle"></i>
                  </div>
                </template>
                <template v-else-if="quType === 'MATRIX_CHECKBOX'">
                  <div class="dw-qu-item-el-checkbox-radio dw-item-checked matrix-item">
                    <i v-if="survey.questions[index].quRows[rowOptionIndex].rowCols[colIndex].checked" class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check animate__animated animate__tada dw-checked"></i>
                    <i v-else class="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square"></i>
                  </div>
                </template>
                <template v-else-if="quType === 'MATRIX_INPUT'">
                  <div style="padding: 5px;">
                    <el-input v-model="survey.questions[index].quRows[rowOptionIndex].rowCols[colIndex].answerValue" placeholder="请输入" @blur="onBlur"></el-input>
                  </div>
                </template>
              </td>
            </tr>
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

export default {
  name: 'DwAnswerQuMatrixOptionCommon1',
  components: {DwHtmlLabelCommon},
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
    }
  },
  methods: {
    resetOtherRadio (rowIndex) {
      const quRadios = this.survey.questions[this.index].quRows[rowIndex].rowCols
      quRadios.forEach((item, index) => { if (index !== this.optionIndex) item.checked = false })
    },
    clickItem (rowIndex, colIndex) {
      if (this.survey.readonly) return showReadNotify(this)
      // 如果是多选题
      const quType = this.quType
      console.debug('clickItem quType', quType)
      if (quType === 'MATRIX_RADIO') {
        // this.survey.questions[this.quIndex].quRadios[this.optionIndex].checked = true
        this.resetOtherRadio(rowIndex)
        this.survey.questions[this.index].quRows[rowIndex].rowCols[colIndex].checked = true
      } else if (quType === 'MATRIX_CHECKBOX') {
        this.survey.questions[this.index].quRows[rowIndex].rowCols[colIndex].checked = !this.survey.questions[this.index].quRows[rowIndex].rowCols[colIndex].checked
      } else if (quType === 'SCORE') {
        this.survey.questions[this.index].quScores[this.optionIndex].checked = true
      }
      // 题目检查
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
table,tbody,tr,th,td{
  border-spacing: 0;
  border: none;
}
table{
  text-align: center;
  border-spacing: 0;
  width: 100%;
  min-width: 100%;
  max-width: none;
  border-radius: 3px;
}
/* 交替行颜色 */
thead tr:nth-child(odd) {
  background-color: white;
}
/* 偶数行颜色 */
thead tr:nth-child(even) {
  background-color: #d8d8d9;
}
.matrix-title-td{
  padding: 10px 5px;
  white-space: nowrap;
}
.dw-matrix-row-title-td{
  padding: 10px 0;
}
/* 交替行颜色 */
tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}
/* 偶数行颜色 */
tbody tr:nth-child(even) {
  background-color: #f0f0f0;
}
/*tr.dw-el-radio-checkbox-tr td:nth-child(1)
 {
   background-color: rgb(114, 224, 129);
 }*/
tbody tr:last-child td{
  border-bottom: 1px solid #e7e7e8;
}
</style>
