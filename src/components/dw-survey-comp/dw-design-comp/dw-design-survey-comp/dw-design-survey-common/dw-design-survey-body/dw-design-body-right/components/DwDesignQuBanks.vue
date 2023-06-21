<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in quBanks" :key="`quBank_${index}`" :title="item.tabQuName" :name="index">
        <div style="padding-bottom: 5px;">
          <el-alert title="点击或拖动可加入到问卷中" type="info" show-icon></el-alert>
        </div>
        <template>
          <div class="quBanks">
            <draggable
              v-model="item.questions"
              :group="{ name: 'questionGroup', pull: 'clone', put: false }"
              :sort="false"
              :force-fallback="true"
              animation="300"
              class="toolbars-draggable"
              drag-class="dragClass"
              ghost-class="ghostClass"
              chosen-class="chosenClass"
              @start="onStart"
              @end="onEnd">
              <transition-group class="dw-list-group dw-grid">
                <div v-for="(question,index_1) in item.questions" :key="`quBankQu_${index_1}`" class="dw-list-group-item">
                  <dw-design-qu-bank-question :item="question" ></dw-design-qu-bank-question>
                </div>
              </transition-group>
            </draggable>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {bankQuestions} from '../../../../api/dw-design-question-comps'
import {parseQuestions} from '../../../../../../dw-utils/dw-survey-parse'
import draggable from 'vuedraggable'
import DwDesignQuBankQuestion from './DwDesignQuBankQuestion.vue'

export default {
  name: 'DwDesignQuBanks',
  components: {DwDesignQuBankQuestion, draggable},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      activeName: 0,
      quBanks: []
    }
  },
  mounted () {
    this.loadQuBanks()
  },
  methods: {
    loadQuBanks () {
      bankQuestions().then((response) => {
        console.debug('bankQuestions-response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
          const tabs = httpResult.data
          tabs.map((item, index) => {
            item.questions = parseQuestions(item.questions, false)
          })
          this.quBanks = tabs
          this.loading = false
        }
      })
    },
    onStart () {
      this.drag=true
      this.$emit('start-drag-right')
    },
    onEnd () {
      this.$emit('end-drag')
      this.drag=false
    }
  }
}
</script>

<style scoped>
@import '../../../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../../../../../assets/css/design-survey.css';

.dw-list-group{
  margin-bottom: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto,1fr));
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
  padding: 5px;
}
@media screen and (max-width: 1400px) {
  .dw-list-group{
    grid-template-columns: 1fr;
  }
}
.dw-list-group-item{
  padding: 0;
  border: 1px solid rgba(0,0,0,.125);
  cursor: default;
  width: 100%;
}

.dragClass{
  border: none;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: none;
}
.chosenClass{
  border: none;
}
</style>
