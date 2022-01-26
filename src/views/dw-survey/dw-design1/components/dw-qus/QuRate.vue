<template>
  <div class="grid-content">
    <div class="quContent">
      <div class="quTitle" :id="`Qu${quNum}`" :style="active" @click.stop="clickText(`Qu${quNum}`)" @mouseover="mouseover" @mouseleave="mouseleave">{{quNum}}、题标题</div>
      <div class="quBody">
        <el-rate
          v-model="value"
          show-text>
        </el-rate>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'QuRate',
  props: {
    quNum: {type: Number, default: ''},
  },
  data() {
    return {
      value: 3,
      active: '',
    }
  },
  methods: {
    mouseleave () {
      this.active = '';
    },
    mouseover () {
      this.active = 'background-color: #FDF9CD;';
    },
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
  line-height: 22px;
  padding: 10px 0px;
}
.quTitle{

}
</style>
