<template>
  <div>
    <el-form ref="form" size="mini" >
      <div>
        <div class="dw-title-attr">回答限制</div>
        <div style="padding-left: 10px;">
          <el-form-item>
            <el-checkbox v-model="survey.surveyDetail.effective_model" >每个终端只能答1次</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="survey.surveyDetail.effectiveIp_model" >每个IP只能答1次</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="survey.surveyDetail.refresh_model" >重复启用验证码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyDetail.rule_model" >通过密码答卷</el-checkbox></div>
            <div v-show="survey.surveyDetail.rule_model"><el-input v-model="survey.surveyDetail.ruleCode" placeholder="请输入内容" style="width: 160px;"></el-input></div>
          </el-form-item>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="dw-title-attr">何时结束</div>
        <div style="padding-left: 10px;">
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyDetail.ynEndNum_model">指定结束份数</el-checkbox></div>
            <div v-show="survey.surveyDetail.ynEndNum_model">
              <el-input-number :min="1" :max="100000" v-model="survey.surveyDetail.endNum" label="份数" controls-position="right" style="width: 160px;"></el-input-number>
            </div>
          </el-form-item>
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyDetail.ynEndTime_model">指定结束时间</el-checkbox></div>
            <div v-show="survey.surveyDetail.ynEndTime_model">
              <el-date-picker v-model="survey.surveyDetail.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 160px;" ></el-date-picker>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DwDesignSurveyAttrs',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      labelPosition: 'right'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 6px;
}
.dw-title-attr{
  font-weight: bold;
  font-size: 14px;
  color: grey;
  padding: 20px 20px 10px 20px;
}
</style>
