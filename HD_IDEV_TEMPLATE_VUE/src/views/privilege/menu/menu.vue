<template>
  <el-container>
    <!--快捷键-->
    <!--<hd-hot-key :keyMap="['alt','e']" btnRef="add"></hd-hot-key>-->
    <!--<hd-hot-key :keyMap="['alt','d']" btnRef="del"></hd-hot-key>-->
    <el-aside width="260px" style="border-right: 1px solid #eee">
      <hd-tree :data="data" @node-click="handleNodeClick" node-key="id"></hd-tree>
    </el-aside>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/privilegeVue" :validate="validate"
                   :findUrl="findUrl" :findoneUrl="findoneUrl">
        <div class="filter-container" slot="query">
          <el-button class="filter-item" @click="doEdit()" 　type="primary" ref="add" keyType="add">{{$t('新增')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" ref="del"
                     keyType="del">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column width="60px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row)" v-if="!scope.row.isEdit"></hd-btn>
            <hd-btn icon="el-icon-check" hint="保存" @click.stop="$refs.grid.doSave(scope.row)" v-if="scope.row.isEdit">
            </hd-btn>
            <!--hd-btn不能写icon-->
            <hd-btn hint="撤销" @click.stop="$refs.grid.doCancel(scope.row,scope.$index)" v-if="scope.row.isEdit">
              <svg-icon icon-class="undo"/>
            </hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"
                    v-if="!scope.row.isEdit">
            </hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="权限名" prop="text" :rules="$r(1,0,50)"
                         sortable>
        </el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="英文名" prop="enText" sortable>
        </el-table-column>
        <el-table-column width="400px" align="left" header-align="center" label="URL" prop="url" sortable>
        </el-table-column>
        <el-table-column width="60px" align="right" header-align="center" label="排序" prop="sorter" sortable>
          <template slot-scope="scope">
            <el-input type="number" v-model.numebr="scope.row.sorter" v-if="scope.row.isEdit"></el-input>
            <span v-else>{{scope.row.sorter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="使用" prop="state" sortable>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" v-if="scope.row.isEdit" active-value="open"
                       inactive-value="closed"></el-switch>
            <span v-else>{{scope.row.state == 'open' ? '√' : '×'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="tab打开" prop="openType" sortable>
          <template slot-scope="scope">
            <!--easyui版本为0 tab 1 iframe 2 window-->
            <el-switch v-model="scope.row.openType" v-if="scope.row.isEdit" active-value="0"
                       inactive-value="2"></el-switch>
            <span v-else>{{scope.row.openType == '0' ? '√' : '×'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" header-align="center" label="图标" prop="iconCls" width="100px">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.iconCls" v-if="scope.row.isEdit"></el-input>
            <span v-else>{{scope.row.iconCls}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px" align="left" header-align="center" label="备注" prop="description" sortable>
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.description" v-if="scope.row.isEdit"></el-input>
            <span v-else>{{scope.row.description}}</span>
          </template>
        </el-table-column>
      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>

export default {
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
      this.hdQuery.query.parentId = this.parentId
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
      return { text: [{ message: this.$t('权限名必填'), required: true }, { max: 50, message: this.$t('名称长度不能超过50个字符') }] }
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
