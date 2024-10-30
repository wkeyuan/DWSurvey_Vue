<template>
  <div>
    <dw-qu-matrix-radio-options v-model="survey" :index="index" ></dw-qu-matrix-radio-options>
  </div>
</template>

<script>
import DwTextEditLabel from '../../../../dw-design-survey-common/DwTextEditLabel.vue'
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1.vue'
import DwQuMatrixRadioOptions from './components/DwQuMatrixRadioOptions.vue'
import DwQuRadioOptions from '../../dw-design-qu-radio/components/DwQuRadioOptions.vue'

export default {
  name: 'DwDesignQuMatrixRadio',
  components: {DwQuRadioOptions, DwQuMatrixRadioOptions, DwQuOptionCommon1, DwTextEditLabel},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
