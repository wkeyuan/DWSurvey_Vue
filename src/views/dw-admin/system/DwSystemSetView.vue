<template>
  <div style="background-color: white">
    <div style="padding: 20px;">
      <div>
        <h3>系统配置</h3>
      </div>
      <div>
        <div style="width: 550px;">
          <el-form ref="form" :model="form" label-width="130px" label-position="left">
            <div style="padding: 0 10px;">
              <el-form-item label="站点名称">
                <el-input v-model="form.siteName"></el-input>
              </el-form-item>
              <el-form-item label="站点URL">
                <el-input v-model="form.siteUrl"></el-input>
              </el-form-item>
              <el-form-item label="站点备案号">
                <el-input v-model="form.siteIcp"></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="form.siteAdminName"></el-input>
              </el-form-item>
              <el-form-item label="联系邮箱">
                <el-input v-model="form.siteMail"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="form.sitePhone"></el-input>
              </el-form-item>
            </div>
            <div style="padding: 0 10px;">
              <el-form-item label="LOGO" disabled>
                <el-tooltip class="item" effect="dark" content="需要修改请升级到企业版" placement="right">
                  <div style="display: flex;align-items: center;justify-content: flex-start;justify-items: center">
                    <div>
                      <el-upload
                        class="avatar-uploader"
                        action="/api/dwsurvey/up/up-file.do"
                        :before-upload="handleExceed"
                        :show-file-list="false" >
                        <img v-if="form.logoImageUrl" :src="form.logoImageUrl" class="avatar">
                        <img v-else src="@/assets/logo.png" class="avatar">
                      </el-upload>
                    </div>
                    <div style="margin-left: 10px;">
                      <el-link href="https://www.diaowen.net?s0=oss&v1=2501&e5=sfl0" type="warning" style="line-height: 15px;">购买升级</el-link>
                    </div>
                  </div>
                </el-tooltip>
                <div style="font-size: 13px;color: gray;line-height: 13px;margin-top: 10px;">
                  点击图片上传新LOGO
                </div>
              </el-form-item>
              <el-form-item label="底部版权信息" disabled>
                <el-tooltip class="item" effect="dark" content="需要修改请升级到企业版" placement="right">
                  <div style="display: flex;align-items: center;justify-content: flex-start">
                    <el-switch v-model="form.footerHide" active-text="隐藏" inactive-text="显示" disabled></el-switch>
                    <div style="margin-left: 10px;">
                      <el-link href="https://www.diaowen.net?s0=oss&v1=2501&e5=sfh5" type="warning" style="line-height: 15px;">购买升级</el-link>
                    </div>
                  </div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="底部版权内容" disabled>
                <el-tooltip class="item" effect="dark" content="需要修改请升级到企业版" placement="right">
                  <div style="display: flex;align-items: center;justify-content: flex-start">
                    <el-input v-model="form.footerContent" placeholder="Powered by DWSurvey" disabled style="width: 300px"></el-input>
                    <div style="margin-left: 10px;">
                      <el-link href="https://www.diaowen.net?s0=oss&v1=2501&e5=sfc3" type="warning" style="line-height: 15px;">购买升级</el-link>
                    </div>
                  </div>
                </el-tooltip>
              </el-form-item>
            </div>
            <div style="margin-top: 10px;">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存更新</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DwSystemSet',
  data () {
    return {
      form: {
        siteName: '调问网',
        // # 站点名称，对应的URL地址
        siteUrl: 'http://www.diaowen.net',
        // # 站点备案号
        siteIcp: '京ICP备13050030号-3',
        // # 站点联系人邮箱
        siteMail: 'service@diaowen.net',
        siteAdminName: '管理员',
        // # 站点联系人电话
        sitePhone: 18888888888,
        logoImageUrl: '',
        footerHide: false,
        footerContent: 'Powered by DWSurvey'
      }
    }
  },
  methods: {
    handleExceed (files, fileList) {
      this.$message.warning(`当前社区版，不支持修改系统默认LOGO，如需修改请升级到企业版`)
      return false
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style lang="css">
.avatar-uploader{
  border: 1px dashed #8f9fc0 !important;
  border-radius: 6px;
  /*background-color: var(--dw-primary-theme-color);*/
  display: flex;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 196px;
  height: 38px;
  line-height: 58px;
  text-align: center;
}
.avatar {
  width: 196px;
  height: 38px;
  display: block;
}
</style>
