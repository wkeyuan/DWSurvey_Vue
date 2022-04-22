<template>
  <div class="dw-qu-item" @click.stop="clickItem" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem" >
    <div class="dw-qu-item-body">
      <div class="dw-qu-item-el-checkbox-radio">
        <i class="dw-qu-item-el-checkbox-radio-icon fa fa-square-o"></i>
        <dw-text-edit-label v-model="options[optionIndex].optionTitle" :item-click="survey.curEditObj[itemIndex].itemClick" @upItemClick="upItemClick" @upValue="upValue" ></dw-text-edit-label>
      </div>
    </div>
    <div v-show="survey.curEditObj[itemIndex].itemClick" class="dw-qu-item-toolbar dw-display-flex-right" >
      <el-tooltip class="item" effect="dark" content="排序选项" placement="top">
        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQuOption dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
        <div class="dw-question-toolbar dw-margin-right-10" @click="addOptionBefore" ><i class="dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
        <div class="dw-question-toolbar dw-margin-right-10"><i class="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i></div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import DwTextEditLabel from '../../dw-design-survey-common/DwTextEditLabel'
export default {
  name: 'DwQuOptionCommon1Item',
  components: {DwTextEditLabel},
  props: {
    optionIndex: {type: Number, default: 0},
    options: {type: Array, default: () => []},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      itemHover: false,
      itemClick: false,
      itemIndex: 0
    }
  },
  methods: {
    clickItem () {
      if (this.itemIndex === 0) {
        this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
      }
      this.survey.curEditObj[this.itemIndex].itemClick = true
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        if (i !== this.itemIndex) {
          this.survey.curEditObj[i].itemClick = false
        }
      }
      // this.$emit('update-survey',this.survey)
    },
    upItemClick (visible) {
      if (this.itemIndex === 0) {
        this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
      }
      this.survey.curEditObj[this.itemIndex].itemClick = true
      // this.$emit('update-survey',this.survey)
    },
    mouseleaveItem () {
      this.itemHover = false
    },
    mouseoverItem () {
      this.itemHover = true
    },
    addOptionBefore () {
      // this.options.push({id:'5',optionTitle:'<p>请设置选项</p>'})
      // this.question.quRadios = this.options;
      // this.$emit('update-survey',this.options)
    },
    upValue (html) {
      // 此处使用了引用类型可以不传更新
    }
  }
}
</script>

<style scoped>
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
.dw-margin-left-10{
  margin-left: 10px;
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
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
.dw-qu-item-body{
  margin: 0px;
}
.dw-qu-item-el-checkbox-radio{
  /*display: inline-flex;*/
  display: flex;
  align-items: center;
  padding: 5px 0px;
  font-size: 14px;
}
.dw-qu-item-el-checkbox-radio-icon{
  /*background: red;*/
  font-size: 18px;
  width: 28px;
  color: #848484;
}
.dw-qu-item-el-checkbox-radio-icon.dw-checked{
  color: #0557a8;
}
.dw-qu-item-el-checkbox-radio .dw-qu-option-text{
  /*margin:auto;*/
  width: 100%;
  padding: 6px;
}

.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
</style>
