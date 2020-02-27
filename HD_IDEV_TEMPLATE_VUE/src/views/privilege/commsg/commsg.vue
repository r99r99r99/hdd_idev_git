<template>
  <el-container>
    <el-main>

      <hd-com-grid :hdQuery="hdQuery" ref="grid" url="/webresources/login/com/ComMsg" visualScroll>
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" :placeholder="$t('名称')"
                    style="width: 200px;"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button @click="$refs.grid.doQuery()" class="filter-item" icon="search" ref="q" type="primary">{{$t('搜索')}}
          </el-button>
          <el-button @click="doEdit('')" class="filter-item" icon="edit" ref="a" type="primary">{{$t('新增')}}
          </el-button>
          <el-button @click="$refs.grid.doRemoveAll()" class="filter-item" ref="d" type="danger">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <hd-btn @click.stop="doEdit(scope.row.msgId)" hint="编辑" icon="el-icon-edit"></hd-btn>
            <hd-btn @click.stop="$refs.grid.doRemove(scope.row)" hint="删除" icon="el-icon-delete"></hd-btn>
            <hd-btn @click.stop="send(scope.row.msgId)" hint="发送" icon="el-icon-phone"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column align="center" label="CODE" prop="msgCode" sortable width="100px">
        </el-table-column>
        <el-table-column align="center" label="标题" prop="title" sortable width="100px">
        </el-table-column>
        <el-table-column align="center" label="类型" prop="msgTypeName" width="150px">
        </el-table-column>
        <el-table-column align="center" label="内容" prop="content" sortable width="300px">
        </el-table-column>
        <el-table-column align="center" label="打开路径" prop="url" sortable width="100px">
        </el-table-column>

      </hd-com-grid>
    </el-main>
    <commsgform @save-ok="$refs.grid.doQuery()" ref="commsgform"></commsgform>
  </el-container>
</template>
<script>
  import commsgform from './commsgform'

  export default {
    components: {commsgform},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },

    mounted() {

    },
    methods: {

      doEdit(msgId) { // 增加或编辑
        this.$refs['commsgform'].show(msgId)
      },
      send(msgId) { // 增加或编辑
        this.$http.post(`/webresources/login/com/ComMsg/send?msgId=${msgId}`).then(response => {
          var data = response.data
          if (data.code != '1') {
            this.$message({
              type: 'error',
              message: data.message
            })
          } else {
            this.$message({
              type: 'success',
              message: this.$t('发送成功')
            })
          }
        })
      }
    }
  }
</script>
