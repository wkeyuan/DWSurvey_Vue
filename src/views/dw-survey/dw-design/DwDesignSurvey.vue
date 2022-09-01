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
        surveyName: '<h1>Hello DWSurvey</h1>',
        surveyNode: '<div>非常感谢您的参与！如有涉及个人信息，我们将严格保密。ROOT</div>',
        questions: [
          {quTitle: '<p>aaaa</p>', quType: 'CHECKBOX', quOptions: [{id: '1', optionTitle: '<p>aa</p>', itemClick: false}, {id: '2', optionTitle: '<p>bb</p>', itemClick: false}, {id: '3', optionTitle: '<p>cc</p>', itemClick: false}]},
          {quTitle: '<p>abcd</p>', quType: 'RADIO', quOptions: [{id: '1', optionTitle: '<p>dd</p>', itemClick: false}, {id: '2', optionTitle: '<p>ee</p>', itemClick: false}, {id: '3', optionTitle: '<p>ff</p>', itemClick: false}]}
        ],
        surveyTest: '',
        curEditObj: [{itemClick: false}]
      }
    }
  },
}
</script>

<style scoped>

</style>
