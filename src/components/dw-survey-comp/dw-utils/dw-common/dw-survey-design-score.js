export function caleDesignSurveySumScore (survey, index) {
  // 调用计算总分方法
  // 1、计算当前题总分
  if (survey!==null && survey!==undefined) {
    const question = survey.questions[index]
    if (question!==null && question!==undefined) {
      const quType = question.quType
      let quMaxScore = 0
      if (quType==='RADIO') {
        // 计算单选分数
        const quRadios = survey.questions[index].quRadios
        quRadios.forEach((quRadio, optionIndex) => {
          const optionScoreNum = quRadio.scoreNum
          if (optionScoreNum!=null && optionScoreNum>0) {
            if (quMaxScore<optionScoreNum) quMaxScore = optionScoreNum
          }
        })
      } else if (quType==='CHECKBOX') {
        // 计算多选分数
        const quCheckboxs = survey.questions[index].quCheckboxs
        quCheckboxs.forEach((quCheckbox, optionIndex) => {
          const optionScoreNum = quCheckbox.scoreNum
          if (optionScoreNum!=null && optionScoreNum>0) {
            quMaxScore+= optionScoreNum
          }
        })
        const scoreAttr = survey.questions[index].quAttr.scoreAttr
        if (scoreAttr.hasOwnProperty('allRight') && scoreAttr.allRight.enabled) {
          quMaxScore = survey.questions[index].quAttr.scoreAttr.allRight.scoreNum
        }
      } else if (quType==='MATRIX_RADIO') {
        // 计算矩阵单选分数
        const quCols = survey.questions[index].quCols
        quCols.forEach((quRadio, optionIndex) => {
          const optionScoreNum = quRadio.scoreNum
          if (optionScoreNum!=null && optionScoreNum>0) {
            if (quMaxScore<optionScoreNum) quMaxScore = optionScoreNum
          }
        })
        quMaxScore = quMaxScore * survey.questions[index].quRows.length
      } else if (quType==='MATRIX_CHECKBOX') {
        // 计算矩阵单选分数
        const quCols = survey.questions[index].quCols
        quCols.forEach((quRadio, optionIndex) => {
          const optionScoreNum = quRadio.scoreNum
          if (optionScoreNum!=null && optionScoreNum>0) {
            quMaxScore+= optionScoreNum
          }
        })
        quMaxScore = quMaxScore * survey.questions[index].quRows.length
      }
      survey.questions[index].quAttr.scoreAttr.maxScore = quMaxScore
      // 如果以上题设置了分值，且大于0，则自动启用分值计算功能
      if (quMaxScore>0) {
        survey.questions[index].quAttr.scoreAttr.designShowScoreNum = true
        // 自动启用问卷的计分功能
        survey.surveyAttrs.scoreAttr.enabled = true
      }
      // 2、计算问卷总分
      let surveyMaxScore = 0
      const questions = survey.questions
      questions.forEach((question, quIndex) => {
        const thQuType = question.quType
        if (thQuType==='SCORE') {
          // 计分题 calcSumScore
          const quScores = question.quScores
          let quMaxScore = 0
          quScores.forEach((quScore, optionIndex) => {
            quMaxScore+= question.paramInt02
          })
          question.quAttr.scoreAttr.maxScore = quMaxScore
          question.quAttr.scoreAttr.designShowScoreNum = true
        }
        if (question.hasOwnProperty('quAttr') && question.quAttr.hasOwnProperty('scoreAttr') && question.quAttr.scoreAttr.hasOwnProperty('maxScore')) {
          surveyMaxScore+=question.quAttr.scoreAttr.maxScore
        }
      })
      survey.surveyAttrs.scoreAttr.maxScore = surveyMaxScore
      // survey.surveyAttrs.scoreAttr.enabled = true
    }
  }
}
