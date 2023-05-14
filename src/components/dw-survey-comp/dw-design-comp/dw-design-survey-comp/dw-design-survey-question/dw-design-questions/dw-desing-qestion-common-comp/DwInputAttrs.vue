<template>
  <el-form ref="form" label-width="80px" size="mini">
    <el-form-item label="行数">
      <el-input-number v-model="inputProp.answerInputRow"/>
    </el-form-item>
    <el-form-item label="输入提示">
      <el-input v-model="inputProp.placeholder"/>
    </el-form-item>
    <el-form-item label="默认内容">
      <el-input v-model="inputProp.defaultText"/>
    </el-form-item>
    <el-form-item label="校验规则">
      <el-select v-model="inputProp.checkType" placeholder="请选择数据校验规则" @change="changeCheckType">
        <el-option
          v-for="item in checkType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span v-show="inputProp.checkType === 'NUM' || inputProp.checkType === 'DIGITS'" >
        从 <el-input-number v-model="inputProp.min" style="margin-right: 10px;"></el-input-number>
        到 <el-input-number v-model="inputProp.max" ></el-input-number>
      </span>
      <el-select v-show="inputProp.checkType === 'TIME'" v-model="inputProp.dateFormat" placeholder="日期格式" style="width: 290px;" >
        <el-option :value="5" label="时分秒（HH:mm:ss）"></el-option>
        <el-option :value="6" label="时分（HH:mm）"></el-option>
        <el-option :value="7" label="指定时间点（HH:mm）"></el-option>
      </el-select>
      <el-select v-show="inputProp.checkType === 'DATE'" v-model="inputProp.dateFormat" placeholder="日期格式" style="width: 290px;">
        <el-option :value="3" label="年月日（YYYY-MM-DD）"></el-option>
        <el-option :value="2" label="年月（YYYY-MM）"></el-option>
        <el-option :value="1" label="年（YYYY）"></el-option>
      </el-select>
      <el-select v-show="inputProp.checkType === 'DATETIME'" v-model="inputProp.dateFormat" placeholder="日期格式" style="width: 290px;">
        <el-option :value="4" label="年月日时分秒（YYYY-MM-DD HH:mm:ss）"></el-option>
        <el-option :value="8" label="年月日时分（YYYY-MM-DD HH:mm）"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-show="inputProp.checkType === 'TIME'" label="时间范围">
      <el-time-picker v-model="inputProp.timeRange" :format="inputProp.dateFormat === 5 ? 'HH:mm:ss':'HH:mm'" :value-format="inputProp.dateFormat === 5 ? 'HH:mm:ss':'HH:mm'" is-range style="margin-right: 10px;width: 300px;" ></el-time-picker>
      <span v-show="inputProp.dateFormat === 7">步长 <el-time-picker v-model="inputProp.step" :picker-options="{selectableRange: '00:01:00 - 12:00:00'}" format="HH:mm" value-format="HH:mm" style="width: 100px;" ></el-time-picker></span>
    </el-form-item>
    <el-form-item v-show="inputProp.checkType === 'TIME' || inputProp.checkType === 'DATE' || inputProp.checkType === 'DATETIME'" label="属性配置">
      <el-checkbox-group v-model="inputProp.dateAttrs" @change="changeDateAttrs">
        <el-checkbox label="show-now" >显示当前日期时间</el-checkbox>
        <el-checkbox v-show="inputProp.checkType === 'DATE'" label="more" >可选择多个日期</el-checkbox>
        <el-checkbox v-show="inputProp.dateFormat !== 7 && inputProp.dateFormat !== 1" label="range" >使用范围选择器</el-checkbox>
      </el-checkbox-group>
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
    inputProp: {type: Object, default: () => {}}
  },
  data () {
    return {
      checkType: [
        {value: 'NO', label: '无验证'},
        {value: 'EMAIL', label: 'Email'},
        {value: 'NUM', label: '数字'},
        {value: 'DIGITS', label: '整数'},
        {value: 'TELE_PHONE_NUM', label: '手机或电话'},
        {value: 'TIME', label: '时间'},
        {value: 'DATE', label: '日期'},
        {value: 'DATETIME', label: '日期时间'},
        {value: 'ZIPCODE', label: '邮政编码'},
        {value: 'TELENUM', label: '电话号码'},
        {value: 'PHONENUM', label: '手机号码'},
        {value: 'IDENTCODE', label: '身份证号'},
        {value: 'URL', label: '网址'},
        {value: 'UNSTRCN', label: '禁止中文'},
        {value: 'STRCN', label: '仅许中文'}
      ]
    }
  },
  methods: {
    changeCheckType () {
      const checkType = this.inputProp.checkType
      const dateFormat = this.inputProp.dateFormat
      if (checkType === 'TIME' && dateFormat !== 5 && dateFormat !== 6) {
        this.inputProp.dateFormat = 5
      } else if (checkType==='DATE' && dateFormat !== 1 && dateFormat !== 2 && dateFormat !== 3) {
        this.inputProp.dateFormat = 3
      } else if (checkType==='DATETIME') {
        this.inputProp.dateFormat = 4
      }
    },
    changeDateAttrs (val) {
      console.debug('val', val)
      // 实现互斥选择
      // this.inputProp.dateAttrs = val && val.length>0 ? [val[val.length-1]] : []
      // show-now more range
      if (val) {
        const temp = val.map((item, index) => {
          if (item === 'more' || item==='range') return item
        })
        const newVal = val.map((item, index) => {
          if (!(item === 'more' || item==='range')) return item
        })
        if (temp.length>0) newVal.push(temp[temp.length-1])
        this.inputProp.dateAttrs = newVal
      }
    }
  }
}
</script>

<style scoped>

</style>
