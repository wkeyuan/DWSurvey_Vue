<template>
  <!--  编辑器上下结构 -->
  <div class="dw-design-container" @click="documentClick">
    <el-container>
      <el-header class="header" style="">
        <dw-design-header></dw-design-header>
      </el-header>
      <el-main style="padding: 0px;">
        <div>
          <div id="tools_wrap" ref="toolsWrap" :style="headerQuToolbarStyle" >
            <dw-design-toolbar></dw-design-toolbar>
          </div>

          <div :style="containerBodyStyle" style="margin-top: 157px;margin-bottom: 30px;" >
            <div class="dw-container-body">
              <el-row :gutter="10">
                <el-col :span="4">
                  <div :style="containerLRStyle" class="dw-container-body-center-left dw-container-body-lr">
                    <dw-design-container-body-left v-model="survey" ></dw-design-container-body-left>
                  </div>
                </el-col>
                <el-col :span="16">
                  <dw-design-container-body-center ref="designContainerBody" v-model="survey" ></dw-design-container-body-center>
                </el-col>
                <el-col :span="4">
                  <div :style="containerLRStyle" class="dw-container-body-center-right dw-container-body-lr">
                    <dw-design-container-body-right></dw-design-container-body-right>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import DwDesignQuestion from '../../dw-design-survey-question/DwDesignQuestion'
import DwTextEditLabel from '../../dw-design-survey-common/DwTextEditLabel'
import DwDesignQuRadio from '../../dw-design-survey-question/dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwTextEditLabelCommon from '../../dw-design-survey-common/DwTextEditLabelCommon'
import DwDesignHeader from './comp/DwDesignHeader'
import DwDesignToolbar from './comp/DwDesignToolbar'
import {questionComps} from '../../api/dw-design-survey-api'
import DwDesignContainerBodyCenter
  from '../../dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyCenter'
import DwDesignContainerBodyLeft from '../../dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyLeft'
import DwDesignContainerBodyRight from '../../dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyRight'

export default {
  name: 'DwDesignTopBottomLayout',
  components: {
    DwDesignContainerBodyRight,
    DwDesignContainerBodyLeft,
    DwDesignContainerBodyCenter,
    DwDesignToolbar,
    DwDesignHeader,
    DwTextEditLabelCommon,
    DwDesignQuRadio,
    DwTextEditLabel,
    DwDesignQuestion,
    draggable
  },
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
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
      hover: false
    }
  },
  mounted () {
    this.loadDesignSurveyData()
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onStart () {
      this.drag=true
    },
    onEnd () {
      this.drag=false
    },
    loadDesignSurveyData () {
      questionComps().then((response) => {
        console.debug('response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.questions = httpResult.data
        }
      })
      const surveyId = this.$route.params.id
      const params = {surveyId}
      /* querySurveyAll(params).then((response) => {
        console.debug('querySurveyAll',response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.questions = httpResult.data
        }
      }) */
      this.contetnMarginTop()
    },
    contetnMarginTop () {
      let contetnMarginTop = 157
      const windowInnerHeight = window.innerHeight
      if (windowInnerHeight > 1280) contetnMarginTop = 160
      this.containerBodyStyle = `margin-top:${contetnMarginTop}px;`
      return contetnMarginTop
    },
    onScroll (position) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      const contentMarginTop = this.contetnMarginTop()
      if (scrollTop >= headerHeight) {
        this.headerQuToolbarStyle = 'top:0px;'
        const newTop1 = scrollTop - headerHeight
        const lrHeight = window.innerHeight - (contentMarginTop) - 10
        console.debug('lrHeight', lrHeight)
        this.containerLRStyle = `top:${newTop1}px;`
        // height:${lrHeight}px;
        this.lrContentHeight = lrHeight
      } else {
        const newTop = headerHeight - scrollTop
        this.headerQuToolbarStyle = `top:${newTop}px;`
        console.debug('window.innerHeight', window.innerHeight)
        const lrHeight = window.innerHeight - (contentMarginTop+newTop) - 10
        this.containerLRStyle = `top:0px;`
        // height:${lrHeight}px;
        this.lrContentHeight = lrHeight
      }
    },
    documentClick () {
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        this.survey.curEditObj[i].itemClick = false
      }
      // this.$refs.designContainerBody.documentClick()
    }
  }
}
</script>

<style scoped>
@import '../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../assets/css/design-survey.css';

.header .header-content-left{
  display: flex;
}
.header .header-content-left .logo{
  width: 200px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
}
.header .header-content-left img{
  vertical-align: middle;
}
.header .header-content-left .logo h1{
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  vertical-align: top;
}
.dragClass{
  border: 1px solid dodgerblue;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: 1px dashed dodgerblue;
}
.dw-container-body-lr{
  background-color: white;
  overflow-y: scroll;
}
</style>
