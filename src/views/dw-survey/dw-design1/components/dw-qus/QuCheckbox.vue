<template>
  <div class="grid-content">
    <div class="quContent" @click.stop="stop">
      <div :id="`Qu${quNum}`" :style="active" class="quTitle" @click.stop="clickText(`Qu${quNum}`)" @mouseover="mouseover" @mouseleave="mouseleave">{{ quNum }}、题标题</div>
      <div class="quBody">
        <!--<el-checkbox v-for="(item,index) in cities" :label="item.name" :key="item.name" >
              <qu-options :dom-id="`${item.id}`" :old-content="item.name"  @show-text-editor="clickText" ></qu-options>
            </el-checkbox>-->
        <dw-checkbox v-for="(item) in cities" :label="item.name" :key="item.name" :dom-id="item.id" @show-text-editor="clickText" ></dw-checkbox>
      </div>
    </div>
  </div>
</template>

<script>

import QuOptions from './QuOptions'
import DwCheckbox from './DwCheckbox'

export default {
  name: 'QuCheckbox',
  components: {DwCheckbox, QuOptions},
  props: {
    quNum: {type: String, default: ''},
    child: {type: Array, default: () => []}
  },
  data () {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: this.child,
      isIndeterminate: true,
      active: ''
    }
  },
  methods: {
    mouseleave () {
      this.active = ''
    },
    mouseover () {
      this.active = 'background-color: #FDF9CD;'
    },
    clickText (id) {
      this.$emit('show-text-editor', id)
    },
    stop () {

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
</style>
