<template>
  <div>
<!--    <dw-design-survey-comp></dw-design-survey-comp>-->
    <dw-design-survey-core></dw-design-survey-core>
  </div>
</template>

<script>
import DwDesignSurveyComp
  from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/DwDesignSurveyComp'
import DwDesignSurveyCore
  from '../../../components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/DwDesignSurveyCore'
export default {
  name: 'DwDesignSurvey',
  components: {DwDesignSurveyCore, DwDesignSurveyComp}
}
</script>

<style scoped>

</style>
