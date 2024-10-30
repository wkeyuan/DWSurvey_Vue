<template>
  <dw-qu-checkbox-options ref="dwQuestion" v-model="survey" :index="index" ></dw-qu-checkbox-options>
</template>

<script>
import DwQuCheckboxOptions from './components/DwQuCheckboxOptions'
export default {
  name: 'DwAnswerQuCheckbox',
  components: {DwQuCheckboxOptions},
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
