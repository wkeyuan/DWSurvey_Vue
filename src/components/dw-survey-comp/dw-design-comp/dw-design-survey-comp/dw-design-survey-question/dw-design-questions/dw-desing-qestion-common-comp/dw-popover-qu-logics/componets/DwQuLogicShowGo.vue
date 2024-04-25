<template>
  <div style="padding: 0 10px;">
    <div>
      <div v-if="logicNum>0">
        <div v-for="(item, itemIndex) in survey.questions[index].questionLogics" :key="`logic_${itemIndex}`">
          <div v-if="item.logicType === logicType">
            <div v-if="item.error">
              <div style="color: red;font-size: 12px;">请确认每个配置项都有合适的值</div>
            </div>
            <div class="dw-design-logic-item">
              <template v-if="survey.questions[index].quType === 'FILLBLANK' || survey.questions[index].quType === 'UPLOADFILE'">
                <span>如果本题被回答，</span>
              </template>
              <template v-else>
                <span>如果本题选项</span>
                <el-select v-model="item.cgQuItemId" placeholder="请选择本题选项" style="width: 130px;" size="mini" multiple>
                  <el-option v-for="(option,optionIndex) in options" :key="`quOption_${optionIndex}`" :value="option.dwId" :label="option.optionTitleObj.dwText"></el-option>
                </el-select>
                <span v-if="survey.questions[index].quType === 'ORDERQU'">排名
                  <el-select v-model="item.geLe" placeholder="请选择关系" style="width: 70px;" size="mini" >
                    <el-option value="LTE" label="小于等于"></el-option>
                    <el-option value="GTE" label="大于等于"></el-option>
                    <el-option value="LT" label="小于"></el-option>
                    <el-option value="GT" label="大于"></el-option>
                  </el-select>
                  <el-input-number v-model="item.scoreNum" :controls="false" size="mini" style="width: 60px;" ></el-input-number>
                  名，
                </span>
                <span v-else-if="survey.questions[index].quType === 'SCORE'">得分
                  <el-select v-model="item.geLe" placeholder="请选择关系" style="width: 70px;" size="mini" >
                    <el-option value="LTE" label="小于等于"></el-option>
                    <el-option value="GTE" label="大于等于"></el-option>
                    <el-option value="LT" label="小于"></el-option>
                    <el-option value="GT" label="大于"></el-option>
                  </el-select>
                  <el-input-number v-model="item.scoreNum" :controls="false" size="mini" style="width: 60px;" ></el-input-number>
                  分，
                </span>
                <span v-else-if="survey.questions[index].quType === 'MULTIFILLBLANK'">被回答，</span>
                <span v-else>被选项，</span>
              </template>
              <span v-if="item.logicType === 'GO'">则跳转</span>
              <span v-else-if="item.logicType === 'SHOW'">则显示</span>
              <el-select v-model="item.skQuId" :multiple="logicType==='SHOW'" placeholder="请选择题目" style="width: 130px;" size="mini">
                <el-option v-for="(question,questionIndex) in questions" :key="`question_${questionIndex}`" :value="question.dwId" :label="`Q${question.quNum}、${question.quTitleObj.dwText}`"></el-option>
              </el-select>
              <el-button icon="el-icon-delete" size="mini" style="margin-left: 10px;" @click="deleteQuLogic(itemIndex)"></el-button>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <el-button type="primary" size="small" plain icon="el-icon-plus" @click="addQuLogic">新增逻辑</el-button>
        </div>
      </div>
      <div v-else>
        <el-empty :image-size="30" description="暂无相关逻辑数据">
          <el-button type="primary" size="small" plain icon="el-icon-plus" @click="addQuLogic">新增逻辑</el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script>

import {logicNum, curQuAfterQus, getQuOptions} from '../../../../../../../dw-utils/dw-survey-design'
import QuInput from '../../../../../../../../../views/dw-survey/dw-design1/components/dw-qus/QuInput.vue'
import {v4 as uuidV4} from 'uuid'

/**
 * 处理显示逻辑配置
 */
export default {
  name: 'DwQuLogicShowGo',
  components: {QuInput},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    popoverTitle: {type: String, default: '批量增加选项'},
    textPlaceholder: {type: String, default: '请输入需要批量新增加的选项内容，每行一个。'},
    addOrEdit: {type: String, default: 'add'},
    logicType: {type: String, default: ''}
  },
  data () {
    return {
      itemIndex: 0,
      activeName: 'first'
    }
  },
  computed: {
    logicNum () {
      return logicNum(this.survey.questions[this.index].questionLogics, this.logicType)
    },
    options () {
      return getQuOptions(this.survey.questions[this.index])
    },
    questions () {
      return curQuAfterQus(this.survey.questions, this.index)
    }
  },
  methods: {
    addQuLogic () {
      // ckQuId 回答题
      // cgQuItemId 回答选择题的选项ID  （0任意选项）
      // skQuId 要跳转的题  (end1提前结束-计入结果  end2提前结束-不计结果)
      // logicType 逻辑类型  (1=跳转,2显示)
      // geLe 评分题 ge大于，le小于
      const questionLogic = {dwId: null, ckQuId: '', cgQuItemId: null, skQuId: null, logicType: this.logicType, geLe: '', scoreNum: 0, error: false}
      questionLogic.dwId = uuidV4()
      this.survey.questions[this.index].questionLogics.push(questionLogic)
      // 逻辑要分类，计算不同类型的数量。
    },
    deleteQuLogic (itemIndex) {
      this.survey.questions[this.index].questionLogics.splice(itemIndex, 1)
    }
  }
}
</script>

<style scoped>
.dw-design-logic-item{
  background: none;
  padding: 5px;
  margin-bottom: 5px;
}
.dw-design-logic-item:hover{
  background: #efefef;
}
.logic-item-error{
  border: 1px solid red;
}
</style>
