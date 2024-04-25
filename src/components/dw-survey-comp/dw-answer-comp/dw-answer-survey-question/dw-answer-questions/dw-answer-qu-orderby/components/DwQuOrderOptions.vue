<template>
  <div class="dw-qu-order-group">
    <!--   v-for的key不能是index，如下用item，不然动画会没有效果 -->
    <transition-group name="flip-list" >
      <div v-for="(item, optionIndex) in survey.questions[index].quOrderbys" :key="survey.tempDataType === 'modelComponents' ? `orderBy-${optionIndex}`: item.dwId" class="dw-qu-order-group-item dwMoveSortQuOption" >
        <div class="dw-qu-item" @click="clickItem(item)" >
          <div class="dw-qu-item-body">
            <div :class="item.checked ? `dw-item-checked`: ''" class="dw-qu-item-body-order-option">
              <i v-if="item.orderIndex>0" :style="`background: ${themeColor};border-color: ${themeColor}`" class="fa dw-qu-order-num dw-num-order animate__animated animate__tada" >{{ item.orderIndex }}</i>
              <i v-else class="fa dw-qu-order-num dw-num-empty" > {{ item.orderIndex }} </i>
              <div class="dw-qu-item-option-title"><dw-html-label-common ref="dwEditLabel" :value="item.optionTitleObj" ></dw-html-label-common></div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>

import DwQuOptionCommon2 from '../../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2.vue'
import DwQuOptionCommon2Item
  from '../../../../../dw-design-comp/dw-design-survey-comp/dw-design-survey-question/dw-design-options/dw-qu-option-common2/DwQuOptionCommon2Item.vue'
import DwTextEditLabel
  from '../../../../../dw-design-comp/dw-design-survey-comp/dw-design-survey-common/DwTextEditLabel.vue'
import DwHtmlLabelCommon from '../../../../dw-answer-survey-common/DwHtmlLabelCommon.vue'
import draggable from 'vuedraggable'
import {showReadNotify} from '../../../../../dw-utils/dw-common/dw-msg-common'
import {answerQuEventCommon} from '../../../../dw-utils/dw-survey-answer-common'

export default {
  name: 'DwQuOrderOptions',
  components: {DwHtmlLabelCommon, DwTextEditLabel, DwQuOptionCommon2Item, DwQuOptionCommon2, draggable},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      dataNum: 0,
      themeColor: this.survey.surveyStyle.themeColor
    }
  },
  mounted () {
    this.survey.questions[this.index].quOrderbys.forEach((option, index) => {
      if (this.dataNum < option.orderIndex) this.dataNum = option.orderIndex
    })
  },
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd (attrs) {
      this.drag = false
    },
    clickItem (item) {
      if (!this.survey.questions[this.index].hasOwnProperty('anQuestion')) this.dataNum = 0
      if (this.survey.readonly) return showReadNotify(this)
      item.checked = !item.checked
      const length = this.survey.questions[this.index].quOrderbys.length
      if (item.hasOwnProperty('orderIndex') && item.orderIndex > 0) {
        const itemOrderIndex = item.orderIndex
        this.survey.questions[this.index].quOrderbys.forEach((option, index) => {
          if (itemOrderIndex < option.orderIndex) {
            option.orderIndex = option.orderIndex - 1
          }
        })
        item.orderIndex = 0
        const newNum = this.dataNum - 1
        if (newNum >= 0) this.dataNum = newNum
      } else {
        const newNum = this.dataNum + 1
        if (newNum <= length) {
          item.orderIndex = newNum
          this.dataNum = newNum
        }
      }
      this.survey.questions[this.index].quOrderbys.sort(function (a, b) {
        const x = a.orderIndex === 0 ? length + 1 : a.orderIndex
        const y = b.orderIndex === 0 ? length + 1 : b.orderIndex
        return ((x < y) ? -1 : (x > y) ? 1 : 0)
      })
      // getQuestionAnswerData(this.survey.questions[this.index])
      // validateQuestion(this.survey.questions[this.index])
      answerQuEventCommon(this.survey, this.index)
    }
  }
}
</script>

<style scoped>
@import '../../../../../../../assets/css/dw-answer.css';
.dw-qu-order-group{
  margin-bottom: 5px;
}
.dw-qu-order-group .dw-qu-order-group-item{
  border: 1px solid #efefef;
  background: white;
  /*margin-bottom: -1px;*/
  margin-bottom: 5px;
  border-radius: 2px;
}
.dw-qu-order-group .dw-qu-order-group-item:first-child {
  /*border-top-left-radius: 0.25rem;*/
  /*border-top-right-radius: 0.25rem;*/
}
.dw-qu-item-body-order-option{
  /*display: inline-flex;*/
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 3px 5px;
}
.dw-qu-order-num{
  border: 1px solid #ccc;
  font-size: 10px;
  padding: 3px 5px;
  margin-right: 5px;
  font-family: "Antic", "Tahoma", serif;
  border-radius: 3px;
}
.dw-qu-order-num.dw-num-empty{
  color: white;
  background: white;
}
.flip-list-move {
  transition: transform 0.5s;
}

</style>
