<template>
  <div>
    <div style="padding: 20px;">
      <el-row :gutter="10">
        <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 16, offset: 4}" >
          <dw-answer-survey-main></dw-answer-survey-main>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import DwAnswerSurveyMain from '../../dw-answer-comp/DwAnswerSurveyMain.vue'

export default {
  name: 'DwSurveyAnswerReview',
  components: {DwAnswerSurveyMain},
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
