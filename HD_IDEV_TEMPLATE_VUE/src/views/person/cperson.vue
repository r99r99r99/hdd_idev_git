<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/person/CPerson">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="doQuery" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()"  keyType="query">搜索</el-button>
          <el-button class="filter-item"  @click="doEdit('')" type="primary" icon="edit" keyType="add">新增
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger"  keyType="del">删除
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row.id)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>

              <el-table-column width="100px" align="center" label="" prop="id" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="系统生成的流水号" prop="personNo" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="姓名" prop="personNam" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="性别(0:男；1：女)" prop="personSex" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="工号" prop="personJobNumber" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="人员类型（1：临时访客，2：长期人员）" prop="personKnd" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="人员类别（等级等区分s_code）" prop="personTyp" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="身份证件号码" prop="personCardNo" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="工作单位代码" prop="personDeptCod" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="联系电话" prop="personLinkTel" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="人员二维码" prop="personEwMark" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="信息来源途径（1：录入；2：人事系统接口3：...）" prop="infoWay" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="备注" prop="remarkTxt" sortable>
              </el-table-column>


      </hd-com-grid>
    </el-main>
    <cpersonform ref="cpersonform" @save-ok="$refs.grid.doQuery()"></cpersonform>
  </el-container>
</template>
<script>
  import cpersonform from './cpersonform'
  export default {
    name: 'cperson',
    components: {  cpersonform },
    data() {
      return {
        hdQuery: new HdQuery(this),
       }
    },

    mounted() {

    },
    methods: {

      doEdit(id) { // 增加或编辑
        this.$refs['cpersonform'].show(id)
      },
    }
  }
</script>
