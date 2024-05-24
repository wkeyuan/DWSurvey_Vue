<template>
  <!--  编辑器上下结构 @click="documentClick" -->
  <div @click="documentClick" >
    <div v-if="survey!=null" class="dw-design-container" >
      <el-container>
        <el-header class="header" style="">
          <dw-design-header v-model="survey" ></dw-design-header>
        </el-header>
        <el-main style="padding: 0;">
          <div style="min-height: 600px;">
            <div>
              <div id="tools_wrap" ref="toolsWrap" :style="`top:${headerQuToolbarStyle.top};z-index: ${headerQuToolbarStyle.index};`" >
                <dw-design-toolbar v-model="survey" @start-drag="onStartToolbar" @end-drag="onEnd" ></dw-design-toolbar>
              </div>

              <div :style="containerBodyStyle" style="margin-top: 157px;margin-bottom: 0;" >
                <div class="dw-container-body">
                  <el-row :gutter="10">
                    <el-col :span="4">
                      <div :style="`top:${containerLRStyle.top};z-index: ${containerLRStyle.index};`" class="dw-container-body-center-left dw-container-body-lr">
                        <dw-design-container-body-left v-model="survey" :lr-content-height="lrContentHeight"></dw-design-container-body-left>
                      </div>
                    </el-col>
                    <el-col :span="16">
                      <dw-design-container-body-center ref="designContainerBody" v-model="survey" @start-drag-container="onStartDragContainer" @end-drag="onEnd" ></dw-design-container-body-center>
                    </el-col>
                    <el-col :span="4">
                      <div :style="`top:${containerLRStyle.top};z-index: ${containerLRStyle.index};`" class="dw-container-body-center-right dw-container-body-lr">
                        <dw-design-container-body-right v-model="survey" @start-drag-right="onStartRight" @end-drag="onEnd" ></dw-design-container-body-right>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
          <div style=""><dw-footer></dw-footer></div>
        </el-main>
      </el-container>
    </div>
    <div v-else>
      <div style="font-size: 16px;text-align: center;padding: 100px;height: 100vh;background-color: white;color: #202120;">
        加载中...
      </div>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import DwDesignQuestion from '../../dw-design-survey-question/DwDesignQuestion'
import DwTextEditLabel from '../../dw-design-survey-common/DwTextEditLabel'
import DwDesignQuRadio from '../../dw-design-survey-question/dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwTextEditLabelCommon from '../../dw-design-survey-common/DwTextEditLabelCommon'
import DwDesignHeader from './comp/DwDesignHeader'
import DwDesignToolbar from './dw-design-toolbar/DwDesignToolbar.vue'
import {questionComps} from '../../api/dw-design-survey-api'
import DwDesignContainerBodyCenter
  from '../../dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyCenter'
import DwDesignContainerBodyLeft from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-left/DwDesignContainerBodyLeft.vue'
import DwDesignContainerBodyRight from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-right/DwDesignContainerBodyRight.vue'
import DwFooter from '../../../../../layouts/DwFooter.vue'
import {resetOtherClickItem} from '../../../../dw-utils/dw-survey-update-item-click'

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
      headerQuToolbarStyle: {top: 60, index: 200},
      containerLRStyle: {top: 0, index: 100},
      lrContentHeight: 157,
      containerBodyStyle: '',
      questions: [],
      radio: '1',
      hover: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd () {
      this.drag = false
      // this.headerQuToolbarStyle = `${this.headerQuToolbarStyle}`
      this.resetStyleIndex()
    },
    resetStyleIndex () {
      this.headerQuToolbarStyle.index = 200
      this.containerLRStyle.index = 100
    },
    onStartToolbar () {
      // 工具栏
      this.onStart()
      this.resetStyleIndex()
    },
    onStartDragContainer () {
      // 内容区
      this.onStart()
      this.headerQuToolbarStyle.index = 20
      this.containerLRStyle.index = 10
    },
    onStartRight () {
      // 右测边栏
      this.onStart()
      this.headerQuToolbarStyle.index = 100
      this.containerLRStyle.index = 200
    },
    centerMarginTop () {
      let centerMarginTop = 157
      const windowInnerHeight = window.innerHeight
      if (windowInnerHeight > 1280) centerMarginTop = 160
      this.containerBodyStyle = `margin-top:${centerMarginTop}px;`
      return centerMarginTop
    },
    onScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      const centerMarginTop = this.centerMarginTop()
      const lrUnContentHeight = 60 // 60 是左右去掉非内容区域的高度
      if (scrollTop >= headerHeight) {
        const newTop1 = scrollTop - headerHeight
        const lrHeight = window.innerHeight - (centerMarginTop) - lrUnContentHeight
        console.debug('lrHeight', lrHeight)
        this.headerQuToolbarStyle.top = '0px'
        this.containerLRStyle.top = `${newTop1}px`
        this.lrContentHeight = lrHeight
      } else {
        const newTop = headerHeight - scrollTop
        console.debug('window.innerHeight', window.innerHeight)
        const lrHeight = window.innerHeight - (centerMarginTop+newTop) - lrUnContentHeight
        this.headerQuToolbarStyle.top = `${newTop}px`
        this.containerLRStyle.top = `0px`
        // height:${lrHeight}px;
        this.lrContentHeight = lrHeight
      }
    },
    documentClick () {
      /*
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        this.survey.curEditObj[i].itemClick = false
      }*/
      // this.$refs.designContainerBody.documentClick()
      resetOtherClickItem(this.survey, -1)
    }
  }
}
</script>

<style scoped>
@import '../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../assets/css/design-survey.css';

.el-header{
  /*background-color: #25292E;*/
  background-color: var(--dw-primary-bg-color);
}

.dw-container-body-lr{
  background-color: white;
  /*overflow-y: scroll;*/
}
</style>
