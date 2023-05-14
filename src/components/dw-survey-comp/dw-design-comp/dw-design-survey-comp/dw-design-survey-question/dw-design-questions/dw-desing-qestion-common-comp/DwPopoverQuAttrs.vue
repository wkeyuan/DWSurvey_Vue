<template>
  <el-popover :value="survey.curEditObj[itemIndex].itemClick" placement="right-start" width="600" trigger="manual" popper-class="dw-qu-set-popper" >
    <div>
      <div style="font-size: 14px;padding-bottom: 5px;">
        <div class="dw-qu-item">
          <div style="font-weight: bold;">{{ popoverTitle }}</div>
          <div class="dw-display-flex-right">
            <!--            <i class="el-icon-close dw-cursor-pointer" @click="cancelAddOptionEvent" ></i>-->
          </div>
        </div>
      </div>
      <div style="padding: 5px;">
        <div style="min-height: 50px;">
          <el-form ref="form" label-width="80px" size="mini">
            <el-form-item label="是否必答">
              <el-radio-group v-model="survey.questions[index].isRequired">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="survey.questions[index].quType === 'RADIO' || survey.questions[index].quType === 'CHECKBOX'">
              <el-form-item label="显示风格">
                <el-select v-model="survey.questions[index].hv" placeholder="请选择显示风格" style="margin-right: 10px;">
                  <el-option :value="1" label="横向"></el-option>
                  <el-option :value="2" label="竖向"></el-option>
                  <el-option :value="4" label="下拉"></el-option>
                </el-select>
                <span v-show="survey.questions[index].hv === 1">每行显示列数 <el-input-number v-model="survey.questions[index].cellCount" style="margin-right: 10px;" ></el-input-number></span>
              </el-form-item>
              <el-form-item v-if="survey.questions[index].quType === 'CHECKBOX'" label="选择个数">
                最少 <el-input-number v-model="survey.questions[index].paramInt01" style="margin-right: 10px;"></el-input-number>
                最多 <el-input-number v-model="survey.questions[index].paramInt02"></el-input-number>
              </el-form-item>
            </template>
            <template v-else-if="survey.questions[index].quType === 'FILLBLANK'">
              <dw-input-attrs v-model="survey.questions[index]"></dw-input-attrs>
            </template>
            <template v-else-if="survey.questions[index].quType === 'SCORE'">
              <el-form-item label="分值区间">
                从 <el-input-number v-model="survey.questions[index].paramInt01" style="margin-right: 10px;"></el-input-number>
                到 <el-input-number v-model="survey.questions[index].paramInt02" ></el-input-number>
              </el-form-item>
            </template>
            <template v-else-if="survey.questions[index].quType === 'MULTIFILLBLANK'">
              <el-form-item label="最少回答">
                <el-input-number v-model="survey.questions[index].paramInt01" style="margin-right: 10px;" ></el-input-number> 项
              </el-form-item>
              <div style="border: 1px solid #eee;border-radius: 4px;">
                <div style="background: #f1f1f1;padding: 8px 0;">
                  <el-form-item label="选项属性" style="margin-bottom: 0;">
                    配置选项 <el-select v-model="tempForm.selectOptionIndex" placeholder="请选择选项">
                      <el-option
                        v-for="(item, optionIndex) in survey.questions[index].quMultiFillblanks"
                        :key="`quMFbk${optionIndex}`"
                        :label="item.optionTitleObj.dwText"
                        :value="optionIndex">
                      </el-option>
                    </el-select> 的属性规则如下
                  </el-form-item>
                </div>
                <div style="padding-top: 8px;padding-right: 8px;">
                  <el-form-item label="是否必填">
                    <el-radio-group v-model="survey.questions[index].quMultiFillblanks[tempForm.selectOptionIndex].isRequired">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <dw-input-attrs v-model="survey.questions[index].quMultiFillblanks[tempForm.selectOptionIndex]"></dw-input-attrs>
                </div>
              </div>
            </template>
            <template v-else-if="survey.questions[index].quType === 'UPLOADFILE'">
              <el-form-item label="文件类型">
                <el-select v-model="survey.questions[index].paramInt01" placeholder="日期格式" style="width: 290px;" >
                  <el-option :value="7" label="自限"></el-option>
                  <el-option :value="5" label="图片"></el-option>
                  <el-option :value="6" label="文档"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文件参数">
                上传附件数 <el-input-number v-model="survey.questions[index].randOrder" style="margin-right: 15px;"></el-input-number>
                单个文件最大支持 <el-input-number v-model="survey.questions[index].paramInt02"></el-input-number> M
                <div style="color: #c0c4cc;font-size: 12px;"> (空或0表示限制)</div>
              </el-form-item>
            </template>
          </el-form>
        </div>
        <!--
        <div style="text-align: right;">
          <el-button type="text" size="small" style="margin-top:5px;" @click="cancelAddOptionEvent">取消</el-button>
          <el-button type="primary" size="small" style="margin-top:5px;" @click="cancelAddOptionEvent">关闭</el-button>
        </div>
        -->
      </div>
    </div>
    <div slot="reference" @click.stop="clickShowPopoverEvent">
      <slot/>
    </div>
  </el-popover>
</template>

<script>
import {clickItem, upAllItemClick} from '../../../../../dw-utils/dw-update-survey-item-click'
import DwInputAttrs from './DwInputAttrs.vue'

export default {
  name: 'DwPopoverQuAttrs',
  components: {DwInputAttrs},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    popoverTitle: {type: String, default: '题目属性'}
  },
  data () {
    return {
      itemIndex: 0,
      checked: true,
      tempForm: {
        selectOptionIndex: 0
      }
    }
  },
  methods: {
    clickShowPopoverEvent () {
      // 父组件生成父组件的itemIndex, 子组件生成子组件的itemIndex, 最后排除父组件的itemIndex与子组件ItemIndex
      this.$emit('click-item')
      const parentItemIndex = this.survey.questions[this.index].itemIndex
      clickItem(this.survey, this.itemIndex, (survey, itemIndex) => {
        this.survey = survey
        this.itemIndex = itemIndex
      })
      this.upAllItemClick([this.itemIndex, parentItemIndex])
    },
    cancelAddOptionEvent () {
      // this.survey.curEditObj[this.itemIndex].itemClick = false
      this.upAllItemClick(null)
    },
    upAllItemClick (itemClicks) {
      upAllItemClick(this.survey, itemClicks, (survey) => { this.survey = survey })
    }
  }
}
</script>

<style scoped>
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
/deep/ .el-form-item__label{
  color: #333;
}
</style>
<style>

</style>
