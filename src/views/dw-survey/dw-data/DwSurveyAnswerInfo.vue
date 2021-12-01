<template>
  <div>
    <el-page-header @back="goBack" content="答卷详情" class="dw-page-header" ></el-page-header>
    <div class="dw-answer-content">
      <el-row type="flex" class="row-bg">
        <el-col :span="16" :push="4">
          <div style="background: white;">
            <el-descriptions :column="3" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-information"></i> 答卷IP
                </template>
                {{survey.surveyAnswer.ipAddr}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-timer"></i>
                  答卷时间
                </template>
                {{survey.surveyAnswer.endAnDate}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-monitor"></i>
                  答题数
                </template>
                {{survey.surveyAnswer.completeItemNum}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-price-tag"></i> 答卷ID
                </template>
                {{survey.surveyAnswer.id}}
              </el-descriptions-item>
            </el-descriptions>
            <div class="dw-answer-title" style="padding-top: 30px;padding-bottom: 0px;">答卷结果信息</div>
            <div style="padding: 0px 20px 30px 20px;">
              <dw-survey-answer-qu-common v-bind:key="item.id" v-bind:id="item.id" v-bind:index="index" v-for="(item,index) in survey.questions" v-bind:question="item" ></dw-survey-answer-qu-common>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import API from '@/api/index.js'
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import DwSurveyAnswerQuCommon from './DwSurveyAnswerQuCommon'
import {dwSurveyAnswerInfo} from '@/api/dw-survey'

export default {
  name: 'DwSurveyAnswerInfo',
  components: {
    DwSurveyDcsWrapper,
    DwSurveyAnswerQuCommon
  },
  data () {
    return {
      survey: {
        questions:[],
      },
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      radio: 3,
      formSize: 'medium',
      rateValue: 3.7,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted () {
    this.querySurveyAnswer(1)
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    handleInfo (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    querySurveyAnswer () {
      // pageSize?: number;
      // currentPage?: number;
      dwSurveyAnswerInfo(this.$route.params.answerId).then((response) => {
        const resultData = response.data.data
        this.survey = resultData
        for (let i=0; i < this.survey.questions.length; i++) {
          const questionData = this.survey.questions[i]
          const quType = questionData.quType
          var quOptionsObj
          if (quType==="CHECKBOX") {
            questionData.quTypeName = '多选题'
            quOptionsObj = questionData.quCheckboxs
          } else if (quType==="RADIO") {
            questionData.quTypeName = '单选题'
            quOptionsObj = questionData.quRadios
          } else if (quType==="FILLBLANK") {
            questionData.quTypeName = '填空题'
          } else if (quType==="SCORE") {
            questionData.quTypeName = '评分题'
            quOptionsObj = questionData.quScores
          } else if (quType==="ORDERQU") {
            questionData.quTypeName = '排序题'
            quOptionsObj = questionData.quOrderbys
          } else if (quType==="MULTIFILLBLANK") {
            questionData.quTypeName = '多项填空题'
            quOptionsObj = questionData.quMultiFillblanks
          } else {
            questionData.quTypeName = quType
          }
          if (quType==="CHECKBOX" || quType==="SCORE" || quType==="ORDERQU" || quType==="MULTIFILLBLANK") {
            for(let j=0; j < quOptionsObj.length; j++){
              const item = quOptionsObj[j]
              if (quType==="CHECKBOX") {
                const anCheckboxs = questionData.anCheckboxs;
                for (let k=0; k<anCheckboxs.length; k++){
                  if(anCheckboxs[k].quItemId===item.id){
                    item.answer = true
                    break
                  }
                }
              }else if (quType==="SCORE") {
                const anScores = questionData.anScores;
                for (let k=0; k<anScores.length; k++){
                  if(anScores[k].quRowId===item.id){
                    if(anScores[k].answserScore!=null){
                      item.answer = parseInt(anScores[k].answserScore)
                      break
                    }
                  }
                }
              }else if (quType==="ORDERQU") {
                const anOrders = questionData.anOrders;
                for (let k=0; k<anOrders.length; k++){
                  if(anOrders[k].quRowId===item.id){
                    item.answer = anOrders[k].orderyNum
                    break
                  }
                }
              }else if (quType==="MULTIFILLBLANK") {
                const anDFillblanks = questionData.anDFillblanks
                for (let k=0; k<anDFillblanks.length; k++){
                  if(anDFillblanks[k].quItemId===item.id){
                    item.answer = anDFillblanks[k].answer
                    break
                  }
                }
              }
            }
          }
        }

      })
    },
    handleCurrentChange: function (val) {

    }
  }
}

</script>
<style scoped>
.dw-page-header{
  padding: 20px;
  background-color: white;
}
.dw-answer-title{
  font-size: 16px;
  padding: 10px;
}
.dw-answer-content{
  padding: 20px;
}
.margin-top{
  margin-top: 20px;
}
.dw-qu-item{
  margin-top: 10px;
}
.dw-qu-item-title{
  padding: 20px 0px;
  color: grey;
}
.dw-qu-item-body{
  margin-left: 10px;
}
</style>
