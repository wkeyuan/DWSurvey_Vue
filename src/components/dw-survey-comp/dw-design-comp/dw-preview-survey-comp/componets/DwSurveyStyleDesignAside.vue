<template>
  <div v-if="survey!=null && survey.hasOwnProperty('surveyStyle') ">
    <div>
      <div style="padding: 10px 10px 10px 10px;">
        <div style="font-size: 14px;font-weight: bold;text-align: left;padding: 10px 0;">
          <i class="fa-solid fa-palette" style="color: #7d55f7;"></i> 问卷样式配置
        </div>
        <div style="padding: 5px 0;">
          <el-alert title="样式修改会自动保存" type="info" show-icon></el-alert>
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
                        <el-image :src="survey.surveyStyle.pageTopImg.httpSrc" fit="cover" class="dw-style-el-image" >
                          <div slot="error" class="el-image__error"><i class="fa-regular fa-image" style="margin-right: 6px;"></i>请上传图片</div>
                        </el-image>
                      </el-col>
                      <el-col :span="14" style="padding-left: 10px;">
                        <el-upload
                          :on-success="handleSuccessTopImg"
                          :show-file-list="false"
                          action="/api/dwsurvey/up/up-file.do">
                          <el-button size="small" type="primary">上传图片</el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div><el-checkbox v-model="survey.surveyStyle.pageBgImg.enabled" @change="upImgSrc" >背景图</el-checkbox></div>
                  <div v-show="survey.surveyStyle.pageBgImg.enabled" style="font-size: 12px;">
                    <el-row type="flex" justify="center" align="middle" style="height: 40px;">
                      <el-col :span="10" >
                        <el-image :src="survey.surveyStyle.pageBgImg.httpSrc" fit="cover" class="dw-style-el-image" >
                          <div slot="error" class="el-image__error"><i class="fa-regular fa-image" style="margin-right: 6px;"></i>请上传图片</div>
                        </el-image>
                      </el-col>
                      <el-col :span="14" style="padding-left: 10px;">
                        <el-upload
                          :on-success="handleSuccessBgImg"
                          :show-file-list="false"
                          action="/api/dwsurvey/up/up-file.do">
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
                        <el-image :src="survey.surveyStyle.logoImg.httpSrc" fit="fill" class="dw-style-el-image" >
                          <div slot="error" class="el-image__error"><i class="fa-regular fa-image" style="margin-right: 6px;"></i>请上传图片</div>
                        </el-image>
                      </el-col>
                      <el-col :span="14" style="padding-left: 10px;">
                        <el-upload
                          :on-success="handleSuccessLogoImg"
                          :show-file-list="false"
                          action="/api/dwsurvey/up/up-file.do">
                          <el-button size="small" type="primary">上传图片</el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                    <div style="padding-top: 5px;">
                      <el-row type="flex" justify="center" align="middle" >
                        <el-col :span="24" >
                          <span style="font-size: 14px;font-weight: 500;color: #606266;">显示位置</span>
                          <el-select v-model="survey.surveyStyle.logoImg.position" placeholder="请选择" style="width: 144px;">
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
                        <div style="font-size: 14px;font-weight: 500;color: #606266;">主题色<span style="font-size: 12px;font-weight: normal;color: #969696;">（表单控件）</span></div>
                      </el-col>
                      <el-col :span="10" style="padding-left: 10px;">
                        <el-color-picker v-model="survey.surveyStyle.pageThemeColor" show-alpha style="display: block;" size="medium" @change="upThemeColor"></el-color-picker>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div style="font-size: 12px;">
                    <el-row type="flex" justify="center" align="middle" >
                      <el-col :span="14" >
                        <div style="font-size: 14px;font-weight: 500;color: #606266;">背景色<span style="font-size: 12px;font-weight: normal;color: #969696;">（背景图优先）</span></div>
                      </el-col>
                      <el-col :span="10" style="padding-left: 10px;">
                        <el-color-picker v-model="survey.surveyStyle.pageBgColor" show-alpha style="display: block;" size="medium" @change="upAnswerStyle"></el-color-picker>
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
                        <el-color-picker v-model="survey.surveyStyle.logoBgColor" show-alpha style="display: block;" size="medium" @change="upAnswerStyle"></el-color-picker>
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
                        <el-color-picker v-model="survey.surveyStyle.progressColor" show-alpha style="display: block;" size="medium" @change="upAnswerStyle"></el-color-picker>
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
</template>

<script>
import {dwSurveyColorUtils} from '../../../dw-utils/dw-common/dw-common-utils'
import {dwUpSurveyStyle} from '../../../dw-answer-comp/dw-utils/dw-survey-answer-style'

export default {
  name: 'DwSurveyStyleDesignAside',
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      options: [{
        value: 'topLogoLeft',
        label: '顶部LOGO行居左'
      }, {
        value: 'topLogoCenter',
        label: '顶部LOGO行居中'
      }, {
        value: 'topLogoRight',
        label: '顶部LOGO行居右'
      }, {
        value: 'pageTopImgLeft',
        label: '在页眉图片左上角'
      }, {
        value: 'pageTopImgRight',
        label: '在页眉图片右上角'
      }],
      color: 'rgba(19, 206, 102, 0.8)',
      imageUrl: ''
    }
  },
  mounted () {
    this.upImgSrc()
  },
  methods: {
    handleSuccessTopImg (response, file) {
      this.handleSuccess(response, file, 'pageTopImg')
    },
    handleSuccessBgImg (response, file) {
      this.handleSuccess(response, file, 'pageBgImg')
    },
    handleSuccessLogoImg (response, file) {
      this.handleSuccess(response, file, 'logoImg')
    },
    handleSuccess (response, file, upType) {
      if (response.hasOwnProperty('resultCode') && response.resultCode === 200) {
        const upResultData = response.data
        if (upType==='pageTopImg') {
          this.survey.surveyStyle.pageTopImg.src = upResultData[0].location
        } else if (upType==='pageBgImg') {
          this.survey.surveyStyle.pageBgImg.src = upResultData[0].location
        } else if (upType==='logoImg') {
          this.survey.surveyStyle.logoImg.src = upResultData[0].location
        }
        this.upImgSrc()
      } else {
        this.$message.error('上传失败')
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    upImgSrc () {
      dwUpSurveyStyle.dwUpImgSrcVar(this.survey)
    },
    upAnswerStyle () {
      dwUpSurveyStyle.dwUpAnswerStyleVar(this.survey)
    },
    upThemeColor () {
      const survey = this.survey
      if (survey!==null && survey.hasOwnProperty('surveyStyle')) {
        const surveyStyle = survey.surveyStyle
        const pageThemeColor = surveyStyle.pageThemeColor
        this.survey.surveyStyle.pageThemeColor1 = dwSurveyColorUtils.generateSimilarColor(pageThemeColor, -0.1, 0.1)
        console.debug('pageThemeColor', pageThemeColor)
        const pageBgColor = dwSurveyColorUtils.generateSimilarColor(pageThemeColor, -0.2, 0.3, false)
        this.survey.surveyStyle.pageBgColor = pageBgColor
        if (dwSurveyColorUtils.isWhiteColor(pageBgColor)) this.survey.surveyStyle.pageBgColor = '#dfdfe0'
        console.debug('this.survey.pageBgColor', pageBgColor)
        this.survey.surveyStyle.progressColor = dwSurveyColorUtils.generateSimilarColor(pageThemeColor, 0.1, -0.2, false)
        const logoBgColor = dwSurveyColorUtils.generateSimilarColor(pageThemeColor, -0.2, 0.5, true)
        this.survey.surveyStyle.logoBgColor = logoBgColor
        const logoBgColorRgb = dwSurveyColorUtils.hslToRgb(logoBgColor)
        console.debug('logoBgColorRgb', logoBgColorRgb, logoBgColorRgb.red)
        if (dwSurveyColorUtils.isWhiteColor(logoBgColorRgb)) this.survey.surveyStyle.pageBgColor = '#efefef'
        this.upAnswerStyle()
        console.debug('this.survey.surveyStyle.logoBgColor', this.survey.surveyStyle.logoBgColor)
      }
    }
  }
}
</script>

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
.dw-style-el-image{
  height: 40px;
  display: block;
  background-color: #eeeeee;
}
.image-slot{
  display: block;
  line-height: 40px;
}
.image-slot i{
  font-size: 40px;
  line-height: 40px;
  margin: 0 auto;
}
</style>
