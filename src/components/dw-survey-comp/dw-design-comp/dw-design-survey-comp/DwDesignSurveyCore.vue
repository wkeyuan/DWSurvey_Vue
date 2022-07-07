<template>
  <dw-design-top-bottom-layout></dw-design-top-bottom-layout>
</template>

<script>

import draggable from 'vuedraggable'
import {querySurveyAll, questionComps} from './api/dw-design-survey-api'
import DwDesignQuestion from './dw-design-survey-question/DwDesignQuestion'
import DwTextEditLabel from './dw-design-survey-common/DwTextEditLabel'
import DwDesignQuRadio from './dw-design-survey-question/dw-design-questions/dw-design-qu-radio/DwDesignQuRadio'
import DwTextEditLabelCommon from './dw-design-survey-common/DwTextEditLabelCommon'
import DwDesignTopBottomLayout from './dw-design-survey-layouts/dw-tb-layout/DwDesignTopBottomLayout'

export default {
  name: 'DwDesignSurveyCore',
  components: {
    DwDesignTopBottomLayout,
    DwTextEditLabelCommon,
    DwDesignQuRadio,
    DwTextEditLabel,
    DwDesignQuestion,
    draggable
  },
  data () {
    return {
      surveyId: '',
      drag: false,
      headerQuToolbarStyle: '',
      containerLRStyle: '',
      questions: [],
      survey: {
        // font-size: 22px;font-weight: bold;
        surveyName: '<h1>Hello DWSurvey</h1>',
        surveyNode: '<div>非常感谢您的参与！如有涉及个人信息，我们将严格保密。</div>',
        questions: [
          {quTitle: '<p>aaaa</p>', quType: 'CHECKBOX', quRadios: [{id: '1', optionTitle: '<p>aa</p>', itemClick: false}, {id: '2', optionTitle: '<p>bb</p>', itemClick: false}, {id: '3', optionTitle: '<p>cc</p>', itemClick: false}]},
          {quTitle: '<p>abcd</p>', quType: 'RADIO', quRadios: [{id: '1', optionTitle: '<p>dd</p>', itemClick: false}, {id: '2', optionTitle: '<p>ee</p>', itemClick: false}, {id: '3', optionTitle: '<p>ff</p>', itemClick: false}]}
        ],
        surveyTest: '',
        curEditObj: [{itemClick: false}]
      },
      radio: '1',
      hover: false
    }
  },
  mounted () {
    this.loadDesignSurveyData()
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onStart () {
      this.drag=true
    },
    onEnd () {
      this.drag=false
    },
    loadDesignSurveyData () {
      questionComps().then((response) => {
        console.debug('response')
        console.debug(response)
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.questions = httpResult.data
        }
      })
    },
    onScroll (position) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const headerHeight = 60
      if (scrollTop >= headerHeight) {
        this.headerQuToolbarStyle = 'top:0px;'
        const newTop1 = scrollTop - headerHeight
        this.containerLRStyle = `top:${newTop1}px;`
      } else {
        const newTop = headerHeight - scrollTop
        this.headerQuToolbarStyle = `top:${newTop}px;`
        this.containerLRStyle = 'top:0px;'
      }
    },
    documentClick () {
      // this.survey.curEditObj = false
      const curObjs = this.survey.curEditObj
      for (let i = 0; i < curObjs.length; i++) {
        this.survey.curEditObj[i].itemClick = false
      }
    }
  }
}
</script>

<style scoped>
@import '../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
@import '../../../../assets/css/design-survey.css';

.header .header-content-left{
  display: flex;
}
.header .header-content-left .logo{
  width: 200px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
}
.header .header-content-left img{
  vertical-align: middle;
}
.header .header-content-left .logo h1{
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  vertical-align: top;
}
.dragClass{
  border: 1px solid dodgerblue;
  background: #f5f5f5;
}
.ghostClass{
  background: #d0cfcf;
  border: 1px dashed dodgerblue;
}
</style>
