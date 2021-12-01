<template>
  <div>
    <dw-survey-dcs-wrapper is-survey-set="true" >
      <template v-slot:dw-dcs-main-slot >
        <div>
          <div class="dw-dcs-main-title">
            <h4>问卷属性设置</h4>
            <div class="dw-dcs-main-p">配置问卷答卷时的收集规则</div>
          </div>
          <div class="dw-dcs-main-content">

            <div style="padding: 0px 30px;">
              <el-form ref="form" :label-position="labelPosition" :model="form" >
                <el-row>
                  <el-col :span="12">
                    <h5>回答限制</h5>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.effective" >每台电脑或手机只能答一次</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.effectiveIp" >每个IP只能答一次</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.refresh">有重复回答启用验证码</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.rule">启用访问密码，设置密码</el-checkbox>
                        <el-input v-model="survey.surveyDetail.ruleCode" placeholder="请输入内容" style="width: 160px;"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <h5>何时结束</h5>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.ynEndNum">收集到
                          <el-input-number :min="1" :max="100000" v-model="survey.surveyDetail.endNum" label="份数" controls-position="right"></el-input-number>
                          份时结束</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.ynEndTime">时间到
                          <el-date-picker
                            v-model="survey.surveyDetail.endTime"
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
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>

<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import API from '@/api/index.js'
import {dwSurveyInfo, dwSurveyUpdate} from '@/api/dw-survey'

export default {
  name: 'DwSurveyAttr',
  components: {
    DwSurveyDcsWrapper
  },
  data () {
    return {
      labelPosition: 'right',
      value1: '',
      survey: {
        surveyDetail: {
          effective: false,
          effectiveIp: false
        }
      },
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
    this.getSurveyInfo()
  },
  methods: {
    getSurveyInfo () {
      dwSurveyInfo(this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.survey = resultData
        this.survey.surveyDetail.effective = resultData.surveyDetail.effective === 1
        this.survey.surveyDetail.effectiveIp = resultData.surveyDetail.effectiveIp === 1
        this.survey.surveyDetail.refresh = resultData.surveyDetail.refresh === 1
        this.survey.surveyDetail.rule = resultData.surveyDetail.rule === 1
        this.survey.surveyDetail.ynEndNum = resultData.surveyDetail.ynEndNum === 1
        this.survey.surveyDetail.ynEndTime = resultData.surveyDetail.ynEndTime === 1
      })
    },
    onSubmit () {
      console.log('submit!')
      const surveyDetail = this.survey.surveyDetail
      const data = {
        dirId: surveyDetail.dirId,
        effective: surveyDetail.effective ? 1 : 0,
        effectiveIp: surveyDetail.effectiveIp ? 1 : 0,
        refresh: surveyDetail.refresh ? 1 : 0,
        rule: surveyDetail.rule ? 1 : 0,
        ynEndNum: surveyDetail.ynEndNum ? 1 : 0,
        ynEndTime: surveyDetail.ynEndTime ? 1 : 0,
        endNum: surveyDetail.endNum,
        endTime: surveyDetail.endTime
      }
      console.log(data)
      dwSurveyUpdate(data).then((response) => {
        console.log(response)
        const data = response.data;
        if (data.resultCode === 200) {
          this.$message({ type: 'success', message: '保存成功' })
        } else {
          this.$message({ type: 'error', message: data.resultMsg })
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
