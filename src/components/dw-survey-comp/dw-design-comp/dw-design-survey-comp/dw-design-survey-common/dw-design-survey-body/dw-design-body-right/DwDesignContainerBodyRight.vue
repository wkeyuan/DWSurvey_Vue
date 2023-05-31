<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="题库">
        <dw-design-qu-banks v-model="survey"></dw-design-qu-banks>
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
    survey: {type: Object, default: () => {}}
  }
}
</script>

<style scoped>

</style>
