<template>
  <div>
    <dw-survey-dcs-wrapper-v6 :is-survey-chart="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <dw-survey-answer-charts></dw-survey-answer-charts>
      </template>
    </dw-survey-dcs-wrapper-v6>
  </div>
</template>
<script>

import DwSurveyAnswerCharts
  from '../../../components/dw-survey-comp/dw-data-comp/dw-answer-charts-comp/DwSurveyAnswerCharts.vue'
import DwSurveyDcsWrapperV6 from '../../../components/common/DwSurveyDcsWrapperV6.vue'

export default {
  name: 'DwSurveyChartsV6',
  components: {
    DwSurveyDcsWrapperV6,
    DwSurveyAnswerCharts
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
