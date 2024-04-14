<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-dcs-main">
          <div class="dw-dcs-main-survey-title">
            <el-row type="flex" justify="space-between" align="middle">
              <el-col>
                <div class="dw-dcs-main-survey-title-content">
                  <div v-if="survey.surveyNameText != null" v-text="survey.surveyNameText"></div>
                  <div v-else v-html="survey.surveyName"></div>
                </div>
              </el-col>
              <el-col :span="4">
                <el-select :value="survey.surveyState" v-model="survey.surveyState" placeholder="请选择" @change="surveyStateChange" >
                  <el-option key="0" :value="0" label="设计中" ></el-option>
                  <el-option key="1" :value="1" label="发布收集" ></el-option>
                  <el-option key="2" :value="2" label="收集结束" ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="dw-dcs-main-survey-step">
            <div class="dw-dcs-main-survey-step-item" style="padding: 13px 16px;">
              <el-row type="flex" justify="space-between" align="middle" >
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/attr/${survey.id}`" :class="{ 'dw-link-primary' : isSurveySet}" class="dw-link dw-link-1" ><i class="el-icon-edit"></i>问卷设计</router-link>
                </el-col>
                <el-col :span="3" >
                  <router-link :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerUrl || isSiteShare || isSiteComp || isAnswerWx || isAnswerUrlV6}" class="dw-link dw-link-1" ><i class="el-icon-link"></i>问卷收集</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/chart/${survey.id}`" :class="{ 'dw-link-primary' : isSurveyChart || isAnswerData }" class="dw-link dw-link-1" ><i class="el-icon-s-data"></i>问卷数据</router-link>
                </el-col>
                <el-col :span="15" style="text-align: right;">
                  <el-button type="primary" size="small" @click="handlePush(`/v6/diaowen/dw-design/survey/${survey.id}`)" >问卷设计</el-button>
                  <el-button size="small" @click="handlePush(`${prevPath}/survey/c/url/${survey.id}`)" >答卷地址</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="dw-dcs-main-survey-step-item" style="padding-left: 16px;">
              <el-row v-show="isSurveySet">
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/comp/${survey.id}`" :class="{ 'dw-link-primary' : isSiteComp}" class="dw-link" ><i class="el-icon-edit"></i>问卷设计</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/weixin/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerWx}" class="dw-link" ><i class="el-icon-brush"></i>样式设计</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/attr/${survey.id}`" :class="{ 'dw-link-primary' : isSurveySet}" class="dw-link" ><i class="el-icon-setting"></i>答卷设置</router-link>
                </el-col>
              </el-row>
              <el-row v-show="isAnswerUrl || isSiteShare || isSiteComp || isAnswerWx || isAnswerUrlV6">
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerUrl}" class="dw-link" ><i class="el-icon-link"></i>答卷地址</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerUrlV6}" class="dw-link" ><i class="el-icon-link"></i>答卷地址V6</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/attr/${survey.id}`" :class="{ 'dw-link-primary' : isSurveySet}" class="dw-link" ><i class="el-icon-setting"></i>答卷设置</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/comp/${survey.id}`" :class="{ 'dw-link-primary' : isSiteComp}" class="dw-link" ><i class="el-icon-discount"></i>网站组件</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/weixin/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerWx}" class="dw-link" ><i class="el-icon-chat-dot-round"></i>微信收集</router-link>
                </el-col>
              </el-row>
              <el-row v-show="isSurveyChart || isAnswerData">
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/chart/${survey.id}`" :class="{ 'dw-link-primary' : isSurveyChart}" class="dw-link" ><i class="el-icon-discount"></i>默认统计</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/data/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerData}" class="dw-link" ><i class="el-icon-receiving"></i>原始数据</router-link>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="3"></el-col>
              </el-row>
            </div>
            <div class="dw-dcs-main-survey-step-item dw-dcs-main-survey-step-item-status" >
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="4">
                  <div>状态：
                    <el-tag v-if="survey.surveyState === 0" size="mini" >设计中</el-tag>
                    <el-tag v-else-if="survey.surveyState === 1" type="success" size="mini" >收集中</el-tag>
                    <el-tag v-else-if="survey.surveyState === 2" type="info" size="mini" >收集结束</el-tag>
                    <el-tag v-else disable-transitions style="margin-left: 10px" size="mini" >未知</el-tag>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>收集数：{{ survey.answerNum != null ? survey.answerNum : 0 }} 份</div>
                </el-col>
                <el-col :span="16" style="text-align: right;">
                  创建时间：{{ survey.createDate }}
                </el-col>
              </el-row>
            </div>
            <div class="dw-dcs-main-survey-step-main">
              <slot :survey="survey" name="dw-dcs-main-slot" ></slot>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {dwSurveyInfo} from '@/api/dw-survey'
import {dwSurveyUpState} from '../../api/dw-survey'
export default {
  name: 'DwSurveyDcsWrapper',
  props: {
    id: {type: String, default: ''},
    isAnswerUrl: {type: Boolean, default: false},
    isSurveySet: {type: Boolean, default: false},
    isSiteShare: {type: Boolean, default: false},
    isSiteComp: {type: Boolean, default: false},
    isAnswerWx: {type: Boolean, default: false},
    isSurveyChart: {type: Boolean, default: false},
    isAnswerData: {type: Boolean, default: false},
    isSurveyLog: {type: Boolean, default: false},
    isAnswerLog: {type: Boolean, default: false},
    isAnswerUrlV6: {type: Boolean, default: false}
  },
  data () {
    return {
      survey: {
        sid: '',
        answerUrl: '',
        answerUrl1: '',
        answerUrlQR: '',
        siteCompCodeRoot: '',
        surveyState: ''
      },
      prevPath: '/dw'
    }
  },
  mounted () {
    console.debug(process.env)
    this.getSurveyInfo()
  },
  methods: {
    buttonClickA (href) {
      window.location.href = href
    },
    handlePush (to) {
      this.$router.push(to)
    },
    surveyStateChange () {
      console.debug(this.survey.surveyState)
      dwSurveyUpState(this.$route.params.id, this.survey.surveyState).then((response) => {
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.$message.success('问卷状态设置成功')
        } else {
          this.$message.error('问卷状态设置失败')
        }
      })
    },
    getSurveyInfo () {
      dwSurveyInfo(this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.survey = resultData
        this.survey.answerUrl = location.origin + '/#/diaowen/' + this.survey.sid
        this.survey.answerUrl1 = location.origin + '/static/diaowen/answer-p.html?sid=' + this.survey.sid
        this.survey.answerUrlQR = process.env.DW_API_URL+'/api/dwsurvey/anon/response/answerTD.do?surveyId=' + this.survey.id
        this.survey.siteCompCodeRoot = '<div id="dwsurveyWebAnswerCompCode"><div id="dwsurveyWebSiteFixed" style="position: fixed; right: 0px; left: auto; top: 520px; z-index: 99999;"><a target=\'_blank\' id="dwsurveyWebSiteFixedA" href="' + this.survey.answerUrl + '" style="background-color: rgb(24, 144, 255); width: 15px; display: block; padding: 10px 6px 10px 10px; color: white; cursor: pointer; float: right; vertical-align: middle; text-decoration: none; font-size: 12px; box-sizing: content-box; line-height: 20px;">问卷调查</a></div></div>'
        this.survey.surveyDetail.effective = resultData.surveyDetail.effective === 1
        this.survey.surveyDetail.effectiveIp = resultData.surveyDetail.effectiveIp === 1
        this.survey.surveyDetail.refresh = resultData.surveyDetail.refresh === 1
        this.survey.surveyDetail.rule = resultData.surveyDetail.rule === 1
        this.survey.surveyDetail.ynEndNum = resultData.surveyDetail.ynEndNum === 1
        this.survey.surveyDetail.ynEndTime = resultData.surveyDetail.ynEndTime === 1
        this.survey.answerUrlV6 = location.origin + '/#/v6/diaowen/an/' + this.survey.sid
      })
    }
  }
}

</script>
<style scoped>
.dw-dcs-main{
  background-color: white;
  padding: 20px;
}
.dw-dcs-main-survey-title{
  border-bottom: 1px solid rgb(241, 242, 245);
  padding-bottom: 20px;
  padding-left: 10px;
}
.dw-dcs-main-survey-title-content{
  font-size: 26px;
  font-weight: 300;
}
.dw-dcs-main-survey-step{
  padding: 0px;
}
.dw-dcs-main-survey-step-item{
  padding: 20px 10px;
  border-bottom: 1px solid rgb(241, 242, 245);
}
.dw-link{
  text-decoration: none;
  color: #606266;
  font-size: 14px;
}
.dw-link-1{
  font-size: 14px;
}
.dw-link-primary,.dw-link:hover{
  color: #409eff;
  font-weight: bold;
}
.dw-link i{
  margin-right: 6px;
}
.dw-dcs-main-survey-step-main{
  padding: 20px 10px;
}
.dw-dcs-main-survey-step-item-status{
  background-color: rgb(241, 242, 245);
  font-size: 14px;
  padding: 10px;
}
</style>
