<template>
  <div>
    <draggable
      v-model="quOptions"
      :forceFallback="true"
      handle=".dwMoveSortQuOption"
      :group="{ name: 'option', pull: false, put: false }"
      animation="300"
      dragClass="dragClass"
      ghostClass="ghostClass"
      chosenClass="chosenClass"
      @start="onStart"
      @end="onEnd">
      <transition-group>
        <div v-for="(item,index) in quOptions" :key="item.id" >
          <dw-qu-option-common-type1-item></dw-qu-option-common-type1-item>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import DwQuOptionCommonType1Item from './DwQuOptionCommonType1Item'
import draggable from 'vuedraggable'

export default {
  name: 'DwQuOptionCommonType1',
  components: {DwQuOptionCommonType1Item,draggable},
  data () {
    return {
      drag:false,
      quOptions: [{id:'1'},{id:'2'}, {id:'3'}]
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
</style>
