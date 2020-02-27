<template>
  <el-container>
    <el-main>
      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/privilege/SysCode/vue"
                   noCopy="codeId" visualScroll :exField="exField">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" suffix-icon="el-icon-search"
                    style="width: 200px;float:right;"
                    class="filter-item" :placeholder="$t('名称、代码')"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" @click="doAdd" 　type="primary" keyType="add">{{$t('新增')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doCopy()" type="primary" keyType="copy">{{$t('复制')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">{{$t('删除')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doSaveAll()" type="danger" keyType="save">{{$t('保存')}}
          </el-button>
        </div>
        <el-table-column width="60px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <HdGridEditBtn :row="scope.row" gridRef="grid"></HdGridEditBtn>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="left" header-align="center" label="代码" prop="code" sortable
                         :rules="$r(1,0,36)">
        </el-table-column>
        <el-table-column width="120px" align="left" header-align="center" label="名称" prop="name" sortable
                         :rules="$r(1,0,50)">
        </el-table-column>
        <el-table-column width="120px" align="left" header-align="center" label="英文名" prop="enName" sortable>
        </el-table-column>
        <el-table-column align="left" header-align="center" label="排序号" prop="sorter" sortable input="HdNum"
                         :rules="$r(0,0,100000,'number')">
        </el-table-column>
        <el-table-column align="center" label="系统" prop="sysMark" sortable input="el-switch"
                         :inputProp='{activeValue:"1", inactiveValue:"0"}' :inputFormat='$ckFt'>
        </el-table-column>
        <el-table-column align="center" label="废弃" prop="abandonedMark" sortable input="el-switch"
                         :inputProp='{activeValue:"1", inactiveValue:"0"}' :inputFormat='$ckFt'>
        </el-table-column>
        <el-table-column width="150px" align="left" header-align="center" label="备注/描述" prop="description" sortable>
        </el-table-column>
      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>

    export default {
        name: 'syscode',
        data() {
            return {
                hdQuery: new HdQuery(this),
                exField: {
                    open: true,
                    table: 'SYS_CODE',
                    columnList: ['CUSTOM_EX1', 'CUSTOM_EX2', 'CUSTOM_EX3', 'CUSTOM_EX4', 'CUSTOM_EX5'],
                    gridCode: 'syscodeGrid'
                },
            }
        },
        // mounted() {//页面加载后执行
        //   this.doQuery()
        // },
        props: {},
        methods: {
            querycode(row) {
                this.hdQuery.query.fieldCod = row.fieldCod
                this.$refs.grid.doQuery()
            },
            doAdd() {
                if (!this.hdQuery.query.fieldCod) {
                    this.$message({
                        type: 'error',
                        message: this.$t('未选择数据')
                    })
                    return false
                }
                this.$refs.grid.doEdit('')
            }
        },
        computed: {// 给外层v-model赋值
        }
    }
</script>
