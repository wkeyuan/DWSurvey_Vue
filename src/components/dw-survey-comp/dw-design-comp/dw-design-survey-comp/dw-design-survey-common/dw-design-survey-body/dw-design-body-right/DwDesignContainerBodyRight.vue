<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="题库">
        <div :style="`height:${lrContentHeight}px;`">
          <dw-design-qu-banks v-model="survey" @start-drag-right="onStartRight" @end-drag="onEnd" ></dw-design-qu-banks>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DwDesignQuBanks from './components/DwDesignQuBanks.vue'

export default {
  name: 'DwDesignContainerBodyRight',
  components: {DwDesignQuBanks},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}},
    lrContentHeight: {type: Number, default: () => {}}
  },
  methods: {
    onStartRight () {
      this.drag=true
      this.$emit('start-drag-right')
    },
    onEnd () {
      this.$emit('end-drag')
      this.drag=false
    }
  }
}
</script>

<style scoped>

</style>
