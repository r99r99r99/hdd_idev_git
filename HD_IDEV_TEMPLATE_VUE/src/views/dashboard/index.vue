<template>
  <div id="indexBgId" class="indexBg" style="width:100%; height:auto;min-height: 100%;">
    <div v-if="isEdit" style="margin:10px 0 0 10px">
      <el-button type="primary" @click="add">增加</el-button>
      <el-button @click="doSave">保存</el-button>
      <el-button @click="doReset" v-if="!isDefaultSets">重置</el-button>
    </div>
    <grid-layout
      :layout="layOut"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true">

      <grid-item v-for="item in layOut" :key="item.detailId"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i" dragAllowFrom=".canDrag">
        <div class="canDrag boxTitleBg" >{{item.title}}
          <i class="el-icon-delete" v-if="isEdit"
             @click="doRemove(item)"
             style="float:right;font-size: 20px;cursor:pointer;"></i>
        </div>
        <div style="height:calc(100% - 40px)">
          <component :is="item.urlImport"></component>
        </div>
      </grid-item>
    </grid-layout>
    <boardadd ref="boardadd" @getObj="addBoard"></boardadd>
  </div>

</template>

<script>
  import {GridLayout, GridItem} from 'vue-grid-layout'
  import boardadd from './boardadd'

  export default {
    name: 'dashboard',
    components: {GridLayout, GridItem, boardadd},
    data() {
      return {
        layOut: [],
        fullHeight: document.documentElement.clientHeight
      }
    },
    mounted() {
      this.doQuery()
      const that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    },
    methods: {
      doQuery() {
        let url = "/webresources/login/privilege/AuthBoard/findMy"
        if (this.isDefaultSets) {
          url = "/webresources/login/privilege/AuthBoard/findDefault"
        }
        this.$http.post(url).then(response => {
          let boardData = response.data
          for (let i = 0; i < boardData.length; i++) {
            let oneBoard = boardData[i]
            oneBoard.urlImport = () => import('@/views/' + oneBoard.urlPath + ".vue")
            oneBoard.i = i
          }
          this.layOut = boardData
        })
      },
      doSave() {
        let url = "/webresources/login/privilege/AuthBoard/saveMySet"
        if (this.isDefaultSets) {
          url = "/webresources/login/privilege/AuthBoard/saveDefaultSet"
        }
        this.$http.post(url, this.layOut).then(response => {
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          if (data.code == '-1') {
            return
          }
          if (this.isDefaultSets) {
            return true
          }
          this.$router.push({
            path: '/dashboard'
          })
        })

      },
      doReset() {
        this.$http.post('/webresources/login/privilege/AuthBoard/reset').then(response => {
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          if (data.code == '-1') {
            return
          }
          this.doQuery()
          this.$router.push({
            path: '/dashboard'
          })
        })

      },
      doRemove(row) {
        var length = this.layOut.length;
        for (var i = 0; i < length; i++) {
          if (this.layOut[i] == row) {
            this.layOut.splice(i, 1); //删除下标为i的元素
            return;
          }
        }
      },
      add() {
        this.$refs.boardadd.show()
      },
      addBoard(one) {
        let num = this.layOut.length
        let board = {}
        if (num != 0) {
          let lastLayout = this.layOut[num - 1]
          board.i = lastLayout.i + 1
          board.y = lastLayout.y + lastLayout.h //y为上下
        } else {
          board.i = 1
          board.y = 0
        }

        board.x = 0
        board.w = 24
        board.h = 6
        board.title = one.text
        board.urlImport = () => import('@/views/' + one.url + ".vue")
        board.menuId = one.id
        this.layOut.push(board)
      }

    },
    computed: {
      isEdit() {
        if (this.$route.params.defaultSet == 1) {//默认首页设置
          return true
        } else {
          return this.$route.query.isEdit == 1 ? true : false
        }
      },
      isDefaultSets() {//设置默认首页
        return this.$route.params.defaultSet == 1 ? true : false
      }
    },
    created() {
    },
  }
</script>
