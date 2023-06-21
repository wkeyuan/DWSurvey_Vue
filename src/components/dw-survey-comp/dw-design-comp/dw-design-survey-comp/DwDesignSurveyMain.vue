<template>
  <div>
    <!--    <dw-design-survey-comp></dw-design-survey-comp>-->
    <dw-design-survey-core v-model="survey" ></dw-design-survey-core>
  </div>
</template>

<script>
import DwDesignSurveyCore from './DwDesignSurveyCore'
import {getDesignSurveyJsonBySurveyId, getSurveyJsonBySurveyId} from "../../dw-utils/dw-survey-common";
export default {
  name: 'DwDesignSurveyMain',
  components: {DwDesignSurveyCore},
  data () {
    return {
      survey: null,
      surveyJsonText: null
      /* survey: {
        // font-size: 22px;font-weight: bold;
        surveyNameObj: {dwHtml: '', dwText: ''},
        surveyDetail: {
          surveyNodeObj: {dwHtml: '', dwText: ''}
        },
        questions: [
          // {quTitleObj: {dwHtml: '<p>aaaa</p>', dwText: 'aaaa'}, quType: 'CHECKBOX', quCheckboxs: [{id: '1', optionTitleObj: {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj: {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj: {dwHtml: '<p>cc</p>', dwText: 'aaaa'}, itemClick: false}]},
          // {quTitleObj: {dwHtml: '<p>abcd</p>', dwText: 'abcd'}, quType: 'RADIO', quRadios: [{id: '1', optionTitleObj: {dwHtml: '<p>bb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj: {dwHtml: '<p>bbb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj: {dwHtml: '<p>ddd</p>', dwText: 'aaaa'}, itemClick: false}]},
          // {quTitleObj: {dwHtml: '<p>abcd</p>', dwText: 'abcd'}, quType: 'RADIO', quRadios: [{id: '1', optionTitleObj: {dwHtml: '<p>bb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj: {dwHtml: '<p>bbb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj: {dwHtml: '<p>ddd</p>', dwText: 'aaaa'}, itemClick: false}]}
        ],
        surveyTest: '',
        curEditObj: [{itemClick: false}]
      } */
    }
  },
  mounted () {
    this.loadSurvey()
  },
  methods: {
    loadSurvey () {
      const surveyId = this.$route.params.id
      const params = {surveyId}
      getDesignSurveyJsonBySurveyId(params, (survey) => {
        console.debug('survey', survey)
        this.survey = survey
      })
    }
  }
}
</script>

<style scoped>

</style>
