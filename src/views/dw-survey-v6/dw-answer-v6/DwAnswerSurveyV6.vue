<template>
  <el-row>
    <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 16, offset: 4}" >
      <dw-answer-survey-main></dw-answer-survey-main>
    </el-col>
  </el-row>
</template>

<script>
import DwAnswerSurveyMain from '../../../components/dw-survey-comp/dw-answer-comp/DwAnswerSurveyMain.vue'

export default {
  name: 'DwAnswerSurveyV6',
  components: {DwAnswerSurveyMain}
}
</script>

<style scoped>

</style>
