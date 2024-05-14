<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :append-to-body="true"
    title="新增题目"
    width="40%">
    <div v-loading="loading" >
      <div style="padding-bottom: 10px;">点击对应的题型控件，被点击的题型会自动追加在问卷中</div>
      <el-tabs v-if="tabs.length>0" type="border-card" >
        <el-tab-pane label="常用题型" style="padding: 0px;">
          <div class="toolbars-contents" style="background-color: white;" >
            <el-row type="flex" justify="space-between" align="middle" >
              <el-col :span="24" >
                <div class="toolbars-contents-body" style="display: block;">
                  <div v-for="(item, index) in tabs[0].tabQus" v-if="item.questions.length>0" :key="`toolbar${index}`" class="tools_item" >
                    <div>
                      <div>
                        <div class="toolbars-text" style="text-align: left;padding-left: 20px;border: none;">{{ item.tabQuName }}</div>
                      </div>
                      <div class="toolbars" >
                        <template v-if="item.eventType === undefined || item.eventType === null">
                          <transition-group class="toolbars-draggable-group">
                            <div v-for="(item, index) in item.questions" :key="`base${index}`" class="toolbar-item" @click.stop="clickToolbarItem(item)" >
                              <dw-design-toolbar-question :item="item" ></dw-design-toolbar-question>
                            </div>
                          </transition-group>
                        </template>
                        <template v-else>
                          <!--
                          <div class="toolbars-draggable-group">
                            <div v-for="(item, index) in item.questions" :key="`base${index}`" class="toolbar-item" @click.stop="clickToolbarItem(item)" >
                              <dw-design-toolbar-question :item="item" ></dw-design-toolbar-question>
                            </div>
                          </div>-->
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {questionComps} from '../../../../api/dw-design-survey-api'
import {initQuestionModels, parseQuestions, resetQuestion} from '../../../../../../dw-utils/dw-survey-parse'
import DwDesignToolbarQuestion from './DwDesignToolbarQuestion.vue'
import {dwResetQuestionRefreshValue} from '../../../../../../dw-utils/dw-survey-update-question'
import {caleDesignSurveySumScore} from '../../../../../../dw-utils/dw-common/dw-survey-design-score'

export default {
  name: 'DwAddNewQuDialog',
  components: {DwDesignToolbarQuestion},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      tabs: [],
      loading: true,
      dialogVisible: false
    }
  },
  mounted () {
    this.loadDesignSurveyData()
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
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
    },
    clickToolbarItem (item) {
      if (item.eventName!==undefined && item.eventName!==null) {
        // 处理对应的按钮事件
      } else {
        item.isNew = true
        this.survey.questions.push(dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))))
        resetQuestion(this.survey.questions[this.survey.questions.length-1])
        // 如果已经配置了分值则自动计算分数并显示
        caleDesignSurveySumScore(this.survey, this.survey.questions.length-1)
      }
    }
  }
}
</script>

<style scoped>
@import '../../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../../assets/css/design-survey.css';
/deep/ .el-dialog__body{
  padding-top: 10px!important;
  padding-bottom: 10px!important;
}
.toolbars-contents-body .tools_item{
  margin-bottom: 25px;
  border: none;
}
.toolbars-contents-body .tools_item:last-child{
  margin-bottom: 0;
}
</style>
