<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" label-position="left" >
      <div class="dw-qu-item">
        <div class="dw-qu-item-title">
          <span>{{ index + 1 }}、</span>
          <span v-html="question.quTitle" ></span>
          <span>【{{ question.quTypeName }}】</span>
        </div>
        <div class="dw-qu-item-body">
          <div v-if="question.quType === 'RADIO'">
            <div>
              <el-radio-group v-model="question.anRadio.quItemId" >
                <el-radio v-for="(item) in question.quRadios" :key="item.id" :label="item.id" >{{ item.optionName }}</el-radio>
              </el-radio-group>
            </div>
            <div><span>{{ question.anRadio.otherText }}</span></div>
          </div>
          <div v-if="question.quType === 'CHECKBOX'">
            <el-checkbox v-for="(item) in question.quCheckboxs" :key="item.id" :label="item.id" :checked="item.answer" >{{ item.optionName }}</el-checkbox>
          </div>
          <div v-if="question.quType === 'FILLBLANK'">
            <el-row><el-col :span="12"><el-input v-model="question.anFillblank.answer" readonly ></el-input></el-col></el-row>
          </div>
          <div v-if="question.quType === 'MULTIFILLBLANK'">
            <el-form-item v-for="(item,index) in question.quMultiFillblanks" :label="(index+1)+'、'+item.optionName" :key="item.id" >
              <el-input v-model="item.answer" style="width: 360px;" ></el-input>
            </el-form-item>
          </div>
          <div v-if="question.quType === 'SCORE'">
            <el-form-item v-for="(item,index) in question.quScores" :label="(index+1)+'、'+item.optionName" :key="item.id" >
              <el-rate v-model="item.answer" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-form-item>
          </div>
          <div v-if="question.quType === 'ORDERQU'">
            <el-form-item v-for="(item,index) in question.quOrderbys" :label="(index+1)+'、'+item.optionName" :key="item.id" >
              <el-input v-model="item.answer" style="width: 360px;" ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'DwSurveyAnswerInfo',
  props: ['question', 'index'],
  data () {
    return {
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
    handleCurrentChange: function (val) {
      this.queryList(val)
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
