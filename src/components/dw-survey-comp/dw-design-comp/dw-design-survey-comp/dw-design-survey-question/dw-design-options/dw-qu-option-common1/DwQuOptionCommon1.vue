<template>
  <div>
    <div>
      <draggable
        v-model="dragOptions"
        :force-fallback="true"
        :group="{ name: 'option', pull: false, put: false }"
        handle=".dwMoveSortQuOption"
        animation="300"
        drag-class="dwDragClass"
        ghost-class="dwGhostClass"
        chosen-class="dwChosenClass"
        @start="onStart"
        @end="onEnd">
        <transition-group :style="`grid-template-columns: repeat(${survey.questions[index].cellCount}, minmax(auto,1fr));`" class="dw-grid">
          <div v-for="(item,optionIndex) in dragOptions" :key="`quOption-${optionIndex}`" style="width: 100%;" >
            <!--            <dw-qu-option-common1-item ref="quCommonItem" v-model="item.optionTitleObj" :survey="survey" :option-index="optionIndex" :qu-type="quType" ></dw-qu-option-common1-item>-->
            <dw-qu-option-common1-item ref="quCommonItem" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="optionIndex" :qu-type="quType" @refresh-options="refreshOptions" ></dw-qu-option-common1-item>
          </div>
        </transition-group>
      </draggable>
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
    prop: 'options',
    event: 'update-options'
  },
  props: {
    index: {type: Number, default: 0},
    options: {type: Array, default: () => []},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''}
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
