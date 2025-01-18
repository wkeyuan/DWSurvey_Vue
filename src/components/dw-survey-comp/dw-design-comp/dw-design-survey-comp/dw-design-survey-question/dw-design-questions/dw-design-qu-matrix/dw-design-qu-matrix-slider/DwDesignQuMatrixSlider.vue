<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'DwDesignQuMatrixSlider',
  components: {},
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
