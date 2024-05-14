<template>
  <!--  :value="survey.curEditObj[itemIndex].itemClick" trigger="manual" trigger="click"-->
  <el-popover :value="survey.questions[index].quFocusObj.quScorePopoverShow" trigger="manual" placement="right" popper-class="dw-popover-more-options" @show="showPopoverLoad" >
    <div style="display: block;">
      <div style="font-size: 14px;padding-bottom: 5px;">{{ popoverTitle }}</div>
      <div>
        <template v-if="survey.questions[index].quType === 'RADIO'">
          <div>
            <el-table
              ref="singleTable"
              :data="survey.questions[index].quRadios">
              <el-table-column property="optionTitleObj.dwText" label="选项内容" width="520"></el-table-column>
              <el-table-column property="address" label="选项分值" width="180">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.scoreNum" size="small" @change="inputNumberChange"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="survey.questions[index].quType === 'CHECKBOX'">
          <div>
            <el-table
              ref="singleTable"
              :data="survey.questions[index].quCheckboxs">
              <el-table-column property="optionTitleObj.dwText" label="选项内容" width="520">
              </el-table-column>
              <el-table-column property="address" label="选项分值" width="180">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.scoreNum" size="small" @change="inputNumberChange"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="survey.questions[index].quType === 'MATRIX_RADIO' || survey.questions[index].quType === 'MATRIX_CHECKBOX'">
          <div v-if="survey.questions[index].quCols!==null">
            <el-table
              ref="singleTable"
              :data="survey.questions[index].quCols.slice(1)" >
              <el-table-column property="optionTitleObj.dwText" label="列标题" width="520"></el-table-column>
              <el-table-column property="address" label="列分值" width="180">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.scoreNum" size="small" @change="inputNumberChange"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>
      <div style="text-align: right;padding: 5px;">
        <!--        <el-button type="text" size="small" style="margin-top:5px;" @click="cancelAddOptionEvent">取消</el-button>-->
        <span style="font-size: 13px;margin-right: 5px;color: darkgrey;">提示：点击框外任意区域关闭当前弹出框</span>
      </div>
    </div>
    <div slot="reference" @click.stop="clickShowPopoverEvent">
      <slot/>
    </div>
  </el-popover>
</template>

<script>

import {caleDesignSurveySumScore} from "../../../../../../dw-utils/dw-common/dw-survey-design-score";

export default {
  name: 'DwPopoverSetQuScore',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    popoverTitle: {type: String, default: '配置选项分值'},
    textPlaceholder: {type: String, default: '请输入需要批量新增加的选项内容，每行一个。'},
    addOrEdit: {type: String, default: 'add'}
  },
  data () {
    return {
      itemIndex: 0,
      moreOptionText: '',
      popoverVisible: false,
      tableData: [{
        name: '请输入需要批量新增加的选项内容请输入需要批量',
        address: 2
      }, {
        name: '请输入需要批量新增加的选项内容请输入需要',
        address: 1
      }, {
        name: '请输入需要批量新增加的选项内容',
        address: 5
      }, {
        name: '请输入需要批量新增加的选项内容',
        address: 6
      }]
    }
  },
  methods: {
    showPopoverLoad () {
    },
    clickShowPopoverEvent () {
      // 父组件生成父组件的itemIndex, 子组件生成子组件的itemIndex, 最后排除父组件的itemIndex与子组件ItemIndex
      this.$emit('click-item')
      this.survey.questions[this.index].quFocusObj.quScorePopoverShow = true
    },
    cancelAddOptionEvent () {
      // this.upAllItemClick(null)
    },
    upAllItemClick (itemClicks) {
      // upAllItemClick(this.survey, itemClicks, (survey) => { this.survey = survey })
    },
    inputNumberChange () {
      caleDesignSurveySumScore(this.survey, this.index)
    }
  }
}
</script>

<style scoped>
.dw-popover-set-qu-score{
  background-color: #c6c6c7;
}
</style>
<style>

</style>
