<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="切换布局"
    width="30%">
    <div>
      <div style="font-size: 14px;padding-bottom: 20px;line-height: 20px;">
        系统默认提供两套布局方案，切换可以查看，更多可自定义。
      </div>
      <div>
        <el-radio v-model="layout" label="tb" border> <i class="fa-solid fa-laptop"></i> 上下布局</el-radio>
        <el-radio v-model="layout" label="lr" border> <i class="fa-solid fa-border-top-left"></i> 左右布局</el-radio>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="layoutConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {dwFooterUtils} from '../../dw-survey-comp/dw-utils/dw-common/dw-footer-util'

export default {
  name: 'SwitchLayoutDialog',
  data () {
    return {
      userName: 'dwsurvey',
      layout: 'tb',
      dialogVisible: false
    }
  },
  mounted () {
    dwFooterUtils.isLayoutLr((footerInfo) => {
      this.layout = 'lr'
    })
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    layoutConfirm () {
      // 保存配置
      dwFooterUtils.setLayout(this.layout)
      // 执行切换
      const routePath = this.$route.path
      if (this.layout==='tb') {
        // 上下结构
        const newPath = routePath.replace('/v6/lr/', '/v6/')
        this.$router.push(newPath)
      } else if (this.layout==='lr') {
        // 上下结构
        const newPath = routePath.replace('/v6/', '/v6/lr/')
        this.$router.push(newPath)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
