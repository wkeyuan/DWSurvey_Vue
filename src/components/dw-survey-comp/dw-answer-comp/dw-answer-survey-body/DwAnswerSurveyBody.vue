<template>
  <div>
    <div v-if="survey!==null && survey.hasOwnProperty('answerMsg')">
      <div>
        <div v-if="survey.hasOwnProperty('answerMsg') && !survey.answerMsg.showAnswerMsg">
          <div class="dw-container-body-center" style="padding-bottom: 30px;">
            <div>
              <div>
                <div v-show="survey.surveyStyle.pageTopImg.enabled && survey.surveyStyle.pageTopImg.hasOwnProperty('httpSrc') && survey.surveyStyle.pageTopImg.httpSrc!==null">
                  <div style="position: relative;">
                    <el-image :src="survey.surveyStyle.pageTopImg.httpSrc" style="width: 100%;height: 200px;display: block;" fit="cover"></el-image>
                    <template v-if="survey.surveyStyle.logoImg.enabled && survey.surveyStyle.logoImg.hasOwnProperty('httpSrc') && survey.surveyStyle.logoImg.httpSrc!==null">
                      <div v-if="survey.surveyStyle.logoImg.position==='pageTopImgLeft'" style="position: absolute;left: 10px;top: 10px;">
                        <el-image :src="survey.surveyStyle.logoImg.httpSrc" style="height: 40px;display: block;" fit="cover"></el-image>
                      </div>
                      <div v-if="survey.surveyStyle.logoImg.position==='pageTopImgRight'" style="position: absolute;right: 10px;top: 10px;">
                        <el-image :src="survey.surveyStyle.logoImg.httpSrc" style="height: 40px;display: block;" fit="cover"></el-image>
                      </div>
                    </template>
                  </div>
                </div>
                <div v-if="survey.surveyStyle.logoImg.enabled && survey.surveyStyle.logoImg.hasOwnProperty('httpSrc') && survey.surveyStyle.logoImg.httpSrc!==null" >
                  <div v-if="survey.surveyStyle.logoImg.position==='topLogoLeft'" class="dw-display-flex-left dw-answer-logo-bg-color" >
                    <div style="padding: 10px;"><el-image :src="survey.surveyStyle.logoImg.httpSrc" style="height: 40px;display: block;" fit="cover"></el-image></div>
                  </div>
                  <div v-if="survey.surveyStyle.logoImg.position==='topLogoCenter'" class="dw-display-flex-center dw-answer-logo-bg-color" >
                    <div style="padding: 10px;"><el-image :src="survey.surveyStyle.logoImg.httpSrc" style="height: 40px;display: block;" fit="cover"></el-image></div>
                  </div>
                  <div v-if="survey.surveyStyle.logoImg.position==='topLogoRight'" class="dw-display-flex-right dw-answer-logo-bg-color" >
                    <div style="padding: 10px;"><el-image :src="survey.surveyStyle.logoImg.httpSrc" style="height: 40px;display: block;" fit="cover"></el-image></div>
                  </div>
                </div>
                <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showPageHeader') && survey.surveyStyle.showPageHeader" style="padding: 20px 20px 0 20px;">
                  <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showSurveyTitle') && survey.surveyStyle.showSurveyTitle" style="text-align: center;font-weight: bold;padding: 10px 0;">
                    <dw-html-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-html-label-common>
                  </div>
                  <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showSurveyNote') && survey.surveyStyle.showSurveyNote" style="font-size: 13px;color: #7b7b7b;text-indent: 2em;line-height: 20px;padding-top: 15px;">
                    <dw-html-label-common v-if="survey.surveyDetail !== undefined" v-model="survey.surveyDetail.surveyNodeObj" :survey="survey" ></dw-html-label-common>
                  </div>
                </div>
                <div class="dw-survey-answer-body" style="padding-top: 20px;">
                  <div>
                    <div>
                      <transition-group>
                        <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" >
                          <dw-answer-question ref="designQuestion" v-model="survey" :index="index" :item="item" ></dw-answer-question>
                        </div>
                      </transition-group>
                    </div>
                  </div>
                  <div v-if="!survey.readonly && survey.pageAttr.curPage >= survey.pageAttr.pageSize" style="text-align: left;" class="dw-width-100bf">
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" v-if="!survey.answerMsg.noSurveyJson" type="primary" class="dw-answer-button-style1" @click="submitAnswer" >提交答卷</el-button>
                    <el-button v-show="survey.pageAttr.curPage>1" type="primary" plain class="dw-answer-button-style1" @click="nextPage(survey.pageAttr.curPage-1)" >上一页</el-button>
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
            <div v-if="survey.answerMsg.hasOwnProperty('showAnswerPwd') && survey.answerMsg.showAnswerPwd" style="text-align: left;">
              <el-form label-position="top">
                <el-form-item label="此问卷需要答卷密码，请输入答卷密码">
                  <el-input v-model="anPwd" autocomplete="off" placeholder="请输入答卷密码" clearable></el-input>
                  <div style="color: red;">{{ survey.answerMsg.answerPwdError }}</div>
                </el-form-item>
              </el-form>
              <div class="dw-width-100bf" style="text-align: left;">
                <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" class="dw-answer-button-style1" @click="configCheckAnswerPwdButton">开始答卷</el-button>
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
import {dwSaveSurveyAnswerJson, dwSurveyAnswerCheckPwd} from '../api/dw-survey-answer'
import DwAnswerMessageBody from '../dw-answer-message-body/DwAnswerMessageBody'
import {getEsId, surveyAnswerLocalStorage, surveyInitLocalStorage} from '../dw-utils/dw-survey-answer-utils'
import {dwUpSurveyStyle} from "../dw-utils/dw-survey-answer-style";
import {showPageByIndex} from "../../dw-utils/dw-survey-answer-data";

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
    survey: {type: Object, default: () => {}},
    extProps: {type: Object, default: () => {}}
  },
  data () {
    return {
      fullscreenLoading: false,
      answer: {},
      isReAnswer: false,
      anPwd: ''
    }
  },
  mounted () {
    dwUpSurveyStyle.dwUpSurveyStyleMain(this.survey)
  },
  methods: {
    nextPage (pageIndex) {
      if (pageIndex < this.survey.pageAttr.curPage || validateQuestionsBool(this.survey.questions)) {
        showPageByIndex(this.survey, pageIndex)
      }
    },
    backReAnswer () {
      this.survey.answerMsg.showAnswerMsg = false
      this.survey.answerMsg.answerMsgInfo = null
      this.answer = {}
      // this.survey = {}
      // this.survey.questions = surveyInitLocalStorage.getSurveyByLocalStorage(this.$route.params.id, this.$route.params.answerId).questions
      this.survey.questions = surveyInitLocalStorage.getSurveyByLocalStorage(this.survey.sid, this.survey.dwEsSurveyAnswer.esId).questions
      this.survey.pageAttr.curPage = 1
    },
    configCheckAnswerPwdButton () {
      // 进行检查 anPwd,sid
      this.fullscreenLoading = true
      setTimeout(() => {
        this.checkAnPwd()
      }, 200)
    },
    checkAnPwd () {
      const survey = this.survey
      const params = {sid: survey.sid, anPwd: this.anPwd}
      dwSurveyAnswerCheckPwd(params).then((response) => {
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          this.$message.success('验证通过，请开始答卷')
          this.survey.answerMsg.showAnswerMsg = false
          this.survey.answerMsg.showAnswerPwd = false
        } else {
          this.$message.warning('密码错误！')
        }
        this.fullscreenLoading = false
      })
    },
    submitAnswer () {
      // const sid = this.$route.params.id
      if (validateQuestionsBool(this.survey.questions)) {
        if (this.extProps!==null && this.extProps!==undefined && this.extProps.hasOwnProperty('isPreview') && this.extProps.isPreview) {
          this.$message.warning('当前预览状态，不可以提交答卷！')
        } else {
          this.submitAnswerPost()
        }
      } else {
        this.$message.warning('请根据提示完成表单！')
      }
    },
    submitAnswerPost () {
      const sid = this.survey.sid
      const answerId = getEsId(this.survey)
      const answer = getSurveyAnswerData(this.survey)
      answer.anPwd = this.anPwd
      this.answer = answer
      console.debug('answer', answer)
      const surveyAnswerJsonText = JSON.stringify(answer)
      const data = {surveyId: answer.answerCommon.surveyId, sid, jsonVersion: 6, answerJson: surveyAnswerJsonText}
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
              // surveyAnswerLocalStorage.clearAnswerHistory(this.$route.params.id, this.$route.params.answerId)
              surveyAnswerLocalStorage.clearAnswerHistory(sid, answerId)
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
    }
  }
}
</script>
<style scoped>
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
