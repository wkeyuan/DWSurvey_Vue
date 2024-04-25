<template>
  <div>
    <!--    <div style="background-color: red;margin: 10px;">{{ survey.questions[index].upFileList }}</div>-->
    <!--    <div style="background-color: grey;margin: 10px;">{{ survey.questions[index].anQuestion }}</div>-->
    <el-upload
      :before-remove="beforeRemove"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :limit="limit"
      :accept="accept"
      :file-list="upFileList"
      :list-type="listType"
      :action="uploadAction"
      class="upload-demo"
      multiple>
      <el-button size="small" type="primary" plain >点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        <div class="dw-answer-question-remind" style="line-height: 20px;">
          <template v-if="accept!=='' && fileSize>0 && limit >0 ">
            请上传<span class="span-high">{{ accept }}</span>类型文件，单个文件大小不超过<span class="span-high">{{ fileSize }}M</span>，最多只能上传<span class="span-high">{{ limit }}个</span>文件
          </template>
          <template v-if="accept==='' && fileSize>0 && limit >0 ">
            单个文件大小不超过<span class="span-high">{{ fileSize }}M</span>，最多只能上传<span class="span-high">{{ limit }}个</span>文件
          </template>
          <template v-if="accept==='' && fileSize<=0 && limit >0 ">
            最多只能上传<span class="span-high">{{ limit }}个</span>文件
          </template>
        </div>
      </div>
    </el-upload>
    <div v-show="survey.dwDebug">
      <div>{{ upFileList }}</div>
    </div>
  </div>
</template>

<script>

import {answerQuEventCommon} from '../../../dw-utils/dw-survey-answer-common'

export default {
  name: 'DwAnswerQuUpload',
  components: {},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  },
  data () {
    return {
      upFileList: [],
      // fileList: [],
      limit: 0,
      accept: '',
      listType: 'text', // picture/picture-card
      uploadAction: '/api/dwsurvey/up/up-file-wb.do',
      fileSize: 10
    }
  },
  mounted () {
    const question = this.survey.questions[this.index]
    if (question.hasOwnProperty('fileLimit') && question.fileLimit!==null) this.limit = question.fileLimit
    if (question.hasOwnProperty('fileAccept') && question.fileAccept!==null) {
      const fileAccept = question.fileAccept
      if (fileAccept===0) this.accept = ''
      if (fileAccept===1) this.accept = '.jpg,.jpeg,.png,.gif,.bmp'
      if (fileAccept===2) this.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
      if (fileAccept===100) this.accept = question.customFileAccept
    }
    if (question.hasOwnProperty('fileSize') && question.fileSize!==null) this.fileSize = question.fileSize
    this.upFileList = this.survey.questions[this.index].upFileList
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.upFileList = fileList
      this.updateUpFileAnswer()
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      // console.debug('beforeRemove file', file)
      // if (!file.raw.hasOwnProperty('checkSize') || file.raw.checkSize===true) return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeAvatarUpload (file) {
      if (this.fileSize !== null && this.fileSize>0) {
        const isLt2M = file.size / 1024 / 1024 < this.fileSize
        if (!isLt2M) this.$message.warning(`上传文件大小不能超过 ${this.fileSize}MB!`)
        file.checkSize = false
        // console.debug('beforeAvatarUpload file', file)
        return isLt2M
      }
      return true
    },
    handleSuccess (response, file, fileList) {
      console.debug('response', response)
      console.debug('file', file)
      console.debug('fileList', fileList)
      this.upFileList = fileList
      this.updateUpFileAnswer()
      /*
      const resultCode = response.resultCode
      if (resultCode===200) {
        const upDatas = response.data
        upDatas.map((item, index) => {
          const anUploadFile = {belongId: null, belongAnswerId: null, quId: null, filePath: item.location, fileName: item.filename, randomCode: ''}
          this.survey.questions[this.index].anUplodFiles.push(anUploadFile)
        })
      }*/
    },
    updateUpFileAnswer () {
      // console.debug(this.upFileList)
      this.survey.questions[this.index].upFileList = this.upFileList
      // getQuestionAnswerData(this.survey.questions[this.index])
      // validateQuestion(this.survey.questions[this.index])
      answerQuEventCommon(this.survey, this.index)
    }
  }
}
</script>

<style scoped>
@import '../../../../../../assets/css/dw-answer.css';
.span-high {
  color: #014ab6;
  font-weight: bold;
}
</style>
