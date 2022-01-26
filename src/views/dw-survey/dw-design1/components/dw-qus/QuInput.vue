<template>
  <div class="grid-content">
    <div class="quContent">
      <div class="quTitle">{{quNum}}、题标题</div>
      <div class="quBody">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuInput',
  props: {
    quNum: {type: String, default: ''},
  },
  data() {
    return {
      input: '322'
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
