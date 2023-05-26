<template>
  <div>
<!--    <dw-design-survey-comp></dw-design-survey-comp>-->
    <dw-preview-survey-main></dw-preview-survey-main>
  </div>
</template>

<script>
import DwDesignSurveyMain
  from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/DwDesignSurveyMain'
import DwPreviewSurveyMain
  from "../../../components/dw-survey-comp/dw-design-comp/dw-preview-survey-comp/DwPreviewSurveyMain.vue";
export default {
  name: 'DwSurveyDesignContent',
  components: {DwPreviewSurveyMain, DwDesignSurveyMain}
}
</script>

<style scoped>

</style>
