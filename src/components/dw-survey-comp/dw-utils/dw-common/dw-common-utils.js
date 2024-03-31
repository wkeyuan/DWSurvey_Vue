export const dwSurveyColorUtils = {
  /**
   * rgb 转 hex
   * @param rgb rgb(255, 0, 0)
   * @returns {null|string}
   */
  rgbToHex (rgb) {
    if (rgb!==undefined && rgb!==null) {
      const arr = rgb.replace('rgb', '').replace('(', '').replace(')', '').split(',')
      // 转十六进制
      const h = parseInt(arr[0]).toString(16)
      const e = parseInt(arr[1]).toString(16)
      const x = parseInt(arr[2]).toString(16)
      return '#' + h + e + x
    }
    return null
  },
  /**
   * hex 转 rgb
   * @param hex #ff8800
   * @returns {null|string}
   */
  hexToRgb (hex) {
    if (hex!==undefined && hex!==null) {
      const str = hex.replace('#', '')
      if (str.length % 3) {
        return 'hex格式不正确！'
      }
      // 获取截取的字符长度
      const count = str.length / 3
      // 根据字符串的长度判断是否需要 进行幂次方
      const power = 6 / str.length
      const r = parseInt('0x' + str.substring(0, count)) ** power
      const g = parseInt('0x' + str.substring(count, 2 * count)) ** power
      const b = parseInt('0x' + str.substring(2 * count)) ** power
      return `rgb(${r}, ${g}, ${b})`
    }
    return null
  },
  rgbToHsl (r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h= (max + min) / 2
    let s= (max + min) / 2
    const l= (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    return [h, s, l]
  },
  /**
   *       const originalColor = dwSurveyColorUtils.hexToRgb('#6b14d5') // 红色
   *       const similarColor = dwSurveyColorUtils.generateSimilarColor(originalColor, -0.1, 0.1) // 更饱和的红色
   *       document.documentElement.style.setProperty('--original-color', originalColor)
   *       document.documentElement.style.setProperty('--near-color1', similarColor)
   *       console.debug('originalColor similarColor', originalColor, similarColor)
   */
  /**
   * @param color 接收原始颜色（作为字符串形式的RGB值）
   * @param saturationAdjustment 饱和度调整值（-1 表示更饱和，+1 表示更灰）
   * @param lightnessAdjustment 和亮度调整值（-1 表示更暗，+1 表示更亮）
   * @returns {string} 函数返回调整过后的HSL颜色字符串
   */
  generateSimilarColor (color, saturationAdjustment, lightnessAdjustment, isWhite) {
    const adjustHSL = (h, s, l, saturationAdjust, lightnessAdjust) => {
      s += saturationAdjust
      l += lightnessAdjust
      l = l * 100
      if (!isWhite && l>100) l = 98 // 防止超过100为纯白
      return `hsl(${h * 360}, ${s * 100}%, ${l}%)`
    }
    const [r, g, b] = color.match(/\d+/g).map(Number)
    const [h, s, l] = this.rgbToHsl(r, g, b)
    return adjustHSL(h, s, l, saturationAdjustment, lightnessAdjustment)
  },
  isWhiteColor (color) {
  // 将颜色转换为RGB
    const rgb = [color.red, color.green, color.blue].map(channel => channel / 255)
    console.debug('rgb', rgb)
    // 定义白色的阈值，RGB各通道值都在一个很小的范围内则认为是白色
    const threshold = 0.95
    return rgb.every(channel => channel > threshold)
  },
  hslToRgb (h, s, l) {
    // let r, g, b
    function hue2Rgb (p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const r = hue2Rgb(p, q, h + 1/3)
    const g = hue2Rgb(p, q, h)
    const b = hue2Rgb(p, q, h - 1/3)

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }
}

export function getDefaultSurveyStyle () {
  const defaultSurveyStyle = {
    pageTopImg: {enabled: false, src: null, httpSrc: null},
    pageBgImg: {enabled: false, src: null, httpSrc: null},
    logoImg: {enabled: false, src: null, httpSrc: null, position: 'topLogoRight'},
    pageBgColor: '#dfdfe0',
    pageThemeColor: '#b53bde',
    pageThemeColor1: '#7d08a9',
    logoBgColor: '#900abd',
    progressColor: '#a40ed7',
    showQuNum: true,
    showProgressbar: true,
    showPageHeader: true,
    showQuTypeName: true,
    showSurveyTitle: true,
    showSurveyNote: true
  }
  return defaultSurveyStyle
}
