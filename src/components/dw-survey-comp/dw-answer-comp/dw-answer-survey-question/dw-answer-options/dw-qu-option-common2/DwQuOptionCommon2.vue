<template>
  <div>
    <div v-for="(item,optionIndex) in options" :key="`quOption2-${index}-${optionIndex}`" >
      <dw-qu-option-common2-item ref="quCommonItem" v-model="survey" :options="options" :qu-index="index" :option-index="optionIndex" :qu-type="quType" @refresh-options="refreshOptions" ></dw-qu-option-common2-item>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon2Item from './DwQuOptionCommon2Item.vue'

export default {
  name: 'DwQuOptionCommon2',
  components: {DwQuOptionCommon2Item, draggable},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    options: {type: Array, default: () => []},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''},
    answer: {type: Object, default: () => {}}
  },
  data () {
    return {
      dragOptions: this.options,
      drag: false
    }
  },
  watch: {
    options: function (newValue, oldValue) {
      // console.log('firstName changed from ' + oldValue + ' to ' + newValue)
      // this.dragOptions = newValue
      // const quCommonItems = this.$refs.quCommonItem
      // for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(null)
      this.refreshData()
    }
  },
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd () {
      this.drag = false
      this.refreshOptions(null)
    },
    upAllItemClick () {
      // const curObjs = this.survey.curEditObj
      // for (let i = 0; i < curObjs.length; i++) if (i !== this.itemIndex) this.survey.curEditObj[i].itemClick = false
    },
    refreshOptions (focusIndex) {
      this.$emit('update-options', this.dragOptions)
      // 关于状态的刷新，除通过方法调用硬刷新，还可以通过选项数据上绑定的itemClick实现
      // 先重置所有状态
      this.upAllItemClick()
      this.$nextTick(() => {
        const quCommonItems = this.$refs.quCommonItem
        for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(focusIndex)
      })
    },
    refreshData () {
      // 外层option发生变动时同步刷新
      this.dragOptions = this.options
    }
  }
}
</script>

<style scoped>

</style>
