<template>
  <div>
    <dw-survey-dcs-wrapper :id="id" is-answer-data="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div class="dw-dcs-main-title">
          <el-row type="flex">
            <el-col :span="18"><div style="font-size: 14px;padding: 10px;"><strong>原始数据列表</strong></div></el-col>
            <el-col :span="6" style="text-align: right;padding-right: 16px;" ><el-button type="primary" size="small" >导出数据</el-button></el-col>
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
  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import {dwSurveyAnswerList} from '@/api/dw-survey'

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
      total: 0
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
    },
    handleCurrentChange (val) {
      this.queryList(val)
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
