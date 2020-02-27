<template>
  <el-container>
    <el-aside style="border-right: 1px solid #eee" width="260px">
      <hd-tree :data="data" @node-click="handleNodeClick" node-key="id"></hd-tree>
    </el-aside>
    <el-main>

      <hd-com-grid :hdQuery="hdQuery" ref="grid" url="/webresources/login/privilege/SysLog/" visualScroll
                   :pageSizes="[100,500,1000,5000,10000]" @row-dblclick="row=>this.$refs.syslogform.show(row.logId)">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" :placeholder="$t('实体名、修改人')"
                    style="width: 200px;"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button @click="$refs.grid.doRemoveAll()" class="filter-item" keyType="del" ref="del"
                     type="danger">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="60px">
          <template slot-scope="scope">
            <hd-btn @click.stop="$refs.grid.doRemove(scope.row)" hint="删除" icon="el-icon-delete">
              {{$t('删除')}}
            </hd-btn>
            <hd-btn @click.stop="$refs.syslogform.show(scope.row.logId)" hint="查看" icon="el-icon-search">
              {{$t('查看')}}
            </hd-btn>
          </template>
        </el-table-column>
        <!--   <el-table-column label="详细" type="expand">
             <template slot-scope="props">

               <div style="width: 800px;word-wrap:break-word;">{{ props.row.logContent }}</div>

             </template>
           </el-table-column>-->
        <el-table-column align="left" header-align="center" label="实体名" prop="entityName" sortable
                         width="350px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="菜单名" prop="menuName" sortable
                         width="100px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="修改人" prop="recNam" sortable
                         width="140px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="日志类型" prop="logTypeStr" sortable
                         width="100px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="ip及路径" prop="userIp" sortable
                         width="180px">
        </el-table-column>

      </hd-com-grid>
    </el-main>
    <syslogform ref="syslogform"></syslogform>
  </el-container>
</template>
<script>

  import Syslogform from "./syslogform";

  export default {
    components: {Syslogform},
    data() {
      return {
        data: [],
        parentId: '', // 选中的树节点
        hdQuery: new HdQuery(this)

      }
    },
    mounted() {
      this.doQuery()
      //      this.$refs.grid.doEdit = function () { 重写doEdit
      //        console.info(this.$options.name)
      //      }
    },
    methods: {
      doQuery() {
        this.$http.post('/webresources/login/privilege/AuthPrivilege/getAllTree').then(response => {
          this.data = response.data
        })
      },
      doListQuery() {
        this.hdQuery.query.menuId = this.parentId
        this.$refs.grid.doQuery()
      },
      handleNodeClick(obj) {
        this.parentId = obj.id
        this.doListQuery()
      },
      doEdit(row) {
        if (!row && !this.parentId) { // 新增
          this.$message({
            type: 'error',
            message: this.$t('未选择数据')
          })
          return false
        }
        // 调用父组件的
        this.$refs.grid.doEdit(row)
      }
    },
    computed: {// 给外层v-model赋值
      validate() {
        return {text: [{message: this.$t('权限名必填'), required: true}, {max: 50, message: this.$t('名称长度不能超过50个字符')}]}
      },
      findUrl() { // 因为查询的路径和默认的不一致,如果代码生成器生成其实不需要写
        return '/webresources/login/privilege/AuthPrivilege/find'
      },
      findoneUrl() { // 需要关联节点,所以需要写url,普通列表也不需要写
        return '/webresources/login/privilegeVue/findone?parentId=' + this.parentId
      }
    }
  }
</script>
