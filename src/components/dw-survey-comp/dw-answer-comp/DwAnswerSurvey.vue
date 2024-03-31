<template>
  <div class="dw-answer-custom-theme">
    <el-row>
      <el-col v-if="(answerProps.sid!==undefined && answerProps.sid!==null)">
        <dw-answer-survey-main :answer-props="answerProps" :ext-props="extProps"></dw-answer-survey-main>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DwAnswerSurveyMain from '../../../components/dw-survey-comp/dw-answer-comp/DwAnswerSurveyMain.vue'

export default {
  name: 'DwAnswerSurvey',
  components: {DwAnswerSurveyMain},
  props: {
    extProps: {type: Object, default: () => {}},
    answerProps: {type: Object, default: () => { return {sid: null, answerId: null, anPwd: null} }}
  },
  data () {
    return {
    }
  },
  mounted () {
    if (this.answerProps===null || !this.answerProps.hasOwnProperty('sid') || this.answerProps.sid===null) {
      // const sid = this.$route.params.id
      // const answerId = this.$route.params.answerId
    }
    // 设置CSS变量的值
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
<style>
@import '../../../assets/css/dw-answer.css';
</style>
<style>
/* 定义CSS变量 */
:root {
  --custom-color: blue; /* 默认值 */
}

.custom-element p {
  color: var(--custom-color); /* 使用CSS变量 */
}
</style>
