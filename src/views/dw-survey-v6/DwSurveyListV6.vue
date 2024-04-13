<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-table-form" style="padding-left: 60px;">
          <el-form :inline="true" :model="formInline" class="dw-form-inline" size="medium" >
            <el-form-item label="问卷标题">
              <el-input v-model="formInline.surveyName" placeholder="请输入查询的问卷标题" clearable></el-input>
            </el-form-item>
            <el-form-item label="问卷状态" style="margin-left: 40px;">
              <el-select v-model="formInline.surveyState" placeholder="请选择问卷状态" clearable>
                <el-option label="设计中" value="0"></el-option>
                <el-option label="收集中" value="1"></el-option>
                <el-option label="收集结束" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 40px;">
              <el-button @click="onReset">重置</el-button>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dw-table">
          <div class="dw-table-title">
            <el-row :span="24" type="flex" justify="space-between" align="middle">
              <el-col :span="4"><h3>我的问卷</h3></el-col>
              <el-col :span="20" style="text-align: right;">
                <el-button type="primary" size="medium" @click="form.id=null;form.name=null;dialogTitle = '创建问卷';dialogFormVisible = true" >新建问卷</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="问卷" >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p v-html="scope.row.surveyName" ></p>
                  <div slot="reference" class="name-wrapper">
                    <div v-if="scope.row.surveyNameText != null" v-text="scope.row.surveyNameText"></div>
                    <div v-else v-html="scope.row.surveyName"></div>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="答卷数" width="80" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.answerNum!=null ? scope.row.answerNum:0 }}&nbsp;份</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.surveyState === 0" >设计中</el-tag>
                <el-tag v-else-if="scope.row.surveyState === 1" type="success" >收集中</el-tag>
                <el-tag v-else-if="scope.row.surveyState === 2" type="info" >收集结束</el-tag>
                <el-tag v-else disable-transitions style="margin-left: 10px" >未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip effect="dark" content="编辑问卷" placement="top">
                    <el-button size="mini" content="编辑问卷" icon="el-icon-edit" @click="handlePush(`/dw-v6/diaowen/dw-design/survey/${scope.row.id}`)" ></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="答卷地址" placement="top">
                    <el-button size="mini" icon="el-icon-share" @click="handlePush(`/v6/dw/survey/c/url/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="答卷数据" placement="top">
                    <el-button size="mini" icon="el-icon-s-data" @click="handlePush(`/v6/dw/survey/d/chart/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="预览问卷" placement="top">
                    <el-button size="mini" icon="el-icon-view" @click="handlePush(`/dw-v6/diaowen/dw-preview/survey/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <!--                  <el-tooltip effect="dark" content="复制问卷" placement="top">
                    <el-button size="mini" icon="el-icon-copy-document" @click="handleCopy(scope.$index, scope.row)"></el-button>
                  </el-tooltip>-->
                  <el-tooltip effect="dark" content="删除问卷" placement="top">
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
        </div>
      </el-col>
    </el-row>

    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" append-to-body width="40%" >
        <el-form :model="form" label-position="top">
          <el-form-item :label-width="formLabelWidth" label="问卷标题" >
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入问卷标题" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import {dwSurveyCreate, dwSurveyList} from '@/api/dw-survey'
import {dwSurveyCopy, dwSurveyDelete} from '../../api/dw-survey'

export default {
  name: 'DwSurveyListV6',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogTitle: '创建问卷',
      formInline: {
        surveyName: null,
        surveyState: null
      },
      dialogFormVisible: false,
      form: {
        name: '',
        id: null,
        surveyType: null
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    buttonClickA (href) {
      window.location.href = href
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleCopy (index, row) {
      console.log(index, row)
      this.form.id = row.id
      if (row.surveyNameText !== undefined && row.surveyNameText !== null) {
        this.form.name = `${row.surveyNameText}`
      } else {
        this.form.name = `复制问卷标题`
      }
      this.dialogFormVisible = true
      this.dialogTitle = '复制问卷'
    },
    handleDelete (index, row) {
      this.$msgbox.confirm('确认删除此问卷吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
        const data = {id: [row.id]}
        dwSurveyDelete(data).then((response) => {
          console.log(response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.$message.success('删除成功，即将刷新数据。')
            this.queryList(1)
          } else {
            this.$message.error('删除问卷失败')
          }
        })
      }).catch(() => {})
    },
    onReset () {
      this.formInline = {surveyName: null, surveyState: null}
      this.queryList(1)
    },
    onSubmit () {
      console.log('submit!')
      this.queryList(1)
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    queryList (pageNo) {
      const {surveyName, surveyState} = this.formInline
      dwSurveyList(this.pageSize, pageNo, surveyName, surveyState).then((response) => {
        const resultData = response.data.data
        this.tableData = resultData
        this.total = response.data.total
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      })
    },
    handleDialogConfirm () {
      if (this.form.id === null) {
        this.createSurvey()
      } else {
        this.copySurvey(this.form.id)
      }
    },
    createSurvey () {
      const data = {surveyName: this.form.name, surveyType: this.form.surveyType}
      dwSurveyCreate(data).then((response) => {
        const httpResult = response.data
        const resultData = httpResult.data
        if (httpResult.resultCode === 200) {
          this.dialogFormVisible = false
          this.$confirm('问卷创建成功，点击“继续编辑问卷”进入问卷编辑。', '系统提示', {confirmButtonText: '继续编辑问卷'}).then(({value}) => {
            // window.location.href=`/static/diaowen/design.html?surveyId=${resultData.id}`
            this.$router.push(`/dw-v6/diaowen/dw-design/survey/${resultData.id}`)
          }).catch(() => {
            this.queryList(1)
          })
        } else {
          this.$message.error('创建问卷失败')
        }
      })
    },
    copySurvey (surveyId) {
      dwSurveyCopy(surveyId, this.form.name).then((response) => {
        const httpResult = response.data
        const resultData = httpResult.data
        if (httpResult.resultCode === 200) {
          this.dialogFormVisible = false
          this.$confirm('问卷复制成功，点击“继续编辑问卷”进入问卷编辑。', '系统提示', {confirmButtonText: '继续编辑问卷'}).then(({value}) => {
            // window.location.href=`/static/diaowen/design.html?surveyId=${resultData.id}`
            this.$router.push(`/dw-v6/diaowen/dw-design/survey/${resultData.id}`)
          }).catch(() => {
            this.queryList(1)
          })
        } else {
          this.$message.error('问卷复制失败')
        }
      })
    }
  }
}
</script>
<style scoped>
.dw-table-form{
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.dw-table{
  background: white;
  padding: 20px;
}
.dw-table .dw-table-title{
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.dw-table .dw-table-title h3{
  padding: 0px;
  margin: 0px;
}
.el-form-item{
  margin-bottom: 0px;
}
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
