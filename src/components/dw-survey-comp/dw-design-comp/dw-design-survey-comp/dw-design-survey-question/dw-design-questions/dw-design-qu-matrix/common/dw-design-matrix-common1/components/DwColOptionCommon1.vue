<template>
  <tbody>
    <draggable
      v-model="dragOptions"
      :force-fallback="true"
      :group="{ name: 'qu-option', pull: false, put: false }"
      animation="300"
      handle=".dwMoveSortQuOption"
      draggable=".sortMatrixTd"
      tag="tr"
      drag-class="dwDragClass"
      ghost-class="dwGhostClass"
      chosen-class="dwChosenClass"
      @start="onStart"
      @end="onEnd">
      <td v-for="(colOption, optionIndex) in dragOptions" :key="`${colOption.dwId}`" :class="colOption.tempEmptyOption ? 'undrag dw-position-sticky': 'sortMatrixTd'" scope="col" class="matrix-title-td">
        <dw-col-option-common1-item v-if="optionIndex>0" ref="quCommonItem" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="optionIndex" :qu-type="quType" @refresh-options="refreshOptions" ></dw-col-option-common1-item>
      </td>
    </draggable>
  </tbody>
</template>

<script>
import draggable from 'vuedraggable'
import DwColOptionCommon1Item from './DwColOptionCommon1Item.vue'

export default {
  name: 'DwColOptionCommon1',
  components: {DwColOptionCommon1Item, draggable},
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
      drag: false,
      headers: ['id', 'name', 'sport'],
      list: [
        {id: 1, name: 'Abby', sport: 'basket'},
        {id: 2, name: 'Brooke', sport: 'foot'},
        {id: 3, name: 'Courtenay', sport: 'volley'},
        {id: 4, name: 'David', sport: 'rugby'}
      ]
    }
  },
  watch: {
    options: function (newValue, oldValue) {
      // this.dragOptions = newValue
      // const quCommonItems = this.$refs.quCommonItem
      // for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(null)
      console.debug('index', this.index)
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
      // 先重置所有状态
      /*
      this.$nextTick(() => {
        const quCommonItems = this.$refs.quCommonItem
        for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].dragClick(focusIndex)
      })*/
    },
    refreshData () {
      // 外层option发生变动时同步刷新
      this.dragOptions = this.options
      /*
      if (this.survey.isRefreshAllQu) {
        this.refreshOptions(null)
        this.survey.isRefreshAllQu = false
      }*/
    }
  }
}
</script>

<style scoped>
tbody tr:last-child{
  background-color: #d8d8d9;
}
td{
  background-color: #d8d8d9;
}
.dw-position-sticky{
  position: sticky;left: 0;z-index: 1;
}
.matrix-title-td {
  white-space: nowrap;
}
</style>
