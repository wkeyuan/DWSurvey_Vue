<template>
  <dw-design-question-common :index="index" v-model="survey">
    <template v-slot:editQuContent>
      <dw-qu-option-common-type2 v-model="survey.questions[index].quRadios" :question="survey.questions[index]" ></dw-qu-option-common-type2>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwQuOptionCommonType1 from '../../dw-design-options/DwQuOptionCommonType1'
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuOptionCommonType2 from '../../dw-design-options/DwQuOptionCommonType2'
export default {
  name: 'DwDesignQuCheckbox',
  components: {DwQuOptionCommonType2, DwQuOptionCommonType1, DwDesignQuestionCommon},
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
