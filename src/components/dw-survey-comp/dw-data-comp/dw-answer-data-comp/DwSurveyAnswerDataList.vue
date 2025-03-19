<template>
  <div v-if="survey!==null">
    <div class="dw-dcs-main-title" >
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
              type="datetimerange"
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
      <el-table-column label="答卷IP" prop="answerCommon.anIp.ip"></el-table-column>
      <el-table-column label="答卷地区" prop="answerCommon.anIp.city">
        <template slot-scope="scope">
          <div>{{ scope.row.answerCommon.anIp.city!=null ? scope.row.answerCommon.anIp.city: '-' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="回答时间" >
        <template slot-scope="scope">
          <div>{{ scope.row.answerCommon.anTime.endAnDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="回答用时" >
        <template slot-scope="scope">
          <div>{{ scope.row.answerCommon.anTime.totalTime!=null ? secondsToHms(Math.floor(scope.row.answerCommon.anTime.totalTime/1000)):0 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="回答题数" >
        <template slot-scope="scope">
          <div>{{ scope.row.answerCommon.anState.anQuNum!=null ? scope.row.answerCommon.anState.anQuNum:0 }}&nbsp;题</div>
        </template>
      </el-table-column>
      <el-table-column v-if="survey!==null && ((survey.hasOwnProperty('surveyType') && survey.surveyType === 'exam') || (survey.hasOwnProperty('surveyAttrs') && survey.surveyAttrs.scoreAttr.enabled))" label="分数" >
        <template slot-scope="scope">
          <div>{{ scope.row.answerCommon.sumScore!=null ? scope.row.answerCommon.sumScore:0 }}&nbsp;分</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" >
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip effect="dark" content="查看数据" placement="top">
              <el-button size="mini" icon="el-icon-view" @click="answerView(scope.row)"></el-button>
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
      <span v-if="total>10000" style="font-size: 10px;color: grey;"> 仅显示前1万条数据，更多可以通过改变查询条件或导出 </span>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" append-to-body title="导出答卷数据" width="40%" >
      <div style="line-height: 30px;">是否同时下载上传题的文件</div>
      <div style="color: grey;line-height: 30px;font-size: 12px;"><span>如果有上传题，选择压缩下载可能比较占用系统资源及时间，请在空闲时间压缩下载</span></div>
      <div style="padding: 10px;" >
        <el-switch
          v-model="expUpQu"
          active-text="同时压缩上传的文件并下载"
          inactive-text="仅下载数据Excel"
          active-value="1"
          inactive-value="0">
        </el-switch>
      </div>
      <div style="padding: 10px;">
        数据类型
        <el-select v-model="handleState" placeholder="请选择" style="width: 300px;">
          <el-option :value="0" label="未审核" ></el-option>
          <el-option :value="1" label="审核的数据" ></el-option>
          <el-option :value="300" label="甄别的数据" ></el-option>
          <el-option :value="100" label="全部有效数据（包含未审核与审核）" ></el-option>
        </el-select>
      </div>
      <div style="padding: 10px;">
        单个线程最多导出
        <el-select v-model="threadMax" placeholder="请选择" style="width: 300px;">
              <el-option :value="500" label="500条" ></el-option>
              <el-option :value="1000" label="1000条" ></el-option>
              <el-option :value="2000" label="2000条" ></el-option>
              <el-option :value="4000" label="4000条" ></el-option>
<!--          <el-option :value="6000" label="6000条" ></el-option>-->
<!--          <el-option :value="8000" label="8000条" ></el-option>-->
<!--          <el-option :value="10000" label="10000条" ></el-option>-->
        </el-select>
      </div>
      <div style="padding: 10px;">
        导出的数据
        <el-select v-model="expDataContent" placeholder="请选择" style="width: 300px;">
          <el-option :value="1" label="原始答卷数据" ></el-option>
          <el-option :value="2" label="答卷选项分值" ></el-option>
        </el-select>
      </div>
      <div style="padding: 10px;">
        <el-progress :percentage="percentage" :color="customColor" :text-inside="true" :stroke-width="26" ></el-progress>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExportData">取 消</el-button>
        <el-button :disabled="isProgress" type="primary" @click="executeExportData">开始导出</el-button>
        <el-button :disabled="percentage<100" type="primary" @click="downloadExportData">下载数据</el-button>
      </div>
    </el-dialog>
    <dw-survey-answer-info-dialog ref="dwAnswerInfoDialog" @refresh-data="queryList(null)" ></dw-survey-answer-info-dialog>
  </div>
</template>

<script>
import {dwSurveyAnswerDeleteByEs} from '../../../../api/dw-survey'
import {
  dwSurveyAnswerExportLogInfo,
  dwSurveyAnswerExportSync,
  dwSurveyAnswerListV6
} from '../api/dw-survey-answer-data'
import DwSurveyAnswerInfoDialog from './components/DwSurveyAnswerInfoDialog.vue'
import {secondsToHms} from '../../dw-utils/dw-common/dw-common-1'

export default {
  name: 'DwSurveyAnswerDataList',
  components: {DwSurveyAnswerInfoDialog},
  props: {
    survey: {type: Object, default: () => {}}
  },
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
        anTime: null,
        handleState: 100
      },
      handleState: 100,
      threadMax: 2000,
      expDataContent: 1,
      formInlineDivStyle: 'display: flex;',
      isProgress: false,
      percentage: 0,
      customColor: '#1989fa',
      customColors: [
        {color: '#cde2f6', percentage: 0},
        {color: '#c1dbf5', percentage: 10},
        {color: '#a7cdf3', percentage: 20},
        {color: '#8bbff3', percentage: 40},
        {color: '#6eb2f6', percentage: 60},
        {color: '#4ca2fa', percentage: 80},
        {color: '#1989fa', percentage: 100}
      ],
      exportLogId: null,
      exportLogInfoInterval: null
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    secondsToHms,
    handleGo (to) {
      this.$router.push(to)
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$msgbox.confirm('确认删除此条答卷吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
        const data = {id: [row.answerCommon.answerId], esId: [row.esId]}
        console.debug('data', data)
        dwSurveyAnswerDeleteByEs(data).then((response) => {
          console.log(response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.$message.success('删除成功，即将刷新数据。')
            const _that = this
            setTimeout(function () {
              _that.queryList(1)
            }, 2000)
          } else {
            this.$message.error('删除答卷失败')
          }
        })
      }).catch(() => {})
    },
    handleCurrentChange (val) {
      this.queryList(val)
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
      const params = {surveyId: this.$route.params.dwSurveyId, pageNo: this.currentPage, bgAnDate: anTime.bgAnDate, endAnDate: anTime.endAnDate, ip: this.formInline.ip, city: this.formInline.city}
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
    },
    answerView (row) {
      this.$refs.dwAnswerInfoDialog.openDialog(row)
    },
    handleExport () {
      this.dialogFormVisible = true
      this.percentage = 0
      this.exportLogId = null
      this.isProgress = false
    },
    executeExportData () {
      this.isProgress = true
      const params = {surveyId: this.$route.params.dwSurveyId, expUpQu: this.expUpQu, handleState: this.handleState, threadMax: this.threadMax, expDataContent: this.expDataContent}
      dwSurveyAnswerExportSync(params).then((response) => {
        console.log('dwSurveyAnswerExportSync', response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          var resultData = httpResult.data
          this.exportLogId = resultData.id
          console.log('this.exportLogId', this.exportLogId)
          this.percentage = 0
          this.exportProgress()
        } else {
          this.$message.error(`导出出错${httpResult.resultMsg}`)
        }
      })
    },
    exportProgress () {
      if (this.exportLogId !== null) {
        this.exportLogInfoInterval = setInterval(this.upExportProgress, 500)
      }
    },
    upExportProgress () {
      const params = {id: this.exportLogId}
      dwSurveyAnswerExportLogInfo(params).then((response) => {
        // 更新进度信息
        console.log('dwSurveyAnswerExportLogInfo', response)
        const httpResult = response.data
        let isClear = true
        if (httpResult.resultCode === 200) {
          var resultData = httpResult.data
          if (resultData !== null) {
            console.log('progress', resultData.progress)
            // const progress = parseInt(parseFloat(resultData.progress) * 100+'')
            const progress = (parseFloat(resultData.progress) * 100).toFixed(2)
            console.log('this progress', progress)
            this.percentage = parseInt(progress)
            if (progress <= 1) this.percentage = 1
            console.log('this percentage', this.percentage)
            isClear = false
            if (progress >= 100) {
              this.percentage = 100
              isClear = true
            }
          }
        }
        if (isClear) {
          clearInterval(this.exportLogInfoInterval)
        }
      })
    },
    downloadExportData () {
      const surveyAnswerExportDownload = `/api/dwsurvey/app/v6/answer/export-log/download-answer-xls.do`
      const downUrl = `${process.env.DW_API_URL}${surveyAnswerExportDownload}?surveyId=${this.$route.params.dwSurveyId}&exportLogId=${this.exportLogId}`
      console.log('downUrl', downUrl)
      window.location.href = downUrl
    },
    cancelExportData () {
      if (this.exportLogId !== null && this.exportLogInfoInterval !== null) {
        clearInterval(this.exportLogInfoInterval)
        this.percentage = 0
        this.exportLogId = null
        this.isProgress = false
      }
      this.dialogFormVisible = false
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
