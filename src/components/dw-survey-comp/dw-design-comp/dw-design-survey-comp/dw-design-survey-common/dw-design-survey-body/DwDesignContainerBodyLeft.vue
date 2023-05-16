<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="大纲">
        <div :style="contentStyle" style="overflow-y: scroll;">
          <!--          <el-collapse>
            <el-collapse-item title="第1页" name="1">
              <ul class="dw_left_ul">
                <li>Q1、您的姓名</li>
                <li>Q2、您的姓名</li>
                <li>Q3、您的姓名</li>
                <li>Q4、您的姓名</li>
                <li>Q5、您的姓名</li>
              </ul>
            </el-collapse-item>
          </el-collapse>-->
          <div class="dw_left_ul">
            <draggable
              v-model="survey.questions"
              :force-fallback="true"
              :group="{ name: 'leftQuList', pull: false, put: true }"
              animation="300"
              drag-class="dwDragClass"
              ghost-class="dwGhostClass"
              chosen-class="dwChosenClass"
              @start="onStart"
              @end="onEnd">
              <transition-group>
                <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" >
                  <div class="qu-catalogue-item">Q{{ index+1 }}、{{ item.quTitleObj.dwText }}</div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="题库">
        <el-collapse accordion>
          <el-collapse-item title="联系人" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="满意度" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="市场调研" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="疫情防控" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <!--                      <el-tab-pane label="选项">选项属性</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import {dwResetQuestionRefreshValue} from '../../../../dw-utils/dw-update-survey-question'

export default {
  name: 'DwDesignContainerBodyLeft',
  components: {
    draggable
  },
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      contentStyle: '',
      drag: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd (attrs) {
      this.drag = false
      // 更新状态
      const newIndex = attrs.newIndex
      const oldIndex = attrs.oldIndex
      if (newIndex>oldIndex) {
        this.refreshData(oldIndex)
      } else {
        this.refreshData(newIndex)
      }
    },
    onScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      if (scrollTop >= headerHeight) {
        const lrHeight = window.innerHeight - (157+60) - 20
        this.contentStyle = `height:${lrHeight}px;`
      } else {
        const newTop = headerHeight - scrollTop
        const lrHeight = window.innerHeight - (157+60+newTop) - 20
        this.contentStyle = `height:${lrHeight}px;`
      }
    },
    refreshData (quIndex) {
      const questions = this.survey.questions
      questions.forEach((item, index) => {
        if (index>=quIndex) this.survey.questions.splice(index, 1, dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))))
      })
    }
  }
}
</script>

<style scoped>
.dw_left_ul{
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.dw_left_ul li{
  padding: 0px 5px;
  margin: 0px;
}
/deep/ .el-collapse-item__header{
  height: 38px;
  line-height: 38px;
}
/deep/ .el-collapse-item__content{
  padding-bottom: 10px;
}
.qu-catalogue-item{
  padding: 5px;
  border: 1px solid transparent;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;
  margin-top: 5px;
}
.qu-catalogue-item:hover{
  /*border: 1px solid dodgerblue;*/
  background: #f5f5f5;
}
</style>
