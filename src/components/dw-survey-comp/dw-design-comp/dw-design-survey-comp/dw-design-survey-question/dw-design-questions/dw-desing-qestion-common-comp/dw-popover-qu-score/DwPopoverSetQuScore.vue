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
      this.survey.questions[this.index].quAttr.scoreAttr.designShowScoreNum = true
      // 调用计算总分方法
      // 1、计算当前题总分
      const question = this.survey.questions[this.index]
      const quType = question.quType
      let quMaxScore = 0
      if (quType==='RADIO') {
        // 计算单选分数
        const quRadios = this.survey.questions[this.index].quRadios
        quRadios.forEach((quRadio, optionIndex) => {
          const optionScoreNum = quRadio.scoreNum
          if (optionScoreNum!=null && optionScoreNum>0) {
            if (quMaxScore<optionScoreNum) quMaxScore = optionScoreNum
          }
        })
      } else if (quType==='CHECKBOX') {
        // 计算多选分数
        const quCheckboxs = this.survey.questions[this.index].quCheckboxs
        quCheckboxs.forEach((quCheckbox, optionIndex) => {
          const optionScoreNum = quCheckbox.scoreNum
          if (optionScoreNum!=null && optionScoreNum>0) {
            quMaxScore+= optionScoreNum
          }
        })
        if (this.survey.questions[this.index].quAttr.scoreAttr.allRight.enabled) {
          quMaxScore = this.survey.questions[this.index].quAttr.scoreAttr.allRight.scoreNum
        }
      }
      this.survey.questions[this.index].quAttr.scoreAttr.maxScore = quMaxScore
      // 2、计算问卷总分
      let surveyMaxScore = 0
      const questions = this.survey.questions
      questions.forEach((question, quIndex) => {
        const thQuType = question.quType
        if (thQuType==='SCORE') {
          // 计分题 calcSumScore
          const quScores = question.quScores
          let quMaxScore = 0
          quScores.forEach((quScore, optionIndex) => {
            quMaxScore+= question.paramInt02
          })
          question.quAttr.scoreAttr.maxScore = quMaxScore
          question.quAttr.scoreAttr.designShowScoreNum = true
        }
        if (question.hasOwnProperty('quAttr') && question.quAttr.hasOwnProperty('scoreAttr') && question.quAttr.scoreAttr.hasOwnProperty('maxScore')) {
          surveyMaxScore+=question.quAttr.scoreAttr.maxScore
        }
      })
      this.survey.surveyAttrs.scoreAttr.maxScore = surveyMaxScore
      this.survey.surveyAttrs.scoreAttr.enabled = true
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
