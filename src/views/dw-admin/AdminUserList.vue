<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-table-form" style="padding-left: 60px;">
          <el-form :inline="true" :model="formInline" class="dw-form-inline" size="medium" >
            <el-form-item label="登录账号">
              <el-input v-model="formInline.loginName" placeholder="请输入查询的账号关键字" clearable ></el-input>
            </el-form-item>
            <el-form-item label="账号状态" style="margin-left: 40px;">
              <el-select v-model="formInline.status" placeholder="请选择账号状态" clearable >
                <el-option label="不可用" value="0"></el-option>
                <el-option label="未激活" value="1"></el-option>
                <el-option label="激活" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 40px;">
              <el-button @click="onSubmit">重置</el-button>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dw-table">
          <div class="dw-table-title">
            <el-row :span="24" type="flex" justify="space-between" align="middle">
              <el-col :span="4"><h3>用户管理</h3></el-col>
              <el-col :span="20" style="text-align: right;">
                <el-button v-has-dw-role="'DWSURVEY_SUPER_ADMIN'" type="primary" size="medium" @click="openCreateUser()">添加用户</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="登录名" >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p v-html="scope.row.loginName" ></p>
                  <div slot="reference" class="name-wrapper">
                    <div v-html="scope.row.loginName"></div>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" type="danger" >不可用</el-tag>
                <el-tag v-else-if="scope.row.status === 1" type="info" >未激活</el-tag>
                <el-tag v-else-if="scope.row.status === 2" type="success" >激活</el-tag>
                <el-tag v-else disable-transitions style="margin-left: 10px" >未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="登录时间" width="180" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.lastLoginTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip effect="dark" content="编辑问卷" placement="top">
                    <el-button size="mini" content="编辑" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除问卷" placement="top">
                    <el-button size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" ></el-button>
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
        <el-form ref="userForm" :model="userForm" :rules="userFormRules" status-icon label-position="top">
          <el-form-item :label-width="formLabelWidth" label="设置账号" prop="loginName" style="margin-top: 0px;">
            <el-input v-model="userForm.loginName" autocomplete="off" placeholder="请设置登录账号" show-word-limit ></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="账号状态" prop="status" class="dw-dialog-form-item">
            <el-radio-group v-model="userForm.status">
              <el-radio :label="0">不可用</el-radio>
              <el-radio :label="1">未激活</el-radio>
              <el-radio :label="2">激活</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="设置密码" prop="pwd" class="dw-dialog-form-item" >
            <el-input v-model="userForm.pwd" autocomplete="off" placeholder="新建时必须设置密码，修改时不设置代表不修改。" show-password ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveUser()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import {dwAdminUserList, dwUserCreate, dwUserDelete, dwUserUpdate} from '../../api/admin/admin-user'

export default {
  name: 'AdminUserList',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      formInline: {
        loginName: null,
        status: null
      },
      dialogTitle: '创建用户',
      dialogFormVisible: false,
      userForm: {
        id: null,
        loginName: '',
        pwd: '',
        status: 2
      },
      userFormRules: {
        loginName: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择账号状态', trigger: 'change'}
        ]
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
    onSubmit () {
      console.log('submit!')
      this.queryList(1)
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    openCreateUser () {
      this.dialogTitle = '创建用户'
      this.dialogFormVisible = true
      this.userFormRules.pwd = [
        {required: true, message: '请输入登录密码', trigger: 'blur'},
        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
      ]
      this.userForm.id=null
    },
    queryList (pageNo) {
      const {status, loginName} = this.formInline
      dwAdminUserList(this.pageSize, pageNo, status, loginName).then((response) => {
        const resultData = response.data.data
        this.tableData = resultData
        this.total = response.data.total
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      })
    },
    handleEdit (index, row) {
      this.dialogTitle = `编辑用户`
      this.dialogFormVisible = true
      this.userFormRules.pwd = {required: false}
      this.userForm.loginName = row.loginName
      this.userForm.status = row.status
      this.userForm.id = row.id
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$msgbox.confirm('确认删除此用户吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
        const data = {id: [row.id]}
        dwUserDelete(data).then((response) => {
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.$message.success('删除成功，即将刷新数据。')
            this.queryList(1)
          } else {
            this.$message.error('添加用户失败')
          }
        })
      }).catch(() => {})
    },
    handleSaveUser () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          const {id, loginName, pwd, status} = this.userForm
          if (id === null) {
            const data = {loginName, pwd, status}
            dwUserCreate(data).then((response) => {
              const httpResult = response.data
              if (httpResult.resultCode === 200) {
                this.$message.success('添加成功，即将刷新数据。')
                this.queryList(1)
                this.dialogFormVisible = false
              } else {
                this.$message.error('添加用户失败')
              }
            })
          } else {
            const data = {id, loginName, pwd, status}
            dwUserUpdate(data).then((response) => {
              const httpResult = response.data
              if (httpResult.resultCode === 200) {
                this.$message.success('修改成功，即将刷新数据。')
                this.queryList(1)
                this.dialogFormVisible = false
              } else {
                this.$message.error('添加用户失败')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
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
.dw-dialog-form-item{
  margin-top: 20px;
}
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
