<template>
  <div class="dw-container-body-center">
    <div style="min-height: 600px;">
      <div style="text-align: center;padding: 20px;">
        <dw-text-edit-label-common v-model="survey.surveyNameObj" :survey="survey" ></dw-text-edit-label-common>
      </div>
      <div style="padding: 0 40px;">
        <dw-text-edit-label-common v-model="survey.surveyDetail.surveyNodeObj" :survey="survey" ></dw-text-edit-label-common>
      </div>
      <div style="margin-top: 10px;">
        <div>
          <draggable
            v-model="survey.questions"
            :force-fallback="true"
            :group="{ name: 'questionGroup', pull: false, put: true }"
            handle=".dwMoveSortQu"
            animation="300"
            drag-class="dwDragClass"
            ghost-class="dwGhostClass"
            chosen-class="dwChosenClass"
            class="dwDraggable"
            @add="onAdd"
            @start="onStart"
            @end="onEnd">
            <transition-group>
              <div v-for="(item, index) in survey.questions" :key="item.hasOwnProperty('dwId') ? item.dwId: `Qu_${index}`" >
                <dw-design-question ref="designQuestion" :index="index" :item="item" v-model="survey" ></dw-design-question>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
    <!--    <div style=""><dw-footer></dw-footer></div>-->
  </div>
</template>

<script>
import DwDesignToolbar from '../../dw-design-survey-layouts/dw-tb-layout/dw-design-toolbar/DwDesignToolbar.vue'
import DwDesignHeader from '../../dw-design-survey-layouts/dw-tb-layout/comp/DwDesignHeader'
import DwTextEditLabelCommon from '../DwTextEditLabelCommon'
import DwDesignQuRadio from '../../dw-design-survey-question/dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwTextEditLabel from '../DwTextEditLabel'
import DwDesignQuestion from '../../dw-design-survey-question/DwDesignQuestion'
import draggable from 'vuedraggable'
import DwFooter from '../../../../../layouts/DwFooter'
import DwDesignQuestionCommon from '../../dw-design-survey-question/DwDesignQuestionCommon.vue'
import {dwResetQuestionRefreshValue} from '../../../../dw-utils/dw-survey-update-question'
import {resetQuestion} from '../../../../dw-utils/dw-survey-parse'
import {v4 as uuidv4} from "uuid";

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
    onAdd (attrs) {
      console.debug('onAdd attrs', attrs)
      this.documentClick()
      // 自动执行focus事件
      const newIndex = attrs.newIndex
      console.debug('newIndex', newIndex)
      this.refreshData(newIndex)
      // this.survey.questions[newIndex].quTitleObj.isNew = true // 新加入的不需要通过这个获得焦点，如果下面题目标记isNew 然后再初始化进行执行
      this.survey.questions[newIndex].isNew = true
      resetQuestion(this.survey.questions[newIndex])
      // 还没选项的ID
    },
    onStart () {
      this.drag = true
      this.$emit('start-drag-container')
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
      this.documentClick()
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
        if (index>=quIndex) {
          this.survey.questions.splice(index, 1, dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))))
          /*
          const question = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item)))
          if (index===quIndex) question.quTitleObj.isNew = true
          this.survey.questions.splice(index, 1, question)*/
        }
      })
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
  min-height: 600px;
}
.dwDraggable span{
  width: 100%;
  min-height: 300px;
  display: inline-block;
}
</style>
