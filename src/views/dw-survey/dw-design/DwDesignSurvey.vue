<template>
  <div>
<!--    <dw-design-survey-comp></dw-design-survey-comp>-->
    <dw-design-survey-core v-model="survey" ></dw-design-survey-core>
  </div>
</template>

<script>
import DwDesignSurveyComp
  from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/DwDesignSurveyComp'
import DwDesignSurveyCore
  from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/DwDesignSurveyCore'
export default {
  name: 'DwDesignSurvey',
  components: {DwDesignSurveyCore, DwDesignSurveyComp},
  data () {
    return {
      survey: {
        // font-size: 22px;font-weight: bold;
        surveyNameObj: {dwHtml: '<h1>Hello DWSurvey</h1>', dwText: 'Hello DWSurvey'},
        surveyNodeObj: {dwHtml: '<div>非常感谢您的参与！如有涉及个人信息，我们将严格保密。</div>', dwText: '非常感谢您的参与！如有涉及个人信息，我们将严格保密。'},
        questions: [
          {quTitleObj: {dwHtml: '<p>aaaa</p>', dwText: 'aaaa'}, quType: 'CHECKBOX', quOptions: [{id: '1', optionTitleObj: {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj:  {dwHtml: '<p>aa</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj:  {dwHtml: '<p>cc</p>', dwText: 'aaaa'}, itemClick: false}]},
          {quTitleObj: {dwHtml: '<p>abcd</p>', dwText: 'abcd'}, quType: 'RADIO', quOptions: [{id: '1', optionTitleObj:  {dwHtml: '<p>bb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj:  {dwHtml: '<p>bbb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj:  {dwHtml: '<p>ddd</p>', dwText: 'aaaa'}, itemClick: false}]},
          {quTitleObj: {dwHtml: '<p>abcd</p>', dwText: 'abcd'}, quType: 'RADIO', quOptions: [{id: '1', optionTitleObj:  {dwHtml: '<p>bb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '2', optionTitleObj:  {dwHtml: '<p>bbb</p>', dwText: 'aaaa'}, itemClick: false}, {id: '3', optionTitleObj:  {dwHtml: '<p>ddd</p>', dwText: 'aaaa'}, itemClick: false}]}
        ],
        surveyTest: '',
        curEditObj: [{itemClick: false}]
      },
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
