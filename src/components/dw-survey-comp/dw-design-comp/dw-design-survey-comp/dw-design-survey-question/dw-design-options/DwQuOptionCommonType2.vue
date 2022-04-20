<template>
  <div>
    <div>
      <draggable
        v-model="options"
        :forceFallback="true"
        handle=".dwMoveSortQuOption"
        :group="{ name: 'option', pull: false, put: false }"
        animation="300"
        dragClass="dragClass"
        ghostClass="ghostClass"
        chosenClass="chosenClass"
        @start="onStart"
        @end="onEnd">
        <transition-group class="dw-grid">
          <div v-for="(item,optionIndex) in options" :key="item.id" style="width: 100%;" >
            <dw-qu-option-common-type2-item :index="optionIndex" :question="question" v-model="options" :is-toolbar="false" ></dw-qu-option-common-type2-item>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import DwQuOptionCommonType1Item from './DwQuOptionCommonType1Item'
import draggable from 'vuedraggable'
import DwQuOptionCommonType2Item from './DwQuOptionCommonType2Item'

export default {
  name: 'DwQuOptionCommonType2',
  components: {DwQuOptionCommonType2Item, DwQuOptionCommonType1Item,draggable},
  props: {
    index: { type: Number, default: 0 },
    options: { type: Object, default: () => {} },
    question: { type: Object, default: () => {} },
  },
  model: {
    prop: 'options',
    event: 'update-options'
  },
  data () {
    return {
      drag:false
    }
  },
  methods: {
    //开始拖拽事件
    onStart () {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd () {
      console.debug('drag',this.drag)
      this.drag = false
    }
  }
}
</script>

<style scoped>
.dragClass{
  border: 1px solid dodgerblue;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: 1px dashed dodgerblue;
}
.dw-grid{
  display: grid;
  grid-template-columns: repeat(2, minmax(auto,1fr));
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  align-items: center;
  align-content: center;
  justify-items: start;
  justify-content: start;
}
</style>
