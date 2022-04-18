<template>
  <div>
    <dw-design-qu-radio :index="index" v-model="survey" ></dw-design-qu-radio>
  </div>
</template>

<script>

import DwDesignQuRadio from './dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'

export default {
  name: 'DwDesignQuestion',
  components: {DwDesignQuRadio},
  props: {
    index: { type: Number, default: 0 },
    survey: { type: Object, default: () => { } },
  },
  model: {
    prop: 'survey',
    event: 'update-survey',
  }
}
</script>

<style scoped>

</style>
