<template>
  <div>
    <dw-qu-matrix-slider-options v-model="survey" :index="index" ></dw-qu-matrix-slider-options>
  </div>
</template>

<script>

import DwQuMatrixSliderOptions from './components/DwQuMatrixSliderOptions.vue'

export default {
  name: 'DwDesignQuMatrixSlider',
  components: {DwQuMatrixSliderOptions},
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
