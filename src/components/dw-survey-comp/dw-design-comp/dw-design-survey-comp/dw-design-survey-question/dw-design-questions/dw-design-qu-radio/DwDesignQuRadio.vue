<template>
  <dw-design-question-common v-model="survey" :index="index" >
    <template v-slot:editQuContent>
      <dw-qu-radio-options v-model="survey" :index="index" ></dw-qu-radio-options>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuOptionCommon1 from '../../dw-design-options/DwQuOptionCommon1'
import DwQuRadioOptions from './components/DwQuRadioOptions'
export default {
  name: 'DwDesignQuRadio',
  components: {DwQuRadioOptions, DwQuOptionCommon1, DwDesignQuestionCommon},
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
