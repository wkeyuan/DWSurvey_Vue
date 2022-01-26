<template>
  <div class="grid-content">
    <div class="quContent">
      <div class="quTitle" >{{quNum}}、题标题</div>
      <div class="quBody">
        <el-radio-group v-model="radio">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuRedio',
  props: {
    quNum: {type: String, default: ''},
  },
  data() {
    return {
      radio: 3
    }
  },
  methods: {
    clickText (id) {
      this.$emit('show-text-editor',id)
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
