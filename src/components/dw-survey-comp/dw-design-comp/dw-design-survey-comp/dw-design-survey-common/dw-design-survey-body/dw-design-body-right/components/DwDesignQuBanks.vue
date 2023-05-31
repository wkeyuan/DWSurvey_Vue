<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in quBanks" :key="`quBank_${index}`" :title="item.tabQuName" :name="index">
        <template>
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
                <div class="dw-list-group-item-in"> {{ question.quName }} <span class="dw-list-group-item-in-type">[{{ question.quTypeName }}]</span> </div>
              </div>
            </transition-group>
          </draggable>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {bankQuestions} from '../../../../api/dw-design-question-comps'
import {parseQuestion} from '../../../../../../dw-utils/dw-parse-survey'
import draggable from 'vuedraggable'

export default {
  name: 'DwDesignQuBanks',
  components: {draggable},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      activeName: '0',
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
            item.questions = parseQuestion(item.questions)
          })
          this.quBanks = tabs
          this.loading = false
        }
      })
    },
    onStart () {
      this.drag=true
    },
    onEnd () {
      this.drag=false
    }
  }
}
</script>

<style scoped>
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
  /* margin-bottom: -1px; */
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  cursor: move;
  width: 100%;
}
.dw-list-group-item:first-child {
}
.dw-list-group-item-in{
  padding: 0.25rem 0.55rem;
}
.dw-list-group-item-in-type{
  color: #afafb0;
  font-size: 12px;
}
.dw-list-group-item:hover, .dw-list-group-item:hover .dw-list-group-item-in-type{
  background-color: dodgerblue;
  color: white;
}
</style>
