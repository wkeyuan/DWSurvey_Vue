<template>
  <dw-design-question-common v-model="survey" :index="index" >
    <template v-slot:editQuContent>
      <div style="padding: 10px 0;" class="dw-qu-item">
        <el-input v-model="inputText" placeholder="请输入内容" style="width: 50%;" />
      </div>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwDesignQuestionCommon from '../../DwDesignQuestionCommon'
import DwQuOptionCommon1 from '../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'
export default {
  name: 'DwDesignQuFbk',
  components: {DwDesignQuestionCommon},
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
      inputText: ''
    }
  }
}
</script>

<style scoped>
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
</style>
