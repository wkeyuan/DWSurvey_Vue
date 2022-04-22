<template>
  <div>
    <div v-if="item.quType === 'RADIO'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'CHECKBOX'">
      <dw-design-qu-checkbox :index="index" v-model="survey" ></dw-design-qu-checkbox>
    </div>
    <div v-if="item.quType === 'FILLBLANK'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'SCORE'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'ORDERQU'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'MULTIFILLBLANK'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
    <div v-if="item.quType === 'UPLOADFILE'">
      <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
    </div>
  </div>
</template>

<script>

import DwDesignQuRadio from './dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwDesignQuCheckbox from './dw-design-questions/dw-design-qu-checkbox/DwDesignQuCheckbox'

export default {
  name: 'DwDesignQuestion',
  components: {DwDesignQuCheckbox, DwDesignQuRadio},
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
