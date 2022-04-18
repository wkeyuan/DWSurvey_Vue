<template>
  <dw-design-question-common>
    <template v-slot:editQuContent>
      <dw-qu-option-common-type1></dw-qu-option-common-type1>
    </template>
  </dw-design-question-common>
</template>

<script>
import DwQuOptionCommonType1 from '../../dw-design-options/DwQuOptionCommonType1'
export default {
  name: 'DwQuCheckboxDesign',
  components: {DwQuOptionCommonType1}
}
</script>

<style scoped>

</style>
