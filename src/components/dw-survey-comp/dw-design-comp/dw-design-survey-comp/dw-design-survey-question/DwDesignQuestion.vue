<template>
  <div>
    <dw-design-question-common ref="dwDesignQuestionCommon" v-model="survey" :index="index" >
      <template v-slot:editQuContent>
        <div v-if="item.quType === 'RADIO'">
          <dw-design-qu-radio ref="dwQuRadio" :index="index" v-model="survey" ></dw-design-qu-radio>
        </div>
        <div v-else-if="item.quType === 'CHECKBOX'">
          <dw-design-qu-checkbox ref="dwQuCheckbox" :index="index" v-model="survey" ></dw-design-qu-checkbox>
        </div>
        <div v-else-if="item.quType === 'FILLBLANK'">
          <dw-design-qu-fbk ref="dwQuFbk" :index="index" v-model="survey" ></dw-design-qu-fbk>
        </div>
        <div v-else-if="item.quType === 'SCORE'">
          <dw-design-qu-score ref="dwQuScore" :index="index" v-model="survey" ></dw-design-qu-score>
        </div>
        <div v-else-if="item.quType === 'ORDERQU'">
          <dw-design-qu-oderby ref="dwQuOderby" :index="index" v-model="survey" ></dw-design-qu-oderby>
        </div>
        <div v-else-if="item.quType === 'MULTIFILLBLANK'">
          <dw-design-qu-m-fbk ref="dwQuMfbk" :index="index" v-model="survey" ></dw-design-qu-m-fbk>
        </div>
        <div v-else-if="item.quType === 'UPLOADFILE'">
          <dw-design-qu-upload ref="dwQuUpload" :index="index" v-model="survey" ></dw-design-qu-upload>
        </div>
        <div v-else-if="item.quType === 'PAGETAG'">
          <dw-design-qu-page ref="dwQuPage" :index="index" v-model="survey" ></dw-design-qu-page>
        </div>
        <div v-else-if="item.quType === 'PARAGRAPH'">
          <dw-design-qu-paragraph ref="dwQuUpload" :index="index" v-model="survey" ></dw-design-qu-paragraph>
        </div>
        <div v-else-if="item.quType === 'MATRIX_RADIO'">
          <dw-design-qu-matrix-radio ref="dwQuMatrixRadio" :index="index" v-model="survey" ></dw-design-qu-matrix-radio>
        </div>
        <div v-else-if="item.quType === 'MATRIX_CHECKBOX'">
          <dw-design-qu-matrix-checkbox ref="dwQuMatrixCheckbox" :index="index" v-model="survey" ></dw-design-qu-matrix-checkbox>
        </div>
        <div v-else-if="item.quType === 'MATRIX_INPUT'">
          <dw-design-qu-matrix-fbk ref="dwQuMatrixCheckbox" :index="index" v-model="survey" ></dw-design-qu-matrix-fbk>
        </div>
        <div v-else-if="item.quType === 'MATRIX_SCALE'">
          <dw-design-qu-matrix-scale ref="dwQuMatrixScale" :index="index" v-model="survey" ></dw-design-qu-matrix-scale>
        </div>
        <div v-else-if="item.quType === 'MATRIX_SLIDER'">
          <dw-design-qu-matrix-slider ref="dwQuMatrixSlider" :index="index" v-model="survey" ></dw-design-qu-matrix-slider>
        </div>
      </template>
    </dw-design-question-common>
  </div>
</template>

<script>

import DwDesignQuRadio from './dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwDesignQuCheckbox from './dw-design-questions/dw-design-qu-checkbox/DwDesignQuCheckbox'
import DwDesignQuFbk from './dw-design-questions/dw-design-qu-fbk/DwDesignQuFbk'
import DwDesignQuOderby from './dw-design-questions/dw-design-qu-orderby/DwDesignQuOderby'
import DwDesignQuMFbk from './dw-design-questions/dw-design-qu-mfbk/DwDesignQuMFbk.vue'
import DwDesignQuUpload from './dw-design-questions/dw-design-qu-upload/DwDesignQuUpload'
import DwDesignQuScore from './dw-design-questions/dw-design-qu-score/DwDesignQuScore.vue'
import DwDesignQuestionCommon from './DwDesignQuestionCommon.vue'
import DwQuRadioOptions from './dw-design-questions/dw-design-qu-radio/components/DwQuRadioOptions.vue'
import DwDesignQuPage from './dw-design-questions/dw-design-qu-pagetag/DwDesignQuPage.vue'
import DwDesignQuParagraph from './dw-design-questions/dw-design-paragraph/DwDesignQuParagraph.vue'
import DwDesignQuMatrixRadio
  from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-radio/DwDesignQuMatrixRadio.vue'
import DwDesignQuMatrixCheckbox
  from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-checkbox/DwDesignQuMatrixCheckbox.vue'
import DwDesignQuMatrixFbk
  from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-fbk/DwDesignQuMatrixFbk.vue'
import DwDesignQuMatrixScale
  from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-scale/DwDesignQuMatrixScale.vue'
import DwDesignQuMatrixSlider
  from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-slider/DwDesignQuMatrixSlider.vue'

export default {
  name: 'DwDesignQuestion',
  components: {
    DwDesignQuMatrixSlider,
    DwDesignQuMatrixScale,
    DwDesignQuMatrixFbk,
    DwDesignQuMatrixCheckbox,
    DwDesignQuMatrixRadio,
    DwDesignQuParagraph,
    DwDesignQuPage,
    DwQuRadioOptions,
    DwDesignQuestionCommon,
    DwDesignQuScore,
    DwDesignQuUpload, DwDesignQuMFbk, DwDesignQuOderby, DwDesignQuFbk, DwDesignQuCheckbox, DwDesignQuRadio},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    item: {type: Object, default: () => {}},
    survey: {type: Object, default: () => {}}
  }
}
</script>

<style scoped>

</style>
