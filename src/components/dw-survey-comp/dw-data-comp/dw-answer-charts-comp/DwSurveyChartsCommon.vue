<template>
  <div style="width: 100%;" >
    <div style="font-size: 16px;font-weight: bold;">
      <span>{{ index+1 }}、</span>
      <span v-html="question.quTitle" ></span>
      <span>【{{ question.quTypeName }}】</span>
    </div>
    <div v-if="question.quType === 'RADIO' || question.quType === 'CHECKBOX' || question.quType === 'SCORE' || question.quType === 'ORDERQU' || question.quType === 'MULTIFILLBLANK' || question.quType === 'MATRIX_SCALE' || question.quType === 'MATRIX_SLIDER'">
      <el-table
        :data="question.quStatOptions"
        style="width: 100%">
        <el-table-column
          prop="optionName"
          label="题目选项">
        </el-table-column>
        <el-table-column
          :label="question.quType === 'SCORE' || question.quType === 'MATRIX_SCALE' || question.quType === 'MATRIX_SLIDER' ? '占总分比例' : question.quType === 'ORDERQU' ? '排名占总名次比' : question.quType === 'MULTIFILLBLANK' ? '填写比例' : '频次比例'"
          width="330" >
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="parseFloat(scope.row.percent)" text-color="white"></el-progress>
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
          <template slot-scope="scope">{{ scope.row.anCount }} 分</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'ORDERQU'"
          label="名次平均值"
          width="130"
          align="center">
          <template slot-scope="scope">{{ scope.row.avgOrder }} 名</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'MULTIFILLBLANK'"
          label="填写次数"
          width="130"
          align="center">
          <template slot-scope="scope">{{ scope.row.anCount }} 次</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'MATRIX_SCALE' || question.quType === 'MATRIX_SLIDER'"
          label="平均分"
          width="130"
          align="center">
          <template slot-scope="scope"> {{ scope.row.anCount }} 分</template>
        </el-table-column>
        <el-table-column
          v-if="question.quType === 'MATRIX_RADIO' || question.quType === 'MATRIX_CHECKBOX'"
          label="频次"
          width="130"
          align="center">
          <template slot-scope="scope"> {{ scope.row.anCount }} 分</template>
        </el-table-column>
      </el-table>
      <div>
        <el-tabs v-model="activeName" style="width: 100%;" @tab-click="handleClick" >
          <el-tab-pane label="柱状图" name="bar">
            <div ref="dwsChart_bar" class="dwsurveyMain" style="width: 100%;height:400px;" ></div>
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
    <div v-else-if="question.quType === 'MATRIX_RADIO' || question.quType === 'MATRIX_CHECKBOX'">
      <div v-for="quRow in question.quRows" :key="`matrix_chart_${quRow.dwId}`" >
        <div>
          <div style="padding: 5px 0;">
            <div>
              <div style="font-weight: bold;padding: 5px;background: #eee;">{{ quRow.optionTitleObj.dwText }}</div>
            </div>
            <div style="padding: 0 5px;">
              <el-table
                :data="quRow.rowCols"
                style="width: 100%">
                <el-table-column
                  prop="dwText"
                  label="题目选项">
                </el-table-column>
                <el-table-column
                  :label="'频次比例'"
                  width="330" >
                  <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="26" :percentage="parseFloat(scope.row.percent)" text-color="white"></el-progress>
                  </template>
                </el-table-column>
                <el-table-column
                  label="频次"
                  width="130"
                  align="center">
                  <template slot-scope="scope">{{ scope.row.anCount }} 次</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeName" style="width: 100%;" @tab-click="handleClick" >
          <el-tab-pane label="柱状图" name="bar">
            <div ref="dwsChart_bar" class="dwsurveyMain" style="width: 100%;height:400px;" ></div>
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
    <div v-else style="padding: 30px;">
      填写回答：{{ question.anCount }} 份
    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts/core'
import {GridComponent, TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components'
import {LineChart, BarChart, PieChart} from 'echarts/charts'
import {UniversalTransition, LabelLayout} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'
import {echartsThemeConfig} from "../../../../utils/dw-theme/echarts-theme";

echarts.use([GridComponent, LineChart, BarChart, CanvasRenderer, UniversalTransition, TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout])

export default {
  name: 'DwSurveyChartsCommon',
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
    /*
    const questionObj = document.getElementById(this.question.id)
    const dwsurveyMains = questionObj.getElementsByClassName('dwsurveyMain')
    this.loadChart(dwsurveyMains[0], 'bar')
    */
    const dwsurveyMain = this.$refs.dwsChart_bar
    if (dwsurveyMain) {
      echarts.registerTheme('dw-echarts-theme', echartsThemeConfig)
      this.loadChart(dwsurveyMain, 'bar')
    }
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
      // const myChart = echarts.init(chartDom)
      const myChart = echarts.init(chartDom, 'dw-echarts-theme')
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

<style scoped>

</style>
