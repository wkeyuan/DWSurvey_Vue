<template>
  <div class="grid-content">
    <div class="quContent">
      <div class="quTitle">{{ quNum }}、题标题</div>
      <div class="quBody">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuSelect',
  props: {
    quNum: {type: String, default: ''}
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    clickText (id) {
      this.$emit('show-text-editor', id)
    }
  }
}
</script>

<style scoped>
.quContent{
  text-align: left;
  padding: 0px 10px;
}
.quTitle{
  font-size: 14px;
  padding: 10px 0px;
}
.quTitle{
  padding-top: 0px;
}
</style>
