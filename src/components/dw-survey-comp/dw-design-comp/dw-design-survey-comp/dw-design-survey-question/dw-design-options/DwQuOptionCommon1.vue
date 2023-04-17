<template>
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
      <transition-group>
        <div v-for="(item,optionIndex) in options" :key="`quOption-${optionIndex}`" >
          <dw-qu-option-common1-item :options="options" :survey="survey" :option-index="optionIndex" :qu-type="quType" ></dw-qu-option-common1-item>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon1Item from './DwQuOptionCommon1Item'

export default {
  name: 'DwQuOptionCommon1',
  components: {DwQuOptionCommon1Item, draggable},
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
</style>
