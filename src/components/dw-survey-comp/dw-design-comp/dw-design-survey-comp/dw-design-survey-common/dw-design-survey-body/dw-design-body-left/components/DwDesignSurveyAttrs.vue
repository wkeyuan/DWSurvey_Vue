<template>
  <div>
    <el-form ref="form" size="mini" >
      <div>
        <div class="dw-title-attr">回答限制</div>
        <div style="padding-left: 10px;">
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.anBroAttr.enabled" >启用浏览器终端回答限制</el-checkbox></div>
            <div v-show="survey.surveyAttrs.anBroAttr.enabled" style="font-size: 12px;">
              每个浏览器可回答次数<el-input-number :min="1" :max="100000" v-model="survey.surveyAttrs.anBroAttr.anNum" size="mini" style="width: 130px;"></el-input-number>&nbsp;次
            </div>
          </el-form-item>
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.anIpAttr.enabled" >启用IP回答限制</el-checkbox></div>
            <div v-show="survey.surveyAttrs.anIpAttr.enabled" style="font-size: 12px;">
              每个IP可回答次数<el-input-number :min="1" :max="100000" v-model="survey.surveyAttrs.anIpAttr.anNum" size="mini" style="width: 130px;"></el-input-number>&nbsp;次
            </div>
          </el-form-item>
          <el-checkbox v-model="survey.surveyAttrs.anRefreshAttr.randomCode" >重复回答启用验证码</el-checkbox>
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.anPwdAttr.enabled" >启用通过密码答卷</el-checkbox></div>
            <div v-show="survey.surveyAttrs.anPwdAttr.enabled"><el-input v-model="survey.surveyAttrs.anPwdAttr.anPwdCode" size="mini" placeholder="请输入密码" style="width: 160px;"></el-input></div>
          </el-form-item>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="dw-title-attr">计分属性</div>
        <div style="padding-left: 10px;">
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.scoreAttr.enabled">打开计分功能</el-checkbox></div>
          </el-form-item>
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.scoreAttr.showSumScore.enabled">答卷结束显示总分</el-checkbox></div>
            <div v-show="survey.surveyAttrs.scoreAttr.showSumScore.enabled">
              <el-select v-model="survey.surveyAttrs.scoreAttr.showSumScore.showContent">
                <el-option value="sum" label="仅显示总分"></el-option>
                <el-option value="sumAfterDetail" label="先显示总分后显示详情"></el-option>
                <el-option value="sumAndDetail" label="直接显示总分与详细"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="dw-title-attr">何时结束</div>
        <div style="padding-left: 10px;">
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.anEndNumAttr.enabled">指定结束份数</el-checkbox></div>
            <div v-show="survey.surveyAttrs.anEndNumAttr.enabled">
              <el-input-number :min="1" :max="100000" v-model="survey.surveyAttrs.anEndNumAttr.endNum" size="mini" style="width: 160px;"></el-input-number>
            </div>
          </el-form-item>
          <el-form-item>
            <div><el-checkbox v-model="survey.surveyAttrs.anEndTimeAttr.enabled">指定结束时间</el-checkbox></div>
            <div v-show="survey.surveyAttrs.anEndTimeAttr.enabled">
              <el-date-picker v-model="survey.surveyAttrs.anEndTimeAttr.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 160px;" ></el-date-picker>
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
