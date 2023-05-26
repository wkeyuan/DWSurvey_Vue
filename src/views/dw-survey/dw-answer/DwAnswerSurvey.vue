<template>
  <el-row :gutter="10">
    <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 16, offset: 4}" >
      <dw-answer-survey-main></dw-answer-survey-main>
    </el-col>
  </el-row>
</template>

<script>
import DwAnswerSurveyMain from '../../../components/dw-survey-comp/dw-answer-comp/DwAnswerSurveyMain.vue'
import DwAnswerSurveyBody
  from "../../../components/dw-survey-comp/dw-answer-comp/dw-answer-survey-body/DwAnswerSurveyBody.vue";

export default {
  name: 'DwAnswerSurvey',
  components: {DwAnswerSurveyBody, DwAnswerSurveyMain}
}
</script>

<style scoped>

</style>
