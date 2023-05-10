<template>
  <div @click.stop="clickItem" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem" >
    <dw-text-edit-label v-model="value" :item-click="survey.curEditObj[itemIndex].itemClick" @upItemClick="upItemClick" @upValue="upValue" ></dw-text-edit-label>
  </div>
</template>

<script>
import DwTextEditLabel from './DwTextEditLabel'
export default {
  name: 'DwTextEditLabelCommon',
  components: {DwTextEditLabel},
  model: {
    prop: 'value',
    event: 'update-input'
  },
  props: {
    value: {type: Object, default: () => {}},
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
      console.debug('html', html)
      this.$emit('update-input', html)
    }
  }
}
</script>

<style scoped>

</style>
