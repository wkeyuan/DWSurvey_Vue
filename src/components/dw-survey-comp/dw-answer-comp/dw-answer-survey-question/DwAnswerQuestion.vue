<template>
  <div>
    <el-collapse-transition>
      <div v-show="(item.showQu && !item.logicIsHide) || survey.readonly">
        <dw-answer-question-common ref="dwDesignQuestionCommon" v-model="survey" :index="index" >
          <template v-slot:editQuContent>
            <div v-if="item.quType === 'RADIO'">
              <dw-answer-qu-radio ref="dwQuRadio" v-model="survey" :index="index" ></dw-answer-qu-radio>
            </div>
            <div v-if="item.quType === 'CHECKBOX'">
              <dw-answer-qu-checkbox ref="dwQuCheckbox" v-model="survey" :index="index" ></dw-answer-qu-checkbox>
            </div>
            <div v-if="item.quType === 'FILLBLANK'">
              <dw-answer-qu-fbk ref="dwQuFbk" v-model="survey" :index="index" ></dw-answer-qu-fbk>
            </div>
            <div v-if="item.quType === 'SCORE'">
              <dw-answer-qu-score ref="dwQuScore" v-model="survey" :index="index" ></dw-answer-qu-score>
            </div>
            <div v-if="item.quType === 'ORDERQU'">
              <dw-answer-qu-order ref="dwQuOrder" v-model="survey" :index="index" ></dw-answer-qu-order>
            </div>
            <div v-if="item.quType === 'MULTIFILLBLANK'">
              <dw-answer-qu-m-fbk ref="dwQuMfbk" v-model="survey" :index="index" ></dw-answer-qu-m-fbk>
            </div>
            <div v-if="item.quType === 'UPLOADFILE'">
              <dw-answer-qu-upload ref="dwQuUpload" v-model="survey" :index="index" ></dw-answer-qu-upload>
            </div>
            <div v-if="item.quType === 'MATRIX_RADIO'">
              <dw-answer-qu-matrix-radio ref="dwQuMatrixRadio" v-model="survey" :index="index" ></dw-answer-qu-matrix-radio>
            </div>
            <div v-if="item.quType === 'MATRIX_CHECKBOX'">
              <dw-answer-qu-matrix-checkbox ref="dwQuMatrixCheckbox" v-model="survey" :index="index" ></dw-answer-qu-matrix-checkbox>
            </div>
            <div v-if="item.quType === 'MATRIX_INPUT'">
              <dw-answer-qu-matrix-input ref="dwQuMatrixInput" v-model="survey" :index="index" ></dw-answer-qu-matrix-input>
            </div>
            <div v-if="item.quType === 'MATRIX_SCALE'">
              <dw-answer-qu-matrix-scale ref="dwQuMatrixScale" v-model="survey" :index="index" ></dw-answer-qu-matrix-scale>
            </div>
            <div v-if="item.quType === 'MATRIX_SLIDER'">
              <dw-answer-qu-matrix-scale ref="dwQuMatrixSlider" v-model="survey" :index="index" ></dw-answer-qu-matrix-scale>
            </div>
          </template>
        </dw-answer-question-common>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import DwAnswerQuestionCommon from './DwAnswerQuestionCommon.vue'
import DwAnswerQuRadio from './dw-answer-questions/dw-answer-qu-radio/DwAnswerQuRadio.vue'
import DwAnswerQuCheckbox from './dw-answer-questions/dw-answer-qu-checkbox/DwAnswerQuCheckbox.vue'
import DwAnswerQuFbk from './dw-answer-questions/dw-answer-qu-fbk/DwAnswerQuFbk.vue'
import DwAnswerQuScore from './dw-answer-questions/dw-answer-qu-score/DwAnswerQuScore.vue'
import DwAnswerQuOrder from './dw-answer-questions/dw-answer-qu-orderby/DwAnswerQuOrder.vue'
import DwAnswerQuMFbk from './dw-answer-questions/dw-answer-qu-mfbk/DwAnswerQuMFbk.vue'
import DwAnswerQuUpload from './dw-answer-questions/dw-answer-qu-upload/DwAnswerQuUpload.vue'
import {quLogicIsHide} from '../dw-utils/dw-survey-answer-logic'
import DwAnswerQuMatrixRadio
  from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-radio/DwAnswerQuMatrixRadio.vue'
import DwAnswerQuMatrixCheckbox
  from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-checkbox/DwAnswerQuMatrixCheckbox.vue'
import DwAnswerQuMatrixInput
  from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-fbk/DwAnswerQuMatrixInput.vue'
import DwAnswerQuMatrixScale
  from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-scale/DwAnswerQuMatrixScale.vue'

export default {
  name: 'DwAnswerQuestion',
  components: {
    DwAnswerQuMatrixScale,
    DwAnswerQuMatrixInput,
    DwAnswerQuMatrixCheckbox,
    DwAnswerQuMatrixRadio,
    DwAnswerQuUpload,
    DwAnswerQuMFbk,
    DwAnswerQuOrder,
    DwAnswerQuScore, DwAnswerQuFbk, DwAnswerQuCheckbox, DwAnswerQuRadio, DwAnswerQuestionCommon},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    item: {type: Object, default: () => {}},
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  },
  data () {
    return {}
  },
  computed: {
    isLogicHide () {
      const isHide = quLogicIsHide(this.survey, this.item)
      console.debug('isHide', isHide)
      return isHide
    }
  }
}
</script>

<style scoped>

</style>
