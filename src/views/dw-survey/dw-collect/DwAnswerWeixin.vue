<template>
  <div>
    <dw-survey-dcs-wrapper is-answer-wx="true">
      <template v-slot:dw-dcs-main-slot="{survey}">
        <div>
          <div class="dw-dcs-main-title">
            <h4>通过微信二维码发送或分享给好友</h4>
            <div class="dw-dcs-main-p">通过手机扫一扫，或下载二维码，发送或分享给好友，即可进行问卷数据收集。</div>
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
                <el-button type="primary" icon="el-icon-download" style="margin-left: 10px;" >下载二维码</el-button>
                <div class="dw-dcs-main-p" style="padding: 10px;">通过手机扫一扫，或下载二维码，即可进行问卷数据收集。</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <div class="dw-dcs-main-title">
            <h4>微信公众号分享</h4>
            <div class="dw-dcs-main-p">通过微信公众号，发送或分享给被访者。</div>
          </div>
          <div class="dw-dcs-main-content">
            <div style="background-color: #F1F1F1;padding: 10px;">
              <el-row type="flex" gutter="20" justify="start" align="middle">
                <el-col :span="8" >
                  <div class="dw-dcs-main-wx-step">1、使用微信扫一扫功能。</div>
                  <el-image src="http://localhost:8181/diaowen/images/img1/weixin_collect1.jpg" class="dw-dcs-main-img">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="8">
                  <div class="dw-dcs-main-wx-step">2、打开问卷后，点击右上角的“分享”按钮。</div>
                  <el-image src="http://localhost:8181/diaowen/images/img1/weixin_collect2.jpg" class="dw-dcs-main-img">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="8">
                  <div class="dw-dcs-main-wx-step">3、选择“发送给朋友”或“分享到朋友圈”</div>
                  <el-image src="http://localhost:8181/diaowen/images/img1/weixin_collect3.jpg" class="dw-dcs-main-img">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div>
          <div class="dw-dcs-main-title">
            <h4>通过微信公众号</h4>
            <div class="dw-dcs-main-p">复制下面的问卷链接到QQ，Email等工具中直接发给被用户</div>
          </div>
          <div class="dw-dcs-main-content">
            <div>
              <el-input id="copyCodeInput" v-model="survey.answerUrl" readonly style="width: 400px;" ></el-input>
              <el-button-group >
                <el-button type="primary" icon="el-icon-copy-document" @click="copyActiveCode($event,survey.answerUrl )" >复制地址</el-button>
              </el-button-group>
            </div>
            <div style="padding: 10px;background-color: #F1F1F1;margin-top: 20px;">
              <el-row type="flex" gutter="20" justify="start" align="top">
                <el-col :span="8" >
                  <div class="dw-dcs-main-wx-step">1、打开公众账号。</div>
                  <el-image src="http://localhost:8181/diaowen/images/img1/weixin_b_s3.png" class="dw-dcs-main-img">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="8">
                  <div class="dw-dcs-main-wx-step">2、将链接放入公众号中确认后推送文章。</div>
                  <el-image src="http://localhost:8181/diaowen/images/img1/weixin_b_s4.jpeg" class="dw-dcs-main-img">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
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

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import Clipboard from 'clipboard'

export default {
  name: 'DwAnswerWeixin',
  components: {
    DwSurveyDcsWrapper,
    Clipboard
  },
  data () {
    return {
      code: 'http://ent.surveyform.cn/#/diaowen/wdhl2uv6e9x',
      src: 'https://ent.surveyform.cn/api/dwsurvey/anon/response/answerTD.do?surveyId=465d3020-0880-4c37-ab09-cc40869758de'
    }
  },
  methods: {
    copyActiveCode (e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({type: 'success', message: '复制成功'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({type: 'waning', message: '该浏览器不支持自动复制'})
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
.dw-dcs-main-wx-step{
  font-size: 14px;
  padding: 10px 0px;
}
</style>
