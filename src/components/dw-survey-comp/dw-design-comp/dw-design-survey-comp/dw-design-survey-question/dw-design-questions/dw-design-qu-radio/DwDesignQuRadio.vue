<template>
  <dw-qu-radio-options v-model="survey" :index="index" ></dw-qu-radio-options>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuOptionCommon1 from '../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'
import DwQuRadioOptions from './components/DwQuRadioOptions'
import DwDesignQuestionBottomType1 from '../../dw-design-common/DwDesignQuestionBottomType1'
export default {
  name: 'DwDesignQuRadio',
  components: {DwDesignQuestionBottomType1, DwQuRadioOptions, DwQuOptionCommon1, DwDesignQuestionCommon},
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
