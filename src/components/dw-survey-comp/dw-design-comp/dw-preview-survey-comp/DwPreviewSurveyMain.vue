<template>
  <div class="dw-preview-container" >
    <div class="dw-preview-header">
      <div class="dw-preview-header-center">
        <label><i :class=" previewTypeClass === 'dw-preview-pc' ? 'active' : ''" class="dw-icon-button fas fa-desktop" @click="previewTabClick('dw-preview-pc')"></i></label>
        <label><i :class=" previewTypeClass === 'dw-preview-pad' ? 'active' : ''" class="dw-icon-button fas fa-tablet-alt" @click="previewTabClick('dw-preview-pad')"></i></label>
        <label><i :class=" previewTypeClass === 'dw-preview-phone' ? 'active' : ''" class="dw-icon-button fas fa-mobile-alt" @click="previewTabClick('dw-preview-phone')"></i></label>
      </div>
      <div class="dw-preview-header-right">
        <el-button type="primary" size="small">确认发布</el-button>
        <el-button type="primary" plain size="small" @click="designSurvey">返回编辑</el-button>
        <el-button size="small">返回列表</el-button>
      </div>
    </div>

    <div>
      <div v-show="previewTypeClass === 'dw-preview-pc'" class="dw-preview-main" style="background: #F1F1F1;">
        <div class="dw-preview-answer-survey-container">
          <div class="dw-preview-pc">
            <div class="dw-preview-body">
              <div style="padding: 20px;">
                <el-row>
                  <el-col :span="16" :offset="4" >
                    <dw-answer-survey-main></dw-answer-survey-main>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="previewTypeClass === 'dw-preview-pad'" class="dw-preview-main">
        <div class="dw-preview-answer-survey-container">
          <div class="dw-preview-pad">
            <div class="dw-preview-body">
              <div style="padding: 10px;background: #F1F1F1;">
                <dw-answer-survey-main></dw-answer-survey-main>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="previewTypeClass === 'dw-preview-phone'" class="dw-preview-main">
        <div class="dw-preview-answer-survey-container">
          <div class="dw-preview-phone">
            <div class="dw-preview-body">
              <div style="padding: 0;">
                <dw-answer-survey-main></dw-answer-survey-main>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DwAnswerSurvey from '../../../../views/dw-survey/dw-answer/DwAnswerSurvey.vue'
import DwAnswerSurveyMain from "../../dw-answer-comp/DwAnswerSurveyMain.vue";

export default {
  name: 'DwPreviewSurveyMain',
  components: {DwAnswerSurveyMain, DwAnswerSurvey},
  data () {
    return {
      activeName: 'first',
      previewTypeClass: 'dw-preview-pc' // dw-preview-pad, dw-preview-phone
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    previewTabClick (className) {
      this.previewTypeClass = className
    },
    designSurvey () {
      const surveyId = this.$route.params.id
      this.$router.push('/v6/diaowen/design/survey/'+surveyId)
    }
  }
}
</script>

<style scoped>
.dw-preview-container{
  /*background: #ecedee;*/
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
  color: #409EFF;
  font-size: 18px;
}
.dw-preview-main{
  padding-top: 38px;
}
.dw-preview-answer-survey-container .dw-preview-pc{
  margin: 0 auto;
}
.dw-preview-answer-survey-container .dw-preview-pad{
  background: url('/static/diaowen/v6/images/ipad.jpg') no-repeat;
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
}
.dw-preview-answer-survey-container .dw-preview-phone{
  background: url('/static/diaowen/v6/images/iphone.png') no-repeat;
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
</style>
