<template>
  <dw-design-question-common :index="index" v-model="survey">
    <template v-slot:editQuContent>
      <dw-qu-checkbox-options v-model="survey" :index="index" ></dw-qu-checkbox-options>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuCheckboxOptions from './components/DwQuCheckboxOptions'
export default {
  name: 'DwDesignQuCheckbox',
  components: {DwQuCheckboxOptions, DwDesignQuestionCommon},
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
