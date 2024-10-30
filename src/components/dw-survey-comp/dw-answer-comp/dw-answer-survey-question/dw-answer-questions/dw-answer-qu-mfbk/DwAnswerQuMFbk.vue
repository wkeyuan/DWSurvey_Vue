<template>
  <dw-qu-m-fbk-options v-model="survey" :index="index" ></dw-qu-m-fbk-options>
</template>

<script>
import DwQuMFbkOptions from './components/DwQuMFbkOptions.vue'
export default {
  name: 'DwAnswerQuMFbk',
  components: {DwQuMFbkOptions},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  }
}
</script>
