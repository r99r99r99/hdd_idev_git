<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" findUrl="/webresources/login/com/ComMsg/find/rec"
                   notInit recHide  @row-dblclick="showMsg" @cell-click="cellClick" visualScroll
                   :pageSizes="[100,500,1000,5000,10000]">

        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" style="width: 200px;" class="filter-item"
                    :placeholder="$t('名称')"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-radio-group v-model="hdQuery.query.readFlg" size="mini" @change="$refs.grid.doQuery()">
            <el-radio-button label="">{{$t('全部')}}</el-radio-button>
            <el-radio-button label="0">{{$t('未读')}}</el-radio-button>
            <el-radio-button label="1">{{$t('已读')}}</el-radio-button>
          </el-radio-group>
          <hd-drop field="MSG_TYPE" v-model="hdQuery.query.msgType"  style="width: 180px;" class="filter-item"></hd-drop>
          <el-date-picker class="filter-item"  v-model="hdQuery.query.recTime" type="datetimerange"  style="width: 350px;"
                          value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"
                          :start-placeholder="$t('开始日期')" range-separator="-" :end-placeholder="$t('结束日期')"></el-date-picker>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()">{{$t('搜索')}}
          </el-button>
          <el-button class="filter-item" type="success" @click="readMessage()">{{$t('读取')}}
          </el-button>
        </div>
        <el-table-column width="150px" align="center" label="标题" prop="title" sortable>
        </el-table-column>
        <el-table-column width="150px" align="center" label="类型" prop="msgTypeName" >
        </el-table-column>
        <el-table-column width="600px" align="center" label="内容" prop="content" sortable>
        </el-table-column>
        <el-table-column width="150px" align="center" label="打开路径" prop="url" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="发送人" prop="sendNam" sortable>
        </el-table-column>
        <el-table-column width="130px" align="center" label="发送时间" prop="sendTim" sortable noEdit
                         input="el-date-picker"
                         :inputProp="$date">
        </el-table-column>
        <el-table-column width="130px" align="center" label="读取时间" prop="redTim" sortable noEdit
                         input="el-date-picker"
                         :inputProp="$date">
        </el-table-column>
      </hd-com-grid>
    </el-main>
    <commsgtoform ref="commsgtoform" @save-ok="$refs.grid.doQuery()"></commsgtoform>
    <commsgiframe ref="commsgiframe"></commsgiframe>
  </el-container>
</template>
<script>
  import commsgtoform from './commsgtoform'
  import commsgiframe from './commsgiframe'

  export default {
      components: { commsgtoform, commsgiframe },

    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },

    mounted() {
      this.hdQuery.sort = 'sendTim'
      this.$refs.grid.doQuery()
      this.$set(this.hdQuery.query, 'readFlg', '0')
    },
    methods: {
      showMsg(row) {
        this.$refs['commsgtoform'].show(row.recId)
      },
      readMessage() {
        const checkRows = this.$refs.grid.$refs.hdgrid.getCkRows()
        if (checkRows.length < 1) {
          this.$message({type: 'error', message: this.$t('请先选择消息！')})
          return;
        }
        this.$http.post('/webresources/login/com/ComMsg/batch/read', checkRows).then(response => {
          var data = response.data;
          if (data.code == '1') {
            this.$message({
              type: 'success',
              message: data.message
            })
            this.$store.state.user.messageNum = response.data.data;
            this.$refs.grid.doQuery();
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }


        })
      },
      cellClick(row, column) {
        if(column.property == 'url') {
          this.openUrl(row.url)
        }
      },
      openUrl(path){//这里必须是全局的
        if (path.indexOf('http://') == 0) {//http开头的在新窗口打开
          window.open(path);
        } else if(path.indexOf('iframe://') == 0) {
          this.$refs['commsgiframe'].show(path.substring(9));
        } else {
          this.$router.push({
            path: path,
          });
        }
      }
    }
  }

</script>
