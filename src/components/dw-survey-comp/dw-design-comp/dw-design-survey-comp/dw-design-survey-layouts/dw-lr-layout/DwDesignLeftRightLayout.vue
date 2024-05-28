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
                <dw-design-toolbar-top v-model="survey" @start-drag="onStartToolbar" @end-drag="onEnd" ></dw-design-toolbar-top>
              </div>
              <div style="margin-top: 50px;margin-bottom: 0;" >
                <div class="dw-container-body">
                  <el-row :gutter="10" style="margin: 0;">
                    <el-col :span="4">
                      <div :style="`top:${containerLRStyle.top};z-index: ${containerLRStyle.index};`" class="dw-container-body-center-left dw-container-body-lr dw-container-body-lr-flex">
                        <dw-design-container-body-left v-model="survey" :lr-content-height="lrContentHeight"></dw-design-container-body-left>
                      </div>
                    </el-col>
                    <el-col :span="16" :offset="4">
                      <dw-design-container-body-center ref="designContainerBody" v-model="survey" @start-drag-container="onStartDragContainer" @end-drag="onEnd" ></dw-design-container-body-center>
                    </el-col>
                    <el-col :span="4">
                      <div :style="`top:${containerLRStyle.top};z-index: ${containerLRStyle.index};`" class="dw-container-body-center-right dw-container-body-lr dw-container-body-lr-flex">
                        <dw-design-container-body-right v-model="survey" :lr-content-height="lrContentHeight" @start-drag-right="onStartRight" @end-drag="onEnd" ></dw-design-container-body-right>
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
import DwDesignContainerBodyCenter
  from '../../dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyCenter'
import DwDesignContainerBodyLeft from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-left/DwDesignContainerBodyLeft.vue'
import DwDesignContainerBodyRight from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-right/DwDesignContainerBodyRight.vue'
import DwFooter from '../../../../../layouts/DwFooter.vue'
import {resetOtherClickItem} from '../../../../dw-utils/dw-survey-update-item-click'
import DwDesignToolbar from '../dw-tb-layout/dw-design-toolbar/DwDesignToolbar.vue'
import DwDesignToolbarTop from './dw-design-toolbar/DwDesignToolbarTop.vue'
import DwDesignHeader from '../dw-tb-layout/comp/DwDesignHeader.vue'

export default {
  name: 'DwDesignLeftRightLayout',
  components: {
    DwDesignHeader,
    DwDesignToolbarTop,
    DwDesignToolbar,
    DwFooter,
    DwDesignContainerBodyRight,
    DwDesignContainerBodyLeft,
    DwDesignContainerBodyCenter,
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
      containerLRStyle: {top: 110, index: 100},
      lrContentHeight: 100,
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
    onScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      const centerMarginTop = 50
      const lrUnContentHeight = 60 // 60 是左右去掉非内容区域的高度
      if (scrollTop >= headerHeight) {
        this.headerQuToolbarStyle.top = '0px'
        this.containerLRStyle.top = `${centerMarginTop}px`
        this.lrContentHeight = window.innerHeight - centerMarginTop - lrUnContentHeight
      } else {
        const newTop = headerHeight - scrollTop
        this.headerQuToolbarStyle.top = `${newTop}px`
        const newTop2 = centerMarginTop + newTop
        this.containerLRStyle.top = `${newTop2}px`
        this.lrContentHeight = window.innerHeight - newTop2 - lrUnContentHeight
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

/deep/ #tools_wrap{
  background: white!important;
}
.dw-container-body-lr-flex{
  position: fixed;
  z-index: 20;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  top: 110px;
  width: inherit;
  height: 100vh;
}
.dw-container-body-center-left{
  left: 0;
}
.dw-container-body-center-right{
  right: 0;
}

</style>
