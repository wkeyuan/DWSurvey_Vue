<template>
  <draggable
    v-model="dragOptions"
    :force-fallback="true"
    :group="{ name: 'qu-option', pull: false, put: false }"
    animation="300"
    handle=".dwMoveSortQuOption"
    tag="tbody"
    drag-class="dwDragClass"
    ghost-class="dwGhostClass"
    chosen-class="dwChosenClass"
    @start="onStart"
    @end="onEnd">
    <tr v-for="(rowOption, rowOptionIndex) in survey.questions[index].quRows" :key="`matrix-rowOption-${rowOptionIndex}`" >
      <td style="text-align: left;width: 20%;" >
        <div style="padding-left: 10px;">
          <dw-row-option-common1-item ref="quCommonItem" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="rowOptionIndex" :qu-type="quType" @refresh-options="refreshOptions" ></dw-row-option-common1-item>
        </div>
      </td>
      <td v-for="(option, colIndex) in survey.questions[index].quCols" v-if="colIndex>0" :key="`matrix-colOption-content-${colIndex}`" style="padding-right: 40px;" class="dwMoveSortQuOption">
        <template v-if="quType === 'MATRIX_RADIO'">
          <el-badge :hidden="!(survey.questions[index].quAttr.scoreAttr.designShowScoreNum && survey.surveyAttrs.scoreAttr.enabled) || option.scoreNum===undefined" :value="`${option.scoreNum}分`" class="dw-el-badge-option-score" type="warning" >
            <i class="dw-qu-item-el-checkbox-radio-icon far fa-circle"></i>
          </el-badge>
        </template>
        <template v-else-if="quType === 'MATRIX_CHECKBOX'">
          <el-badge :hidden="!(survey.questions[index].quAttr.scoreAttr.designShowScoreNum && survey.surveyAttrs.scoreAttr.enabled) || option.scoreNum===undefined" :value="`${option.scoreNum}分`" class="dw-el-badge-option-score" type="warning" >
            <i class="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
          </el-badge>
        </template>
        <template v-else-if="quType === 'MATRIX_INPUT'">
          <el-input></el-input>
        </template>
      </td>
    </tr>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import DwColOptionCommon1Item from './DwColOptionCommon1Item.vue'
import DwRowOptionCommon1Item from './DwRowOptionCommon1Item.vue'

export default {
  name: 'DwRowOptionCommon1',
  components: {DwRowOptionCommon1Item, DwColOptionCommon1Item, draggable},
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
.dw-qu-item-el-checkbox-radio-icon{
  /*background: red;*/
  font-size: 18px;
  width: 28px;
  color: #848484;
}
table,tbody,tr,th,td{
  border: none;
}
td{
  border-top: 1px solid #d8d8d9;
}
</style>
