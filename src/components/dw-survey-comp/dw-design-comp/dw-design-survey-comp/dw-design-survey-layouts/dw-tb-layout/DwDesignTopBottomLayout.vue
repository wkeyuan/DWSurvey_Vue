<template>
  <!--  编辑器上下结构 -->
  <div class="dw-design-container" @click="documentClick">
    <el-container>
      <el-header class="header" style="">
        <dw-design-header></dw-design-header>
      </el-header>
      <el-main style="padding: 0;">
        <div v-if="survey!=null">
          <div id="tools_wrap" ref="toolsWrap" :style="headerQuToolbarStyle" >
            <dw-design-toolbar v-model="survey"></dw-design-toolbar>
          </div>

          <div :style="containerBodyStyle" style="margin-top: 157px;margin-bottom: 0;" >
            <div class="dw-container-body">
              <el-row :gutter="10">
                <el-col :span="4">
                  <div :style="containerLRStyle" class="dw-container-body-center-left dw-container-body-lr">
                    <dw-design-container-body-left v-model="survey" ></dw-design-container-body-left>
                  </div>
                </el-col>
                <el-col :span="16">
                  <dw-design-container-body-center ref="designContainerBody" v-model="survey" @start-drag="onStart" @end-drag="onEnd" ></dw-design-container-body-center>
                </el-col>
                <el-col :span="4">
                  <div :style="containerLRStyle" class="dw-container-body-center-right dw-container-body-lr">
                    <dw-design-container-body-right v-model="survey" ></dw-design-container-body-right>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div style=""><dw-footer></dw-footer></div>
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
import DwDesignContainerBodyLeft from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-left/DwDesignContainerBodyLeft.vue'
import DwDesignContainerBodyRight from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-right/DwDesignContainerBodyRight.vue'
import DwFooter from "../../../../../layouts/DwFooter.vue";

export default {
  name: 'DwDesignTopBottomLayout',
  components: {
    DwFooter,
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
      this.drag = true
      this.toolbarIndex()
    },
    onEnd () {
      this.drag = false
      this.headerQuToolbarStyle = `${this.headerQuToolbarStyle}`
    },
    toolbarIndex () {
      if (this.drag) {
        this.headerQuToolbarStyle = `z-index: 10; ${this.headerQuToolbarStyle}`
        this.containerLRStyle = `z-index: 10; ${this.containerLRStyle}`
      }
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
      this.centerMarginTop()
    },
    centerMarginTop () {
      let centerMarginTop = 157
      const windowInnerHeight = window.innerHeight
      if (windowInnerHeight > 1280) centerMarginTop = 160
      this.containerBodyStyle = `margin-top:${centerMarginTop}px;`
      return centerMarginTop
    },
    onScroll (position) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      const centerMarginTop = this.centerMarginTop()
      if (scrollTop >= headerHeight) {
        this.headerQuToolbarStyle = 'top:0px;'
        const newTop1 = scrollTop - headerHeight
        const lrHeight = window.innerHeight - (centerMarginTop) - 10
        console.debug('lrHeight', lrHeight)
        this.containerLRStyle = `top:${newTop1}px;`
        // height:${lrHeight}px;
        this.lrContentHeight = lrHeight
      } else {
        const newTop = headerHeight - scrollTop
        this.headerQuToolbarStyle = `top:${newTop}px;`
        console.debug('window.innerHeight', window.innerHeight)
        const lrHeight = window.innerHeight - (centerMarginTop+newTop) - 10
        this.containerLRStyle = `top:0px;`
        // height:${lrHeight}px;
        this.lrContentHeight = lrHeight
      }
      this.toolbarIndex()
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

.dw-container-body-lr{
  background-color: white;
  overflow-y: scroll;
}
</style>
