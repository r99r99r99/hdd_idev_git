<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/person/PersonPlan">
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
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row.noPkName)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>

              <el-table-column width="100px" align="center" label="" prop="id" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="对应c_person表的person_no" prop="personNo" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="身份证号" prop="personCardNo" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="姓名" prop="presonNam" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="部门" prop="personDeptCod" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="联系方式" prop="personLinkTel" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="去向单位" prop="planPlace" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="访问事项" prop="planMatter" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="预约生效时间" prop="effctTim" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="预约截止时间" prop="validTim" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="可进门次数" prop="inNumbers" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="预计进入口门（可不填）" prop="inGateNo" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="预计出口门（可不填）" prop="outGateNo" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="ifendId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="ifendNam" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="ifendTim" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="udpNam" sortable>
              </el-table-column>


      </hd-com-grid>
    </el-main>
    <personplanform ref="personplanform" @save-ok="$refs.grid.doQuery()"></personplanform>
  </el-container>
</template>
<script>
  import personplanform from './personplanform'
  export default {
    name: 'personplan',
    components: {  personplanform },
    data() {
      return {
        hdQuery: new HdQuery(this),
       }
    },

    mounted() {

    },
    methods: {

      doEdit(noPkName) { // 增加或编辑
        this.$refs['personplanform'].show(noPkName)
      },
    }
  }
</script>
