<template>
  <div>
    <!--    <dw-design-survey-comp></dw-design-survey-comp>-->
    <dw-design-survey-core v-model="survey" ></dw-design-survey-core>
  </div>
</template>

<script>
import {querySurveyAll} from './api/dw-design-survey-api'
import DwDesignSurveyCore from './DwDesignSurveyCore'
import {parseSurvey} from '../../dw-utils/dw-parse-survey'
export default {
  name: 'DwDesignSurveyMain',
  components: {DwDesignSurveyCore},
  data () {
    return {
      survey: null
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
      querySurveyAll(params).then((response) => {
        console.debug('querySurveyAll', response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          // this.survey = httpResult.data
          console.debug('httpResult.data', httpResult.data)
          const surveyData = parseSurvey(httpResult.data)
          console.debug('parseResultData', surveyData)
          this.survey = surveyData
          // quRadios
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
