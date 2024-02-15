<template>
  <div>
    <dw-survey-dcs-wrapper is-answer-url-v6="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div>
          <div>
            <div class="dw-dcs-main-title">
              <h4>答卷地址</h4>
              <div class="dw-dcs-main-p">复制下面的问卷链接到QQ，Email等工具中直接发给被用户</div>
            </div>
            <div class="dw-dcs-main-content">
              <div class="dw-dcs-main-title">
                <div class="dw-dcs-main-p">V6新版答卷地址</div>
              </div>
              <el-input id="copyCodeInput" v-model="survey.answerUrlV6" readonly style="width: 500px;" ></el-input>
              <el-button-group>
                <el-button type="primary" icon="el-icon-copy-document" @click="copyActiveCode($event,survey.answerUrlV6 )" >复制地址</el-button>
                <el-link :href="survey.answerUrlV6" :underline="false" target="_blank" ><el-button icon="el-icon-link" style="border-bottom-left-radius: 0px;border-top-left-radius: 0px;" >打开问卷</el-button></el-link>
              </el-button-group>
            </div>
          </div>
          <div>
            <div class="dw-dcs-main-title">
              <h4>二维码地址</h4>
              <div class="dw-dcs-main-p">通过手机扫一扫，或下载二维码，即可进行问卷数据收集。</div>
            </div>
            <div class="dw-dcs-main-content">
              <el-row type="flex" justify="start" align="middle">
                <el-col :span="4">
                  <el-image :src="survey.answerUrlQR" class="dw-dcs-main-img">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="20">
                  <el-button type="primary" icon="el-icon-download" style="margin-left: 10px;" @click="downloadAnswerImg(`${survey.answerUrlQR}&down=1`)" >下载二维码</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import DwSurveyDcsWrapper from '../../../components/common/DwSurveyDcsWrapper'

export default {
  name: 'DwAnswerUrlV6',
  components: {
    DwSurveyDcsWrapper,
    Clipboard
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    downloadAnswerImg (imgSrc) {
      console.debug(imgSrc)
      window.location.href = imgSrc
    },
    copyActiveCode (e, text) {
      // console.debug(this.$children[0].survey)
      console.debug(this.survey)
      const clipboard = new Clipboard(e.target, {text: () => text})
      clipboard.on('success', e => {
        this.$message({type: 'success', message: '复制成功'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({type: 'warning', message: '该浏览器不支持自动复制'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    }
  }
}
</script>

<style scoped>
.dw-dcs-main-p{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.dw-dcs-main-content{
  padding: 20px 0px;
}
.dw-dcs-main-img{
  border: 1px solid rgb(241, 242, 245);
}
.dw-dcs-main-title{
  padding-bottom: 10px;
}
</style>
