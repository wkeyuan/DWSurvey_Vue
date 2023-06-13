<template>
  <div>
    <div>
      <div :style="`grid-template-columns: repeat(${survey.questions[index].cellCount}, minmax(auto,1fr));`" class="dw-grid">
        <div v-for="(item,optionIndex) in options" :key="`quOption1-${index}-${optionIndex}`" style="width: 100%;" >
          <!--            <dw-qu-option-common1-item ref="quCommonItem" v-model="item.optionTitleObj" :survey="survey" :option-index="optionIndex" :qu-type="quType" ></dw-qu-option-common1-item>-->
          <dw-qu-option-common1-item ref="quCommonItem" v-model="survey" :options="options" :qu-index="index" :option-index="optionIndex" :qu-type="quType" @refresh-options="refreshOptions" ></dw-qu-option-common1-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon1Item from './DwQuOptionCommon1Item.vue'

export default {
  name: 'DwQuOptionCommon1',
  components: {DwQuOptionCommon1Item, draggable},
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
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd () {
      this.drag = false
      this.refreshOptions(null)
    },
    upAllItemClick () {
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) if (i !== this.itemIndex) this.survey.curEditObj[i].itemClick = false
    },
    refreshOptions (focusIndex) {
      this.$emit('update-options', this.dragOptions)
      // 先重置所有状态
      this.upAllItemClick()
      this.$nextTick(() => {
        const quCommonItems = this.$refs.quCommonItem
        for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(focusIndex)
      })
    }
  }
}
</script>

<style scoped>

</style>
