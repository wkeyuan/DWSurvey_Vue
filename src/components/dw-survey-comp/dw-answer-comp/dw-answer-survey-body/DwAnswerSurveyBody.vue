<template>
  <div class="dw-container-body-center" style="padding-bottom: 30px;">
    <div v-if="survey!==null">
      <div style="padding: 20px 20px 10px 20px;">
        <div style="text-align: center;font-weight: bold;">
          <dw-html-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-html-label-common>
        </div>
        <div style="font-size: 13px;color: #7b7b7b;text-indent: 2em;line-height: 20px;padding-top: 15px;">
          <dw-html-label-common v-if="survey.surveyDetail !== undefined" v-model="survey.surveyDetail.surveyNodeObj" :survey="survey" ></dw-html-label-common>
        </div>
      </div>
      <div class="dw-survey-answer-body">
        <div style="padding-top: 15px;">
          <div>
            <transition-group>
              <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" >
                <dw-answer-question ref="designQuestion" v-model="survey" :index="index" :item="item" ></dw-answer-question>
              </div>
            </transition-group>
          </div>
        </div>
        <div style="text-align: left;">
          <el-button type="primary" @click="submitAnswer">提交答卷</el-button>
        </div>
      </div>
    </div>
    <div v-show="survey.dwDebug" class="dw-debug" >{{ answer }}</div>
  </div>
</template>

<script>

import DwTextEditLabelCommon
  from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/DwTextEditLabelCommon.vue'
import DwDesignQuestion from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/DwDesignQuestion.vue'
import DwFooter from '../../../layouts/DwFooter.vue'
import DwAnswerQuestion from '../dw-answer-survey-question/DwAnswerQuestion.vue'
import DwHtmlLabelCommon from '../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {buildAnswerSurveyObj, getSurveyAnswerData} from "../../dw-utils/dw-survey-answer";
import {validateQuestions, validateQuestionsBool} from "../../dw-utils/dw-survey-answer-validate";
import {dwSaveSurveyAnswerJson} from "../../dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api";

export default {
  name: 'DwAnswerSurveyBody',
  components: {
    DwHtmlLabelCommon,
    DwAnswerQuestion,
    DwFooter,
    DwDesignQuestion,
    DwTextEditLabelCommon
  },
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      answer: {}
    }
  },
  mounted () {
  },
  methods: {
    submitAnswer () {
      const answer = getSurveyAnswerData(this.survey)
      this.answer = answer
      console.debug('answer', answer)
      if (validateQuestionsBool(this.survey.questions)) {
        const surveyAnswerJsonText = JSON.stringify(answer)
        const data = {surveyId: answer.surveyId, jsonVersion: 6, answerJson: surveyAnswerJsonText}
        dwSaveSurveyAnswerJson(data).then((response) => {
          const httpResult = response.data
          if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
            this.$message.success('保存成功！')
            // 弹出提示
          } else {
            this.$message.success('保存失败！')
          }
        })
        console.debug('submit-answer')
      } else {
        this.$message.warning('请根据提示完成表单！')
      }
    }
  }
}
</script>

<style scoped>
@import '../../../../assets/css/dw-answer.css';

.dw-container-body-center{
  background: white;
}
.dw-debug{
  background: #0F78B0;
  padding: 20px;
  margin-top: 10px;
}
.dw-survey-answer-body{
  min-height: 600px;
  padding: 0 25px;
}
@media screen and (max-width: 750px) {
  .dw-survey-answer-body{
    padding: 0 15px;
  }
}
</style>
