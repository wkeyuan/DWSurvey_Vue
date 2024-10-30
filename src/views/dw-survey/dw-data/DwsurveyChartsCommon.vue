<template>
  <div style="width: 100%;" >
    <div style="font-size: 16px;font-weight: bold;">
      <span>{{ index+1 }}、</span>
      <span v-html="question.quTitle" ></span>
      <span>【{{ question.quTypeName }}】</span>
    </div>
    <div v-if="question.quType === 'FILLBLANK' || question.quType === 'UPLOADFILE'" style="padding: 30px;">
      填写回答：{{ question.anCount }} 份
    </div>
    <div v-if="question.quType !== 'FILLBLANK' && question.quType !== 'UPLOADFILE'">
      <el-table
        :data="question.quStatOptions"
        style="width: 100%">
        <el-table-column
          prop="optionName"
          label="题目选项">
        </el-table-column>
        <el-table-column
          :label="question.quType === 'SCORE' ? '占总分比例' : question.quType === 'ORDERQU' ? '排名比例' : question.quType === 'MULTIFILLBLANK' ? '填写比例' : '频次比例'"
          width="330" >
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'RADIO' || question.quType === 'CHECKBOX' "
          label="频次"
          width="130"
          align="center">
          <template slot-scope="scope">{{ scope.row.anCount }} 次</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'SCORE'"
          label="平均分"
          width="130"
          align="center">
          <template slot-scope="scope">平均 {{ scope.row.anCount }} 分</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'ORDERQU'"
          label="排名"
          width="130"
          align="center">
          <template slot-scope="scope">第 {{ scope.row.orderNum }} 名</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'MULTIFILLBLANK'"
          label="填写次数"
          width="130"
          align="center">
          <template slot-scope="scope">{{ scope.row.anCount }} 次</template>
        </el-table-column>
      </el-table>
      <div>
        <el-tabs v-model="activeName" style="width: 100%;" @tab-click="handleClick" >
          <el-tab-pane label="柱状图" name="bar">
            <div class="dwsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
          <el-tab-pane label="拆线图" name="line">
            <div class="dwsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
          <el-tab-pane label="拼状图" name="pie">
            <div class="dwsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
          <el-tab-pane label="条形图" name="barY">
            <div class="dwsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts/core'
import {GridComponent, TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components'
import {LineChart, BarChart, PieChart} from 'echarts/charts'
import {UniversalTransition, LabelLayout} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'

echarts.use([GridComponent, LineChart, BarChart, CanvasRenderer, UniversalTransition, TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout])

export default {
  name: 'DwsurveyChartsCommon',
  props: {
    question: {
      type: Object,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      activeName: 'bar'
    }
  },
  mounted () {
    console.debug('this.question')
    console.debug(this.question)
    // document.getElementsByClassName('dwsurveyMainBar')
    // this.loadChart('dwsurveyMainBar', 'bar')
    const questionObj = document.getElementById(this.question.id)
    const dwsurveyMains = questionObj.getElementsByClassName('dwsurveyMain')
    this.loadChart(dwsurveyMains[0], 'bar')
  },
  methods: {
    handleClick: function (tab, event) {
      console.log(tab, event)
      console.debug(this.activeName)
      tab.$el.style.display = 'block'
      const dwsurveyMain = tab.$el.getElementsByClassName('dwsurveyMain')
      const curChartType = this.activeName
      // 构建option data, xAxisData
      this.loadChart(dwsurveyMain[0], curChartType)
    },
    loadChart: function (chartDom, type) {
      const myChart = echarts.init(chartDom)
      const option = this.buildOption(this.question, type)
      option && myChart.setOption(option)
    },
    buildOption: function (questionData, type) {
      const items = []
      const itemValues = []
      const itemNameValues = []
      const quStatOptions = questionData.quStatOptions
      for (let i=0; i< quStatOptions.length; i++) {
        items.push(quStatOptions[i].optionName)
        itemValues.push(quStatOptions[i].anCount)
        itemNameValues.push({'value': quStatOptions[i].anCount, 'name': quStatOptions[i].optionName})
      }
      console.debug(items)
      let yAxisShow = true
      if (questionData.quType === 'ORDERQU') {
        yAxisShow = false
      }
      let option
      if (type === 'line' || type === 'bar') {
        option = {
          xAxis: {
            nameTextStyle: {

            },
            nameGap: 20,
            axisLabel: {
              rotate: -10,
              interval: 0
            },
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data: items
          },
          yAxis: {
            type: 'value',
            show: yAxisShow
          },
          series: [
            {
              // data: [150, 230, 224, 218, 135, 147, 260],
              data: itemValues,
              type: type
            }
          ]
        }
      } else if (type === 'barY') {
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            show: yAxisShow
          },
          yAxis: {
            type: 'category',
            // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
            data: items
          },
          series: [
            {
              type: 'bar',
              // data: [18203, 23489, 29034, 104970, 131744, 630230]
              data: itemValues
            }
          ]
        }
      } else if (type === 'pie') {
        option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: itemNameValues,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
      return option
    }
  }
}

</script>
