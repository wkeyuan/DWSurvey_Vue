<template>
  <div></div>
</template>

<script>

export default {
  name: 'DwAnswerQuMatrixOptionCommon2',
  components: {},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''}
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style>
