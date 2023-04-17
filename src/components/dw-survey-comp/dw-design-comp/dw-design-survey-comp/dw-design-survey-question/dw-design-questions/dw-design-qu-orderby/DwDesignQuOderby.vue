<template>
  <dw-design-question-common v-model="survey" :index="index" >
    <template v-slot:editQuContent>
      <dw-qu-orderby-options v-model="survey" :index="index" ></dw-qu-orderby-options>
    </template>
  </dw-design-question-common>
</template>

<script>

import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuOptionCommon1 from '../../dw-design-options/DwQuOptionCommon1'
import DwQuOrderbyOptions from './components/DwQuOrderbyOptions'

export default {
  name: 'DwDesignQuOderby',
  components: {DwQuOrderbyOptions, DwQuOptionCommon1, DwDesignQuestionCommon},
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
