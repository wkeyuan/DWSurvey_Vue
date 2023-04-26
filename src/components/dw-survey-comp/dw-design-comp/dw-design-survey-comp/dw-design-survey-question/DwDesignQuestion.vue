<template>
  <div>
    <div v-if="item.quType === 'RADIO'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'CHECKBOX'">
      <dw-design-qu-checkbox :index="index" v-model="survey" ></dw-design-qu-checkbox>
    </div>
    <div v-if="item.quType === 'FILLBLANK'">
      <dw-design-qu-fbk :index="index" v-model="survey" ></dw-design-qu-fbk>
    </div>
    <div v-if="item.quType === 'SCORE'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'ORDERQU'">
      <dw-design-qu-oderby :index="index" v-model="survey" ></dw-design-qu-oderby>
    </div>
    <div v-if="item.quType === 'MULTIFILLBLANK'">
      <dw-design-qu-m-fbk :index="index" v-model="survey" ></dw-design-qu-m-fbk>
    </div>
    <div v-if="item.quType === 'UPLOADFILE'">
      <dw-design-qu-upload :index="index" v-model="survey" ></dw-design-qu-upload>
    </div>
  </div>
</template>

<script>

import DwDesignQuRadio from './dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwDesignQuCheckbox from './dw-design-questions/dw-design-qu-checkbox/DwDesignQuCheckbox'
import DwDesignQuFbk from './dw-design-questions/dw-design-qu-fbk/DwDesignQuFbk'
import DwDesignQuOderby from './dw-design-questions/dw-design-qu-orderby/DwDesignQuOderby'
import DwDesignQuMFbk from "./dw-design-questions/dw-design-qu-mfbk/DwDesignQuMFbk.vue";
import DwDesignQuUpload from './dw-design-questions/dw-design-qu-upload/DwDesignQuUpload'

export default {
  name: 'DwDesignQuestion',
  components: {DwDesignQuUpload, DwDesignQuMFbk, DwDesignQuOderby, DwDesignQuFbk, DwDesignQuCheckbox, DwDesignQuRadio},
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
