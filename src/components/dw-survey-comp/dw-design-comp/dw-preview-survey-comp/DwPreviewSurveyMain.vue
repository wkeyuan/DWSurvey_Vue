<template>
  <div class="dw-preview-container" >
    <div class="dw-preview-header">
      <div class="dw-preview-header-left">
        <label><i class="dw-icon-button fa-regular fa-eye active" style="color: #7249ee;"></i>问卷预览</label>
<!--        <i class=" fa-solid fa-wand-magic-sparkles active" style="color: #6e45e8;"></i>-->
      </div>
      <div class="dw-preview-header-center">
        <label><i :class=" previewTypeClass === 'dw-preview-pc' ? 'active' : ''" class="dw-icon-button fas fa-desktop" @click="previewTabClick('dw-preview-pc')"></i></label>
        <label><i :class=" previewTypeClass === 'dw-preview-pad' ? 'active' : ''" class="dw-icon-button fas fa-tablet-alt" @click="previewTabClick('dw-preview-pad')"></i></label>
        <label><i :class=" previewTypeClass === 'dw-preview-phone' ? 'active' : ''" class="dw-icon-button fas fa-mobile-alt" @click="previewTabClick('dw-preview-phone')"></i></label>
      </div>
      <div class="dw-preview-header-right">
        <el-button type="primary" size="small" @click="devSurvey">确认发布</el-button>
        <el-button type="primary" plain size="small" @click="designSurvey">返回编辑</el-button>
        <el-button size="small" @click="backSurveyList">返回列表</el-button>
      </div>
    </div>

    <el-container style="height: calc(100vh);">
      <el-aside style="width: 300px;">
        <div class="dw-preview-left-aside">
          <div>
            <div style="padding: 40px 10px 10px 10px;">
              <div style="font-size: 14px;font-weight: bold;text-align: left;padding: 10px 0;">
                <i class="fa-solid fa-palette" style="color: #7d55f7;"></i> 问卷样式配置
              </div>
              <div style="padding: 5px 0;">
                <el-alert title="配置完成点击确认发布才会生效" type="info" show-icon></el-alert>
              </div>
              <div>
                <el-form ref="form" size="small" >
                  <div>
                    <div class="dw-title-attr">图片属性</div>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <div><el-checkbox v-model="survey.surveyStyle.pageTopImg.enabled" >页眉图</el-checkbox></div>
                        <div v-show="survey.surveyStyle.pageTopImg.enabled" style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" style="height: 40px;">
                            <el-col :span="10" >
                              <el-image style="height: 40px;display: block;" fit="cover" src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"></el-image>
                            </el-col>
                            <el-col :span="14" style="padding-left: 10px;">
                              <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">上传图片</el-button>
                              </el-upload>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div><el-checkbox v-model="survey.surveyStyle.pageBgImg.enabled" >背景图</el-checkbox></div>
                        <div v-show="survey.surveyStyle.pageBgImg.enabled" style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" style="height: 40px;">
                            <el-col :span="10" >
                              <el-image style="height: 40px;display: block;" fit="cover" src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"></el-image>
                            </el-col>
                            <el-col :span="14" style="padding-left: 10px;">
                              <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">上传图片</el-button>
                              </el-upload>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div><el-checkbox v-model="survey.surveyStyle.logoImg.enabled" >LOGO图</el-checkbox></div>
                        <div v-show="survey.surveyStyle.logoImg.enabled" style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" style="height: 40px;">
                            <el-col :span="10" >
                              <el-image style="height: 40px;display: block;" fit="cover" src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"></el-image>
                            </el-col>
                            <el-col :span="14" style="padding-left: 10px;">
                              <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">上传图片</el-button>
                              </el-upload>
                            </el-col>
                          </el-row>
                          <div style="padding-top: 5px;">
                            <el-row type="flex" justify="center" align="middle" >
                              <el-col :span="24" >
                                <span style="font-size: 14px;font-weight: 500;color: #606266;">显示位置</span>
                                <el-select v-model="value" placeholder="请选择" style="width: 144px;">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                  <div style="margin-top: 20px;">
                    <div class="dw-title-attr">颜色属性</div>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="14" >
                              <div style="font-size: 14px;font-weight: 500;color: #606266;">背景色<span style="font-size: 12px;font-weight: normal;color: #969696;">（背景图优先）</span></div>
                            </el-col>
                            <el-col :span="10" style="padding-left: 10px;">
                              <el-color-picker v-model="survey.surveyStyle.pageBgColor" show-alpha style="display: block;" size="medium"></el-color-picker>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="14" >
                              <div style="font-size: 14px;font-weight: 500;color: #606266;">主题色<span style="font-size: 12px;font-weight: normal;color: #969696;">（表单控件）</span></div>
                            </el-col>
                            <el-col :span="10" style="padding-left: 10px;">
                              <el-color-picker v-model="survey.surveyStyle.pageThemeColor" show-alpha style="display: block;" size="medium"></el-color-picker>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="14" >
                              <div style="font-size: 14px;font-weight: 500;color: #606266;">LOGO行背景色</div>
                            </el-col>
                            <el-col :span="10" style="padding-left: 10px;">
                              <el-color-picker v-model="survey.surveyStyle.pageThemeColor" show-alpha style="display: block;" size="medium"></el-color-picker>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="14" >
                              <div style="font-size: 14px;font-weight: 500;color: #606266;">进度条色<span style="font-size: 12px;font-weight: normal;color: #969696;">（优先级高）</span></div>
                            </el-col>
                            <el-col :span="10" style="padding-left: 10px;">
                              <el-color-picker v-model="survey.surveyStyle.pageThemeColor" show-alpha style="display: block;" size="medium"></el-color-picker>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                  <div style="margin-top: 20px;">
                    <div class="dw-title-attr">显示配置</div>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="12" >
                              <div><el-checkbox v-model="survey.surveyStyle.showQuNum">显示题号</el-checkbox></div>
                            </el-col>
                            <el-col :span="12" style="padding-left: 10px;">
                              <div><el-checkbox v-model="survey.surveyStyle.showProgressbar">显示进度</el-checkbox></div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="12" >
                              <div><el-checkbox v-model="survey.surveyStyle.showPageHeader" >显示表头</el-checkbox></div>
                            </el-col>
                            <el-col :span="12" style="padding-left: 10px;">
                              <div><el-checkbox v-model="survey.surveyStyle.showQuTypeName" >显示题型</el-checkbox></div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <div style="font-size: 12px;">
                          <el-row type="flex" justify="center" align="middle" >
                            <el-col :span="12" >
                              <div><el-checkbox v-model="survey.surveyStyle.showSurveyTitle" >显示问卷标题</el-checkbox></div>
                            </el-col>
                            <el-col :span="12" style="padding-left: 10px;">
                              <div><el-checkbox v-model="survey.surveyStyle.showSurveyNote" >显示问卷说明</el-checkbox></div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </el-aside>

      <el-container style="flex: auto;">
        <div style="width: 100%;">
          <div v-show="previewTypeClass === 'dw-preview-pc'" class="dw-preview-main" >
            <div class="dw-preview-answer-survey-container">
              <div class="dw-preview-pc">
                <div class="dw-preview-body">
                  <div>
                    <dw-answer-survey :answer-props="answerProps" :ext-props="{isPreview: true}"></dw-answer-survey>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="previewTypeClass === 'dw-preview-pad'" class="dw-preview-main">
            <div class="dw-preview-answer-survey-container">
              <div class="dw-preview-pad">
                <div class="dw-preview-body">
                  <div>
                    <dw-answer-survey :answer-props="answerProps" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '630px',height: 'auto'}, isPreview: true}"></dw-answer-survey>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="previewTypeClass === 'dw-preview-phone'" class="dw-preview-main">
            <div class="dw-preview-answer-survey-container">
              <div class="dw-preview-phone">
                <div class="dw-preview-body">
                  <div>
                    <dw-answer-survey :answer-props="answerProps" :ext-props="{anBodySpan: padPhoneAnBodySpan, anBodyStyle: {minHeight: '861px',height: 'auto'}, isPreview: true}"></dw-answer-survey>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import DwAnswerSurveyMain from '../../dw-answer-comp/DwAnswerSurveyMain.vue'
import {dwDevSurvey} from '../dw-design-survey-comp/api/dw-design-survey-api'
import DwAnswerSurvey from '../../dw-answer-comp/DwAnswerSurvey.vue'

export default {
  name: 'DwPreviewSurveyMain',
  components: {DwAnswerSurvey, DwAnswerSurveyMain},
  data () {
    return {
      options: [{
        value: '选项1',
        label: '在页眉图片左上角'
      }, {
        value: '选项2',
        label: '在页眉图片右上角'
      }, {
        value: '选项3',
        label: '顶部LOGO行居左'
      }, {
        value: '选项4',
        label: '顶部LOGO行居中'
      }, {
        value: '选项5',
        label: '顶部LOGO行居右'
      }],
      color: 'rgba(19, 206, 102, 0.8)',
      imageUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      survey: {
        surveyStyle: {
          pageTopImg: {enabled: false},
          pageBgImg: {enabled: false},
          logoImg: {enabled: false},
          pageBgColor: '#dfdfe0',
          pageThemeColor: '#025bb7',
          showQuNum: true,
          showProgressbar: true,
          showPageHeader: true,
          showQuTypeName: true,
          showSurveyTitle: true,
          showSurveyNote: true
        }
      },
      drawer: false,
      direction: 'ltl',
      activeName: 'first',
      previewTypeClass: 'dw-preview-pc', // dw-preview-pad, dw-preview-phone
      padPhoneAnBodySpan: {
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
        md: {span: 24, offset: 0},
        lg: {span: 24, offset: 0},
        xl: {span: 24, offset: 0}
      },
      answerProps: {sid: null, answerId: null, anPwd: null}
    }
  },
  mounted () {
    this.answerProps.sid = this.$route.params.id
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    previewTabClick (className) {
      this.previewTypeClass = className
    },
    designSurvey () {
      const surveyId = this.$route.params.id
      this.$router.push('/dw-v6/diaowen/dw-design/survey/'+surveyId)
    },
    devSurvey () {
      const surveyId = this.$route.params.id
      const params = {surveyId}
      dwDevSurvey(params).then((response) => {
        console.debug('response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.$router.push('/v6/dw/survey/c/url/'+surveyId)
        } else {
          this.$message.error('发布失败，请重试或联系管理员！')
        }
      })
    },
    backSurveyList () {
      this.$router.push('/v6')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.dw-preview-container{
  /*background: #ecedee;*/
  background-color: #dfe8f6;
  height: 100vh;
}
.dw-preview-header{
  background: white;
  padding: 0 10px;
  border-bottom: 1px solid #d7d5d5;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
}
.dw-preview-header-center{
  text-align: center;
}
.dw-preview-header-left{
  position: fixed;
  left: 10px;
  top: 0px;
}
.dw-preview-header-right{
  position: fixed;
  right: 10px;
  top: 3px;
}
.dw-icon-button{
  padding: 10px;
  color: #909399;
  cursor: pointer;
  font-size: 14px;
}
.dw-icon-button.active,.dw-icon-button:hover{
  color: #409EFF;
  font-size: 18px;
}
.dw-preview-main{
  /*padding-top: 38px;*/
}
.dw-preview-answer-survey-container .dw-preview-pc{
  height: calc(100vh);
  overflow: scroll;
  margin: 0 auto;
}
.dw-preview-pc .dw-preview-body{
  /*height: calc(100vh - 40px);*/
  margin-top: 40px;
  padding: 0;
}
/*
.dw-preview-answer-survey-container .dw-preview-pad{
  background: url('../../../../assets/image/ipad.jpg') no-repeat;
  background-size: cover;
  width: 910px;
  height: 630px;
  margin: 20px auto 0 auto;
  padding-top: 1px;
}
.dw-preview-pad .dw-preview-body{
  width: 774px;
  height: 582px;
  margin: 25px 0 0 68px;
  overflow: scroll;
  background-color: red;
}
.dw-preview-answer-survey-container .dw-preview-phone{
  background: url('../../../../assets/image/iphone.png') no-repeat;
  background-size: cover;
  width: 404px;
  height: 701px;
  margin: 20px auto 0 auto;
  padding-top: 1px;
}
.dw-preview-phone .dw-preview-body{
  width: 257px;
  height: 456px;
  margin: 94px 0 0 67px;
  overflow: scroll;
}
*/

.dw-preview-answer-survey-container .dw-preview-pad{

}
.dw-preview-pad .dw-preview-body{
  width: 910px;
  height: 630px;
  overflow: scroll;
  margin: 60px auto 0;
  /*#c6c6c7*/
  border: 1px solid #0777e8;
  padding: 5px;
}
.dw-preview-answer-survey-container .dw-preview-phone{

}
.dw-preview-phone .dw-preview-body{
  width: 418px;
  height: 861px;
  overflow: scroll;
  margin: 60px auto 0;
  border: 1px solid #0777e8;
  padding: 5px;
}
.dw-preview-left-aside{
  height: 100vh;
  width: 100%;
  background: white;
}
</style>
<style scoped>
/* design form */
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 6px;
}
.dw-title-attr{
  font-weight: bold;
  font-size: 14px;
  color: grey;
  padding: 10px 0;
}
</style>
