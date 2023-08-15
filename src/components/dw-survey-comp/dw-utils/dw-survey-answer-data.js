export function parseAnswerData (survey, answer) {
  if (answer!=null && answer.hasOwnProperty('anQuestions')) {
    const anQuestions = answer.anQuestions
    if (anQuestions!=null && anQuestions.length>0) {
      anQuestions.forEach((item, index) => {

      })
    }
  }
}
