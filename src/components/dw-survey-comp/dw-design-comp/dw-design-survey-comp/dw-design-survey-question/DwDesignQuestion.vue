<template>
  <div>
    <div class="dw-question-root"  @mouseover="mouseover" @mouseleave="mouseleave">
      <div class="dw-question-top" >
        <div class="">
          <div class="dw-margin-left-right-10" style="font-size: 14px;"></div>
          <div v-show="hover" class="dw-display-flex-right">
            <el-tooltip class="item" effect="dark" content="复制本题" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa fa-copy" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="向上移" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa el-icon-top" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="向下移" placement="top">
              <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-icon dw-event-color fa el-icon-bottom" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="dw-question-body" >
        <div class="dw-question-body-left">
          <div v-show="hover">
            <el-tooltip class="item" effect="dark" content="移动本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-arrows" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="题目设置" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-cog" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="题目逻辑" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-code-fork" aria-hidden="true"></i></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除本题" placement="left">
              <div class="dw-question-toolbar dw-margin-bottom-10"><i class="dw-cursor-pointer dw-event-color fa fa-trash fa fa-arrows" aria-hidden="true"></i></div>
            </el-tooltip>
          </div>
        </div>
        <div class="dw-question-body-center">
          <div class="dw-question-body-center-body" >
            <div class="dw-qu-content">
              <div class="dw-qu-title-body">
                <div>{{index+1}}、</div><div>请输入题目标题</div>
              </div>
              <div class="dw-qu-content-body">

                <div class="dw-qu-content-body-content">

                  <div class="dw-qu-item" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem" >
                    <div class="dw-qu-item-body">
                      <div class="dw-qu-item-el-checkbox-radio">
                        <i class="dw-qu-item-el-checkbox-radio-icon fa fa-square-o"></i>
                        <div :class="itemHover ? 'dw-input-focus':''" class="dw-input-default dw-qu-option-text">选项1</div>
                      </div>
                    </div>
                    <div v-show="itemHover" class="dw-qu-item-toolbar dw-display-flex-right" >
                      <el-tooltip class="item" effect="dark" content="排序选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i></div>
                      </el-tooltip>
                    </div>
                  </div>

                  <div class="dw-qu-item" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem">
                    <div class="dw-qu-item-body">
                      <div class="dw-qu-item-el-checkbox-radio">
                        <!--                                                <i class="dw-qu-item-el-checkbox-radio-icon dw-checked fa fa-check-square"></i>-->
                        <i class="dw-qu-item-el-checkbox-radio-icon fa fa-square-o"></i>
                        <div :class="itemHover ? 'dw-input-focus':''" class="dw-input-default dw-qu-option-text" >选项2</div>
                      </div>
                    </div>
                    <div v-show="itemHover" class="dw-qu-item-toolbar dw-display-flex-right">
                      <el-tooltip class="item" effect="dark" content="排序选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i></div>
                      </el-tooltip>
                    </div>
                  </div>

                  <div class="dw-qu-item" @mouseover="mouseoverItem" @mouseleave="mouseleaveItem">
                    <div class="dw-qu-item-body">
                      <div class="dw-qu-item-el-checkbox-radio">
                        <i class="dw-qu-item-el-checkbox-radio-icon fa fa-square-o"></i>
                        <div :class="itemHover ? 'dw-input-focus':''" class="dw-input-default dw-qu-option-text" >选项3选项3选项3选项3选项3选项3选项3选项3选项3选项3选项3选项3选项3</div>
                      </div>
                    </div>
                    <div v-show="itemHover" class="dw-qu-item-toolbar dw-display-flex-right">
                      <el-tooltip class="item" effect="dark" content="排序选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="在后添加选项" placement="top">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i></div>
                      </el-tooltip>
                    </div>
                  </div>

                </div>

                <div class="dw-question-body-bottom dw-padding-top-10">
                  <div v-show="hover">
                    <div class="dw-display-flex-left">
                      <el-tooltip class="item" effect="dark" content="添加选项" placement="left">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-plus" aria-hidden="true"></i></div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="批量添加选项" placement="right">
                        <div class="dw-question-toolbar dw-margin-right-10"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i></div>
                      </el-tooltip>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="dw-question-body-right">
          <div v-show="false">
            <div class="dw-question-toolbar"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-copy" aria-hidden="true"></i></div>
            <div class="dw-question-toolbar"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-top" aria-hidden="true"></i></div>
            <div class="dw-question-toolbar"><i class="dwMoveSortQu dw-cursor-pointer dw-event-color el-icon-bottom" aria-hidden="true"></i></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DwQuestionDesign',
  data () {
    return {
      hover: false,
      itemHover: false
    }
  },
  methods: {
    mouseleave () {
      this.hover = false
    },
    mouseover () {
      this.hover = true
    },
    mouseleaveItem () {
      this.itemHover = false
    },
    mouseoverItem () {
      this.itemHover = true
    }
  }
}
</script>

<style scoped>
.dw-question-top{
  height: 20px;
}
.dw-question-body{
  padding: 0px;
  /*background: lightgrey;*/
  margin: 0px;
  display: grid;
  grid-template-columns: 40px auto 40px;
}
.dw-question-body-left,.dw-question-body-right{
  /*background: grey;*/
  text-align: center;
}
.dw-question-body-left{

}
.dw-question-body-right{

}
.dw-padding-top-10{
  padding-top: 10px;
}
.dw-margin-bottom-10{
  margin-bottom: 10px;
}
.dw-margin-left-right-10{
  margin-right: 10px;
  margin-left: 10px;
}
.dw-margin-right-10{
  margin-right: 10px;
}
.dw-display-flex{
  display: flex;
  align-items: center;
}
.dw-display-flex-left{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.dw-display-flex-right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.dw-event-color{
  color: #095aaa;
}
.dw-input-default{
  border: 1px solid transparent;
}
.dw-input-focus{
  border: 1px solid #095aaa;
  background: #e5f5f5;
}
.dw-question-body-center-body{
  color: #333;
}
.dw-qu-item{
  display: grid;
  grid-template-columns: auto 90px;
}
.dw-qu-title-body{
  display: inline-flex;
}
.dw-qu-item-body{
  margin: 0px;
}
.dw-qu-item-el-checkbox-radio{
  /*display: inline-flex;*/
  display: flex;
  align-items: center;
  padding: 5px 0px;
  font-size: 14px;
}
.dw-qu-item-el-checkbox-radio-icon{
  /*background: red;*/
  font-size: 18px;
  width: 28px;
  color: #848484;
}
.dw-qu-item-el-checkbox-radio-icon.dw-checked{
  color: #0557a8;
}
.dw-qu-item-el-checkbox-radio .dw-qu-option-text{
  /*margin:auto;*/
  width: 100%;
  padding: 6px;
}
.dw-question-body-bottom{
  height: 20px;
}
.dw-cursor-pointer{
  cursor: pointer;
}
</style>
