<template>
  <div>
    <dw-design-question-model-common :item="item" >
      <template v-slot:quModelTagDwsurveyfont>
        <div class="toolbar-item-content">
          <div :class="item.dwsurveyfont" class="dwToolbar_icon dwsurveyfont "></div>
        </div>
      </template>
      <template v-slot:quModelTagXialati>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-xialati"></div>
        </div>
      </template>
      <template v-slot:quModelTagDanxuan>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-danxuan"></div>
        </div>
      </template>
      <template v-slot:quModelTagDuoxuan>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxuan"></div>
        </div>
      </template>
      <template v-slot:quModelTagDuoxiangwenben>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangwenben"></div>
        </div>
      </template>
      <template v-slot:quModelTagTiankong>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-tiankong"></div>
        </div>
      </template>
      <template v-slot:quModelTagPingfen>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-pingfen"></div>
        </div>
      </template>
      <template v-slot:quModelTagPaixu>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-paixu"></div>
        </div>
      </template>
      <template v-slot:quModelTagDuoxiangtiankong>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangtiankong"></div>
        </div>
      </template>
      <template v-slot:quModelTagShangchuan>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-shangchuan"></div>
        </div>
      </template>
      <template v-slot:quModelTagFenye>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-fenye"></div>
        </div>
      </template>
      <template v-slot:quModelTagFenduan>
        <div class="toolbar-item-content">
          <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-fenduan"></div>
        </div>
      </template>

    </dw-design-question-model-common>
  </div>
</template>

<script>

import DwDesignQuestion from '../../../../dw-design-survey-question/DwDesignQuestion.vue'
import DwAnswerQuestion from '../../../../../../dw-answer-comp/dw-answer-survey-question/DwAnswerQuestion.vue'
import DwDesignQuestionModelCommon from './DwDesignQuestionModelCommon.vue'

export default {
  name: 'DwDesignToolbarQuestion',
  components: {DwDesignQuestionModelCommon, DwAnswerQuestion, DwDesignQuestion},
  props: {
    item: {type: Object, default: () => {}}
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style scoped>
@import '../../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../../assets/css/design-survey.css';

.cloneQuRoot{
  padding: 10px;
}
</style>
