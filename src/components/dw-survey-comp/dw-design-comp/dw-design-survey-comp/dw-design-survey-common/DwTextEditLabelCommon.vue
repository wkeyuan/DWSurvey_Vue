<template>
  <!--  @click.stop="clickItem"-->
  <div @click="clickItem" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem" >
    <!--    <dw-text-edit-label ref="curEditLabel" v-model="value" :item-click="survey.curEditObj[itemIndex].itemClick" @upItemClick="upItemClick" @upValue="upValue" ></dw-text-edit-label>-->
    <dw-text-edit-label ref="curEditLabel" v-model="value" :item-status="itemStatus" @upItemClick="upItemClick" @upValue="upValue" ></dw-text-edit-label>
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
    survey: {type: Object, default: () => {}},
    index: {type: Number, default: null}
  },
  data () {
    return {
      itemStatus: {
        itemHover: false,
        itemClick: false
      },
      itemHover: false,
      itemClick: false,
      itemIndex: 0
    }
  },
  methods: {
    clickItem () {
      /*
      if (this.itemIndex === 0) {
        this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
      }
      this.survey.curEditObj[this.itemIndex].itemClick = true
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        if (i !== this.itemIndex) {
          this.survey.curEditObj[i].itemClick = false
        }
      }*/
      // this.$emit('update-survey',this.survey)
      // this.upItemClick(true)
    },
    upItemClick (visible) {
      /*
      if (this.itemIndex === 0) {
        this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
      }
      this.survey.curEditObj[this.itemIndex].itemClick = true*/
      // this.$emit('update-survey',this.survey)
      this.itemStatus.itemClick = visible
    },
    mouseleaveItem () {
      // this.itemHover = false
      this.itemStatus.itemHover = false
    },
    mouseoverItem () {
      // this.itemHover = true
      this.itemStatus.itemHover = true
    },
    addOptionBefore () {
      // this.options.push({id:'5',optionTitle:'<p>请设置选项</p>'})
      // this.question.quRadios = this.options;
      // this.$emit('update-survey',this.options)
    },
    upValue (html) {
      console.debug('html', html)
      this.$emit('update-input', html)
    },
    upEditorText (htmlValue) {
      // console.debug('upEditorText', htmlValue)
      // this.$refs.curEditLabel.upEditorText(htmlValue)
      // this.$refs.curEditLabel.upEditorText(htmlValue)
    },
    editFocus () {
      this.itemStatus.itemClick = true
      this.$refs.curEditLabel.editFocus()
    }
  }
}
</script>
