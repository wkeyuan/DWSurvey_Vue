function dwCheckValue (checkType, value, customRegex) {
  const validateStatus = {
    isOK: true,
    msg: ''
  }
  if (value===null || value===undefined || value.length<=0) {
    validateStatus.isOK = false
    validateStatus.msg = '输入值不能为空'
  }
  if (checkType === 'NO') {
    if (value.length<=0) {
      validateStatus.isOK = false
      validateStatus.msg = '输入值不能为空'
    }
  } else if (checkType === 'EMAIL') {
    const __email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!__email.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入值邮箱地址'
    }
  } else if (checkType === 'UNSTRCN') {
    const unCnRegExp = /^[\u3220-\uFA29]+$/
    if (unCnRegExp.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入非中文字符'
    }
  } else if (checkType === 'STRCN') {
    const cnRegExp = /^[\u3220-\uFA29]+$/
    if (!cnRegExp.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入中文字符'
    }
  } else if (checkType === 'NUM') {
    // "number[/[+|-][int|integer|float|double|money|{位数正则}.{位数正则}]]"
    //					var __regex = /^\d+(\.\d+)?$/;
    const numRegex = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    if (!numRegex.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入数字'
    }
  } else if (checkType === 'DIGITS') {
    const digitsRegExp = /^\d+$/
    if (!digitsRegExp.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入整数'
    }
  } else if (checkType === 'TEL') {
    const telRegExp = /^\d{3,4}-{1}\d{7,9}-?\d{1,6}$/
    const tel400800RegExp = /^(400{1}-?[0-9]{3}-?[0-9]{4})|(800{1}-?[0-9]{3}-?[0-9]{4})$/
    if (!(telRegExp.test(value) || tel400800RegExp.test(value))) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入电话号'
    }
  } else if (checkType === 'PHONE') {
    const length = value.length
    const mobileRegExp = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
    if (!(length === 11 && mobileRegExp.test(value))) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入手机号'
    }
  } else if (checkType === 'TEL_PHONE') {
    const mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
    const tel = /^\d{3,4}-{1}\d{7,9}-?\d{1,6}$/
    const tel400800 = /^(400{1}-?[0-9]{3}-?[0-9]{4})|(800{1}-?[0-9]{3}-?[0-9]{4})$/
    if (!(tel400800.test(value) || tel.test(value) || mobile.test(value))) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入电话或手机号'
    }
  } else if (checkType === 'DATE') {
    // 日期的正则表达式
    const reg0 = /^[1-9]\d{3}$/// 2014-01-01
    const regExp0 = new RegExp(reg0)
    const reg10 = /^[1-9]\d{3}-(0[1-9]|1[0-2])$/// 2014-01
    const regExp10 = new RegExp(reg10)
    const reg1 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/// 2014-01-01
    const regExp1 = new RegExp(reg1)
    const reg2 = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/// 12:00:00
    const regExp2 = new RegExp(reg2)
    const reg2_1 = /^(20|21|22|23|[0-1]\d):[0-5]\d$/// 12:00
    const regExp2_1 = new RegExp(reg2_1)
    const reg3 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/// 2014-01-01 12:00:00
    const regExp3 = new RegExp(reg3)
    if (!(regExp0.test(value) || regExp1.test(value) || regExp10.test(value) || regExp2.test(value) || regExp3.test(value) || regExp2_1.test(value))) {
      //						alert("日期格式不正确，正确格式为：2014-01-01");
      // errorType = "DATE";
      validateStatus.isOK = false
      validateStatus.msg = '请输入日期，如2014-01-01'
    }

    /* if (/Invalid|NaN/.test(new Date(value).toString())) {
      validateStatus = false;
    }*/
  } else if (checkType === 'IDENT_CODE') {
    const check = /^\d{15}|(\d{17}(\d|x|X))$/.test(value)
    if (!(check && (value.length === 15 || value.length === 18))) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入身份证号'
    }
  } else if (checkType === 'ZIPCODE') {
    const tel = /^[0-9]{6}$/
    if (!tel.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入邮政编号'
    }
  } else if (checkType === 'URL') {
    const strRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    if (!strRegex.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '请输入网址URL'
    }
  } else if (checkType === 'CUSTOM') {
    const strRegex = new RegExp(customRegex)
    if (!strRegex.test(value)) {
      validateStatus.isOK = false
      validateStatus.msg = '不符合校验规则'
    }
  }
  return validateStatus
}

export {dwCheckValue}
