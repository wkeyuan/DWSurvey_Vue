<template>
  <dw-design-question-common :index="index" v-model="survey">
    <template v-slot:editQuContent>
      <dw-qu-m-fbk-options v-model="survey" :index="index" ></dw-qu-m-fbk-options>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuMFbkOptions from './components/DwQuMFbkOptions.vue'
export default {
  name: 'DwDesignQuMFbk',
  components: {DwQuMFbkOptions, DwDesignQuestionCommon},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  }
}
</script>

<style scoped>

</style>
