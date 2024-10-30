<template>
  <el-popover :value="survey.questions[index].quFocusObj.quScaleTextPopoverShow" trigger="manual" placement="right" popper-class="dw-popover-more-options" @show="showPopoverLoad" >
    <div style="display: block;">
      <div style="font-size: 14px;padding-bottom: 5px;">{{ popoverTitle }}</div>
      <div style="text-align: left;">
        <div style="padding: 0;">
          <el-tag @click="clickTag('满意')">满意度</el-tag>
          <el-tag @click="clickTag('重要')">重要性</el-tag>
          <el-tag @click="clickTag('欢迎')">欢迎度</el-tag>
          <el-tag @click="clickTag('认同')">认同度</el-tag>
          <el-tag @click="clickTag('愿意')">愿意度</el-tag>
          <el-tag @click="clickTag('可能')">可能性</el-tag>
        </div>
        <div v-if="survey.questions[index].quType === 'MATRIX_SCALE'">
          <div v-if="survey.questions[index].quAttr.scaleAttr.min!==undefined" style="padding: 0;" >
            <div style="padding: 5px;">{{ survey.questions[index].quAttr.scaleAttr.min }}分文案：</div>
            <el-input v-model="leftText"></el-input>
          </div>
          <div v-if="survey.questions[index].quAttr.scaleAttr.max!==undefined" style="padding: 0;" >
            <div style="padding: 5px;">{{ survey.questions[index].quAttr.scaleAttr.max }}分文案：</div>
            <el-input v-model="rightText"></el-input>
          </div>
        </div>
        <div v-else>
          <div v-if="survey.questions[index].quAttr.sliderAttr.min!==undefined" style="padding: 0;" >
            <div style="padding: 5px;">{{ survey.questions[index].quAttr.sliderAttr.min }}分文案：</div>
            <el-input v-model="leftText"></el-input>
          </div>
          <div v-if="survey.questions[index].quAttr.sliderAttr.max!==undefined" style="padding: 0;" >
            <div style="padding: 5px;">{{ survey.questions[index].quAttr.sliderAttr.max }}分文案：</div>
            <el-input v-model="rightText"></el-input>
          </div>
        </div>
      </div>
      <div style=";padding: 5px;">
        <!--        <el-button type="text" size="small" style="margin-top:5px;" @click="cancelAddOptionEvent">取消</el-button>-->
        <div style="text-align: left"><span style="font-size: 13px;margin-right: 5px;color: darkgrey;">提示：确定后会把此题所有的左右极点文字进行统一替换</span></div>
        <div style="text-align: right;">
          <el-button type="primary" size="small" style="margin-top:5px;" @click="configBtnEvent" >确定</el-button>
        </div>
      </div>
    </div>
    <div slot="reference" @click.stop="clickShowPopoverEvent">
      <slot/>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'DwPopoverQuScaleText',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    popoverTitle: {type: String, default: '批量配置极点文本'},
    textPlaceholder: {type: String, default: '请输入需要批量新增加的选项内容，每行一个。'},
    addOrEdit: {type: String, default: 'add'}
  },
  data () {
    return {
      itemIndex: 0,
      moreOptionText: '',
      popoverVisible: false,
      leftText: '',
      rightText: ''
    }
  },
  methods: {
    showPopoverLoad () {
    },
    clickShowPopoverEvent () {
      // 父组件生成父组件的itemIndex, 子组件生成子组件的itemIndex, 最后排除父组件的itemIndex与子组件ItemIndex
      this.$emit('click-item')
      this.survey.questions[this.index].quFocusObj.quScaleTextPopoverShow = true
      this.leftText = null
      this.rightText = null
    },
    cancelAddOptionEvent () {
      // this.upAllItemClick(null)
    },
    upAllItemClick (itemClicks) {
      // upAllItemClick(this.survey, itemClicks, (survey) => { this.survey = survey })
    },
    clickTag (keyword) {
      this.leftText = '很不'+keyword
      this.rightText = '非常'+keyword
    },
    configBtnEvent () {
      // 统一更新左右极点文字
      const survey = this.survey
      const question = survey.questions[this.index]
      const quType = question.quType
      if (quType === 'MATRIX_SCALE' || quType === 'MATRIX_SLIDER') {
        const quRows = question.quRows
        quRows.forEach((quRow, quRowIndex) => {
          // quRow.lr.left.optionTitleObj.dwHtml = this.leftText
          // quRow.lr.left.optionTitleObj.dwText = this.leftText
          // quRow.lr.right.optionTitleObj.dwHtml = this.rightText
          // quRow.lr.right.optionTitleObj.dwText = this.rightText
          quRow.lr.left.optionTitleObj = {dwHtml: this.leftText, dwText: this.leftText, dwPlaceholder: '请输入选项内容', isRefreshValue: true}
          quRow.lr.right.optionTitleObj = {dwHtml: this.rightText, dwText: this.rightText, dwPlaceholder: '请输入选项内容', isRefreshValue: true}
        })
        console.debug('quRows', quRows)
      }
    }
  }
}
</script>
