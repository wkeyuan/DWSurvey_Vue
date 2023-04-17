<template>
  <div>
    <div>
      <draggable
        v-model="dragOptions"
        :force-fallback="true"
        :group="{ name: 'option', pull: false, put: false }"
        handle=".dwMoveSortQuOption"
        animation="300"
        drag-class="dragClass"
        ghost-class="ghostClass"
        chosen-class="chosenClass"
        @start="onStart"
        @end="onEnd">
        <transition-group class="dw-grid">
          <div v-for="(item,optionIndex) in options" :key="`quOption-${optionIndex}`" style="width: 100%;" >
            <dw-qu-option-common2-item :options="options" :survey="survey" :option-index="optionIndex" :qu-type="quType" ></dw-qu-option-common2-item>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon2Item from './DwQuOptionCommon2Item'

export default {
  name: 'DwQuOptionCommon2',
  components: {DwQuOptionCommon2Item, draggable},
  model: {
    prop: 'options',
    event: 'update-options'
  },
  props: {
    index: {type: Number, default: 0},
    options: {type: Array, default: () => []},
    survey: {type: Object, default: () => {}},
    quType: {type: String, default: ''}
  },
  data () {
    return {
      dragOptions: this.options,
      drag: false
    }
  },
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd () {
      this.drag = false
      this.$emit('update-options', this.dragOptions)
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
