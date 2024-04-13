<template>
  <div class="dw-answer-custom-theme">
    <slot></slot>
    <template v-if="item.dwsurveyfont !== null">
      <slot name="quModelTagDwsurveyfont" ></slot>
      <div class="cloneQuRoot">
        <div>
          <dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="item.quType === 'RADIO'">
        <div v-if="item.hv === 4">
          <slot name="quModelTagXialati" ></slot>
          <div class="cloneQuRoot">
            <div>
              <dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question>
            </div>
          </div>
        </div>
        <div v-else>
          <slot name="quModelTagDanxuan" ></slot>
          <div class="cloneQuRoot">
            <div>
              <dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="item.quType === 'CHECKBOX'">
        <slot name="quModelTagDuoxuan" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else-if="item.quType === 'FILLBLANK'">
        <div v-if="item.answerInputRow > 1">
          <slot name="quModelTagDuoxiangwenben" ></slot>
          <div class="cloneQuRoot">
            <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
          </div>
        </div>
        <div v-else>
          <slot name="quModelTagTiankong" ></slot>
          <div class="cloneQuRoot">
            <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
          </div>
        </div>
      </div>
      <div v-else-if="item.quType === 'SCORE'">
        <slot name="quModelTagPingfen" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else-if="item.quType === 'ORDERQU'">
        <slot name="quModelTagPaixu" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else-if="item.quType === 'MULTIFILLBLANK'">
        <slot name="quModelTagDuoxiangtiankong" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else-if="item.quType === 'UPLOADFILE'">
        <slot name="quModelTagShangchuan" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else-if="item.quType === 'PAGETAG'">
        <slot name="quModelTagFenye" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else-if="item.quType === 'PARAGRAPH'">
        <slot name="quModelTagFenduan" ></slot>
        <div class="cloneQuRoot">
          <div><dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question></div>
        </div>
      </div>
      <div v-else>
        <slot>
          <div class="toolbar-item-content">
            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangtiankong"></div>
          </div>
        </slot>
        <div class="cloneQuRoot">
          <div>
            <dw-answer-question :index="index" :item="item" v-model="survey" ></dw-answer-question>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import DwDesignQuestion from '../../../../dw-design-survey-question/DwDesignQuestion.vue'
import DwAnswerQuestion from '../../../../../../dw-answer-comp/dw-answer-survey-question/DwAnswerQuestion.vue'

export default {
  name: 'DwDesignQuestionModelCommon',
  components: {DwAnswerQuestion, DwDesignQuestion},
  props: {
    item: {type: Object, default: () => {}}
  },
  data () {
    return {
      survey: {
        surveyNameObj: {dwHtml: 'survey.surveyName', dwText: 'survey.surveyNameText', dwPlaceholder: '请输入问卷标题'},
        questions: [this.item],
        surveyTest: '',
        curEditObj: [{itemClick: false}],
        surveyStyle: {themeColor: 'red'},
        tempDataType: 'modelComponents'
      },
      index: 0
    }
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
