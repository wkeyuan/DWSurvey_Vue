<template>
  <div :style="anBodyStyle" class="dw-answer-container">
    <el-row>
      <el-col :xs="anBodySpan.xs" :sm="anBodySpan.sm" :md="anBodySpan.md" :lg="anBodySpan.lg" :xl="anBodySpan.xl">
        <el-container>
          <el-main v-if="survey!=null && survey.hasOwnProperty('showSurvey') && survey.showSurvey" style="padding: 10px;">
            <div>
              <div>
                <div class="dw-container-body">
                  <div :style="dwElProgressStyle" class="dw-survey-answer-progress">
                    <el-progress :show-text="false" :stroke-width="3" :percentage="survey.hasOwnProperty('answerProgress') ? parseFloat(survey.answerProgress.percentage) : 0" :color="customColor" define-back-color="#dcdfe6"></el-progress>
                  </div>
                  <dw-answer-survey-body ref="designContainerBody" v-model="survey" ></dw-answer-survey-body>
                </div>
              </div>
            </div>
            <div style=""><dw-footer-sm></dw-footer-sm></div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import DwDesignContainerBodyCenter
  from '../../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyCenter.vue'
import DwAnswerSurveyBody from '../../dw-answer-survey-body/DwAnswerSurveyBody.vue'
import DwFooter from '../../../../layouts/DwFooter.vue'
import DwFooterSm from '../../../../layouts/DwFooterSm'

export default {
  name: 'DwAnswerDefaultLayout',
  components: {
    DwFooterSm,
    DwFooter,
    DwAnswerSurveyBody,
    DwDesignContainerBodyCenter
  },
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}},
    extParameters: {type: Object, default: () => {}}
  },
  data () {
    return {
      surveyId: '',
      drag: false,
      headerQuToolbarStyle: '',
      containerLRStyle: '',
      lrContentHeight: '',
      containerBodyStyle: '',
      questions: [],
      radio: '1',
      hover: false,
      answerSurvey: {
        questions: []
      },
      anBodySpan: {
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
        md: {span: 20, offset: 2},
        lg: {span: 16, offset: 4},
        xl: {span: 12, offset: 6}
      },
      anBodyStyle: {},
      customColor: '#025bb7',
      dwElProgressStyle: 'position: fixed;z-index:10000;'
    }
  },
  mounted () {
    if (this.extParameters!==null && this.extParameters!==undefined) {
      const extParameters = this.extParameters
      console.debug('extParameters', extParameters)
      // 查看是否有预览
      if (extParameters.hasOwnProperty('anBodySpan')) {
        const anBodySpan = extParameters.anBodySpan
        if (anBodySpan.hasOwnProperty('xs')) this.anBodySpan.xs = anBodySpan.xs
        if (anBodySpan.hasOwnProperty('sm')) this.anBodySpan.sm = anBodySpan.sm
        if (anBodySpan.hasOwnProperty('md')) this.anBodySpan.md = anBodySpan.md
        if (anBodySpan.hasOwnProperty('lg')) this.anBodySpan.lg = anBodySpan.lg
        if (anBodySpan.hasOwnProperty('xl')) this.anBodySpan.xl = anBodySpan.xl
      }
      if (extParameters.hasOwnProperty('anBodyStyle')) {
        this.anBodyStyle = extParameters.anBodyStyle
      }
      if (extParameters.hasOwnProperty('isPreview') && extParameters.isPreview) {
        this.dwElProgressStyle = ''
      }
    }
  },
  beforeCreate () {
    // document.querySelector('body').setAttribute('style', 'background-color:red')
  },
  beforeDestroy () {
    // document.querySelector('body').setAttribute('style', 'background-color:#F1F1F1')
  },
  methods: {
  }
}
</script>

<style scoped>
.dw-answer-container{
  background-color: #dfdfe0;
  min-height: 100vh;
}
.el-progress{
  border-radius: 0 !important;
  .el-progress-bar{
    border-radius: 0 !important;
    .el-progress-bar__outer{
      border-radius: 0 !important;
      .el-progress-bar__inner{
        border-radius: 0 !important;
      }
    }
  }
  .el-progress__text{
    font-size: 12px;
  }
}
.dw-survey-answer-progress {
  /*position: fixed;*/
  top: 0;
  width: 100%;
  left: 0;
}
</style>
<style>

</style>
