<template>
  <div class="dw-design-container">
    <el-container>
      <el-header class="header" style="">
        <el-row type="flex" justify="space-between" align="middle" >
          <el-col :span="12">
            <div class="header-content-left">
              <div class="logo">
                <a href="#">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRDRFQ0Y5QjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRDRFQ0ZBQjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNENEVDRjdCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNENEVDRjhCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GJisjAAAFMklEQVR42uzdTYhVZRjA8XNrSAqTIq0EqYSCCoQWgeFCHcJsEbVo1UARkbYIChdFbloFWosWQVAWhFBDmyJa1FhR46YPC0KkhCgzN9OXJH2JhdyeM3Mnq3veMJp5z3lnfj94mCLo3nPu/O97z51z7u31+/0qh9749I88NzbHd336jo8NbUuR2zMxOrM9CfX2/BRzIuboYL6KORxzMOZAzCcxv3dpmzavnL//90gFf3fuYJYP/n3dP/778ZgPYybr3mL2xZxcqDvjDL8P/Ednx6yPeTjm3ZipmKdiNsyutgKBU1bE3DNYUT6LeSDmPIHAsMtjHos5EvN4zEUCgebjmG0xh2J2xCwVCAw7J+ahwUuvO0o8RhEIOdRvxO6O2RNzmUCg2aaY/TFjAoFmy2JeiNkVs0Qg0GxLzN6q4+90CYQ2rY15L+ZKgUCz1YOV5BqBQLMLY96OWSMQaHZ+zGsxqwQCzVYNVpIVAoFmV8S8GnOWQKDZdTGPCgTS7o+5RSDQrD6x8bmYSwUCzep3tp6pWjwLWCB0XX2C4+0CgbT6gH2ZQKDZxTHbBQJp91UtnPkrEEoxe/muQCDh7irzRwoJhJIsHUQiEEjYWmX8u4hAKE19MuN6gUDabQKBtFtjzhQINKu/mmGtQCBts0AgbaNAIO3aKsNluQKhVPWpJ1cLBNLWCATSrhIIpK0WCKRdIhBIWy4QSLtAIJC2RCCQNu9fLz2SeYN6C+wBGtqeidGFtT2LnRUE/u0Zo9/v2wtzaM+UfZDb5pVWEPASC7om20F6b7zsHdUf88tiBQHaWUFmn4gL3EeL5q3PG98p7/GZGJ3fx8cKAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEAjTq9ft5vhq7Nz79o9jvSe+PLeBfgvE//7HIx2c+HxsrCAgEBAICgZxG2jjgpbsHvHaBFQRO/xkj19u8YAUBgYCD9Ll/LTde9o5aJH9J99hYQaCDK8hs7CU+wS6i3wePjxUEBAICAYHAIjpIX/BKf8sUKwgIBAQCAgGBgEBAICAQEAgIxC4AgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAqch9/ek9+zyTvP4WEGggytIf8zOxgoCAgEvseb66G+87B3115eIpW8LVhAoawWZfSIucB/1bE+x22MFYVH72UssSDshEEg7KhBI+14gkHZEIJB2WCCQ9qlAIO2AQKDZr1YQSPso5jeBQLPJHDciEEr1hkCgWf0HwvcFAs1eijkpEGj2Yq4bEgil+Txmr0Cg2dNVxgu7BEJJ6gukns15gwKhJHUcxwQCw+pTS3bmvlGBUIonYr4RCAz7OmZHGzcsEEqwPeZHgcCwN2N2t3XjAqHLfojZWrX4gXYCoavqKO6qMlx3LhBKVL9r9Urbd0IgdFF9KvuDXbgjAqFrDsXcXGW4nFYglOa7mJsGPyuBwCn1O1abYg526U4JhC74Nub6mP1du2MCoW1fxmyM+biLd04gtOmDmHVde1klELqgvrZjQzVzImJnjXicyKw+6fDemOdLuLMCIae3YrZULZ8+4iUWXTMVc2fMDSXFYQVhvtWXyT4Z80jV0vUcAqGLfhkchO/s+kG4QMjpi5hdgzm2EDZIIPxf9QdJv1zNfBzoZNXixU0CoQuOVzNfXlPH8HrMvirTB0m34Q8BBgDCrqxH8SRKpAAAAABJRU5ErkJggg==" alt="logo" height="32">
                  <h1>调问-全新问卷编辑器</h1>
                </a>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right;">
              <!--              <el-button-group>
                              <el-button type="primary" icon="el-icon-edit" >编辑</el-button>
                              <el-button type="primary" icon="el-icon-share">收集</el-button>
                              <el-button type="primary" icon="el-icon-delete">统计</el-button>
                            </el-button-group>-->
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0px;">
        <div>
          <div :style="headerQuToolbarStyle" id="tools_wrap" >
            <el-tabs type="border-card">
              <el-tab-pane label="常用题型" style="padding: 0px;">
                <div class="toolbars-contents">
                  <el-row type="flex" justify="space-between" align="middle" >
                    <el-col :span="18" >
                      <div class="toolbars-contents-body">
                        <div class="tools_item">
                          <div class="toolbars">
                            <draggable
                              v-model="questions"
                              :group="{ name: 'people', pull: 'clone', put: false }"
                              :sort="false"
                              :forceFallback="true"
                              animation="300"
                              class="toolbars-draggable"
                              dragClass="dragClass"
                              ghostClass="ghostClass"
                              chosenClass="chosenClass"
                              @start="onStart"
                              @end="onEnd">
                              <transition-group class="toolbars-draggable-group">
                                <div class="toolbar-item" v-for="(item, index) in questions" :key="index" >
                                  <div v-if="item.quType === 'RADIO'">
                                    <div v-if="item.hv === 4">
                                      <div class="toolbar-item-content">
                                        <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-xialati"></div>
                                      </div>
                                      <div class="cloneQuRoot">
                                        <div style="padding: 0px;">AAA</div>
                                      </div>
                                    </div>
                                    <div v-else>
                                      <div class="toolbar-item-content">
                                        <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-danxuan"></div>
                                      </div>
                                      <div class="cloneQuRoot">
                                        <div style="padding: 0px;">AAA</div>
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
                                </div>
                              </transition-group>
                            </draggable>
                          </div>
                          <div>
                            <div class="toolbars-text">基本题型</div>
                          </div>
                        </div>
                        <div class="tools_item">
                          <div class="toolbars">
                            <draggable
                              v-model="questions"
                              :group="{ name: 'people', pull: 'clone', put: false }"
                              animation="300"
                              class="toolbars-draggable"
                              dragClass="dragClass"
                              ghostClass="ghostClass"
                              chosenClass="chosenClass"
                              @start="onStart"
                              @end="onEnd">
                              <transition-group class="toolbars-draggable-group">
                                <div class="toolbar-item" v-for="(item, index) in questions" :key="index" >
                                  <div v-if="item.quType === 'RADIO'">
                                    <div v-if="item.hv === 4">
                                      <div class="toolbar-item-content">
                                        <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-xialati"></div>
                                      </div>
                                      <div class="cloneQuRoot">
                                        <div style="padding: 0px;">AAA</div>
                                      </div>
                                    </div>
                                    <div v-else>
                                      <div class="toolbar-item-content">
                                        <div class="dwToolbar_icon dwsurveyfont icon-dwsurvey-danxuan"></div>
                                      </div>
                                      <div class="cloneQuRoot">
                                        <div style="padding: 0px;">AAA</div>
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
                                </div>
                              </transition-group>
                            </draggable>
                          </div>
                          <div>
                            <div class="toolbars-text">基本题型</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div style="text-align: right;padding-right: 10px;">
                        <el-button type="primary" ><i class="fa fa-paper-plane"></i>&nbsp;发布</el-button>
                        <el-button plain icon="el-icon-document-checked">保存</el-button>
                        <el-button plain icon="el-icon-view">预览</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="矩阵扩展">矩阵扩展</el-tab-pane>
              <el-tab-pane label="常用题库">常用题库</el-tab-pane>
            </el-tabs>
          </div>
          <div style="margin-top: 157px;" >
            <div class="dw-container-body">
              <el-row>
                <el-col :span="4">
                  <div class="grid-content"></div>
                </el-col>
                <el-col :span="16">
                  <div class="dw-container-body-center">
                    <div style="min-height: 600px;">
                      <div style="text-align: center;padding: 20px;font-size: 22px;font-weight: bold;">问卷设计 Hello DWSurvey</div>
                      <div style="padding: 20px 40px;">
                        非常感谢您的参与！如有涉及个人信息，我们将严格保密。
                      </div>
                      <div>
                        <div>
                          <draggable
                            v-model="survey.questions"
                            :forceFallback="true"
                            handle=".dwMoveSortQu"
                            :group="{ name: 'people', pull: true, put: true }"
                            animation="300"
                            dragClass="dragClass"
                            ghostClass="ghostClass"
                            chosenClass="chosenClass"
                            @start="onStart"
                            @end="onEnd">
                            <transition-group>
                              <div v-for="(item, index) in survey.questions" :key="index" >
                                <div v-if="item.quType === 'RADIO'">
                                  <div v-if="item.hv === 4">
                                    <div class="dw-question-body">
                                      <div style="padding: 0px;">AAA</div>
                                    </div>
                                  </div>
                                  <div v-else>
                                    <dw-question-design-common></dw-question-design-common>
                                  </div>
                                </div>
                                <div v-if="item.quType === 'CHECKBOX'">
                                  <dw-question-design-common></dw-question-design-common>
                                </div>
                                <div v-if="item.quType === 'FILLBLANK'">
                                  <div v-if="item.answerInputRow > 1">
                                    <div class="dw-question-body">
                                      <div><i class="dwMoveSortQu fa fa-arrows" aria-hidden="true"></i></div>
                                      <div style="padding: 0px;">AAA</div>
                                    </div>
                                  </div>
                                  <div v-else>
                                    <div class="dw-question-body">
                                      <div><i class="dwMoveSortQu fa fa-arrows" aria-hidden="true"></i></div>
                                      <div style="padding: 0px;">AAA</div>
                                    </div>
                                  </div>
                                </div>
                                <div v-if="item.quType === 'SCORE'">
                                  <div class="dw-question-body">
                                    <div><i class="dwMoveSortQu fa fa-arrows" aria-hidden="true"></i></div>
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
                              </div>
                            </transition-group>
                          </draggable>
<!--                          <div class="quItem">
                            <div class="quTools" >
                              <div style="display: none;">
                                <div class="quToolsItem" style="margin-top: 0px;"><el-button icon="el-icon-rank" circle size="mini"></el-button></div>
                                <div class="quToolsItem"><el-button icon="el-icon-s-tools" circle size="mini"></el-button></div>
                                <div class="quToolsItem"><el-button icon="el-icon-share" circle size="mini"></el-button></div>
                                <div class="quToolsItem"><el-button icon="el-icon-delete" circle size="mini"></el-button></div>
                              </div>
                            </div>
                            <div class="quContent">
                              <div class="quTitle" >1、题标题</div>
                              <div class="quBody">
                                <div class="quOption">
                                  <div class="optionInput"><input type="radio" /></div>
                                  <div class="optionTitle">备选项1</div>
                                </div>
                                <div class="quOption">
                                  <div class="optionInput"><input type="radio" /></div>
                                  <div class="optionTitle">备选项2</div>
                                </div>
                                <div class="quOption">
                                  <div class="optionInput"><input type="radio" /></div>
                                  <div class="optionTitle">备选项3</div>
                                </div>
                              </div>
                            </div>
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div  class="grid-content"></div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import {querySurveyAll, questionComps} from './api/dw-design-survey-api'
import DwQuestionDesignCommon from './dw-design-survey-question/DwDesignQuestionCommon'

export default {
  name: 'DwDesignSurveyComp',
  components: {
    DwQuestionDesignCommon,
    draggable
  },
  data () {
    return {
      surveyId: '',
      drag:false,
      headerQuToolbarStyle: '',
      questions: [],
      survey: {
        questions: [{quType:'CHECKBOX'},{quType:'RADIO'}]
      },
      radio: '1',
      hover: false
    }
  },
  mounted () {
    this.loadDesignSurveyData()
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    //开始拖拽事件
    onStart(){
      this.drag=true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag=false;
    },
    loadDesignSurveyData () {
      questionComps().then((response) => {
        console.debug('response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.questions = httpResult.data
        }
      })
    },
    onScroll (position) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      if (scrollTop >= headerHeight) {
        this.headerQuToolbarStyle = 'top:0px;'
      } else {
        const newTop = headerHeight - scrollTop
        this.headerQuToolbarStyle = `top:${newTop}px;`
      }
    }
  }
}
</script>

<style scoped>
@import '../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../assets/css/design-survey.css';


.header .header-content-left{
  display: flex;
}
.header .header-content-left .logo{
  width: 200px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
}
.header .header-content-left img{
  vertical-align: middle;
}
.header .header-content-left .logo h1{
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  vertical-align: top;
}
</style>
