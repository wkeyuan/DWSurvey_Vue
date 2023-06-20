<template>
  <div class="dw-answer-container" >
    <el-container>
      <el-main style="padding: 0;">
        <div v-if="survey!=null">
          <div>
            <div class="dw-container-body">
              <dw-answer-survey-body ref="designContainerBody" v-model="survey" ></dw-answer-survey-body>
            </div>
          </div>
        </div>
        <div style=""><dw-footer></dw-footer></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import DwDesignContainerBodyCenter
  from '../../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyCenter.vue'
import DwAnswerSurveyBody from '../../dw-answer-survey-body/DwAnswerSurveyBody.vue'
import DwFooter from '../../../../layouts/DwFooter.vue'
import {buildAnswerSurveyObj} from "../../../dw-utils/dw-survey-answer";

export default {
  name: 'DwAnswerDefaultLayout',
  components: {
    DwFooter,
    DwAnswerSurveyBody,
    DwDesignContainerBodyCenter
  },
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  },
  data () {
    return {
      surveyId: '',
      drag: false,
      headerQuToolbarStyle: '',
      containerLRStyle: '',
      lrContentHeight: '',
      containerBodyStyle: '',
      questions: [],
      radio: '1',
      hover: false,
      answerSurvey: {
        questions: []
      }
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
