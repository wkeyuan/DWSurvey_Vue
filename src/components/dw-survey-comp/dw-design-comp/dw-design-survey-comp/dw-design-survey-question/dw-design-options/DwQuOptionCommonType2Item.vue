<template>
  <div class="dw-qu-item" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem" >
    <div v-show="itemHover" class="dw-qu-item-toolbar" >
      <div class="dw-display-grid">
        <div class="dw-question-toolbar"><i class="dwMoveSortQuOption dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i></div>
        <div @click="addOptionBefore" class="dw-question-toolbar"><i class="dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i></div>
        <div class="dw-question-toolbar"><i class="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i></div>
      </div>
    </div>
    <div class="dw-qu-item-body">
      <div class="dw-qu-item-el-checkbox-radio">
        <i class="dw-qu-item-el-checkbox-radio-icon fa fa-square-o"></i>
<!--        <div :class="itemHover ? 'dw-input-focus':''" class="dw-input-default dw-qu-option-text" contenteditable="true">选项1</div>-->
        <dw-text-edit-label v-model="options[index].optionTitle" btn-size="15px" ></dw-text-edit-label>
      </div>
    </div>
  </div>
</template>

<script>
import DwTextEditLabel from '../../dw-design-survey-common/DwTextEditLabel'
export default {
  name: 'DwQuOptionCommonType2Item',
  components: {DwTextEditLabel},
  props: {
    isToolbar: { type: Boolean, default: true },
    index: { type: Number, default: 0 },
    options: { type: Object, default: () => {} },
    question: { type: Object, default: () => {} },
  },
  model: {
    prop: 'options',
    event: 'update-options'
  },
  data () {
    return {
      itemHover: false,
      itemClick: false,
      text:'aaa',
    }
  },
  methods: {
    clickItem () {
      this.itemClick = true
    },
    blurItem () {
      this.itemClick = false
    },
    mouseleaveItem () {
      this.itemHover = false
    },
    mouseoverItem () {
      this.itemHover = true
    },
    addOptionBefore () {
      this.options.push({id:'5',optionTitle:'<p>请设置选项</p>'})
      // this.question.quRadios = this.options;
      this.$emit('update-options',this.options)
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
  /*justify-content: flex-end;*/
  /*align-items: center;*/
  /*align-content: center;*/
}
.dw-event-color{
  color: #095aaa;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-qu-item{
  /*display: grid;*/
  /*grid-template-columns: auto 90px;*/
  position: relative;
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
.dw-display-grid{
  display: grid;
  grid-template-columns: repeat(3,auto);
  grid-column-gap: 5px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
}
.dw-qu-item-toolbar{
  position: absolute;
  right: 40px;
  top: -20px;
  z-index: 10;
  /*border: 1px solid #095aaa;*/
}
.dw-qu-item-toolbar .dw-question-toolbar{
  padding: 2px 3px 0px 3px;
  /*background: red;*/
  line-height: normal;
}
</style>
