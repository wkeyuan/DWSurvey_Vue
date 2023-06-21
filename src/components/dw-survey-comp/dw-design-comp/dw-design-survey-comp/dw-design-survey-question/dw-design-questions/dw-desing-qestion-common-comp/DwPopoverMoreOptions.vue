<template>
  <el-popover :value="survey.curEditObj[itemIndex].itemClick" placement="bottom-start" width="400" trigger="manual" popper-class="dw-popover-more-options" @show="showPopoverLoad" >
    <div>
      <div style="font-size: 14px;padding-bottom: 5px;">{{ popoverTitle }}</div>
      <el-input v-model="moreOptionText" :placeholder="textPlaceholder" type="textarea" rows="10" ></el-input>
      <div style="text-align: right;">
        <el-button type="text" size="small" style="margin-top:5px;" @click="cancelAddOptionEvent">取消</el-button>
        <el-button type="primary" size="small" style="margin-top:5px;" @click="addMoreOptionEvent">确认</el-button>
      </div>
    </div>
    <div slot="reference" @click.stop="clickShowPopoverEvent">
      <slot/>
    </div>
  </el-popover>
</template>

<script>
import {dwOption2Texts, dwResetQuOptions, dwSurveyQuAddOption} from '../../../../../dw-utils/dw-survey-update-question'
import {clickItem, upAllItemClick} from '../../../../../dw-utils/dw-survey-update-item-click'
import {v4 as uuidV4} from "uuid";

export default {
  name: 'DwPopoverMoreOptions',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    popoverTitle: {type: String, default: '批量增加选项'},
    textPlaceholder: {type: String, default: '请输入需要批量新增加的选项内容，每行一个。'},
    addOrEdit: {type: String, default: 'add'}
  },
  data () {
    return {
      itemIndex: 0,
      moreOptionText: ''
    }
  },
  methods: {
    showPopoverLoad () {
      if (this.addOrEdit === 'edit') {
        // options 转换成 text
        this.moreOptionText = dwOption2Texts(this.survey, this.index)
      }
    },
    clickShowPopoverEvent () {
      // 父组件生成父组件的itemIndex, 子组件生成子组件的itemIndex, 最后排除父组件的itemIndex与子组件ItemIndex
      this.$emit('click-item')
      const parentItemIndex = this.survey.questions[this.index].itemIndex
      clickItem(this.survey, this.itemIndex, (survey, itemIndex) => {
        this.survey = survey
        this.itemIndex = itemIndex
      })
      this.upAllItemClick([this.itemIndex, parentItemIndex])
    },
    cancelAddOptionEvent () {
      this.upAllItemClick(null)
    },
    upAllItemClick (itemClicks) {
      upAllItemClick(this.survey, itemClicks, (survey) => { this.survey = survey })
    },
    addMoreOptionEvent () {
      if (this.moreOptionText.length > 0) {
        const options = this.moreOptionText.split(/\r\n|[\r\n]/)
        if (options !== undefined && options.length > 0) {
          // 如果是修改先重置
          if (this.addOrEdit === 'edit') dwResetQuOptions(this.survey, this.index, (survey) => { this.survey = survey })
          for (let i=0; i<options.length; i++) {
            const quOption = {id: null, optionTitleObj: {dwHtml: options[i], dwText: options[i], dwPlaceholder: '请输入内容'}, itemClick: false}
            quOption.dwId = uuidV4()
            this.dwAddQuItem(quOption)
          }
          this.survey.curEditObj[this.itemIndex].itemClick = false
          this.moreOptionText = ''
        }
      }
    },
    dwAddQuItem (quOption) {
      const newSurvey = dwSurveyQuAddOption(this.survey, this.index, quOption)
      this.$emit('update-survey', newSurvey)
    }
  }
}
</script>

<style scoped>

</style>
<style>

</style>
