<template>
  <el-container>
    <el-aside style="border-right: 1px solid #eee" width="260px">
      <hd-tree :data="menuData" @node-click="handleNodeClick" node-key="id"></hd-tree>
    </el-aside>
    <el-main>
      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/com/ComSearch">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" style="width: 200px;" class="filter-item"
                    :placeholder="$t('名称')"
                    v-model="hdQuery.query.name">
          </el-input>
          <el-button class="filter-item" @click="$refs.grid.doQuery()" icon="search" type="primary" ref="q" keyType="query">{{$t('搜索')}}
          </el-button>
          <el-button class="filter-item" type="primary" @click="doAdd()" icon="edit" ref="a" keyType="add">{{$t('新增')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" ref="d" keyType="del">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column width="90px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <HdGridEditBtn style="display: inline;" :row="scope.row" gridRef="grid"></HdGridEditBtn>
            <hd-btn icon="el-icon-refresh" hint="刷新" @click.stop="doRefresh(scope.row)" v-if="!scope.row.isEdit"></hd-btn>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="索引名称" prop="indexName" sortable :rules="$r(0,0,30)" noEdit sortable>
        </el-table-column>
        <el-table-column width="120px" align="center" label="索引CODE" prop="searchCode" sortable :rules="$r(0,0,50)" sortable>
        </el-table-column>
        <el-table-column width="120px" align="center" label="索引菜单" :inputFormat="(v,r)=>r.menuName" prop="menuId" sortable noEdit>
        </el-table-column>
        <el-table-column width="330px" align="center" label="索引实体" prop="entityName" sortable :rules="$r(0,0,255)" sortable>
        </el-table-column>
        <el-table-column width="140px" align="center" label="上次刷新时间" :inputProp="$date" prop="flushTim" sortable noEdit>
        </el-table-column>
      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>

  export default {
    name: 'comsearch',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this),
        menuData: [],
        selData: {},
      }
    },

    mounted() {
      this.doMenuQuery();
    },
    methods: {
      doAdd() {
        if(!this.selData.children || this.selData.children.length > 0) {
          this.$message({
            type: 'error',
            message: this.$t('只能添加到节点菜单')
          });
          return;
        }
        let rowData = {};
        rowData.menuId = this.selData.id;
        rowData.menuName = this.selData.text;
        rowData.indexName = 'default';
        this.$refs.grid.doEdit('', rowData);
      },
      doMenuQuery() {
        this.$http.post('/webresources/login/privilege/AuthPrivilege/getAllTree/1/0').then(response => {
          console.log('menuData', response.data)
          this.menuData = response.data
        })
      },
      handleNodeClick(obj) {
        this.selData = obj;
        this.doListQuery()
      },
      doListQuery() {
        this.hdQuery.query.menuId = this.selData.id
        if(this.selData.id === '-1') {
          this.hdQuery.query.menuId = null
        }
        this.$refs.grid.doQuery();
      },
      doRefresh(obj) { // 刷新数据
        const loading = this.$loading({
          text : this.$t('正在生成索引，您可能需要一盏茶的时间请耐心等待...')
        })
        this.$http.post(`/webresources/login/com/ComSearch/flush/${obj.searchId}`).then(response => {
          loading.close();
          this.$message({
            type: 'success',
            message: this.$t(`刷新完成，共{num}条数据`, {'num':response.data.data}),
          });
        }, error=>{
          loading.close();
        })
      },
    }
  }
</script>
