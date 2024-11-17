<template>
  <div v-if="survey!==null" class="dw-preview-container" >
    <div class="dw-preview-header">
      <div class="dw-preview-header-left">
        <label><i class="dw-icon-button fa-solid fa-palette active" style=""></i>{{ survey.surveyTypeSimpleName }}样式配置</label>
        <!--        <i class=" fa-solid fa-wand-magic-sparkles active" style="color: #6e45e8;"></i>-->
      </div>
      <div class="dw-preview-header-center">
        <label><i :class=" previewTypeClass === 'dw-preview-pc' ? 'active' : ''" class="dw-icon-button fas fa-desktop" @click="previewTabClick('dw-preview-pc')"></i></label>
        <label><i :class=" previewTypeClass === 'dw-preview-pad' ? 'active' : ''" class="dw-icon-button fas fa-tablet-alt" @click="previewTabClick('dw-preview-pad')"></i></label>
        <label><i :class=" previewTypeClass === 'dw-preview-phone' ? 'active' : ''" class="dw-icon-button fas fa-mobile-alt" @click="previewTabClick('dw-preview-phone')"></i></label>
      </div>
      <div class="dw-preview-header-right">
        <div class="dw-display-flex-right">
          <el-button type="primary" size="small" @click="devSurvey">确认发布</el-button>
          <!--          <el-button type="primary" plain size="small" @click="saveSurvey">保存修改</el-button>-->
          <el-button type="primary" plain size="small" @click="designSurvey">返回编辑</el-button>
          <el-button size="small" @click="handlePush(`${prevPath}/dw/survey/c/url/${survey.id}`)">答卷地址</el-button>
          <el-button size="small" @click="handlePush(prevPath)">返回列表</el-button>
        </div>
      </div>
    </div>

    <el-container style="height: calc(100vh);">
      <el-aside style="width: 300px;border-right: 1px solid rgb(230 228 228);">
        <div :style="`top: ${containerTop.lrFixedTop}px;`" style="position: fixed;width: 300px;">
          <div v-if="survey!==null" class="dw-preview-left-aside" >
            <dw-survey-style-design-aside v-model="survey"></dw-survey-style-design-aside>
          </div>
        </div>
      </el-aside>

      <el-container v-loading="loading" style="flex: auto;" >
        <div style="width: 100%;">
          <div v-show="previewTypeClass === 'dw-preview-pc'" class="dw-preview-main" >
            <div class="dw-preview-answer-survey-container">
              <div class="dw-preview-pc">
                <div :style="`margin-top: ${containerTop.centerMarginTop}px;`" class="dw-preview-body">
                  <div>
                    <!--                    <dw-answer-survey :answer-props="answerProps" :ext-props="{isPreview: true}"></dw-answer-survey>-->
                    <div class="dw-answer-custom-theme">
                      <dw-answer-default-layout v-model="survey" :ext-props="{anBodyStyle: {minHeight: 'calc(100vh - 40px)',height: 'auto'}, isPreview: true}" ></dw-answer-default-layout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="previewTypeClass === 'dw-preview-pad'" class="dw-preview-main">
            <div class="dw-preview-answer-survey-container">
              <div class="dw-preview-pad">
                <div :style="`margin-top: ${containerTop.centerMarginTop}px;`" class="dw-preview-body">
                  <div>
                    <!--                    <dw-answer-survey :answer-props="answerProps" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '630px',height: 'auto'}, isPreview: true}"></dw-answer-survey>-->
                    <div class="dw-answer-custom-theme">
                      <dw-answer-default-layout v-model="survey" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '630px',height: 'auto'}, isPreview: true}"></dw-answer-default-layout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="previewTypeClass === 'dw-preview-phone'" class="dw-preview-main">
            <div class="dw-preview-answer-survey-container">
              <div class="dw-preview-phone">
                <div :style="`margin-top: ${containerTop.centerMarginTop}px;`" class="dw-preview-body">
                  <div>
                    <!--                    <dw-answer-survey :answer-props="answerProps" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '861px',height: 'auto'}, isPreview: true}"></dw-answer-survey>-->
                    <div class="dw-answer-custom-theme">
                      <dw-answer-default-layout v-model="survey" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '861px',height: 'auto'}, isPreview: true}"></dw-answer-default-layout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import DwAnswerSurveyMain from '../../dw-answer-comp/DwAnswerSurveyMain.vue'
import {dwDevSurvey, dwSaveSurveyJson} from '../dw-design-survey-comp/api/dw-design-survey-api'
import DwAnswerSurvey from '../../dw-answer-comp/DwAnswerSurvey.vue'
import DwAnswerDefaultLayout
  from '../../dw-answer-comp/dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout.vue'
import {getDesignSurveyJsonBySurveyId} from '../../dw-utils/dw-survey-common'
import {initAnswerBySurvey, showPageByIndex} from '../../dw-utils/dw-survey-answer-data'
import {initAnswerSurveyProgress} from '../../dw-answer-comp/dw-utils/dw-survey-answer-progress'
import {getDefaultSurveyStyle} from '../../dw-utils/dw-common/dw-common-utils'
import DwSurveyStyleDesignAside from './componets/DwSurveyStyleDesignAside.vue'
import {
  clearSurveyJson, getSaveSurveyJsonText,
  getSurveyJsonSimple
} from '../../dw-utils/dw-survey-design'
import {clearSurveyAnswer} from '../../dw-answer-comp/dw-utils/dw-survey-answer-clear'
import {dwSurveyAnswerLogicLoad} from '../../dw-answer-comp/dw-utils/dw-survey-answer-logic'
import {surveyAnswerLocalStorage} from '../../dw-answer-comp/dw-utils/dw-survey-answer-utils'
import {dwFooterUtils} from '../../dw-utils/dw-common/dw-footer-util'

export default {
  name: 'DwStyleSurveyMain',
  components: {
    DwSurveyStyleDesignAside, DwAnswerDefaultLayout, DwAnswerSurvey, DwAnswerSurveyMain},
  data () {
    return {
      loading: true,
      survey: null,
      drawer: false,
      direction: 'ltl',
      activeName: 'first',
      previewTypeClass: 'dw-preview-pc', // dw-preview-pad, dw-preview-phone
      padPhoneAnBodySpan: {
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
        md: {span: 24, offset: 0},
        lg: {span: 24, offset: 0},
        xl: {span: 24, offset: 0}
      },
      answerProps: {sid: null, answerId: null, anPwd: null},
      prevPath: '/v6',
      containerTop: {
        lrFixedTop: 40,
        centerMarginTop: 40
      },
      oldQuestions: null
    }
  },
  watch: {
    'survey.surveyStyle': {
      immediate: false,
      deep: true,
      handler (newVal, oldVal) {
        // 在这里处理属性变化
        console.debug('newVal', newVal)
        this.saveSurvey()
      }
    }
  },
  mounted () {
    this.answerProps.sid = this.$route.params.dwSurveyId
    this.loadSurvey()
    // 左右布局
    dwFooterUtils.isLayoutLr((footerInfo) => { this.prevPath = '/v6/lr' })
  },
  methods: {
    handlePush (to) {
      this.$router.push(to)
    },
    loadSurvey () {
      const surveyId = this.$route.params.dwSurveyId
      const params = {surveyId}
      getDesignSurveyJsonBySurveyId(params, (survey) => {
        console.debug('design survey', survey)
        if (!survey.hasOwnProperty('surveyStyle') || !survey.surveyStyle.hasOwnProperty('pageThemeColor')) {
          survey.surveyStyle = getDefaultSurveyStyle()
        }
        // 初始化答卷数据
        survey.dwDebug = false
        survey.answerMsg = {showAnswerMsg: false, answerMsgInfo: null, noSurveyJson: false}
        // 初始化答卷数据结构
        initAnswerBySurvey(survey)
        // 逻辑处理初始化
        dwSurveyAnswerLogicLoad(survey)
        // 初始化问卷进度状态
        initAnswerSurveyProgress(survey)
        // 初始化分页
        showPageByIndex(survey, 1)
        this.oldQuestions = JSON.stringify(survey.questions)
        this.survey = survey
        this.loading = false
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    previewTabClick (className) {
      this.previewTypeClass = className
    },
    designSurvey () {
      const surveyId = this.$route.params.dwSurveyId
      this.$router.push('/v6/diaowen/dw-design/survey/'+surveyId)
    },
    devSurvey () {
      const surveyId = this.$route.params.dwSurveyId
      const params = {surveyId}
      dwDevSurvey(params).then((response) => {
        console.debug('response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          surveyAnswerLocalStorage.clearAnswerHistory(this.survey.sid, null)
          this.$router.push(`${this.prevPath}/dw/survey/c/url/${surveyId}`)
        } else {
          this.$message.error('发布失败，请重试或联系管理员！')
        }
      })
    },
    saveSurvey () {
      this.saveSurveyFun(null)
    },
    saveSurveyFun (callback) {
      const surveyId = this.survey.id
      const sid = this.survey.sid
      // 清理无效数据
      this.survey.questions = JSON.parse(this.oldQuestions)
      clearSurveyJson(this.survey)
      clearSurveyAnswer(this.survey)
      console.debug('save this.survey', this.survey)
      const surveyJsonText = JSON.stringify(getSaveSurveyJsonText(this.survey))
      const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText))
      const data = {surveyId, sid, surveyJsonText, surveyJsonSimple}
      console.debug('surveyJson data', data)
      dwSaveSurveyJson(data).then((response) => {
        console.debug('dwSaveSurveyJson-response', response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          // this.$message.success('保存成功！')
          if (callback!=null) callback()
        } else {
          this.$message.success('保存样式失败！')
        }
      })
    }
  }
}
</script>

<style scoped>
.dw-preview-container{
  /*background: #ecedee;*/
  /*background-color: white;*/
  height: 100vh;
}
.dw-preview-header{
  background: white;
  padding: 0 10px;
  border-bottom: 1px solid #d7d5d5;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
}
.dw-preview-header-center{
  text-align: center;
}
.dw-preview-header-left{
  position: fixed;
  left: 0px;
  top: 0px;
}
.dw-preview-header-right{
  position: fixed;
  right: 10px;
  top: 3px;
}
.dw-icon-button{
  padding: 10px;
  color: #909399;
  cursor: pointer;
  font-size: 14px;
}
.dw-icon-button.active,.dw-icon-button:hover{
  /*color: #409EFF;*/
  color: var(--dw-primary-text-color-active);
  font-size: 18px;
}
.dw-preview-main{
  /*padding-top: 38px;*/
}
.dw-preview-answer-survey-container .dw-preview-pc{
  /*height: calc(100vh);*/
  overflow: scroll;
  margin: 0 auto;
}
.dw-preview-pc .dw-preview-body{
  height: calc(100vh - 40px);
  padding: 0;
}
/*
.dw-preview-answer-survey-container .dw-preview-pad{
  background: url('../../../../assets/image/ipad.jpg') no-repeat;
  background-size: cover;
  width: 910px;
  height: 630px;
  margin: 20px auto 0 auto;
  padding-top: 1px;
}
.dw-preview-pad .dw-preview-body{
  width: 774px;
  height: 582px;
  margin: 25px 0 0 68px;
  overflow: scroll;
  background-color: red;
}
.dw-preview-answer-survey-container .dw-preview-phone{
  background: url('../../../../assets/image/iphone.png') no-repeat;
  background-size: cover;
  width: 404px;
  height: 701px;
  margin: 20px auto 0 auto;
  padding-top: 1px;
}
.dw-preview-phone .dw-preview-body{
  width: 257px;
  height: 456px;
  margin: 94px 0 0 67px;
  overflow: scroll;
}
*/

.dw-preview-answer-survey-container .dw-preview-pad{
  padding-top: 10px;
}
.dw-preview-pad .dw-preview-body{
  width: 910px;
  height: 630px;
  overflow: scroll;
  margin: 60px auto 0;
  /*#c6c6c7*/
  border: 1px solid #d7d5d5;
  border-radius: 6px;
  padding: 0;
}
.dw-preview-answer-survey-container .dw-preview-phone{
  padding-top: 10px;
}
.dw-preview-phone .dw-preview-body{
  width: 418px;
  height: 861px;
  overflow: scroll;
  margin: 60px auto 0;
  border: 1px solid #d7d5d5;
  border-radius: 6px;
  padding: 0;
}
.dw-preview-left-aside{
  height: 100vh;
  width: 100%;
  background: white;
}
</style>
<style scoped>
/* design form */
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 6px;
}
.dw-title-attr{
  font-weight: bold;
  font-size: 14px;
  color: grey;
  padding: 10px 0;
}
</style>
