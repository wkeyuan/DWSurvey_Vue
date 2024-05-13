<template>
  <div class="answerReviewRoot">
    <el-row>
      <el-col>
        <div style="background-color: #dfdfe0;">
          <div v-if="dwEsSurveyAnswer!==null && dwEsSurveyAnswer!==undefined" style="padding: 10px;">
            <el-descriptions :column="2" title="答卷基本信息" border>
              <template slot="extra">
                <!--                <el-button type="primary" size="small">页面打开</el-button>-->
              </template>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-key"></i>&nbsp;&nbsp;ID</template>
                {{ dwEsSurveyAnswer.answerCommon.sid }}/{{ dwEsSurveyAnswer.esId }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-user"></i>&nbsp;&nbsp;用户</template>
                {{ dwEsSurveyAnswer.answerCommon.anUser.userName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-date"></i>&nbsp;&nbsp;时间</template>
                {{ dwEsSurveyAnswer.answerCommon.anTime.endAnDate }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-place"></i>&nbsp;&nbsp;IP
                </template>
                {{ dwEsSurveyAnswer.answerCommon.anIp.ip }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-office-building"></i>&nbsp;&nbsp;IP地址
                </template>
                {{ dwEsSurveyAnswer.answerCommon.anIp.addr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-star-off"></i>&nbsp;&nbsp;总分
                </template>
                {{ dwEsSurveyAnswer.answerCommon.sumScore }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div style="margin-top: 0;">
            <dw-answer-survey :answer-props="answerProps" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '630px',height: 'auto'}, isPreview: true, readonly: true, isShowScore: true}"></dw-answer-survey>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DwAnswerSurveyMain from '../../dw-answer-comp/DwAnswerSurveyMain.vue'
import DwAnswerSurvey from '../../dw-answer-comp/DwAnswerSurvey.vue'

export default {
  name: 'DwSurveyAnswerReview',
  components: {DwAnswerSurvey, DwAnswerSurveyMain},
  props: {
    dwEsSurveyAnswer: {type: Object, default: () => {}},
    padPhoneAnBodySpan: {type: Object, default: () => {}}
  },
  data () {
    return {
      thDwEsSurveyAnswer: null,
      answerProps: {surveyId: null, sid: null, answerId: null, anPwd: ''} // surveyId 或 sid
    }
  },
  mounted () {
    if (this.$route.params.hasOwnProperty('sid') && this.$route.params.hasOwnProperty('answerId')) {
      this.answerProps.sid = this.$route.params.sid
      this.answerProps.answerId = this.$route.params.answerId
    } else {
      if (this.dwEsSurveyAnswer!==null) {
        this.answerProps.surveyId = this.dwEsSurveyAnswer.answerCommon.surveyId
        this.answerProps.sid = this.dwEsSurveyAnswer.answerCommon.sid
        this.answerProps.answerId = this.dwEsSurveyAnswer.esId
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.answerReviewRoot /deep/ .el-descriptions__header{
  margin-bottom: 10px;
}
</style>
