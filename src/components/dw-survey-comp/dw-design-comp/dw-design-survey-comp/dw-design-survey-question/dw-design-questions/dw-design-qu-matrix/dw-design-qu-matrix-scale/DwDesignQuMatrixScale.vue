<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'DwDesignQuMatrixScale',
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
