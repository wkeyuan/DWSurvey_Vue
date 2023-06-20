<template>
  <div>
    <el-select v-model="value" :multiple="quType==='CHECKBOX'" placeholder="请选择" >
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

export default {
  name: 'DwQuOptionCommon4',
  components: {draggable},
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

</style>
