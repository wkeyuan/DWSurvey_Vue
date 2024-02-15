<template>
  <div>
    <div v-if="survey!==null">
      <div v-if="!survey.answerMsg.showAnswerMsg">
        <div class="dw-container-body-center" style="padding-bottom: 30px;">
          <div>
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
                  <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="submitAnswer" >提交答卷</el-button>
                </div>
              </div>
            </div>
            <div v-show="survey.dwDebug" class="dw-debug" >{{ answer }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="padding: 50px 20px;text-align: center;background: white;">
          <div style="padding-bottom: 20px;">
            <div style="text-align: center;font-weight: bold;">
              <dw-html-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-html-label-common>
            </div>
          </div>
          <div>
            <div style="color: dodgerblue;font-size: 13px;">{{ survey.answerMsg.answerMsgInfo }}</div>
            <div style="padding-top: 15px;">
              <el-button @click="backReAnswer">返回重填</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DwTextEditLabelCommon
  from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/DwTextEditLabelCommon.vue'
import DwDesignQuestion from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/DwDesignQuestion.vue'
import DwFooter from '../../../layouts/DwFooter.vue'
import DwAnswerQuestion from '../dw-answer-survey-question/DwAnswerQuestion.vue'
import DwHtmlLabelCommon from '../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import {getSurveyAnswerData} from '../../dw-utils/dw-survey-answer'
import {validateQuestionsBool} from '../../dw-utils/dw-survey-answer-validate'
import {dwSaveSurveyAnswerJson} from '../api/dw-survey-answer'
import {msgInfo} from '../../../../utils/dw-msg'
import DwAnswerMessageBody from '../dw-answer-message-body/DwAnswerMessageBody'

export default {
  name: 'DwAnswerSurveyBody',
  components: {
    DwAnswerMessageBody,
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
      fullscreenLoading: false,
      answer: {}
    }
  },
  mounted () {
  },
  methods: {
    backReAnswer () {
      this.survey.answerMsg.showAnswerMsg = false
      this.survey.answerMsg.answerMsgInfo = null
    },
    submitAnswer () {
      const answer = getSurveyAnswerData(this.survey)
      this.answer = answer
      console.debug('answer', answer)
      if (validateQuestionsBool(this.survey.questions)) {
        const surveyAnswerJsonText = JSON.stringify(answer)
        const data = {surveyId: answer.surveyId, jsonVersion: 6, answerJson: surveyAnswerJsonText}
        this.fullscreenLoading = true
        dwSaveSurveyAnswerJson(data).then((response) => {
          const httpResult = response.data
          if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
            this.$message.success('保存成功！')
            // 弹出提示
            this.survey.answerMsg.showAnswerMsg = true
            this.survey.answerMsg.answerMsgInfo = '答卷提交成功，感谢您的支持!'
          } else {
            this.$message.success('保存失败！')
            this.answerMsg.showAnswerMsg = true
            this.answerMsg.answerMsgInfo = '答卷保存失败，请重试!'
          }
          this.fullscreenLoading = false
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
