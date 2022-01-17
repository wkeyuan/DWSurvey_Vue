<template>
  <div>
    <dw-survey-dcs-wrapper :id="id" is-answer-data="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div class="dw-dcs-main-title">
          <el-row type="flex">
            <el-col :span="18"><div style="font-size: 14px;padding: 10px;"><strong>原始数据列表</strong></div></el-col>
            <el-col :span="6" style="text-align: right;padding-right: 16px;" ><el-button type="primary" size="small" @click="handleExport" >导出数据</el-button></el-col>
          </el-row>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="回答IP" >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-html="scope.row.ipAddr" ></p>
                <div slot="reference" class="name-wrapper">
                  <div v-html="scope.row.ipAddr"></div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="回答的题数" >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.completeItemNum!=null ? scope.row.completeItemNum:0 }}&nbsp;题</span>
            </template>
          </el-table-column>
          <el-table-column label="回答时间" >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.endAnDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" >
            <template slot-scope="scope">
              <el-button-group>
                <el-tooltip effect="dark" content="查看数据" placement="top">
                  <el-button size="mini" icon="el-icon-view" @click="handleGo(`/no-top/dw-survey/d/data/${scope.row.surveyId}/${scope.row.id}`)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除数据" placement="top">
                  <el-button size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <div class="dw-pagination">
          <el-pagination
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </dw-survey-dcs-wrapper>

    <el-dialog title="导出答卷数据" :visible.sync="dialogFormVisible" append-to-body width="40%"  >
      <div style="line-height: 30px;">是否同时下载上传题的文件</div>
      <div style="color: grey;line-height: 30px;font-size: 12px;"><span>如果有上传题，选择压缩下载可能比较占用系统资源及时间，请在空闲时间压缩下载</span></div>
      <el-switch
        v-model="expUpQu"
        active-text="同时压缩上传的文件并下载"
        inactive-text="仅下载数据Excel"
        active-value="1"
        inactive-value="0">
      </el-switch>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="executeExportData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import {dwSurveyAnswerList, dwSurveyAnswerDelete} from '@/api/dw-survey'
import API from '@/api/index'

export default {
  name: 'DwSurveyAnswer',
  components: {
    DwSurveyDcsWrapper
  },
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      expUpQu: 0
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    handleGo (to) {
      this.$router.push(to)
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$msgbox.confirm('确认删除此条答卷吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
        const data = {id: [row.id]}
        dwSurveyAnswerDelete(data).then((response) => {
          console.log(response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.$message.success('删除成功，即将刷新数据。')
            this.queryList(1)
          } else {
            this.$message.error('删除答卷失败')
          }
        })
      }).catch(() => {})
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    handleExport () {
      this.dialogFormVisible = true
    },
    executeExportData () {
      const downUrl = `${process.env.DW_API_URL}${API.surveyAnswerExport}?surveyId=${this.$route.params.id}&expUpQu=${this.expUpQu}`
      this.dialogFormVisible = false
      window.location.href = downUrl
    },
    queryList (pageNo) {
      dwSurveyAnswerList(this.pageSize, pageNo, this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.tableData = resultData
        this.total = response.data.total
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      })
    }
  }
}

</script>
<style scoped>
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
