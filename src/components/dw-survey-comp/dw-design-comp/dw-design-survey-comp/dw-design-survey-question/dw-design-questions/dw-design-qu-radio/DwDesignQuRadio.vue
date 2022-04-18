<template>
  <dw-design-question-common :index="index" v-model:question="questionObj">
    <template v-slot:editQuContent>
      <dw-qu-option-common-type1></dw-qu-option-common-type1>
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
    question: { type: Object, default: () => {} },
  },
  computed: {
    questionObj: {
      get () {
        return this.question
      },
      set (value) {
        this.$emit('update:question', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
