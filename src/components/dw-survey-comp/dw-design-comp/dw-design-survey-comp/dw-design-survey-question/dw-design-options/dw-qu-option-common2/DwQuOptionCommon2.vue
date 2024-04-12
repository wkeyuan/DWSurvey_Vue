<template>
  <div>
    <draggable
      v-model="dragOptions"
      :force-fallback="true"
      :group="{ name: 'qu-option', pull: false, put: false }"
      handle=".dwMoveSortQuOption"
      animation="300"
      drag-class="dwDragClass"
      ghost-class="dwGhostClass"
      chosen-class="dwChosenClass"
      @start="onStart"
      @end="onEnd">
      <transition-group>
        <div v-for="(item,optionIndex) in dragOptions" :key="`quOption-${optionIndex}`" >
          <dw-qu-option-common2-item ref="quCommonItem" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="optionIndex" :qu-type="quType" @refresh-options="refreshOptions" ></dw-qu-option-common2-item>
        </div>
      </transition-group>
    </draggable>
    <!--    <div style="background: #014ab6;">
      <div v-for="(item,optionIndex) in dragOptions" :key="`a11aquOption-${optionIndex}`" >
        <div style="border: 1px solid #ad4f74;">{{ item.optionTitleObj.dwHtml }}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon2Item from './DwQuOptionCommon2Item.vue'

export default {
  name: 'DwQuOptionCommon2',
  components: {DwQuOptionCommon2Item, draggable},
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
      // const curObjs = this.survey.curEditObj
      // for (let i = 0; i < curObjs.length; i++) if (i !== this.itemIndex) this.survey.curEditObj[i].itemClick = false
    },
    refreshOptions (focusIndex) {
      this.$emit('update-options', this.dragOptions)
      // 关于状态的刷新，除通过方法调用硬刷新，还可以通过选项数据上绑定的itemClick实现
      // 先重置所有状态
      // this.upAllItemClick()
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
