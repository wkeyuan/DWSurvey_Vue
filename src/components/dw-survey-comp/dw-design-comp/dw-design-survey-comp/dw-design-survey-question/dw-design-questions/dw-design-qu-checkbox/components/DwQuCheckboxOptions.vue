<template>
  <div>
    <!-- 根据属性确定用哪种展现方案 -->
    <!-- 横向显示   -->
    <dw-qu-option-common1 v-if="survey.questions[index].hv === 1" ref="dwCommon1" v-model="survey.questions[index].quCheckboxs" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common1>
    <!-- 竖向显示   -->
    <dw-qu-option-common2 v-if="survey.questions[index].hv === 2" ref="dwCommon2" v-model="survey.questions[index].quCheckboxs" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common2>
    <!-- SELECT显示  -->
    <dw-qu-option-common4 v-if="survey.questions[index].hv === 4" ref="dwCommon4" v-model="survey.questions[index].quCheckboxs" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common4>
    <!--
    <div style="background: #0AA5A0;">
      <div v-for="(item,optionIndex) in survey.questions[index].quCheckboxs" :key="`aaquOption-${optionIndex}`" >
        <div style="border: 1px solid red;">{{ item.optionTitleObj.dwHtml }}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1.vue'
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'
import DwQuOptionCommon4 from '../../../dw-design-options/dw-qu-option-common4/DwQuOptionCommon4.vue'

export default {
  name: 'DwQuCheckboxOptions',
  components: {DwQuOptionCommon4, DwQuOptionCommon1, DwQuOptionCommon2},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  }
}
</script>

<style scoped>

</style>
