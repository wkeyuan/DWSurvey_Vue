<template>
  <div>
    <draggable
      v-model="dragOptions"
      :force-fallback="true"
      :group="{ name: 'qu-option', pull: false, put: false }"
      animation="300"
      handle=".dwMoveSortQuOption"
      tag="table"
      drag-class="dwDragClass"
      ghost-class="dwGhostClass"
      chosen-class="dwChosenClass"
      @start="onStart"
      @end="onEnd">
      <tbody v-for="(rowOption, rowOptionIndex) in dragOptions" :key="`matrix-rowOption-${rowOption.dwId}`">
        <tr>
          <td>
            <dw-row-option-common2-item ref="quCommonItem" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="rowOptionIndex" :qu-type="quType" value-type="row" @refresh-options="refreshOptions" ></dw-row-option-common2-item>
          </td>
        </tr>
        <tr v-if="quType==='MATRIX_SCALE'" class="dwMoveSortQuOption">
          <td style="padding-right: 40px;">
            <el-button-group v-if="survey.questions[index].quAttr.scaleAttr.min!==undefined && survey.questions[index].quAttr.scaleAttr.max!==undefined">
              <el-button v-for="number in numbers(survey.questions[index].quAttr.scaleAttr.min, survey.questions[index].quAttr.scaleAttr.max)" :key="`scale_${number}`" disabled >{{ number }}</el-button>
            </el-button-group>
          </td>
        </tr>
        <tr v-else-if="quType==='MATRIX_SLIDER'" class="dwMoveSortQuOption" >
          <td v-if="survey.questions[index].quAttr.sliderAttr.min!==undefined && survey.questions[index].quAttr.sliderAttr.max!==undefined" style="padding-right: 40px;" >
            <el-slider v-model="value1" :min="survey.questions[index].quAttr.sliderAttr.min" :max="survey.questions[index].quAttr.sliderAttr.max" :step="survey.questions[index].quAttr.sliderAttr.step" disabled style="width: 600px;margin: 0;" ></el-slider>
          </td>
        </tr>
        <tr v-show="(survey.questions[index].quAttr.scaleAttr!==undefined && survey.questions[index].quAttr.scaleAttr.showLrText) || (survey.questions[index].quAttr.sliderAttr!==undefined && survey.questions[index].quAttr.sliderAttr.showLrText)" style="font-size: 13px;">
          <td>
            <div class="dw-display-flex" style="justify-content: space-between;color: grey;">
              <div>
                <dw-row-option-common2-item ref="quCommonItemLeft" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="rowOptionIndex" :qu-type="quType" value-type="left" @refresh-options="refreshOptions" ></dw-row-option-common2-item>
              </div>
              <div>
                <dw-row-option-common2-item ref="quCommonItemRight" v-model="dragOptions" :survey="survey" :qu-index="index" :option-index="rowOptionIndex" :qu-type="quType" value-type="right" @refresh-options="refreshOptions" ></dw-row-option-common2-item>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </draggable>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import DwRowOptionCommon2Item from './components/DwRowOptionCommon2Item.vue'
import {generateNumbers} from '../../../../../../../dw-utils/dw-common/dw-common-utils'
export default {
  name: 'DwQuMatrixOptionCommon2',
  components: {DwRowOptionCommon2Item, draggable},
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
      value1: 50,
      numbers (start, end) {
        // this.survey.questions[this.index].quAttr.scaleAttr.min
        // this.survey.questions[this.index].quAttr.scaleAttr.max
        return generateNumbers(start, end)
      }
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
table,tbody,tr,th,td{
  border-spacing: 0;
  border: none;
}
td{
  padding: 0;
}
tbody tr:last-child td{
  padding-bottom: 5px;
}
/deep/ .el-slider__runway{
  margin: 0!important;
}
</style>
