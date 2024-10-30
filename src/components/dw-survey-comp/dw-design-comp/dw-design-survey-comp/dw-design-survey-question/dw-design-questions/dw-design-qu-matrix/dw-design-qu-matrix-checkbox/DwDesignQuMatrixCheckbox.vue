<template>
  <div>
    <dw-qu-matrix-option-common1 v-model="survey" :index="index" ></dw-qu-matrix-option-common1>
  </div>
</template>

<script>
import DwQuMatrixOptionCommon1 from '../common/dw-design-matrix-common1/DwQuMatrixOptionCommon1.vue'

export default {
  name: 'DwDesignQuMatrixCheckbox',
  components: {DwQuMatrixOptionCommon1},
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
