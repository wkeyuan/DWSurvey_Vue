<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="(item, index) in options"
        :key="`fa_${index}`"
        :label="item.optionTitleObj.dwHtml"
        :value="item.optionTitleObj.dwHtml">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DwQuOptionCommon4Item from './DwQuOptionCommon4Item.vue'

export default {
  name: 'DwQuOptionCommon4',
  components: {DwQuOptionCommon4Item, draggable},
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
      value: null
    }
  },
  methods: {
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
