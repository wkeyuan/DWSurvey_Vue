<template>
  <div>Home</div>
</template>

<script>
import {hasRoleOrPermCode} from '../utils/dw-common'
import {dwFooterUtils} from '../components/dw-survey-comp/dw-utils/dw-common/dw-footer-util'

export default {
  name: 'Home',
  mounted () {
    this.isToSurveyOrTask()
  },
  methods: {
    isToSurveyOrTask () {
      dwFooterUtils.setLayout('lr')
      if (hasRoleOrPermCode(['DWSURVEY_SUPER_ADMIN', 'SUPER_ADMIN', 'ENT_ADMIN', 'DEPT_ADMIN', 'PROJECT_ADMIN', 'QT_SURVEY_LIST'])) {
        this.$router.push('/v6/lr/dw/survey')
      } else {
        this.$router.push('/v6/lr/dw/user')
      }
    }
  }
}
</script>

<style scoped>

</style>
