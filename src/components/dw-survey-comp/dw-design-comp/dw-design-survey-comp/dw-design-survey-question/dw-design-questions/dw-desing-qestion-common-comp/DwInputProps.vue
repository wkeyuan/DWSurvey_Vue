<template>
  <el-form ref="form" label-width="80px" size="mini">
    <el-form-item v-show="survey.questions[index].quType!=='FILLBLANK'" label="是否必填">
      <el-radio-group v-model="inputProp.commonAttr.isRequired">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <!--    <div>{{ inputProp }}</div>-->
    <el-form-item label="校验规则">
      <el-select v-model="inputProp.commonAttr.checkType" placeholder="请选择数据校验规则" @change="changeCheckType">
        <el-option
          v-for="item in checkType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-show="inputProp.commonAttr.checkType === 'TIME'" v-model="inputProp.dateTimeAttr.dateFormat" placeholder="日期格式" style="width: 290px;" >
        <el-option :value="5" label="时分秒（HH:mm:ss）"></el-option>
        <el-option :value="6" label="时分（HH:mm）"></el-option>
        <el-option :value="7" label="时分下拉控件（HH:mm）"></el-option>
      </el-select>
      <el-select v-show="inputProp.commonAttr.checkType === 'DATE'" v-model="inputProp.dateTimeAttr.dateFormat" placeholder="日期格式" style="width: 290px;">
        <el-option :value="3" label="年月日（YYYY-MM-DD）"></el-option>
        <el-option :value="2" label="年月（YYYY-MM）"></el-option>
        <el-option :value="1" label="年（YYYY）"></el-option>
      </el-select>
      <el-select v-show="inputProp.commonAttr.checkType === 'DATETIME'" v-model="inputProp.dateTimeAttr.dateFormat" placeholder="日期格式" style="width: 290px;">
        <el-option :value="4" label="年月日时分秒（YYYY-MM-DD HH:mm:ss）"></el-option>
        <!--        <el-option :value="8" label="年月日时分（YYYY-MM-DD HH:mm）"></el-option>-->
      </el-select>
    </el-form-item>
    <el-form-item label="输入提示">
      <el-input v-model="inputProp.commonAttr.placeholder"/>
    </el-form-item>
    <el-form-item label="默认内容">
      <el-input v-model="inputProp.commonAttr.defaultValue"/>
    </el-form-item>
    <!--    v-show="inputProp.commonAttr.checkType==='' || inputProp.commonAttr.checkType === 'NO' || inputProp.commonAttr.checkType === 'UNSTRCN' || inputProp.commonAttr.checkType === 'STRCN'"-->
    <el-form-item label="显示行数" >
      <el-input-number v-model="inputProp.commonAttr.inputRow" :min="1" />&nbsp;行
    </el-form-item>

    <el-form-item v-show="inputProp.commonAttr.checkType === 'TIME' || inputProp.commonAttr.checkType === 'DATE' || inputProp.commonAttr.checkType === 'DATETIME'" label="属性配置">
      <el-checkbox-group v-model="inputProp.dateTimeAttr.attrs" @change="changeDateAttrs">
        <!--        <el-checkbox label="show-now" >显示当前日期时间</el-checkbox>-->
        <el-checkbox v-show="inputProp.commonAttr.checkType === 'DATE'" label="more" >可选择多个日期</el-checkbox>
        <el-checkbox v-show="inputProp.dateTimeAttr.dateFormat!==1" label="range" >使用范围选择器</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item v-show="(inputProp.commonAttr.checkType === 'TIME' && inputProp.dateTimeAttr.dateFormat===7) || (inputProp.commonAttr.checkType === 'TIME' && inputProp.dateTimeAttr.dateFormat!==7 && !inputProp.dateTimeAttr.attrs.includes('range'))" label="时间限制">
      <el-time-picker v-show="inputProp.dateTimeAttr.dateFormat===7 || (inputProp.dateTimeAttr.dateFormat!==7 && !inputProp.dateTimeAttr.attrs.includes('range'))" v-model="inputProp.dateTimeAttr.timeRange.range" format="HH:mm" value-format="HH:mm" is-range style="margin-right: 10px;width: 300px;" ></el-time-picker>
      <span v-show="inputProp.dateTimeAttr.dateFormat === 7">步长 <el-time-picker v-model="inputProp.dateTimeAttr.timeRange.step" format="HH:mm" value-format="HH:mm" style="width: 100px;" ></el-time-picker></span>
    </el-form-item>

    <el-form-item v-show="inputProp.commonAttr.checkType === 'NUM' || inputProp.commonAttr.checkType === 'DIGITS'" label="数据范围">
      <span>
        最小值 <el-input-number v-model="inputProp.numAttr.min" style="margin-right: 10px;"></el-input-number>
        最大值 <el-input-number v-model="inputProp.numAttr.max" ></el-input-number>
      </span>
    </el-form-item>
    <el-form-item v-show="inputProp.commonAttr.checkType === 'NUM'" label="保留精度" style="display: none;">
      <el-input-number v-model="inputProp.numAttr.precision"/>&nbsp;位
    </el-form-item>

    <el-form-item v-show="inputProp.commonAttr.checkType !== 'NUM' && inputProp.commonAttr.checkType !== 'DIGITS' && inputProp.commonAttr.checkType !== 'TIME' && inputProp.commonAttr.checkType !== 'DATE' && inputProp.commonAttr.checkType !== 'DATETIME'" label="数据范围">
      最少字数 <el-input-number v-model="inputProp.commonAttr.minlength" style="margin-right: 10px;"></el-input-number>
      最大字数 <el-input-number v-model="inputProp.commonAttr.maxlength" ></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'DwInputProps',
  model: {
    prop: 'inputProp',
    event: 'update-input-prop'
  },
  props: {
    index: {type: Number, default: 0},
    inputProp: {type: Object, default: () => {}},
    survey: {type: Object, default: () => {}}
  },
  data () {
    return {
      checkType: [
        {value: 'NO', label: '无验证'},
        {value: 'EMAIL', label: 'Email'},
        {value: 'NUM', label: '数字'},
        {value: 'DIGITS', label: '整数'},
        {value: 'TEL_PHONE', label: '手机或电话'},
        {value: 'TIME', label: '时间'},
        {value: 'DATE', label: '日期'},
        {value: 'DATETIME', label: '日期时间'},
        {value: 'ZIPCODE', label: '邮政编码'},
        {value: 'TEL', label: '电话号码'},
        {value: 'PHONE', label: '手机号码'},
        {value: 'IDENT_CODE', label: '身份证号'},
        {value: 'URL', label: '网址'},
        {value: 'UNSTRCN', label: '禁止中文'},
        {value: 'STRCN', label: '仅许中文'}
      ]
    }
  },
  methods: {
    changeCheckType () {
      const checkType = this.inputProp.commonAttr.checkType
      const dateFormat = this.inputProp.dateTimeAttr.dateFormat
      if (checkType === 'TIME' && dateFormat !== 5 && dateFormat !== 6) {
        this.inputProp.dateTimeAttr.dateFormat = 5
      } else if (checkType==='DATE' && dateFormat !== 1 && dateFormat !== 2 && dateFormat !== 3) {
        this.inputProp.dateTimeAttr.dateFormat = 3
      } else if (checkType==='DATETIME') {
        this.inputProp.dateTimeAttr.dateFormat = 4
      }
    },
    changeDateAttrs (val) {
      console.debug('val', val)
      // 实现互斥选择
      // this.inputProp.dateTimeAttr.attrs = val && val.length>0 ? [val[val.length-1]] : []
      // show-now more range
      if (val) {
        const temp = val.map((item, index) => {
          if (item === 'more' || item==='range') return item
        })
        const newVal = val.map((item, index) => {
          if (!(item === 'more' || item==='range')) return item
        })
        if (temp.length>0) newVal.push(temp[temp.length-1])
        this.inputProp.dateTimeAttr.attrs = newVal
      }
      console.debug('inputProp.dateTimeAttr.attrs', this.inputProp.dateTimeAttr.attrs)
    }
  }
}
</script>

<style scoped>

</style>
