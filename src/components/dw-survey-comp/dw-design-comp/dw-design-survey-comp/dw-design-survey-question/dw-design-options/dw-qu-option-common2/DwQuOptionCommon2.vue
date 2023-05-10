<template>
  <div>
    <draggable
      v-model="dragOptions"
      :force-fallback="true"
      :group="{ name: 'qu-option', pull: false, put: false }"
      handle=".dwMoveSortQuOption"
      animation="300"
      drag-class="dragClass"
      ghost-class="ghostClass"
      chosen-class="chosenClass"
      @start="onStart"
      @end="onEnd">
      <transition-group>
        <div v-for="(item,optionIndex) in dragOptions" :key="`quOption-${optionIndex}`" >
          <dw-qu-option-common2-item ref="quCommon2Item" v-model="item.optionTitleObj" :survey="survey" :qu-index="index" :option-index="optionIndex" :qu-type="quType" ></dw-qu-option-common2-item>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon2Item from './DwQuOptionCommon2Item.vue'

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
      const quCommon2Items = this.$refs.quCommon2Item
      for (let i=0; i<quCommon2Items.length; i++) quCommon2Items[i].dragClick()
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
