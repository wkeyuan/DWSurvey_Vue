<template>
  <div>
    <dw-survey-dcs-wrapper :is-survey-chart="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <dw-survey-answer-charts></dw-survey-answer-charts>
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import DwSurveyAnswerCharts
  from '../../../components/dw-survey-comp/dw-data-comp/dw-answer-charts-comp/DwSurveyAnswerCharts.vue'

export default {
  name: 'DwSurveyChartsV6',
  components: {
    DwSurveyAnswerCharts,
    DwSurveyDcsWrapper
  },
  data () {
    return {
      questions: [],
      loading: true
    }
  },
  mounted () {
  },
  methods: {
  }
}

</script>
