<template>
  <div>
    <dw-survey-dcs-wrapper-v6 :is-answer-data="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div v-if="thSurvey!==null">
          <dw-survey-answer-data-list :survey="thSurvey"></dw-survey-answer-data-list>
        </div>
      </template>
    </dw-survey-dcs-wrapper-v6>

  </div>
</template>
<script>

import DwSurveyAnswerDataList
  from '../../../components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerDataList.vue'
import DwSurveyDcsWrapperV6 from '../../../components/common/DwSurveyDcsWrapperV6.vue'
import {
  getDesignSurveyJsonBySurveyId,
  getSurveyTypeSimpleName
} from "../../../components/dw-survey-comp/dw-utils/dw-survey-common";

export default {
  name: 'DwSurveyAnswerDataListV6',
  components: {
    DwSurveyDcsWrapperV6,
    DwSurveyAnswerDataList
  },
  data () {
    return {
      thSurvey: null
    }
  },
  mounted () {
    this.getSurveyInfoV6()
  },
  methods: {
    getSurveyInfoV6 () {
      const surveyId = this.$route.params.dwSurveyId
      const params = {surveyId}
      getDesignSurveyJsonBySurveyId(params, (survey) => {
        console.debug('design survey', survey)
        this.thSurvey = survey
      })
    }
  }
}

</script>
<style scoped>
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
