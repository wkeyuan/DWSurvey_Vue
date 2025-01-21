<template>
  <div class="dwSurveyMyDialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      class="dw-survey-dialog1"
      title="调问产品团队"
      width="700px">
      <div style="font-size: 14px;line-height: 170%;padding: 10px;color: rgb(119 119 119);">
        <div>
          <div>尊敬的用户，欢迎您开启全新的问卷系统之旅！</div>
        </div>
        <div style="padding: 10px 0;">
          ✨ 🎉历经安装部署，此刻调问问卷系统已准备就绪，即将成为您洞察各方信息的得力工具。
          我们深知问卷调研对您的重要性，🥇调问经历12年的开源沉淀，🔥数千家企业的实际检验。无论是过去、现在，还是将来，调问都尽自己最大的努力打磨每一个功能细节。
        </div>
        <div style="padding: 10px 0;">
          🎉 🫣您可以添加我们的产品经理微信，若使用中遇到任何问题，我们随时为您排忧解难❤️👍。也可关注我们的公众号，实时了解调问的每一个迭代和我们对问卷系统的一些感悟。🤝
          <div style="margin-top: 20px;">
            <div style="display: flex;align-items: center;gap: 30px;">
              <div style="background-color: rgb(10 125 102);padding: 15px;border-radius: 5px;">
                <div style="text-align: center;color: white;letter-spacing: 1px;">
                  <div>任何问题，都可加我</div>
                  <div>一对一为你免费解答</div>
                </div>
                <div style="padding: 10px;background-color: white;border-radius: 5px;margin-top: 5px;">
                  <img src="@/assets/image/resource/dw-info/image01.png" width="130" style="border-radius: 5px;" />
                  <div style="text-align: center;">
                    <div>调问产品经理</div>
                  </div>
                </div>
              </div>

              <div style="background-color: rgb(10 125 102);padding: 15px;border-radius: 5px;">
                <div style="text-align: center;color: white;letter-spacing: 1px;">
                  <div>使用帮助，技术资料</div>
                  <div>这里都有关注我们吧</div>
                </div>
                <div style="padding: 10px;background-color: white;border-radius: 5px;margin-top: 5px;">
                  <img src="@/assets/image/resource/dw-info/image02.jpg" width="130" style="border-radius: 5px;" />
                  <div style="text-align: center;">
                    <div>官方公众号</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;">
          你也可以在开源社区👋 👋 （ <a href="https://github.com/wkeyuan/DWSurvey" target="_blank">Github</a> \ <a href="https://gitee.com/wkeyuan/DWSurvey" target="_blank">Gitee</a> ）上随时抛问题、提需求，我们会认真对待每一个社区上的留言。
          我们的开源之路，离不开您的鼓励 💪，感谢您在开源社区为我们
          <el-popover
            placement="top-start"
            trigger="hover">
            <a href="https://gitee.com/wkeyuan/DWSurvey" slot="reference" style="color: rgb(208 154 1)">点亮 ⭐ Star </a>
            <div><img src="@/assets/image/resource/dw-info/img03.png" width="330"/></div>
          </el-popover>
        </div>
        <div style="padding: 10px 0;">
          🙏❤️愿调问问卷在未来为您的决策提供坚实依据，高效助力您的工作开展。
        </div>

        <div style="margin-top: 10px;">
          <div>调问网产品团队  <span style="margin-left: 10px;">2025年01月22号 23时58分</span></div>
        </div>
        <div style="border-top: 1px solid gray;margin-top: 10px;padding-top: 10px;">
          <div>官方网站：<a href="https://www.diaowen.net?s0=oss&v1=2501&e5=dsf0" target="_blank">https://www.diaowen.net</a></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'DwSurveyDialog',
  components: {},
  data () {
    return {
      tabs: [],
      loading: true,
      dialogVisible: false,
      curDate: null
    }
  },
  mounted () {
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    gotoDw () {
      window.open('https://www.diaowen.net?s0=oss&v1=2501&e5=dsm0', '_blank')
    }
  }
}
</script>
<style scoped>
.dw-survey-dialog1 /deep/ .el-dialog__body{
  padding: 10px 20px!important;
}
</style>
<style>
a {
  color: rgb(10, 125, 102);
}
</style>
