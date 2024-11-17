<template>
  <div style="padding:6px 0;">
    <el-row type="flex" justify="space-between" align="middle" >
      <el-col :span="18" >
        <el-button type="text" size="mini" style="padding: 5px;" @click="devSurvey" ><i class="fa-regular fa-pen-to-square"></i>&nbsp;题目编辑</el-button>
        <el-button type="text" size="mini" style="padding: 5px;color: #575757;" @click="devSurvey" ><i class="fa-solid fa-palette"></i>&nbsp;样式设计</el-button>
        <el-button type="text" size="mini" style="padding: 5px;color: #575757;" @click="setSurvey" ><i class="fa-solid fa-gear"></i>&nbsp;问卷设置</el-button>
      </el-col>
      <el-col :span="6">
        <div style="text-align: right;padding-right: 10px;">
          <span style="margin-right: 10px;font-size: 12px;">
            <el-switch v-model="isAutoSave" :active-text="`自动保存`" @change="autoSaveSurvey" ></el-switch>
            <span style="color: #afafb0;">({{ autoSaveTime }})</span>
          </span>
          <el-button type="primary" size="mini" @click="devSurvey" ><i class="fa fa-paper-plane"></i>&nbsp;发布</el-button>
          <el-button plain size="mini" @click="saveSurvey"><i class="fa-solid fa-floppy-disk"></i>&nbsp;保存</el-button>
          <!--          <el-button plain @click="previewSurvey"><i class="fa-solid fa-eye"></i>&nbsp;预览</el-button>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {dwSaveSurveyJson} from '../../../api/dw-design-survey-api'
import draggable from 'vuedraggable'
import {clearSurveyJson, getSurveyJsonSimple} from '../../../../../dw-utils/dw-survey-design'
import {dwFooterUtils} from '../../../../../dw-utils/dw-common/dw-footer-util'

export default {
  name: 'DwDesignToolbarTop',
  components: {
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
      prevPath: '/v6'
    }
  },
  mounted () {
    this.autoSaveSurvey()
    dwFooterUtils.isLayoutLr((footerInfo) => { this.prevPath = '/v6/lr' })
  },
  beforeDestroy () {
    // 清除定时器
    this.stopIntervalSaveSurvey()
  },
  methods: {
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
    setSurvey () {
      this.stopIntervalSaveSurvey()
      this.saveSurveyFun(() => {
        // /v6/lr/dw/survey/c/attr/ec61389d-ac9f-4824-b272-c403b4119554
        const surveyId = this.$route.params.dwSurveyId
        this.$router.push(this.prevPath+'/dw/survey/c/attr/'+surveyId)
      })
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
