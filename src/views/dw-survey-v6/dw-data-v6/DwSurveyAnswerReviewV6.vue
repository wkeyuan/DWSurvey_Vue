<template>
  <dw-survey-answer-review :pad-phone-an-body-span="padPhoneAnBodySpan"></dw-survey-answer-review>
</template>

<script>
import DwSurveyAnswerReview
  from '../../../components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerReview.vue'

export default {
  name: 'DwSurveyAnswerReviewV6',
  components: {DwSurveyAnswerReview},
  data () {
    return {
      padPhoneAnBodySpan: {
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
        md: {span: 20, offset: 2},
        lg: {span: 16, offset: 4},
        xl: {span: 12, offset: 6}
      }
    }
  }
}
</script>

<style scoped>

</style>
