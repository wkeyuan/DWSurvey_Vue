<template>
  <div>
    <dw-qu-option-common1 v-model="survey.questions[index].quOrderbys" :survey="survey" :index="index" :qu-type="survey.questions[index].quType" ></dw-qu-option-common1>
  </div>
</template>

<script>
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1.vue'
import DwQuOptionCommon2Item from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1Item.vue'
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'

export default {
  name: 'DwQuOrderbyOptions',
  components: {DwQuOptionCommon1, DwQuOptionCommon2Item, DwQuOptionCommon2},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
