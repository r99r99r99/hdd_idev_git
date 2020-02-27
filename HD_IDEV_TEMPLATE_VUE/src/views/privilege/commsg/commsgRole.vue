<template>
  <el-container style="height: 60vh;padding: 0" direction="vertical">
    <ex-header height="50px">
      <div class="filter-container" style="padding: 5px">
        {{$t('角色查询')}}
        <el-input @keyup.enter.native="doQuery()" style="width: 200px;" class="filter-item"
                  :placeholder="$t('角色名')"
                  v-model="hdQuery.query.name">
        </el-input>
        <orgnselect :txtVal.sync="hdQuery.query.orgnIdStr" :idVal.sync="hdQuery.query.orgnId"
                    class="filter-item" :placeholder="$t('请选择组织')"></orgnselect>
        <el-button @click="doQuery">{{$t('搜索')}}</el-button>
        <el-button @click="hdQuery.query={}">{{$t('清空')}}</el-button>
      </div>
    </ex-header>
    <el-main>
      <div style="width:100%;height:100%;">
        <el-container style="width:100%;height:100%;">
          <ex-aside width="45%">
            <hd-grid :hdQuery="hdQuery" :hdResult="hdResultLeftSel"
                     @selection-change="leftSelMe" recHide noSets v-loading="listLoading1" @row-dblclick="leftClick">
              <div class="el-line">{{$t('未选')}}</div>
              <el-table-column width="130px" align="left" header-align="center" label="名称" prop="name" sortable>
              </el-table-column>
              <el-table-column width="130px" align="left" header-align="center" label="部门" prop="orgnName" sortable>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="描述" prop="description" sortable>
              </el-table-column>
            </hd-grid>
          </ex-aside>
          <ex-aside width="80px" :arrowShow="false">
            <el-row type="flex" justify="center" align="middle" style="height: 100%">
              <el-col :span="20">
                <el-button @click="addSel()" style="width: 100%">{{$t('选择')}}</el-button>
                <br/><br/>
                <el-button @click="removeSel()" style="width: 100%">{{$t('移除')}}</el-button>
              </el-col>
            </el-row>
          </ex-aside>
          <el-main width="50%" :arrowShow="false">
            <hd-grid :hdResult="hdResultRightSel" pageHide @selection-change="rightSelMe" recHide noSets
                     @row-dblclick="rightClick">
              <div class="el-line">{{$t('已选')}}</div>
              <el-table-column width="130px" align="left" header-align="center" label="名称" prop="name" sortable>
              </el-table-column>
              <el-table-column width="130px" align="left" header-align="center" label="部门" prop="orgnName" sortable>
              </el-table-column>
              <el-table-column width="130px" align="left" header-align="center" label="描述" prop="description" sortable>
              </el-table-column>
            </hd-grid>
          </el-main>
        </el-container>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import orgnselect from '../orgDept/orgnselect'


  export default {
    name: 'MsgRole',
    components: {orgnselect},
    data() {
      return {
        hdQuery: new HdQuery(this),
        hdResultLeftSel: {rows: []},//左侧数据
        hdResultRightSel: {rows: []},
        leftSel: [], // check 左侧
        rightSel: [], //
        leftCheck: Object,
        rightCheck: Object,
        listLoading1: false,
        listLoading2: false
      }
    },
    // hdResult展示 hdQuery查询 defaultSort默认排序 pageHide true隐藏分页
    props: {
      msgId: String,
      orgnIds: String
    },
    watch: {
      msgId : function (newVal) {
        this.initQuery()
      }
    },
    methods: {
      initQuery() {
        this.$http.get(`/webresources/login/com/ComMsg/findRoleByMsgId/${this.msgId}`).then(response => {
          this.hdResultRightSel.rows = response.data == null ?  [] : response.data
        })
      },
      doQuery() {
        let excIds = ''
        this.listLoading1 = true
        for (let i = 0; i < this.hdResultRightSel.rows.length; i++) {
          excIds += this.hdResultRightSel.rows[i].roleId + ','
        }
        this.hdQuery.query.excIds = excIds
        this.$http.post(`/webresources/login/com/ComMsg/find/role`, this.hdQuery).then(response => {
          this.listLoading1 = false
          this.hdResultLeftSel = response.data
        })
      },
      leftSelMe(select) {
        this.leftSel = select
      },
      rightSelMe(select) {
        this.rightSel = select
      },
      leftClick(row) {
        this.hdResultRightSel.rows.push(row)
        this.hdResultLeftSel.rows.remove(row)
        this.leftSel.remove(row)
      },
      rightClick(row) {
        this.hdResultRightSel.rows.remove(row)
        this.hdResultLeftSel.rows.push(row)
        this.rightSel.remove(row)
      },
      addSel() {
        this.leftSel.forEach((value) => {
          this.hdResultRightSel.rows.push(value)
          this.hdResultLeftSel.rows.remove(value)
        })
        this.leftSel = []
      },
      removeSel() {
        this.rightSel.forEach((value) => {
          this.hdResultLeftSel.rows.push(value)
          this.hdResultRightSel.rows.remove(value)
        })
        this.rightSel = []
      },
      getOrgIds() {
        let excIds = ''
        for (let i = 0; i < this.hdResultRightSel.rows.length; i++) {
          excIds += this.hdResultRightSel.rows[i].roleId + ','
        }
        return excIds;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
