<template>
  <el-tabs type="border-card">
    <el-tab-pane label="常用题型" style="padding: 0px;">
      <div class="toolbars-contents">
        <el-row type="flex" justify="space-between" align="middle" >
          <el-col :span="18" >
            <div class="toolbars-contents-body">

              <div v-for="item in tabs[0].tabQus" class="tools_item">
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
                        <div v-if="item.quType === 'RADIO'">
                          <div v-if="item.hv === 4">
                            <div class="toolbar-item-content">
                              <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-xialati"></div>
                            </div>
                            <div class="cloneQuRoot">
                              <div style="padding: 0;">AAA</div>
                            </div>
                          </div>
                          <div v-else>
                            <div class="toolbar-item-content">
                              <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-danxuan"></div>
                            </div>
                            <div class="cloneQuRoot">
                              <div style="padding: 0px;">
                                AAA
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'CHECKBOX'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxuan"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'FILLBLANK'">
                          <div v-if="item.answerInputRow > 1">
                            <div class="toolbar-item-content">
                              <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangwenben"></div>
                            </div>
                            <div class="cloneQuRoot">
                              <div style="padding: 0px;">AAA</div>
                            </div>
                          </div>
                          <div v-else>
                            <div class="toolbar-item-content">
                              <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-tiankong"></div>
                            </div>
                            <div class="cloneQuRoot">
                              <div style="padding: 0px;">AAA</div>
                            </div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'SCORE'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-pingfen"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'ORDERQU'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-paixu"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'MULTIFILLBLANK'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangtiankong"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'UPLOADFILE'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-shangchuan"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'PAGETAG'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-fenye"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
                        <div v-if="item.quType === 'PARAGRAPH'">
                          <div class="toolbar-item-content">
                            <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-fenduan"></div>
                          </div>
                          <div class="cloneQuRoot">
                            <div style="padding: 0px;">AAA</div>
                          </div>
                        </div>
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
              <el-button type="primary" ><i class="fa fa-paper-plane"></i>&nbsp;发布</el-button>
              <el-button plain icon="el-icon-document-checked" @click="saveSurvey">保存</el-button>
              <el-button plain icon="el-icon-view" @click="previewSurvey">预览</el-button>
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

export default {
  name: 'DwDesignToolbar',
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
      drag: false
    }
  },
  mounted () {
    this.loadDesignSurveyData()
  },
  methods: {
    onStart () {
      this.drag=true
    },
    onEnd () {
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
        }
      })
    },
    saveSurvey () {
      const surveyId = this.survey.id
      const surveyJsonText = JSON.stringify(this.survey)
      const data = {surveyId, surveyJsonText}
      console.debug('surveyJson data', data)
      dwSaveSurveyJson(data).then((response) => {
        console.debug('dwSaveSurveyJson-response', response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          this.$message.success('保存成功！')
        } else {
          this.$message.success('保存失败！')
        }
      })
    },
    previewSurvey () {
      const surveyId = this.$route.params.id
      this.$router.push('/v6/diaowen/preview/survey/'+surveyId)
    }
  }
}
</script>

<style scoped>
@import '../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../assets/css/design-survey.css';
.dragClass{
  border: 1px solid dodgerblue;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: 1px dashed dodgerblue;
}
</style>
