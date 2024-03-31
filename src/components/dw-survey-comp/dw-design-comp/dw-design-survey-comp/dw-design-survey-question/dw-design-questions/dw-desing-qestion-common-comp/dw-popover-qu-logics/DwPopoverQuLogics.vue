<template>
  <el-popover :value="popoverValue" placement="right-start" width="700" trigger="manual" popper-class="dw-qu-set-popper" @show="showPopoverLoad" >
    <div>
      <div>

        <el-tabs v-model="activeName" :before-leave="beforeLeave" >
          <el-tab-pane label="显示逻辑" name="logicShowTab">
            <span slot="label">显示逻辑&nbsp;<el-badge :value="logicNumShow" :hidden="logicNumShow<=0" class="mark" /></span>
            <dw-qu-logic-show-go v-model="survey" :index="index" logic-type="SHOW"></dw-qu-logic-show-go>
          </el-tab-pane>
          <el-tab-pane label="跳转逻辑" name="logicGoTab">
            <span slot="label">跳转逻辑&nbsp;<el-badge :value="logicNumGo" :hidden="logicNumGo<=0" class="mark" /></span>
            <dw-qu-logic-show-go v-model="survey" :index="index" logic-type="GO"></dw-qu-logic-show-go>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div slot="reference" @click.stop="clickShowPopoverEvent">
      <slot/>
    </div>
  </el-popover>
</template>

<script>
import {clickItem, upAllItemClick} from '../../../../../../dw-utils/dw-survey-update-item-click'
import DwQuLogicShowGo from './componets/DwQuLogicShowGo.vue'
import {logicNum} from '../../../../../../dw-utils/dw-survey-design'

export default {
  name: 'DwPopoverQuLogics',
  components: {DwQuLogicShowGo},
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
      activeName: 'logicShowTab'
    }
  },
  computed: {
    logicNumGo () {
      return logicNum(this.survey.questions[this.index].questionLogics, 'GO')
    },
    logicNumShow () {
      return logicNum(this.survey.questions[this.index].questionLogics, 'SHOW')
    },
    popoverValue () {
      if (!this.checkQuLogic(!this.survey.curEditObj[this.itemIndex].itemClick)) return true
      return this.survey.curEditObj[this.itemIndex].itemClick
    }
  },
  methods: {
    showPopoverLoad () {
      const questionLogics = this.survey.questions[this.index].questionLogics
      let isLogicGo = false
      let isLogicShow = false
      questionLogics.forEach((item, index) => {
        if (item.logicType === 'GO') isLogicGo = true
        if (item.logicType === 'SHOW') isLogicShow = true
      })
      if (isLogicShow) {
        this.activeName = 'logicShowTab'
      } else if (isLogicGo) {
        this.activeName = 'logicGoTab'
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
    upAllItemClick (itemClicks) {
      upAllItemClick(this.survey, itemClicks, (survey) => { this.survey = survey })
    },
    beforeLeave (activeName, oldActiveName) {
      return this.checkQuLogic(true)
    },
    checkQuLogic (isShowMsg) {
      let checkQuLogic = true
      if (this.survey.questions[this.index].questionLogics.length>0) {
        const quType = this.survey.questions[this.index].quType
        const quLogics = this.survey.questions[this.index].questionLogics
        quLogics.forEach((item, index) => {
          let itemError = false
          if (quType=== 'FILLBLANK' || quType === 'UPLOADFILE') {
            if (item.skQuId === null || item.skQuId.length<=0) itemError = true
          } else {
            if (item.cgQuItemId === null || item.skQuId === null || item.cgQuItemId.length <= 0 || item.skQuId.length<=0) itemError = true
          }
          if (itemError) {
            if (isShowMsg) {
              item.error = true
              checkQuLogic = false
            }
          } else {
            item.error = false
          }
        })
        if (!checkQuLogic) {
          if (isShowMsg) {
            this.$message({
              message: '提醒，如果增加了逻辑配置项，请确认每个配置项都有合适的值！',
              customClass: 'dw-msg-waring',
              iconClass: 'el-icon-info'
            })
          }
          // itemClick 修改为 true
          // this.popoverItemClick(true)
          this.clickShowPopoverEvent()
        }
      }
      return checkQuLogic
    }
  }
}
</script>

<style scoped>

</style>
<style>
.dw-msg-waring .el-icon-info,.dw-msg-waring .el-message__content{
  color: #fd5757;
  padding: 5px;
}
</style>
