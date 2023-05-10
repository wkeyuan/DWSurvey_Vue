<template>
  <dw-design-question-common :index="index" v-model="survey">
    <template v-slot:editQuContent>
      <dw-qu-score-options v-model="survey" :index="index" ></dw-qu-score-options>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuMFbkOptions from './components/DwQuScoreOptions.vue'
import DwQuScoreOptions from "./components/DwQuScoreOptions.vue";
export default {
  name: 'DwDesignQuScore',
  components: {DwQuScoreOptions, DwQuMFbkOptions, DwDesignQuestionCommon},
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
