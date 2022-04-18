<template>
  <dw-design-qu-radio :index="index" v-model:question="questionObj" ></dw-design-qu-radio>
</template>

<script>
import DwDesignQuRadio from './dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
export default {
  name: 'DwDesignQuestion',
  components: {DwDesignQuRadio},
  props: {
    index: { type: Number, default: 0 },
    question: { type: Object, default: () => {} },
  },
  computed: {
    questionObj: {
      get () {
        return this.question
      },
      set (value) {
        this.$emit('update:question', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
