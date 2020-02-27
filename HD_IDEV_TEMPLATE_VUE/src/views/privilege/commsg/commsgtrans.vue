<template>
  <el-container direction="vertical" style="height: 60vh;padding: 0">
    <ex-header height="50px">
      <div class="filter-container" style="padding: 5px">
        {{$t('用户查询')}}
        <el-input :placeholder="$t('姓名、账号')" @keyup.enter.native="doQuery()" class="filter-item"
                  style="width: 200px;"
                  v-model="hdQuery.query.name">
        </el-input>
        <orgnselect :idVal.sync="hdQuery.query.orgnId" :placeholder="$t('请选择组织')"
                    :txtVal.sync="hdQuery.query.orgnIdStr" class="filter-item"></orgnselect>
        <roleselect :idVal.sync="hdQuery.query.roleId" :txtVal.sync="hdQuery.query.roleIdStr"
                    class="filter-item"></roleselect>
        <el-button @click="doQuery">{{$t('搜索')}}</el-button>
        <el-button @click="hdQuery.query={}">{{$t('清空')}}</el-button>

      </div>
    </ex-header>
    <el-main>
      <div style="width:100%;height:100%;">
        <el-container style="width:100%;height:100%;">
          <ex-aside width="45%">
            <hd-grid :hdQuery="hdQuery" :hdResult="hdResultLeftSel"
                     @row-dblclick="leftClick" @selection-change="leftSelMe" noSets recHide v-loading="listLoading1">
              <div class="el-line">{{$t('未选')}}</div>
              <el-table-column align="left" header-align="center" label="姓名" prop="name" sortable width="130px">
              </el-table-column>
              <el-table-column align="left" header-align="center" label="部门" prop="orgnName" sortable width="130px">
              </el-table-column>
              <el-table-column align="left" header-align="center" label="账号" prop="account" sortable>
              </el-table-column>
            </hd-grid>
          </ex-aside>
          <ex-aside :arrowShow="false" width="80px">
            <el-row align="middle" justify="center" style="height: 100%" type="flex">
              <el-col :span="20">
                <el-button @click="addSel()" style="width: 100%">{{$t('选择')}}</el-button>
                <br/><br/>
                <el-button @click="removeSel()" style="width: 100%">{{$t('移除')}}</el-button>
              </el-col>
            </el-row>
          </ex-aside>
          <el-main :arrowShow="false" width="50%">
            <hd-grid :hdResult="hdResultRightSel" @row-dblclick="rightClick" @selection-change="rightSelMe" noSets
                     pageHide
                     recHide>
              <div class="el-line">{{$t('已选')}}</div>
              <el-table-column align="left" header-align="center" label="姓名" prop="name" sortable width="130px">
              </el-table-column>
              <el-table-column align="left" header-align="center" label="部门" prop="orgnName" sortable width="130px">
              </el-table-column>
              <el-table-column align="left" header-align="center" label="账号" prop="account" sortable width="130px">
              </el-table-column>
            </hd-grid>
          </el-main>
        </el-container>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import roleselect from '../role/roleselect'
  import orgnselect from '../orgDept/orgnselect'


  export default {
    name: 'MsgTrans',
    components: {orgnselect, roleselect},
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
      msgId: function (newVal) {
        this.initQuery()
      }
    },
    methods: {
      initQuery() {
        console.log('initQuery', this.msgId, this.orgnIds)
        this.$http.get(`/webresources/login/com/ComMsg/findUserByMsgId/${this.msgId}`).then(response => {
          this.hdResultRightSel.rows = response.data == null ? [] : response.data
        })
      },
      doQuery() {
        let excIds = ''
        this.listLoading1 = true
        for (let i = 0; i < this.hdResultRightSel.rows.length; i++) {
          excIds += this.hdResultRightSel.rows[i].userId + ','
        }
        this.hdQuery.query.excIds = excIds
        this.$http.post(`/webresources/login/com/ComMsg/find/user`, this.hdQuery).then(response => {
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
          excIds += this.hdResultRightSel.rows[i].userId + ','
        }
        return excIds;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
