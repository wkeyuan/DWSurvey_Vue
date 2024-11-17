<template>
  <el-tabs v-loading="loading" v-if="tabs.length>0" :before-leave="clickDesignStyle" value="tabQu_0" type="border-card" >
    <el-tab-pane v-for="(tab, tabIndex) in tabs" :key="`tabKey_${tabIndex}`" :label="tab.tabName" :name="`tabQu_${tabIndex}`" style="padding: 0;">
      <div class="toolbars-contents">
        <el-row type="flex" justify="space-between" align="middle" >
          <el-col :span="18" >
            <div class="toolbars-contents-body">
              <div v-for="(item, index) in tab.tabQus" v-if="item.questions.length>0" :key="`toolbar${index}`" class="tools_item">
                <div class="toolbars">
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
                      <transition-group class="toolbars-draggable-group">
                        <div v-for="(item, index) in item.questions" :key="`base${index}`" class="toolbar-item" @click.stop="clickToolbarItem(item)" >
                          <dw-design-toolbar-question :item="item" ></dw-design-toolbar-question>
                        </div>
                      </transition-group>
                    </draggable>
                  </template>
                  <template v-else>
                    <div class="toolbars-draggable-group">
                      <div v-for="(item, index) in item.questions" :key="`base${index}`" class="toolbar-item" style="cursor: pointer;" @click.stop="clickToolbarItem(item)" >
                        <dw-design-toolbar-question :item="item" ></dw-design-toolbar-question>
                      </div>
                    </div>
                  </template>
                </div>
                <div>
                  <div class="toolbars-text">{{ item.tabQuName }}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="text-align: right;padding-right: 10px;">
              <!--
              <div class="dw-display-flex-right">
                <div class="dw-display-flex-right">
                  <span style="margin-right: 10px;font-size: 12px;">
                    <el-switch v-model="isAutoSave" :active-text="`自动保存`" @change="autoSaveSurvey" ></el-switch>
                    <span style="color: #afafb0;">({{ autoSaveTime }})</span>
                  </span>
                </div>
                <div class="dw-display-flex-left">
                  <div>
                    <div><el-button type="primary" size="mini" @click="devSurvey" ><i class="fa fa-paper-plane"></i>&nbsp;发布</el-button></div>
                    <div style="margin-top: 10px;"><el-button size="mini" plain @click="saveSurvey"><i class="fa-solid fa-floppy-disk"></i>&nbsp;保存</el-button></div>
                  </div>
                </div>
              </div>-->
              <span style="margin-right: 10px;font-size: 12px;">
                <el-switch v-model="isAutoSave" :active-text="`自动保存`" @change="autoSaveSurvey" ></el-switch>
                <span style="color: #afafb0;">({{ autoSaveTime }})</span>
              </span>
              <el-button type="primary" size="small" @click="devSurvey" ><i class="fa fa-paper-plane"></i>&nbsp;发布</el-button>
              <el-button plain size="small" style="margin-top: 10px;" @click="saveSurvey"><i class="fa-solid fa-floppy-disk"></i>&nbsp;保存</el-button>
              <!--              <el-button plain @click="previewSurvey"><i class="fa-solid fa-eye"></i>&nbsp;预览</el-button>-->
            </div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <!--    <el-tab-pane label="外观预览" name="designStyle" ></el-tab-pane>-->
  </el-tabs>
</template>

<script>

import {dwSaveSurveyJson, questionComps} from '../../../api/dw-design-survey-api'
import draggable from 'vuedraggable'
import {initQuestionModels, parseQuestions, resetQuestion} from '../../../../../dw-utils/dw-survey-parse'
import DwDesignQuestion from '../../../dw-design-survey-question/DwDesignQuestion.vue'
import DwDesignToolbarQuestion from './components/DwDesignToolbarQuestion.vue'
import {clearSurveyJson, getSurveyJsonSimple} from '../../../../../dw-utils/dw-survey-design'
import DwAnswerQuestion from '../../../../../dw-answer-comp/dw-answer-survey-question/DwAnswerQuestion.vue'
import {dwResetQuestionRefreshValue} from '../../../../../dw-utils/dw-survey-update-question'
import {caleDesignSurveySumScore} from '../../../../../dw-utils/dw-common/dw-survey-design-score'

export default {
  name: 'DwDesignToolbar',
  components: {
    DwAnswerQuestion,
    DwDesignToolbarQuestion,
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
      intervalSaveSurvey: null
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
        const eventName = item.eventName
        if (eventName==='SurveyStyleEvent') {
          this.previewSurvey()
        }
      } else {
        item.isNew = true
        this.survey.questions.push(dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))))
        resetQuestion(this.survey.questions[this.survey.questions.length-1])
        // 如果已经配置了分值则自动计算分数并显示
        caleDesignSurveySumScore(this.survey, this.survey.questions.length-1)
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
      const params = {surveyType: this.survey.surveyType}
      questionComps(params).then((response) => {
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
        this.$router.push('/v6/diaowen/dw-preview-style/survey/'+surveyId)
      })
    },
    saveSurveyFun (callback) {
      const surveyId = this.survey.id
      const sid = this.survey.sid
      // 清理无效数据
      clearSurveyJson(this.survey)
      console.debug('save this.survey', this.survey)
      const surveyJsonText = JSON.stringify(getSaveSurveyJsonText(this.survey))
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
</style>
