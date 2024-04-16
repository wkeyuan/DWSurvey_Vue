<template>
  <div>
    <dw-survey-dcs-wrapper-v6 :is-survey-set="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div v-loading="loading">
          <div v-if="thSurvey!==null">
            <div class="dw-dcs-main-title">
              <h4>问卷属性设置</h4>
              <div class="dw-dcs-main-p">配置问卷答卷时的收集规则</div>
            </div>
            <div class="dw-dcs-main-content">

              <div style="padding: 0 30px;">
                <el-form ref="form" :label-position="labelPosition" :model="form" >
                  <el-row>
                    <el-col :span="12">
                      <h5>回答限制</h5>
                      <div style="padding-left: 10px;">
                        <el-form-item>
                          <div><el-checkbox v-model="thSurvey.surveyAttrs.anBroAttr.enabled" >启用浏览器终端回答限制</el-checkbox></div>
                          <div v-show="thSurvey.surveyAttrs.anBroAttr.enabled" style="font-size: 12px;">
                            每个浏览器可回答次数<el-input-number :min="1" :max="100000" v-model="thSurvey.surveyAttrs.anBroAttr.anNum" size="mini" style="width: 130px;"></el-input-number>&nbsp;次
                          </div>
                        </el-form-item>
                        <el-form-item>
                          <div><el-checkbox v-model="thSurvey.surveyAttrs.anIpAttr.enabled" >启用IP回答限制</el-checkbox></div>
                          <div v-show="thSurvey.surveyAttrs.anIpAttr.enabled" style="font-size: 12px;">
                            每个IP可回答次数<el-input-number :min="1" :max="100000" v-model="thSurvey.surveyAttrs.anIpAttr.anNum" size="mini" style="width: 130px;"></el-input-number>&nbsp;次
                          </div>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="thSurvey.surveyAttrs.anRefreshAttr.randomCode" >重复回答启用验证码</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <div><el-checkbox v-model="thSurvey.surveyAttrs.anPwdAttr.enabled" >启用通过密码答卷</el-checkbox></div>
                          <div v-show="thSurvey.surveyAttrs.anPwdAttr.enabled"><el-input v-model="thSurvey.surveyAttrs.anPwdAttr.anPwdCode" size="mini" placeholder="请输入密码" style="width: 160px;"></el-input></div>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <h5>何时结束</h5>
                      <div style="padding-left: 10px;">
                        <el-form-item>
                          <el-checkbox v-model="thSurvey.surveyAttrs.anEndNumAttr.enabled">收集到
                            <el-input-number :min="1" :max="100000" v-model="thSurvey.surveyAttrs.anEndNumAttr.endNum" label="份数" controls-position="right"></el-input-number>
                            份时结束</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox v-model="thSurvey.surveyAttrs.anEndTimeAttr.enabled">时间到
                            <el-date-picker
                              v-model="thSurvey.surveyAttrs.anEndTimeAttr.endTime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="datetime"
                              placeholder="选择日期时间" >
                            </el-date-picker>
                            时结束
                          </el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit"> 保存修改 </el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div>

            </div>
          </div>
        </div>
      </template>
    </dw-survey-dcs-wrapper-v6>
  </div>
</template>

<script>

import DwSurveyDcsWrapperV6 from '../../../components/common/DwSurveyDcsWrapperV6.vue'
import DwDesignSurveyAttrs
  from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/dw-design-survey-common/dw-design-survey-body/dw-design-body-left/components/DwDesignSurveyAttrs.vue'
import {getDesignSurveyJsonBySurveyId} from '../../../components/dw-survey-comp/dw-utils/dw-survey-common'
import {clearSurveyJson, getSurveyJsonSimple} from '../../../components/dw-survey-comp/dw-utils/dw-survey-design'
import {clearSurveyAnswer} from '../../../components/dw-survey-comp/dw-answer-comp/dw-utils/dw-survey-answer-clear'
import {
  dwSaveSurveyJson
} from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api'

export default {
  name: 'DwSurveyAttr',
  components: {
    DwDesignSurveyAttrs,
    DwSurveyDcsWrapperV6
  },
  data () {
    return {
      labelPosition: 'right',
      value1: '',
      thSurvey: null,
      loading: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted () {
    this.loadSurvey()
  },
  methods: {
    loadSurvey () {
      const surveyId = this.$route.params.id
      const params = {surveyId}
      getDesignSurveyJsonBySurveyId(params, (survey) => {
        console.debug('design survey', survey)
        this.thSurvey = survey
        this.loading = false
      })
    },
    onSubmit () {
      this.saveSurveyFun(null)
    },
    saveSurveyFun (callback) {
      const surveyId = this.thSurvey.id
      const sid = this.thSurvey.sid
      // 清理无效数据
      clearSurveyJson(this.thSurvey)
      clearSurveyAnswer(this.thSurvey)
      console.debug('save this.survey', this.thSurvey)
      const surveyJsonText = JSON.stringify(this.thSurvey)
      const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText))
      const data = {surveyId, sid, surveyJsonText, surveyJsonSimple}
      console.debug('surveyJson data', data)
      dwSaveSurveyJson(data).then((response) => {
        console.debug('dwSaveSurveyJson-response', response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          this.$message.success('保存成功！')
          if (callback!=null) callback()
        } else {
          this.$message.success('保存失败！')
        }
      })
    }
  }
}

</script>

<style scoped>
.dw-dcs-main-p{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.dw-dcs-main-content{
  padding: 20px 0px;
}
</style>
