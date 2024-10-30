<template>
  <div>
    <!-- 根据属性确定用哪种展现方案 -->
    <!-- 横向显示   -->
    <dw-qu-option-common1 v-if="survey.questions[index].hv === 1" v-model="survey.questions[index].quRadios" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common1>
    <!-- 竖向显示   -->
    <dw-qu-option-common2 v-if="survey.questions[index].hv === 2" v-model="survey.questions[index].quRadios" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common2>
    <!-- SELECT显示  -->
    <dw-qu-option-common4 v-if="survey.questions[index].hv === 4" v-model="survey.questions[index].quRadios" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common4>
    <!--
    <div style="background: #0AA5A0;">
      <div v-for="(item,optionIndex) in survey.questions[index].quRadios" :key="`aaquOption-${optionIndex}`" >
        <div style="border: 1px solid red;">{{ item.optionTitleObj.dwHtml }}</div>
      </div>
    </div>
    -->
  </div>
</template>

<script>

import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1.vue'
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'
import DwQuOptionCommon4 from '../../../dw-design-options/dw-qu-option-common4/DwQuOptionCommon4.vue'

export default {
  name: 'DwQuRadioOptions',
  components: {DwQuOptionCommon4, DwQuOptionCommon2, DwQuOptionCommon1},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {}
  },
  methods: {
    updateOptions (options) {
      this.survey.questions[this.index].quRadios = options
    }
  }
}
</script>
