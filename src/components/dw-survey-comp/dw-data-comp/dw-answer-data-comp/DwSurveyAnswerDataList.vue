<template>
  <div>
    <div class="dw-dcs-main-title">
      <div style="padding: 5px 10px;">
        <el-row type="flex">
          <el-col :span="18"><div style="font-size: 14px;"><strong>原始数据列表</strong></div></el-col>
          <el-col :span="6" style="text-align: right;padding-right: 16px;" ><el-button type="primary" size="small" @click="handleExport" >导出数据</el-button></el-col>
        </el-row>
      </div>
      <div style="padding: 5px 10px;">
        <el-form :inline="true" :model="formInline" label-width="50px" class="dw-form-inline" size="medium" >
          <el-form-item label="时间" >
            <el-date-picker
              v-model="formInline.anTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="IP" >
            <el-input v-model="formInline.ip" placeholder="请输入查询的问卷标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="城市" >
            <el-input v-model="formInline.city" placeholder="请输入查询的问卷标题" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 20px;" @click="resetSearch">重置</el-button>
            <el-button type="primary" @click="queryList(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column label="序号" width="65" >
        <template slot-scope="scope">
          <div>{{ pageSize*(currentPage-1)+scope.$index+1 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="答卷IP" prop="anIp.ip"></el-table-column>
      <el-table-column label="答卷地区" prop="anIp.city">
        <template slot-scope="scope">
          <div>{{ scope.row.anIp.city }}</div>
        </template>
      </el-table-column>
      <el-table-column label="回答时间" >
        <template slot-scope="scope">
          <div>{{ scope.row.anTime.endAnDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="回答的题数" >
        <template slot-scope="scope">
          <div>{{ scope.row.anState.anQuNum!=null ? scope.row.anState.anQuNum:0 }}&nbsp;题</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" >
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip effect="dark" content="查看数据" placement="top">
              <el-button size="mini" icon="el-icon-view" @click="handleGo(`/v6/diaowen/answer/survey/review/${scope.row.surveyId}/${scope.row.esId}`)"></el-button>
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
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" append-to-body title="导出答卷数据" width="40%" >
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
import {dwSurveyAnswerDelete} from '../../../../api/dw-survey'
import {dwSurveyAnswerListV6} from "../api/dw-survey-answer-data";

export default {
  name: 'DwSurveyAnswerDataList',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      expUpQu: 0,
      formInline: {
        ip: null,
        city: null,
        anTime: null
      }
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
      this.currentPage = pageNo
      const maxTotal = 10000
      if ((pageNo-1)*this.pageSize>=maxTotal) {
        this.$message({
          message: '提示：一次查询只展示前1万条数据，如果要查看更多可以修改查询条件，请缩小查询范围！',
          type: 'warning',
          duration: 10000
        })
        this.currentPage = (maxTotal/this.pageSize)-1
      }
      // this.pageSize, pageNo, this.$route.params.id
      console.debug('anTime:', this.formInline.anTime)
      console.debug('anIp:', this.formInline.ip)
      console.debug('anCity:', this.formInline.city)
      const anTime = {bgAnDate: null, endAnDate: null}
      const formAnTime = this.formInline.anTime
      if (formAnTime !== null) {
        // "yyyy-MM-dd HH:mm:ss"
        anTime.bgAnDate = formAnTime[0]
        anTime.endAnDate = formAnTime[1]
      }
      const params = {surveyId: this.$route.params.id, pageNo: this.currentPage, bgAnDate: anTime.bgAnDate, endAnDate: anTime.endAnDate, ip: this.formInline.ip, city: this.formInline.city}
      dwSurveyAnswerListV6(params).then((response) => {
        const page = response.data
        this.pageSize = page.pageSize
        this.currentPage = page.pageNo
        this.total = page.totalItems
        this.tableData = page.result
        console.debug('dwSurveyAnswerListV6', response)
      })
    },
    resetSearch () {
      this.formInline = {ip: null, city: null, anTime: null}
      this.queryList(1)
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
