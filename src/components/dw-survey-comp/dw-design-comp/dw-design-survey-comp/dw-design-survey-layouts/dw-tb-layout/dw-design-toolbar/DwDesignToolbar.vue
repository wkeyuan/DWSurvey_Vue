<template>
  <el-tabs v-loading="loading" v-if="tabs.length>0" type="border-card" >
    <el-tab-pane label="常用题型" style="padding: 0px;">
      <div class="toolbars-contents">
        <el-row type="flex" justify="space-between" align="middle" >
          <el-col :span="18" >
            <div class="toolbars-contents-body">
              <div v-for="(item, index) in tabs[0].tabQus" :key="`toolbar${index}`" class="tools_item">
                <div class="toolbars">
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
                      <div v-for="(item, index) in item.questions" :key="`base${index}`" class="toolbar-item" >
                        <dw-design-toolbar-question :item="item"></dw-design-toolbar-question>
                      </div>
                    </transition-group>
                  </draggable>
                </div>
                <div>
                  <div class="toolbars-text">{{ item.tabQuName }}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="text-align: right;padding-right: 10px;">
              <el-button type="primary" @click="previewSurvey" ><i class="fa fa-paper-plane"></i>&nbsp;发布</el-button>
              <el-button plain @click="saveSurvey"><i class="fa-solid fa-floppy-disk"></i>&nbsp;保存</el-button>
              <el-button plain @click="previewSurvey"><i class="fa-solid fa-eye"></i>&nbsp;预览</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

import {dwSaveSurveyJson, questionComps} from '../../../api/dw-design-survey-api'
import draggable from 'vuedraggable'
import {parseQuestion} from '../../../../../dw-utils/dw-parse-survey'
import DwDesignQuestion from '../../../dw-design-survey-question/DwDesignQuestion.vue'
import DwDesignToolbarQuestion from './components/DwDesignToolbarQuestion.vue'

export default {
  name: 'DwDesignToolbar',
  components: {
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
      loading: true
    }
  },
  mounted () {
    this.loadDesignSurveyData()
  },
  methods: {
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
              item_1.questions = parseQuestion(item_1.questions)
            })
          })
          this.tabs = tabs
          this.loading = false
        }
      })
    },
    saveSurvey () {
      this.saveSurveyFun(null)
    },
    previewSurvey () {
      this.saveSurveyFun(() => {
        const surveyId = this.$route.params.id
        this.$router.push('/v6/diaowen/preview/survey/'+surveyId)
      })
    },
    saveSurveyFun (callback) {
      const surveyId = this.survey.id
      const surveyJsonText = JSON.stringify(this.survey)
      const data = {surveyId, surveyJsonText}
      console.debug('surveyJson data', data)
      dwSaveSurveyJson(data).then((response) => {
        console.debug('dwSaveSurveyJson-response', response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          this.$message.success('保存成功！')
          if (callback!=null) callback()
        } else {
          this.$message.success('保存失败！')
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
