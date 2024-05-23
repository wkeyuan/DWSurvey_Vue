<template>
  <div v-loading="loading" v-if="tabs.length>0" >

    <el-collapse v-model="activeName" >
      <el-collapse-item v-for="(tab, tabIndex) in tabs" :key="`quBank_${tabIndex}`" :title="tab.tabName" :name="tabIndex">
        <div style="padding-bottom: 5px;">
          <el-alert title="点击或拖动可加入到问卷中" type="info" show-icon></el-alert>
        </div>
        <template>
          <div v-for="(item, index) in tab.tabQus" v-if="item.questions.length>0" :key="`toolbar${index}`" class="tools_item">
            <div>
              <div class="toolbars-text" style="border-top: none;text-align: left;padding-left: 10px;">{{ item.tabQuName }}</div>
            </div>
            <div class="quBanks">
              <template v-if="item.eventType === undefined || item.eventType === null">
                <draggable
                  v-model="item.questions"
                  :group="{ name: 'questionGroup', pull: 'clone', put: false }"
                  :sort="false"
                  :force-fallback="true"
                  animation="300"
                  class="toolbars-draggable"
                  drag-class="dragClass"
                  ghost-class="ghostClass"
                  chosen-class="chosenClass"
                  @start="onStart"
                  @end="onEnd">
                  <transition-group class="dw-list-group dw-grid">
                    <div v-for="(item, index) in item.questions" :key="`base${index}`" class="dw-list-group-item" @click.stop="clickToolbarItem(item)" >
                      <dw-design-qu-bank-question :item="item" ></dw-design-qu-bank-question>
                    </div>
                  </transition-group>
                </draggable>
              </template>
              <template v-else>
                <div class="dw-list-group dw-grid">
                  <div v-for="(item, index) in item.questions" :key="`base${index}`" class="dw-list-group-item" @click.stop="clickToolbarItem(item)" >
                    <dw-design-qu-bank-question :item="item" ></dw-design-qu-bank-question>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>

import {dwSaveSurveyJson, questionComps} from '../../../api/dw-design-survey-api'
import draggable from 'vuedraggable'
import {initQuestionModels, parseQuestions, resetQuestion} from '../../../../../dw-utils/dw-survey-parse'
import DwDesignQuestion from '../../../dw-design-survey-question/DwDesignQuestion.vue'
import {clearSurveyJson, getSurveyJsonSimple} from '../../../../../dw-utils/dw-survey-design'
import DwAnswerQuestion from '../../../../../dw-answer-comp/dw-answer-survey-question/DwAnswerQuestion.vue'
import {dwResetQuestionRefreshValue} from '../../../../../dw-utils/dw-survey-update-question'
import DwDesignQuBankQuestion
  from '../../../dw-design-survey-common/dw-design-survey-body/dw-design-body-right/components/DwDesignQuBankQuestion.vue'

export default {
  name: 'DwDesignToolbarLeft',
  components: {
    DwDesignQuBankQuestion,
    DwAnswerQuestion,
    DwDesignQuestion,
    draggable
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
      questions: [],
      questions1: [],
      tabs: [],
      drag: false,
      loading: true,
      isAutoSave: true,
      autoSaveTime: 30,
      intervalSaveSurvey: null,
      activeName: 0
    }
  },
  mounted () {
    this.loadDesignSurveyData()
    this.autoSaveSurvey()
  },
  beforeDestroy () {
    // 清除定时器
    this.stopIntervalSaveSurvey()
  },
  methods: {
    clickToolbarItem (item) {
      if (item.eventName!==undefined && item.eventName!==null) {
        // 处理对应的按钮事件
      } else {
        item.isNew = true
        this.survey.questions.push(dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))))
        resetQuestion(this.survey.questions[this.survey.questions.length-1])
      }
    },
    onStart () {
      this.drag=true
      this.$emit('start-drag')
    },
    onEnd () {
      this.$emit('end-drag')
      this.drag=false
    },
    loadDesignSurveyData () {
      questionComps().then((response) => {
        console.debug('questionComps-response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          // this.questions = parseQuestion(httpResult.data)
          // this.questions1 = parseQuestion(httpResult.data)
          const tabs = httpResult.data
          tabs.map((item, index) => {
            const tabQus = item.tabQus
            tabQus.map((item_1, index_1) => {
              item_1.questions = initQuestionModels(parseQuestions(item_1.questions, false))
            })
          })
          this.tabs = tabs
          this.loading = false
        }
      })
      // 启动定时保丰
    },
    autoSaveSurvey () {
      if (this.isAutoSave) {
        this.startIntervalSaveSurvey()
      } else {
        this.stopIntervalSaveSurvey()
      }
    },
    startIntervalSaveSurvey () {
      const _that = this
      this.autoSaveTime = 20
      this.intervalSaveSurvey = setInterval(function () {
        _that.saveSurveyFun(null)
        _that.autoSaveTime = 20
        console.log('每隔20秒执行一次自动保存')
      }, 20000)
      this.intervalSaveSurveyTime = setInterval(function () {
        _that.autoSaveTime = _that.autoSaveTime-1
        if (_that.autoSaveTime<=0) _that.autoSaveTime = 0
      }, 1000)
    },
    stopIntervalSaveSurvey () {
      if (this.intervalSaveSurvey!==null) clearInterval(this.intervalSaveSurvey)
      if (this.intervalSaveSurveyTime!==null) clearInterval(this.intervalSaveSurveyTime)
    },
    saveSurvey () {
      this.saveSurveyFun(null)
    },
    devSurvey () {
      this.stopIntervalSaveSurvey()
      this.previewSurvey()
    },
    clickDesignStyle (activeName, oldTabName) {
      if (activeName==='designStyle') {
        this.previewSurvey()
        return false
      }
      return true
    },
    previewSurvey () {
      this.saveSurveyFun(() => {
        const surveyId = this.$route.params.dwSurveyId
        // 进行数据合法性检查，主要是防止空的标题与选项
        this.$router.push('/v6/diaowen/dw-preview/survey/'+surveyId)
      })
    },
    saveSurveyFun (callback) {
      const surveyId = this.survey.id
      const sid = this.survey.sid
      // 清理无效数据
      clearSurveyJson(this.survey)
      console.debug('save this.survey', this.survey)
      const surveyJsonText = JSON.stringify(this.survey)
      const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText))
      const data = {surveyId, sid, surveyJsonText, surveyJsonSimple}
      console.debug('surveyJson data', data)
      dwSaveSurveyJson(data).then((response) => {
        console.debug('dwSaveSurveyJson-response', response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          this.$message({message: '保存成功！', type: 'success'})
          if (callback!=null) callback()
        } else {
          this.$message.error('保存失败！')
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../assets/css/design-survey.css';

.dragClass{
  border: none;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: none;
}
.chosenClass{
  border: none;
}
.toolbars .toolbars-draggable-group-left{
  display: flex;
  flex-wrap: wrap;
}
.tools_item{
  border-right: none;
}

.dw-list-group{
  margin-bottom: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto,1fr));
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
  padding: 5px;
  color: var(--dw-primary-theme-color);
  font-size: 13px;
}
@media screen and (max-width: 1400px) {
  .dw-list-group{
    grid-template-columns: 1fr;
  }
}
.dw-list-group-item{
  padding: 0;
  border: 1px solid rgba(0,0,0,.125);
  cursor: default;
  width: 100%;
}

</style>
