<template>
  <div>
    <dw-survey-dcs-wrapper-v6 :is-answer-data="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div>
          <dw-survey-answer-data-list></dw-survey-answer-data-list>
        </div>
      </template>
    </dw-survey-dcs-wrapper-v6>

  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import DwSurveyAnswerDataList
  from '../../../components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerDataList.vue'
import DwSurveyDcsWrapperV6 from "../../../components/common/DwSurveyDcsWrapperV6.vue";

export default {
  name: 'DwSurveyAnswerDataListV6',
  components: {
    DwSurveyDcsWrapperV6,
    DwSurveyAnswerDataList,
    DwSurveyDcsWrapper
  },
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
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
