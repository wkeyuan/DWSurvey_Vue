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
                <div v-if="survey.hasOwnProperty('isShowScore') && survey.isShowScore && survey.hasOwnProperty('dwEsSurveyAnswer')" style="padding: 10px;font-size: 16px;color: var(--dw-answer-primary-color);border-bottom: 1px dashed var(--dw-answer-primary-color);">
                  答卷得分：<strong style="color: red;font-size: 20px;">{{ survey.dwEsSurveyAnswer.answerCommon.sumScore }}分</strong>
                </div>
                <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showPageHeader') && survey.surveyStyle.showPageHeader" style="padding: 20px 20px 0 20px;">
                  <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showSurveyTitle') && survey.surveyStyle.showSurveyTitle" style="text-align: center;font-weight: bold;padding: 10px 0;">
                    <dw-html-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-html-label-common>
                  </div>
                  <div v-show="survey.hasOwnProperty('surveyStyle') && survey.surveyStyle.hasOwnProperty('showSurveyNote') && survey.surveyStyle.showSurveyNote" style="font-size: 13px;color: #7b7b7b;line-height: 20px;padding-top: 15px;">
                    <dw-html-label-common v-if="survey.surveyDetail !== undefined" v-model="survey.surveyDetail.surveyNodeObj" :survey="survey" ></dw-html-label-common>
                  </div>
                </div>
                <div class="dw-survey-answer-body" style="padding-top: 20px;">
                  <div>
                    <div>
                      <transition-group>
                        <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" ref="designQuestionRoot">
                          <dw-answer-question ref="designQuestion" v-model="survey" :index="index" :item="item" ></dw-answer-question>
                        </div>
                      </transition-group>
                    </div>
                  </div>
                  <div v-if="!survey.readonly && survey.pageAttr.curPage >= survey.pageAttr.pageSize" style="text-align: left;" class="dw-width-100bf">
                    <div>
                      <div v-if="survey.hasOwnProperty('answerCheckResult') && survey.answerCheckResult!==null && survey.answerCheckResult.showCaptcha">
                        <!--                        {{ survey.answerCheckResult }}-->
                        <div class="dw-display-flex" style="margin-bottom: 10px;">
                          <div style="width: 160px;"><el-input v-model="anRandomCode" placeholder="请输入右侧验证码" ></el-input></div>
                          <div style="margin-left: 5px;"><el-image src="/api/dwsurvey/anon/jcap/jcaptcha.do" ></el-image></div>
                        </div>
                      </div>
                    </div>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" v-if="!survey.answerMsg.noSurveyJson" type="primary" class="dw-answer-button-style1" @click="submitAnswer" >提交答卷</el-button>
                    <el-button v-show="survey.pageAttr.curPage>1" type="primary" plain class="dw-answer-button-style1" @click="nextPage(survey.pageAttr.curPage-1, 'prev')" >上一页</el-button>
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
                <div style="color: red;"> {{ survey.answerMsg.answerCheckResult.anCheckResultMsg }}</div>
                <!--              <div style="color: #e4e4e4;font-size: 12px;padding: 10px;">{{ survey.answerMsg.answerCheckResult.anCheckResultCode }}</div>-->
              </template>
              <template v-else>
                <div style="color: dodgerblue;"> {{ survey.answerMsg.answerMsgInfo }}</div>
                <div v-if="survey.surveyAttrs.scoreAttr.enabled && survey.surveyAttrs.scoreAttr.showSumScore.enabled" style="padding: 5px;">
                  <div style="color: #097ef3;padding: 5px;">总得分：<strong style="color: red;">{{ survey.answerMsg.answerCheckResult.sumScore }}分</strong> </div>
                  <div v-if="survey.surveyAttrs.scoreAttr.showSumScore.showContent==='sumAfterDetail'" style="padding: 5px;"><el-button @click="showAnswerDetail">查看详情</el-button></div>
                </div>
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
import {validateQuestionsBool, validateQuestionsBoolBySurvey} from '../../dw-utils/dw-survey-answer-validate'
import {dwSaveSurveyAnswerJson, dwSurveyAnswerCheckPwd} from '../api/dw-survey-answer'
import DwAnswerMessageBody from '../dw-answer-message-body/DwAnswerMessageBody'
import {getEsId, surveyAnswerLocalStorage, surveyInitLocalStorage} from '../dw-utils/dw-survey-answer-utils'
import {dwUpSurveyStyle} from '../dw-utils/dw-survey-answer-style'
import {showPageByIndex} from '../../dw-utils/dw-survey-answer-data'

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
      anPwd: '',
      anRandomCode: '',
      indexResponseId: null,
      dbAnswerId: null
    }
  },
  watch: {
    'survey.watchEventScrollToId': {
      // immediate: true, // 组件实例化时立即触发
      // deep: true, // 对象或数组的深层属性变化也触发
      handler: function (newVal, oldVal) {
        // 处理prop变化的逻辑, 还可以优化为提供具体变便的数据，直接针对性更新
        console.debug('newVal', newVal)
        this.dwScrollIntoView()
      }
    }
  },
  mounted () {
    if (this.$route.query.hasOwnProperty('anPwd')) this.anPwd = this.$route.query.anPwd
    this.anPwd = this.$route.query.anPwd
    dwUpSurveyStyle.dwUpSurveyStyleMain(this.survey)
  },
  methods: {
    nextPage (pageIndex, prevOrNext) {
      if (pageIndex < this.survey.pageAttr.curPage || validateQuestionsBool(this.survey.questions)) {
        showPageByIndex(this.survey, pageIndex, prevOrNext)
      }
    },
    backReAnswer () {
      this.survey.answerMsg.showAnswerMsg = false
      this.survey.answerMsg.answerMsgInfo = null
      this.answer = {}
      // this.survey = {}
      // this.survey.questions = surveyInitLocalStorage.getSurveyByLocalStorage(this.$route.params.id, this.$route.params.answerId).questions
      // this.survey.questions = surveyInitLocalStorage.getSurveyByLocalStorage(this.survey.sid, this.survey.dwEsSurveyAnswer.esId).questions
      // this.survey.pageAttr.curPage = 1
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
      // this.survey.dwDebug = true
      // const sid = this.$route.params.id
      // validateQuestionsBool(this.survey.questions)
      if (validateQuestionsBoolBySurvey(this.survey)) {
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
      answer.answerCommon.sid = sid
      this.answer = answer
      console.debug('answer', answer)
      const surveyAnswerJsonText = JSON.stringify(answer)
      const data = {surveyId: answer.answerCommon.surveyId, sid, jsonVersion: 6, answerJson: surveyAnswerJsonText, anRandomCode: this.anRandomCode}
      this.fullscreenLoading = true
      dwSaveSurveyAnswerJson(data).then((response) => {
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          const resultData = httpResult.data
          if (resultData.hasOwnProperty('anCheckIsPass') && resultData.hasOwnProperty('anCheckResultCode') && resultData.hasOwnProperty('indexResponseId') && resultData.hasOwnProperty('dbAnswerId')) {
            const anCheckIsPass = resultData.anCheckIsPass
            const anCheckResultCode = resultData.anCheckResultCode
            const indexResponseId = resultData.indexResponseId
            const dbAnswerId = resultData.dbAnswerId
            if (anCheckIsPass && anCheckResultCode===201 && dbAnswerId!==null) {
              // this.$message.success('保存成功！')
              // 弹出提示
              this.survey.answerMsg.showAnswerMsg = true
              this.survey.answerMsg.answerMsgInfo = '答卷提交成功'
              this.survey.answerMsg.answerCheckResult = resultData
              this.isReAnswer = false
              // 必须是答卷提交成功时清掉暂存的数据，考虑加上访问token
              // surveyAnswerLocalStorage.clearAnswerHistory(this.$route.params.id, this.$route.params.answerId)
              surveyAnswerLocalStorage.clearAnswerHistory(sid, answerId)
              // 存入答卷记录到本地，方便下次进入时直接过滤
              // surveyAnswerLocalStorage
              // 最好是处里返回的答卷结束，直接重新显示
              this.fullscreenLoading = false
              this.indexResponseId = indexResponseId
              this.dbAnswerId = dbAnswerId
              if (this.survey.surveyAttrs.scoreAttr.enabled && this.survey.surveyAttrs.scoreAttr.showSumScore.enabled && this.survey.surveyAttrs.scoreAttr.showSumScore.showContent==='sumAndDetail') {
                this.$message.success('提交成功，即将显示答卷结果...')
                const _that = this
                setTimeout(function () {
                  _that.$router.push(`/v6/diaowen/an/review/${sid}/${dbAnswerId}`)
                }, 1500)
              }
            } else {
              // 处理各种未完成保存的返回值
              if (resultData.hasOwnProperty('anCheckResultMsg')) {
                const anCheckResultMsg = resultData.anCheckResultMsg
                // this.$message.warning(`${anCheckResultMsg}，状态码：${anCheckResultCode}`)
                this.survey.answerMsg.showAnswerMsg = true
                this.survey.answerMsg.answerMsgInfo = anCheckResultMsg
                this.survey.answerMsg.answerCheckResult = resultData
                // 然后对需要特殊处理的进行特殊处理
                if (resultData.hasOwnProperty('anCheckResultCode') && resultData.anCheckResultCode===410) {
                  this.isReAnswer = true
                }
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
    },
    showAnswerDetail () {
      const sid = this.survey.sid
      this.$router.push(`/v6/diaowen/an/review/${sid}/${this.dbAnswerId}`)
    },
    dwScrollIntoView () {
      // 滚动到第一个错误题位置
      const scrollToQuIndex = this.survey.scrollToQuIndex
      console.debug('scrollToQuIndex', scrollToQuIndex)
      if (scrollToQuIndex!==null && scrollToQuIndex>=0 && this.$refs.designQuestionRoot[scrollToQuIndex]) {
        this.$refs.designQuestionRoot[scrollToQuIndex].scrollIntoView({behavior: 'smooth', block: 'center'})
      }
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
  padding: 0 20px;
}
@media screen and (max-width: 750px) {
  .dw-survey-answer-body{
    padding: 0 15px;
  }
}
</style>
