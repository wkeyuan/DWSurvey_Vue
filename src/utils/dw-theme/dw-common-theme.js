export const dwSurveyRootStyle = {
  sysThemeStyle: {
    /*
    'dwPrimaryThemeColor': '#064b91',
    'dwPrimaryBgColor': '#064b91',
    'dwPrimaryBgColorActive': '#033e75',
    'dwPrimaryBgColorHover': '#0662c0',
    'dwPrimaryTextColorActive': '#0b72dc',
    'dwPrimaryButtonThemeColor': '#0b72dc',
    'dwPrimaryButtonToolbarThemeColor': '#0b63bd'
    'dwPrimaryButtonBgColor6': '#b5d8fc'
    */
    'dwPrimaryThemeColor': '#af174d',
    'dwPrimaryBgColor': '#af174d',
    'dwPrimaryBgColorActive': '#af174d',
    'dwPrimaryBgColorHover': '#af174d',
    'dwPrimaryTextColorActive': '#af174d',
    'dwPrimaryButtonThemeColor': '#af174d',
    'dwPrimaryButtonToolbarThemeColor': '#af174d',
    'dwPrimaryButtonBgColor6': '#f1c3d2'
  },
  answerThemeStyle: {
    'dwAnswerPageBgColor': '#eeeeee',
    'dwAnswerPrimaryColor': '#af174d',
    'dwAnswerPrimaryColor1': '#910536',
    'dwAnswerLogoBgColor': '#dc5585',
    'dwAnswerProgressColor': '#e10f59'
  }
}

export function dwUpSysThemeStyleVar (survey) {
  const sysTheme = dwSurveyRootStyle.sysThemeStyle
  document.documentElement.style.setProperty('--dw-primary-theme-color', sysTheme.dwPrimaryThemeColor)
  document.documentElement.style.setProperty('--dw-primary-bg-color', sysTheme.dwPrimaryBgColor)
  document.documentElement.style.setProperty('--dw-primary-bg-color-active', sysTheme.dwPrimaryBgColorActive)
  document.documentElement.style.setProperty('--dw-primary-bg-color-hover', sysTheme.dwPrimaryBgColorHover)
  document.documentElement.style.setProperty('--dw-primary-text-color-active', sysTheme.dwPrimaryTextColorActive)
  document.documentElement.style.setProperty('--dw-primary-button-theme-color', sysTheme.dwPrimaryButtonThemeColor)
  document.documentElement.style.setProperty('--dw-primary-button-toolbar-theme-color', sysTheme.dwPrimaryButtonToolbarThemeColor)
  document.documentElement.style.setProperty('--dw-primary-button-bg-color-6', sysTheme.dwPrimaryButtonBgColor6)
  /*
  // 答卷默认样式
  const surveyStyle = rootStyle.answerTheme
  const pageThemeColor = surveyStyle.pageThemeColor
  const pageBgColor = surveyStyle.pageBgColor
  const logoBgColor = surveyStyle.logoBgColor
  const pageThemeColor1 = surveyStyle.pageThemeColor1
  document.documentElement.style.setProperty('--dw-answer-page-bg-color', pageBgColor)
  document.documentElement.style.setProperty('--dw-answer-primary-color', pageThemeColor)
  document.documentElement.style.setProperty('--dw-answer-primary-color-1', pageThemeColor1)
  document.documentElement.style.setProperty('--dw-answer-logo-bg-color', logoBgColor)*/
}
