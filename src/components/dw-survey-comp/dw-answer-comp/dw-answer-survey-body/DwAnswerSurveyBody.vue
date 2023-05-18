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
          <transition-group>
            <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" >
              <dw-design-question ref="designQuestion" v-model="survey" :index="index" :item="item" ></dw-design-question>
            </div>
          </transition-group>
        </div>
      </div>
      <div style="padding: 10px 20px;text-align: center;">
      </div>
    </div>
<!--    <div style=""><dw-footer></dw-footer></div>-->
  </div>
</template>

<script>

import DwTextEditLabelCommon
  from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/DwTextEditLabelCommon.vue'
import DwDesignQuestion from '../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/DwDesignQuestion.vue'
import DwFooter from '../../../layouts/DwFooter.vue'

export default {
  name: 'DwAnswerSurveyBody',
  components: {
    DwFooter,
    DwDesignQuestion,
    DwTextEditLabelCommon
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
  }
}
</script>

<style scoped>
.dw-container-body-center{
  background: white;
}
</style>
