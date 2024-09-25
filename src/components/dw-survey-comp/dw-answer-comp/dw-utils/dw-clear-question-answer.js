import {v4 as uuidv4} from "uuid";

export function clearQuestionAnswer (question) {
  const anQuestion = {quDwId: question.dwId, quType: quType}
  const quType = question.quType
  if (quType === 'RADIO') {
    clearAnOptionRadioCheckbox(question, question.quRadios)
  } else if (quType === 'CHECKBOX') {
    clearAnOptionRadioCheckbox(question, question.quCheckboxs)
    anQuestion.anCheckboxs = []
  } else if (quType === 'ORDERQU') {
    clearAnOptionOrderby(question, question.quOrderbys)
    anQuestion.anOrders = []
  } else if (quType === 'FILLBLANK') {
    question.answer = null
  } else if (quType === 'MULTIFILLBLANK') {
    clearAnOptionMfbk(question, question.quMultiFillblanks)
    anQuestion.anMFbks = []
  } else if (quType === 'SCORE') {
    clearAnOptionScore(question, question.quScores)
    anQuestion.anScores = []
  } else if (quType === 'MATRIX_RADIO') {
    clearAnOptionMatrixRadio(question, question.quRows)
    anQuestion.anMatrixRadios = []
  } else if (quType === 'MATRIX_CHECKBOX') {
    clearAnOptionMatrixCheckbox(question, question.quRows)
    anQuestion.anMatrixCheckboxes = []
  } else if (quType === 'MATRIX_INPUT') {
    clearAnOptionMatrixInput(question, question.quRows)
    anQuestion.anMatrixFbks = []
  } else if (quType==='MATRIX_SCALE') {
    clearAnOptionMatrixScale(question, question.quRows)
    anQuestion.anMatrixScales = []
  } else if (quType === 'MATRIX_SLIDER') {
    clearAnOptionMatrixScale(question, question.quRows)
    anQuestion.anMatrixScales = []
  }
  question.anQuestion = anQuestion
}

function clearAnOptionRadioCheckbox (question, quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      quOption.checked = false
      quOption.otherText = null
    })
  }
}

function clearAnOptionOrderby (question, quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      quOption.checked = false
      quOption.orderIndex = 0
      quOption.otherText = null
    })
  }
}

function clearAnOptionMfbk (question, quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      quOption.inputText = null
    })
  }
}

function clearAnOptionScore (question, quOptions) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      quOption.checked = false
      quOption.answerScore = 0
    })
  }
}

function clearAnOptionMatrixRadio (question, quRows) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption, index) => {
      const rowCols = rowOption.rowCols
      rowCols.map((rowColOption, index) => {
        rowColOption.checked = false
      })
    })
  }
}

function clearAnOptionMatrixCheckbox (question, quRows) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption, index) => {
      const rowCols = rowOption.rowCols
      rowCols.map((rowColOption, index) => {
        rowColOption.checked = false
      })
    })
  }
}

function clearAnOptionMatrixInput (question, quRows) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption, index) => {
      const rowCols = rowOption.rowCols
      rowCols.map((rowColOption, index) => {
        rowColOption.answerValue = null
      })
    })
  }
}

function clearAnOptionMatrixScale (question, quRows) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption, index) => {
      rowOption.answerValue = null
    })
  }
}
