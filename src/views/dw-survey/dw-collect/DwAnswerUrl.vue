<template>
  <div>
    <dw-survey-dcs-wrapper :id="id" is-answer-url="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <dw-answer-url-main v-if="survey" :survey="survey"></dw-answer-url-main>
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import DwAnswerUrlMain from './DwAnswerUrlMain'

export default {
  name: 'DwAnswerUrl',
  components: {
    DwSurveyDcsWrapper,
    DwAnswerUrlMain
  }
}

</script>
