<template>
  <dw-design-question-common :index="index" v-model="survey">
    <template v-slot:editQuContent>
      <dw-qu-option-common-type1 v-model="survey.questions[index].quRadios" :question="survey.questions[index]" ></dw-qu-option-common-type1>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuOptionCommonType1 from '../../dw-design-options/DwQuOptionCommonType1'
export default {
  name: 'DwDesignQuRadio',
  components: {DwQuOptionCommonType1, DwDesignQuestionCommon},
  props: {
    index: { type: Number, default: 0 },
    survey: { type: Object, default: () => {} },
  },
  model: {
    prop: 'survey',
    event: 'update-survey',
  }
}
</script>

<style scoped>

</style>
