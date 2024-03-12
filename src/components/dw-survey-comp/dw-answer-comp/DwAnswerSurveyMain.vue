<template>
  <div>
    <dw-answer-default-layout v-model="survey" ></dw-answer-default-layout>
  </div>
</template>

<script>
import DwAnswerSurveyBody from './dw-answer-survey-body/DwAnswerSurveyBody.vue'
import DwAnswerDefaultLayout from './dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout.vue'
import {Loading} from 'element-ui'
import {dwSurveyAnswerById} from './api/dw-survey-answer'
import {initAnswerBySurvey, parseAnswerData, showPageByIndex} from '../dw-utils/dw-survey-answer-data'
import {getSurveyAnswerJsonBySurveyId} from './dw-utils/dw-survey-answer-common'
import {surveyAnswerLocalStorage, surveyInitLocalStorage} from './dw-utils/dw-survey-answer-utils'
import {getSurveyAnswerData} from "../dw-utils/dw-survey-answer";

export default {
  name: 'DwAnswerSurveyMain',
  components: {DwAnswerDefaultLayout, DwAnswerSurveyBody},
  data () {
    return {
      /*
      survey: {
        surveyNameObj: {dwHtml: '', dwText: ''},
        surveyDetail: {
          surveyNodeObj: {dwHtml: '', dwText: ''}
        },
        answer: {questions: []},
        surveyStyle: {
          themeColor: 'none'
        }
      },
      */
      uuidList: [],
      survey: null, // 點认保持为null, 加载时不会闪
      loading: true,
      answerData: null
    }
  },
  mounted () {
    console.debug('first id', this.$route.params.id)
    console.debug('first answerId', this.$route.params.answerId)

    this.loadSurvey()
  },
  methods: {
    loadSurvey () {
      const loadingInstance = Loading.service({
        fullscreen: true,
        spinner: 'fa-solid fa-spinner fa-spin-pulse',
        background: '#00000091',
        customClass: 'dw-loading',
        text: '问卷数据加载中'
      })
      const surveyId = this.$route.params.id
      const answerId = this.$route.params.answerId
      const params = {surveyId, answerId}
      // 1、答卷合法性判断
      console.debug('surveyId', surveyId)
      console.debug('answerId', answerId)
      // 2、加载问卷与答卷
      getSurveyAnswerJsonBySurveyId(params, (survey, answerCheckResult) => {
        survey.surveyStyle.themeColor = '#025bb7'
        survey.dwDebug = false
        if (answerCheckResult.hasOwnProperty('anCheckIsPass') && answerCheckResult.hasOwnProperty('anCheckResultMsg') && !answerCheckResult.anCheckIsPass) {
          survey.answerMsg = {showAnswerMsg: true, answerMsgInfo: answerCheckResult.anCheckResultMsg, noSurveyJson: false, answerCheckResult}
          this.survey = survey
        } else {
          // 初始化答卷数据结构
          initAnswerBySurvey(survey)
          // 加载原答卷数据
          this.loadAnswerData(survey)
        }
        // 以服务的方式调用的 Loading 需要异步关闭
        this.$nextTick(() => { loadingInstance.close() })
      }, (answerCheckResult) => {
        if (answerCheckResult.hasOwnProperty('anCheckIsPass') && answerCheckResult.hasOwnProperty('anCheckResultMsg') && !answerCheckResult.anCheckIsPass) {
          const answerMsg = {showAnswerMsg: true, answerMsgInfo: answerCheckResult.anCheckResultMsg, noSurveyJson: true, answerCheckResult}
          this.survey = {answerMsg}
          if (answerCheckResult.anCheckResultCode>=500) {
            this.$message.error(answerCheckResult.anCheckResultMsg)
          }
        }
        this.$nextTick(() => { loadingInstance.close() })
      })
    },
    loadAnswerData (survey) {
      if (this.$route.params.hasOwnProperty('answerId') && this.$route.params.answerId!=null) {
        const answerId = this.$route.params.answerId
        dwSurveyAnswerById({answerId}).then((response) => {
          console.debug('loadAnswer response', response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.answerData = httpResult.data
          } else {
            this.$message.warning('未找到对应的答卷记录！')
          }
          this.answerData2Survey(survey)
        })
      } else {
        this.answerData2Survey(survey)
      }
    },
    answerData2Survey (survey) {
      if (this.answerData!=null) {
        parseAnswerData(survey, this.answerData)
      }
      console.debug('db survey', survey)
      survey.answerMsg = {showAnswerMsg: false, answerMsgInfo: null, noSurveyJson: false}
      this.setSurveyData(survey)
      console.debug('this survey', survey)
    },
    setSurveyData (survey) {
      // 先判断是否有 answerId ，如果有则不需要考虑本地之前的缓存数据
      if (this.$route.params.hasOwnProperty('answerId') && this.$route.params.answerId!=null) {
        if (survey.hasOwnProperty('dwEsSurveyAnswer') && survey.dwEsSurveyAnswer!==null) {
          const dwEsSurveyAnswer = survey.dwEsSurveyAnswer
          if (dwEsSurveyAnswer.hasOwnProperty('anTime') && dwEsSurveyAnswer.anTime.hasOwnProperty('endAnDate')) {
            const endAnDate = dwEsSurveyAnswer.anTime.endAnDate
            if (endAnDate!==null) {
              const endAnDateTime =new Date(endAnDate).getTime()
              const localLastActionDateTime = surveyAnswerLocalStorage.getSurveyAnswerActionTime()
              if (endAnDateTime>localLastActionDateTime) {
                this.$confirm('检测到当前加载的答卷数据在本地有过修改，是否使用本地最新修改。', '提示', {
                  confirmButtonText: '是，使用本地最新数据',
                  cancelButtonText: '否，使用原始提交数据',
                  type: 'warning'
                }).then(() => {
                  this.localStorage2Survey(survey)
                }).catch(() => {
                  this.survey = survey
                })
              }
            }
          }
        }
      } else {
        this.localStorage2Survey(survey)
      }
      // 加载完成把问卷初始数据存入local
      surveyInitLocalStorage.saveSurvey2LocalStorage(this.$route.params.id, this.$route.params.answerId, this.survey)
    },
    localStorage2Survey (survey) {
      // 先判断本地有没有临时数据，如果有则看本地的临时数据版本是否与线上一致，一致则使用本地临时数据。
      const localStorageSurveyObj = this.getLocalStorage(survey)
      if (localStorageSurveyObj!==null) {
        this.survey = localStorageSurveyObj
      } else {
        // 此处需要重置分页
        showPageByIndex(survey, 1)
        this.survey = survey
      }
    },
    getLocalStorage (survey) {
      const localStorageSurveyObj = surveyAnswerLocalStorage.getSurveyAnswerObjByLocalStorage(this.$route.params.id, this.$route.params.answerId)
      if (localStorageSurveyObj!==null) {
        if (survey.hasOwnProperty('dwVersion') && localStorageSurveyObj.hasOwnProperty('dwVersion')) {
          if (survey.dwVersion===localStorageSurveyObj.dwVersion) {
            // 版本一致才返回
            return localStorageSurveyObj
          } else {
            // 考虑到本地缓存数据同步到新版本结构上面
            const localAnswer = getSurveyAnswerData(localStorageSurveyObj)
            parseAnswerData(survey, localAnswer)
            // 此处需要重置分页
            showPageByIndex(survey, 1)
            return survey
          }
        }
      }
      return null
    }
  }
}
</script>

<style scoped>

</style>
<style>
.dw-loading .el-loading-spinner *{
  font-size: 20px!important;
  color: #023e79;
}
</style>
