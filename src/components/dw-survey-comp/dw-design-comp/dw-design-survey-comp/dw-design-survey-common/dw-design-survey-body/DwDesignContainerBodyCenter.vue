<template>
  <div class="dw-container-body-center">
    <div style="min-height: 600px;">
      <div style="text-align: center;padding: 20px;">
        <dw-text-edit-label-common v-model="survey.surveyName" :survey="survey" ></dw-text-edit-label-common>
      </div>
      <div style="padding: 0px 40px;">
        <dw-text-edit-label-common v-model="survey.surveyNode" :survey="survey" ></dw-text-edit-label-common>
      </div>
      <div>
        <div>
          <draggable
            v-model="survey.questions"
            :force-fallback="true"
            :group="{ name: 'people', pull: true, put: true }"
            handle=".dwMoveSortQu"
            animation="300"
            drag-class="dragClass"
            ghost-class="ghostClass"
            chosen-class="chosenClass"
            @start="onStart"
            @end="onEnd">
            <transition-group>
              <div v-for="(item, index) in survey.questions" :key="`surveyQu${index}`" >
                <dw-design-question :index="index" :item="item" v-model="survey" ></dw-design-question>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div style="padding: 10px 20px;text-align: center;">
      </div>
    </div>
    <div style=""><dw-footer></dw-footer></div>
  </div>
</template>

<script>
import DwDesignToolbar from '../../dw-design-survey-layouts/dw-tb-layout/comp/DwDesignToolbar'
import DwDesignHeader from '../../dw-design-survey-layouts/dw-tb-layout/comp/DwDesignHeader'
import DwTextEditLabelCommon from '../DwTextEditLabelCommon'
import DwDesignQuRadio from '../../dw-design-survey-question/dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwTextEditLabel from '../DwTextEditLabel'
import DwDesignQuestion from '../../dw-design-survey-question/DwDesignQuestion'
import draggable from 'vuedraggable'
import DwFooter from '../../../../../layouts/DwFooter'

export default {
  name: 'DwDesignContainerBodyCenter',
  components: {
    DwFooter,
    DwDesignToolbar,
    DwDesignHeader,
    DwTextEditLabelCommon,
    DwDesignQuRadio,
    DwTextEditLabel,
    DwDesignQuestion,
    draggable
  },
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      drag: false
    }
  },
  methods: {
    onStart () {
      this.drag = true
    },
    onEnd () {
      this.drag = false
    },
    documentClick () {
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        this.survey.curEditObj[i].itemClick = false
      }
    }
  }
}
</script>

<style scoped>

</style>
