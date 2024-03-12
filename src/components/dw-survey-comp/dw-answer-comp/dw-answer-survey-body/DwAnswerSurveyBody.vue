<template>
  <div>
    <div v-if="survey!==null && survey.hasOwnProperty('answerMsg')">
      <div v-if="!survey.answerMsg.showAnswerMsg">
        <div class="dw-container-body-center" style="padding-bottom: 30px;">
          <div>
            <div>
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
                <div v-if="survey.pageAttr.curPage >= survey.pageAttr.pageSize" style="text-align: left;" class="dw-width-100bf">
                  <el-button v-loading.fullscreen.lock="fullscreenLoading" v-if="!survey.answerMsg.noSurveyJson" type="primary" class="dw-answer-button-style1" @click="submitAnswer" >提交答卷</el-button>
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
            <div v-if="!survey.answerMsg.noSurveyJson" style="text-align: center;font-weight: bold;" >
              <dw-html-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-html-label-common>
            </div>
          </div>
          <div>
            <template v-if="survey.answerMsg.hasOwnProperty('answerCheckResult') && survey.answerMsg.answerCheckResult.hasOwnProperty('anCheckResultCode') && survey.answerMsg.answerCheckResult.anCheckResultCode>=400">
              <div style="color: red;font-size: 13px;"> {{ survey.answerMsg.answerCheckResult.anCheckResultMsg }}</div>
              <!--              <div style="color: #e4e4e4;font-size: 12px;padding: 10px;">{{ survey.answerMsg.answerCheckResult.anCheckResultCode }}</div>-->
            </template>
            <template v-else>
              <div style="color: dodgerblue;font-size: 13px;"> {{ survey.answerMsg.answerMsgInfo }}</div>
            </template>
            <div v-if="isReAnswer" style="padding-top: 15px;">
              <el-button @click="backReAnswer">重新填写</el-button>
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
import DwAnswerMessageBody from '../dw-answer-message-body/DwAnswerMessageBody'
import {surveyAnswerLocalStorage, surveyInitLocalStorage} from '../dw-utils/dw-survey-answer-utils'

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
      answer: {},
      isReAnswer: false
    }
  },
  mounted () {
  },
  methods: {
    backReAnswer () {
      this.survey.answerMsg.showAnswerMsg = false
      this.survey.answerMsg.answerMsgInfo = null
      this.answer = {}
      // this.survey = {}
      this.survey.questions = surveyInitLocalStorage.getSurveyByLocalStorage(this.$route.params.id, this.$route.params.answerId).questions
      this.survey.pageAttr.curPage = 1
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
            const resultData = httpResult.data
            if (resultData.hasOwnProperty('anCheckIsPass') && resultData.hasOwnProperty('anCheckResultCode') && resultData.hasOwnProperty('indexResponseId')) {
              const anCheckIsPass = resultData.anCheckIsPass
              const anCheckResultCode = resultData.anCheckResultCode
              const indexResponseId = resultData.indexResponseId
              if (anCheckIsPass && anCheckResultCode===201 && indexResponseId!==null) {
                // this.$message.success('保存成功！')
                // 弹出提示
                this.survey.answerMsg.showAnswerMsg = true
                this.survey.answerMsg.answerMsgInfo = '答卷提交成功，感谢您的支持!'
                // 必须是答卷提交成功时清掉暂存的数据，考虑加上访问token
                surveyAnswerLocalStorage.clearAnswerHistory(this.$route.params.id, this.$route.params.answerId)
                // 存入答卷记录到本地，方便下次进入时直接过滤
                // surveyAnswerLocalStorage
              } else {
                // 处理各种未完成保存的返回值
                if (resultData.hasOwnProperty('anCheckResultMsg')) {
                  const anCheckResultMsg = resultData.anCheckResultMsg
                  // this.$message.warning(`${anCheckResultMsg}，状态码：${anCheckResultCode}`)
                  this.survey.answerMsg.showAnswerMsg = true
                  this.survey.answerMsg.answerMsgInfo = anCheckResultMsg
                  this.survey.answerMsg.answerCheckResult = resultData
                  // 然后对需要特殊处理的进行特殊处理
                } else {
                  // 不太可能进入此块
                  this.$message.warning('数据未保存，请确认！')
                  this.isReAnswer = true
                }
              }
            }
          } else {
            this.$message.error('保存失败！')
            this.survey.answerMsg.showAnswerMsg = true
            this.survey.answerMsg.answerMsgInfo = '答卷保存失败，请重试!'
            this.isReAnswer = true
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
  /*min-height: 300px;*/
  padding: 0 25px;
}
@media screen and (max-width: 750px) {
  .dw-survey-answer-body{
    padding: 0 15px;
  }
}
</style>
