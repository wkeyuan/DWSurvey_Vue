export function logicNum (questionLogics, loginType) {
  let loginNum = 0
  if (questionLogics!==null) {
    questionLogics.forEach((item, index) => {
      if (item.logicType === loginType) loginNum++
    })
  }
  return loginNum
}

export function curQuAfterQus (questions, quIndex) {
  const newQuestions = []
  if (questions !== null) {
    let quNum = 1
    questions.forEach((item, index) => {
      if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH') {
        item.quNum = quNum++
        if (index > quIndex) newQuestions.push(item)
      }
    })
  }
  return newQuestions
}

export function getQuOptions (question) {
  const quType = question.quType
  if (quType === 'RADIO') {
    return question.quRadios
  } else if (quType === 'CHECKBOX') {
    return question.quCheckboxs
  } else if (quType === 'ORDERQU') {
    return question.quOrderbys
  } else if (quType === 'MULTIFILLBLANK') {
    return question.quMultiFillblanks
  } else if (quType === 'SCORE') {
    return question.quScores
  }
}
