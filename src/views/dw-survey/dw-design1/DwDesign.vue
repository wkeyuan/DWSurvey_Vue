<template>
  <div class="dw-design-container">
    <el-container>
      <el-header class="header" style="">
        <el-row type="flex" justify="space-between" align="middle" >
          <el-col :span="12">
            <div class="header-content-left">
              <div class="logo">
                <a href="#">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRDRFQ0Y5QjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRDRFQ0ZBQjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNENEVDRjdCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNENEVDRjhCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GJisjAAAFMklEQVR42uzdTYhVZRjA8XNrSAqTIq0EqYSCCoQWgeFCHcJsEbVo1UARkbYIChdFbloFWosWQVAWhFBDmyJa1FhR46YPC0KkhCgzN9OXJH2JhdyeM3Mnq3veMJp5z3lnfj94mCLo3nPu/O97z51z7u31+/0qh9749I88NzbHd336jo8NbUuR2zMxOrM9CfX2/BRzIuboYL6KORxzMOZAzCcxv3dpmzavnL//90gFf3fuYJYP/n3dP/778ZgPYybr3mL2xZxcqDvjDL8P/Ednx6yPeTjm3ZipmKdiNsyutgKBU1bE3DNYUT6LeSDmPIHAsMtjHos5EvN4zEUCgebjmG0xh2J2xCwVCAw7J+ahwUuvO0o8RhEIOdRvxO6O2RNzmUCg2aaY/TFjAoFmy2JeiNkVs0Qg0GxLzN6q4+90CYQ2rY15L+ZKgUCz1YOV5BqBQLMLY96OWSMQaHZ+zGsxqwQCzVYNVpIVAoFmV8S8GnOWQKDZdTGPCgTS7o+5RSDQrD6x8bmYSwUCzep3tp6pWjwLWCB0XX2C4+0CgbT6gH2ZQKDZxTHbBQJp91UtnPkrEEoxe/muQCDh7irzRwoJhJIsHUQiEEjYWmX8u4hAKE19MuN6gUDabQKBtFtjzhQINKu/mmGtQCBts0AgbaNAIO3aKsNluQKhVPWpJ1cLBNLWCATSrhIIpK0WCKRdIhBIWy4QSLtAIJC2RCCQNu9fLz2SeYN6C+wBGtqeidGFtT2LnRUE/u0Zo9/v2wtzaM+UfZDb5pVWEPASC7om20F6b7zsHdUf88tiBQHaWUFmn4gL3EeL5q3PG98p7/GZGJ3fx8cKAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEAjTq9ft5vhq7Nz79o9jvSe+PLeBfgvE//7HIx2c+HxsrCAgEBAICgZxG2jjgpbsHvHaBFQRO/xkj19u8YAUBgYCD9Ll/LTde9o5aJH9J99hYQaCDK8hs7CU+wS6i3wePjxUEBAICAYHAIjpIX/BKf8sUKwgIBAQCAgGBgEBAICAQEAgIxC4AgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAqch9/ek9+zyTvP4WEGggytIf8zOxgoCAgEvseb66G+87B3115eIpW8LVhAoawWZfSIucB/1bE+x22MFYVH72UssSDshEEg7KhBI+14gkHZEIJB2WCCQ9qlAIO2AQKDZr1YQSPso5jeBQLPJHDciEEr1hkCgWf0HwvcFAs1eijkpEGj2Yq4bEgil+Txmr0Cg2dNVxgu7BEJJ6gukns15gwKhJHUcxwQCw+pTS3bmvlGBUIonYr4RCAz7OmZHGzcsEEqwPeZHgcCwN2N2t3XjAqHLfojZWrX4gXYCoavqKO6qMlx3LhBKVL9r9Urbd0IgdFF9KvuDXbgjAqFrDsXcXGW4nFYglOa7mJsGPyuBwCn1O1abYg526U4JhC74Nub6mP1du2MCoW1fxmyM+biLd04gtOmDmHVde1klELqgvrZjQzVzImJnjXicyKw+6fDemOdLuLMCIae3YrZULZ8+4iUWXTMVc2fMDSXFYQVhvtWXyT4Z80jV0vUcAqGLfhkchO/s+kG4QMjpi5hdgzm2EDZIIPxf9QdJv1zNfBzoZNXixU0CoQuOVzNfXlPH8HrMvirTB0m34Q8BBgDCrqxH8SRKpAAAAABJRU5ErkJggg==" alt="logo" height="200">
                  <h1>调问-全新问卷编辑器</h1>
                </a>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right;">
              <!--<el-button-group>
                <el-button type="primary" icon="el-icon-edit" >编辑</el-button>
                <el-button type="primary" icon="el-icon-share">收集</el-button>
                <el-button type="primary" icon="el-icon-delete">统计</el-button>
              </el-button-group>-->
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0px;">
        <div>
          <div>
            <div>
              <div id="tools_wrap" :style="headerQuToolbarStyle" >
                <el-tabs type="border-card">
                  <el-tab-pane label="常用题型">
                    <div>
                      <el-row>
                        <el-col :span="20">
                          <el-row>
                            <!--                    <el-col v-for="item in 24" :span="1" ><div class="grid-content">{{item}}{{drag?'拖拽中':'拖拽停止'}}</div></el-col>-->
                            <draggable
                              v-model="arr1"
                              :group="{ name: 'people', pull: 'clone', put: false }"
                              animation="300"
                              drag-class="drag-class"
                              ghost-class="ghost-class"
                              chosen-class="chosen-class"
                              @start="onStart"
                              @end="onEnd">
                              <transition-group>
                                <el-col v-for="item in arr1" :key="item.id" :span="1" class="item" >
                                  <div class="grid-content">Q{{ item.id }}</div>
                                </el-col>
                              </transition-group>
                            </draggable>
                          </el-row>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple-light">
                            <div>{{ drag ? '拖拽中' : '拖拽停止' }}</div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="矩阵扩展">矩阵扩展</el-tab-pane>
                  <el-tab-pane label="常用题库">常用题库</el-tab-pane>
                </el-tabs>
              </div>
              <div style="margin-top: 137px;">
                <div @click="domClick">
                  <el-row>
                    <el-col :span="4"><div class="grid-content">L</div></el-col>
                    <el-col :span="16"><div class="grid-content design-body">
                      <div style="">问卷标题</div>
                      <draggable
                        v-model="arr2"
                        group="people"
                        animation="300"
                        drag-class="drag-class"
                        ghost-class="ghost-class"
                        chosen-class="chosen-class"
                        @start="onStart"
                        @end="onEnd">
                        <transition-group>
                          <div v-for="item in arr2" :key="item.id" class="item" >
                            <template v-if="item.quType==='radio'"><qu-redio :qu-num="item.id"></qu-redio></template>
                            <template v-if="item.quType==='checkbox'"><qu-checkbox :child="item.child" :qu-num="item.id" @show-text-editor="showEditor"></qu-checkbox></template>
                            <template v-if="item.quType==='input'"><qu-input :qu-num="item.id"></qu-input></template>
                            <template v-if="item.quType==='rate'"><qu-rate :qu-num="item.id" @show-text-editor="showEditor"></qu-rate></template>
                            <template v-if="item.quType==='select'"><qu-select :qu-num="item.id"></qu-select></template>
                          </div>
                        </transition-group>
                      </draggable>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content">R</div></el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <dw-text-editor ref="dwTextEditor" @set-edit-text="setEditText"></dw-text-editor>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import QuRedio from './components/dw-qus/QuRedio'
import QuCheckbox from './components/dw-qus/QuCheckbox'
import QuRate from './components/dw-qus/QuRate'
import QuSelect from './components/dw-qus/QuSelect'
import DwTextEditor from './components/dw-common/DwTextEditor'
import QuInput from './components/dw-qus/QuInput'

export default {
  name: 'DwDesign',
  components: {
    DwTextEditor,
    QuRate,
    QuCheckbox,
    draggable,
    QuRedio,
    QuSelect,
    QuInput
  },
  data () {
    return {
      textEditorVisible: 'display: none',
      drag: false,
      myArray: [
        {people: 'cn', id: 1, name: 'www.itxst.com'},
        {people: 'cn', id: 2, name: 'www.baidu.com'},
        {people: 'cn', id: 3, name: 'www.taobao.com'},
        {people: 'us', id: 4, name: 'www.google.com'},
        {people: 'us', id: 5, name: 'www.google.com'},
        {people: 'us', id: 6, name: 'www.google.com'},
        {people: 'us', id: 7, name: 'www.google.com'},
        {people: 'us', id: 8, name: 'www.google.com'},
        {people: 'us', id: 9, name: 'www.google.com'},
        {people: 'us', id: 10, name: 'www.google.com'},
        {people: 'us', id: 11, name: 'www.google.com'},
        {people: 'us', id: 12, name: 'www.google.com'},
        {people: 'us', id: 13, name: 'www.google.com'}
      ],
      arr1: [
        {id: 1, name: 'www.itxst.com', quType: 'radio'},
        {
          id: 2,
          name: 'www.jd.com',
          quType: 'checkbox',
          child: [
            {id: 21, name: '北京'},
            {id: 22, name: '上海'},
            {id: 23, name: '武汉'},
            {id: 24, name: '深圳'}
          ]
        },
        {id: 3, name: 'www.jd.com', quType: 'input'},
        {id: 4, name: 'www.jd.com', quType: 'rate'},
        {id: 5, name: 'www.jd.com', quType: 'select'}
      ],
      arr2: [
        // {id:1,name:'www.google.com'},
        // {id:2,name:'www.msn.com'},
        // {id:3,name:'www.ebay.com'},
        {id: 4, name: 'www.yahoo.com'}
      ],
      curDomId: '',
      curDataIndex: [],
      headerQuToolbarStyle: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onStart () {
      this.drag=true
    },
    onEnd () {
      this.drag=false
    },
    showEditor (id) {
      console.debug('design-editor:'+id)
      this.curDomId = id
      this.$refs.dwTextEditor.showEditor(id)
    },

    domClick () {
      // this.textEditorVisible = 'display: none'
      this.setEditText()
      this.$refs.dwTextEditor.hideEditor()
    },
    setEditText () {
      if (this.curDataIndex.length > 0) {
        const curIndex = this.curDataIndex
        console.debug('curIndex')
        console.debug(curIndex)
        this.arr1[curIndex[0]].child[curIndex[1]].name = this.$refs.dwTextEditor.getText()
      } else {
        const arr1 = this.arr1
        arr1.forEach((item, index) => {
          if (item.quType === 'checkbox') {
            const child = item.child
            child.forEach((item_1, index_1) => {
              console.debug('this.curDomId')
              console.debug(item_1.id)
              console.debug(this.curDomId)
              if (item_1.id === this.curDomId) {
                console.debug('wweeww')
                item_1.name = this.$refs.dwTextEditor.getText()
                this.curDataIndex = [index, index_1]
              }
            })
          }
        })
      }
    },
    onScroll (position) {
      console.debug('position')
      console.debug(position)
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop)
      const headerHeight = 60
      // const quDesignHeight = 119
      if (scrollTop >= headerHeight) {
        this.headerQuToolbarStyle = 'top:0px;'
        // const heHeight = quDesignHeight - headerHeight
        // this.headerEmptyStyle = `height:${heHeight}px;`
      } else {
        // this.headerToolbar = true
        const newTop = headerHeight - scrollTop
        this.headerQuToolbarStyle = `top:${newTop}px;`
        // const heHeight = quDesignHeight - scrollTop
        // this.headerEmptyStyle = `height:${heHeight}px;`
      }
      /*
      const quDesignHeight = 119
      if (scrollTop >= headerHeight) {
        this.leftStyle = `top:${quDesignHeight}px;`
        this.rightStyle = `top:${quDesignHeight}px;`
      } else {
        this.leftStyle = `top:${quDesignHeight}px;`
        this.rightStyle = `top:${quDesignHeight}px;`
      }
      */
    }
  }
}
</script>

<style scoped>
.dw-design-container{
  background-color: #f6f7fa;
}
.header .header-content-left{
  display: flex;
}
.header .header-content-left .logo{
  width: 200px;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
}
.header .header-content-left img{
  vertical-align: middle;
}
.header .header-content-left .logo h1{
  display: inline-block;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  vertical-align: top;
}
.grid-content{
  margin: 2px;
  /*background: gainsboro;*/
  /*padding: 30px 10px;*/
  padding: 15px 0px;
  text-align: center;
}
.design-body{
  min-height: 800px;
  background: white;
  margin-top: 20px;
}

/*被拖拽对象的样式*/
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}

.ghost-class{
  background-color: #cacad3 !important;
}
.chosen-class{
  /*background-color: red !important;*/
  opacity: 1!important;
}
.drag-class{
  background-color: #ffffff !important;
  opacity: 1 !important;
  box-shadow:none !important;
  outline:none !important;
  background-image:none !important;
}

#tools_wrap{
  background: #D6DCE4;
  padding-top:1px;
  position: fixed;
  z-index:200;
  width: 100%;
  box-shadow:  4px 1px 3px rgba(224, 229, 233, 0.44);
  top: 60px;
}
</style>
