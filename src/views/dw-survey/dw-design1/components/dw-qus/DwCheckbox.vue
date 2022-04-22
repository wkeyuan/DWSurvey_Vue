<template>
  <div class="dwCheckboxBox">
    <input type="checkbox" >
    <qu-options :dom-id="domId" :old-content="label" @show-text-editor="clickText" ></qu-options>
  </div>
</template>

<script>

import QuOptions from './QuOptions'

export default {
  name: 'DwCheckbox',
  components: {QuOptions},
  props: {domId: {type: String, default: ''}, label: {type: String, default: ''}},
  methods: {
    clickText (id) {
      this.$emit('show-text-editor', id)
    }
  }
}
</script>

<style scoped>
.dwCheckboxBox{
  padding: 10px;
  display: flex;
}
</style>
