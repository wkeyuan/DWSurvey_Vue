<template>
  <div>
    <!-- 根据属性确定用哪种展现方案 -->
    <!-- 竖向显示   -->
    <dw-qu-option-common1 v-if="survey.questions[index].hv === 1" v-model="survey.questions[index].quCheckboxs" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common1>
    <!-- 横向显示   -->
    <dw-qu-option-common2 v-if="survey.questions[index].hv === 2" v-model="survey.questions[index].quCheckboxs" :survey="survey" :index="index" :qu-type="survey.questions[index].quType"></dw-qu-option-common2>
    <!-- SELECT显示  -->
    <div style="background: #0AA5A0;">
      <div v-for="(item,optionIndex) in survey.questions[index].quCheckboxs" :key="`aaquOption-${optionIndex}`" >
        <div style="border: 1px solid red;">{{ item.optionTitleObj.dwHtml }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1.vue'
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2.vue'

export default {
  name: 'DwQuCheckboxOptions',
  components: {DwQuOptionCommon1, DwQuOptionCommon2},
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

  }
}
</script>

<style scoped>
.dragClass{
  border: 1px solid dodgerblue;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: 1px dashed dodgerblue;
}
.dw-grid{
  display: grid;
  grid-template-columns: repeat(2, minmax(auto,1fr));
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
}
</style>
