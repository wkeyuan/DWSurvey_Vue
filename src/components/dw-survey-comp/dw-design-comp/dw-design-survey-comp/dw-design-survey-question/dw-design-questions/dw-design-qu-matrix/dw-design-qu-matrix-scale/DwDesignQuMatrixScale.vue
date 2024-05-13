<template>
  <div>
    <dw-qu-matrix-scale-options v-model="survey" :index="index" ></dw-qu-matrix-scale-options>
  </div>
</template>

<script>
import DwQuMatrixScaleOptions from './components/DwQuMatrixScaleOptions.vue'

export default {
  name: 'DwDesignQuMatrixScale',
  components: {DwQuMatrixScaleOptions},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
