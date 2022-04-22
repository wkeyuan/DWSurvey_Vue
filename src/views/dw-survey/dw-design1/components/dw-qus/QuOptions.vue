<template>
  <div :id="`${domId}`" :style="active" class="quOptionContent" @click.stop="clickText(`${domId}`)" @mouseover="mouseover" @mouseleave="mouseleave" >{{ content }}</div>
</template>

<script>
export default {
  name: 'QuOptions',
  props: {
    domId: {type: String, default: ''},
    oldContent: {type: String, default: ''}
  },
  data () {
    return {
      active: '',
      content: this.oldContent
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
    text2Div (content) {
      console.debug('text2Divcontent')
      console.debug(content)
      this.content = content
    }
  }
}
</script>

<style scoped>
.quOptionContent{
  max-width: 100%;
  vertical-align: middle;
  cursor: text;
  display: inline-block;
  table-layout: fixed;
  word-break: break-all;
  height: auto;
  white-space: break-spaces;
}
</style>
