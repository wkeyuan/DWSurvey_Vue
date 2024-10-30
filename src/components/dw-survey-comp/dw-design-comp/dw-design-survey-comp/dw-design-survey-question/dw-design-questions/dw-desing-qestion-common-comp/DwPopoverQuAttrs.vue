<template>
  <!--  :value="survey.curEditObj[itemIndex].itemClick"-->
  <el-popover :value="survey.questions[index].quFocusObj.quSetShow" trigger="manual" placement="right-start" width="600" popper-class="dw-qu-set-popper" >
    <dw-qu-attrs v-model="survey" :index="index"></dw-qu-attrs>
    <!--    @click.stop="clickShowPopoverEvent"-->
    <div slot="reference" @click.stop="clickShowPopoverEvent">
      <slot/>
    </div>
  </el-popover>
</template>

<script>
import DwInputProps from './DwInputProps.vue'
import DwQuAttrs from "./dw-qu-attrs/DwQuAttrs.vue";

export default {
  name: 'DwPopoverQuAttrs',
  components: {DwQuAttrs, DwInputProps},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    popoverTitle: {type: String, default: '题目属性'}
  },
  data () {
    return {
      itemIndex: 0,
      checked: true,
      tempForm: {
        selectOptionIndex: 0
      }
    }
  },
  methods: {
    clickShowPopoverEvent () {
      // 父组件生成父组件的itemIndex, 子组件生成子组件的itemIndex, 最后排除父组件的itemIndex与子组件ItemIndex
      this.$emit('click-item')
      /*
      const parentItemIndex = this.survey.questions[this.index].itemIndex
      clickItem(this.survey, this.itemIndex, (survey, itemIndex) => {
        this.survey = survey
        this.itemIndex = itemIndex
      })
      this.upAllItemClick([this.itemIndex, parentItemIndex])
      */
      this.survey.questions[this.index].quFocusObj.quSetShow = true
    },
    cancelAddOptionEvent () {
      // this.survey.curEditObj[this.itemIndex].itemClick = false
      // this.upAllItemClick(null)
    },
    upAllItemClick (itemClicks) {
      // upAllItemClick(this.survey, itemClicks, (survey) => { this.survey = survey })
    }
  }
}
</script>

<style scoped>
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
/deep/ .el-form-item__label{
  color: #333;
}
</style>
