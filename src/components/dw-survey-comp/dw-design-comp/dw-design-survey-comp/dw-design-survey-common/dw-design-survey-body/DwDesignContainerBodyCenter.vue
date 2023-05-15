<template>
  <div class="dw-container-body-center">
    <div style="min-height: 600px;">
      <div style="text-align: center;padding: 20px;">
        <dw-text-edit-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-text-edit-label-common>
      </div>
      <div style="padding: 0px 40px;">
        <dw-text-edit-label-common v-model="survey.surveyDetail.surveyNodeObj" :survey="survey" ></dw-text-edit-label-common>
      </div>
      <div>
        <div>
          <draggable
            v-model="survey.questions"
            :force-fallback="true"
            :group="{ name: 'people', pull: true, put: true }"
            handle=".dwMoveSortQu"
            animation="300"
            drag-class="dwDragClass"
            ghost-class="dwGhostClass"
            chosen-class="dwChosenClass"
            @start="onStart"
            @end="onEnd">
            <transition-group>
              <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" >
                <dw-design-question ref="designQuestion" :index="index" :item="item" v-model="survey" ></dw-design-question>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div style="padding: 10px 20px;text-align: center;">
      </div>
    </div>
    <div style=""><dw-footer></dw-footer></div>
  </div>
</template>

<script>
import DwDesignToolbar from '../../dw-design-survey-layouts/dw-tb-layout/comp/DwDesignToolbar'
import DwDesignHeader from '../../dw-design-survey-layouts/dw-tb-layout/comp/DwDesignHeader'
import DwTextEditLabelCommon from '../DwTextEditLabelCommon'
import DwDesignQuRadio from '../../dw-design-survey-question/dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwTextEditLabel from '../DwTextEditLabel'
import DwDesignQuestion from '../../dw-design-survey-question/DwDesignQuestion'
import draggable from 'vuedraggable'
import DwFooter from '../../../../../layouts/DwFooter'
import DwDesignQuestionCommon from '../../dw-design-survey-question/DwDesignQuestionCommon.vue'
import {dwResetQuestionRefreshValue} from '../../../../dw-utils/dw-update-survey-question'

export default {
  name: 'DwDesignContainerBodyCenter',
  components: {
    DwDesignQuestionCommon,
    DwFooter,
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
      drag: false
    }
  },
  methods: {
    onStart () {
      this.drag = true
      this.$emit('start-drag')
    },
    onEnd (attrs) {
      this.$emit('end-drag')
      console.debug('attrs', attrs)
      this.drag = false
      // 更新状态
      const newIndex = attrs.newIndex
      const oldIndex = attrs.oldIndex
      if (newIndex>oldIndex) {
        this.refreshData(oldIndex)
      } else {
        this.refreshData(newIndex)
      }
    },
    documentClick () {
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        this.survey.curEditObj[i].itemClick = false
      }
    },
    refreshQuData (data) {
      // 关于状态的刷新，除通过方法调用硬刷新，还可以通过选项数据上绑定的itemClick实现
      this.$nextTick(() => {
        const quCommonItems = this.$refs.designQuestion
        for (let i=0; i<quCommonItems.length; i++) quCommonItems[i].refreshQuData(data)
      })
    },
    refreshData (quIndex) {
      const questions = this.survey.questions
      questions.forEach((item, index) => {
        if (index>=quIndex) this.survey.questions.splice(index, 1, dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))))
      })
      this.documentClick()
    }
  }
}
</script>

<style scoped>
.dw-container-body-center{
  position: relative;
  z-index: 50;
  width: 100%;
  border:1px solid #f3f3f3;
}
</style>
