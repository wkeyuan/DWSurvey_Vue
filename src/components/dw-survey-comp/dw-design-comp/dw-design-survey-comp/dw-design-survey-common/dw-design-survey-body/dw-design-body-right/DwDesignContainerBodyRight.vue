<template>
  <div @click.stop="clickShowPopoverEvent">
    <el-tabs v-model="survey.surveyFocusObj.rightFocusTab" type="border-card" >
      <el-tab-pane name="surveySet" label="问卷设置">
        <div :style="`height:${lrContentHeight}px;`" class="scrollable-hidden scrollable-y">
          <div style="padding-bottom: 5px;">
            <el-alert title="可以配置整个问卷的基本属性" type="info" show-icon></el-alert>
          </div>
          <dw-design-survey-attrs v-model="survey" ></dw-design-survey-attrs>
        </div>
      </el-tab-pane>
      <el-tab-pane name="quSet" label="题目设置">
        <dw-qu-attrs v-model="survey" :index="survey.surveyFocusObj.focusQuIndex"></dw-qu-attrs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DwDesignQuBanks from './components/DwDesignQuBanks.vue'
import DwDesignSurveyAttrs from "../dw-design-body-left/components/DwDesignSurveyAttrs.vue";
import DwQuAttrs
  from "../../../dw-design-survey-question/dw-design-questions/dw-desing-qestion-common-comp/dw-qu-attrs/DwQuAttrs.vue";

export default {
  name: 'DwDesignContainerBodyRight',
  components: {DwQuAttrs, DwDesignSurveyAttrs, DwDesignQuBanks},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}},
    lrContentHeight: {type: Number, default: () => {}}
  },
  methods: {
    onStartRight () {
      this.drag=true
      this.$emit('start-drag-right')
    },
    onEnd () {
      this.$emit('end-drag')
      this.drag=false
    },
    clickShowPopoverEvent () {

    }
  }
}
</script>

<style scoped>

</style>
