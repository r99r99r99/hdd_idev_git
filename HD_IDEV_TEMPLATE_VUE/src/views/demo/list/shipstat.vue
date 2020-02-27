<template>
  <div  class="boxBg">
    <el-card class="box-card">
      <div class="shipTable item hd-title">
        <el-col :span="3">
          泊位
        </el-col>
        <el-col :span="3">
          船名
        </el-col>
        <el-col :span="3">
          船长
        </el-col>
        <el-col :span="4">
          计划日期
        </el-col>
        <el-col :span="4">
          靠泊
        </el-col>
        <el-col :span="4">
          离港
        </el-col>
        <!--<el-col :span="3">
          状态
        </el-col>-->
        <el-col :span="3">
          流向
        </el-col>
      </div>
      <div v-for="(o,i) in hdResult" style="height: 25px"
           :class="{'shipTable':true, 'active_color':i%2 != 0, 'nactive_color':i%2 != 1}">
        <el-col :span="3">
          <div class="context">
            {{o.berthNam}}
          </div>
        </el-col>
        <el-col :span="3">
          <div class="context">
            {{o.shipNam}}
          </div>
        </el-col>
        <el-col :span="3">
          <div class="context">
            {{o.shipLongNum}}
          </div>
        </el-col>
        <el-col :span="4">
          <div class="context">
            {{o.eta}}
          </div>
        </el-col>
        <el-col :span="4">
          <div class="context">
            {{o.rtb}}
          </div>
        </el-col>
        <el-col :span="4">
          <div class="context">
            {{o.rtd}}
          </div>
        </el-col>
        <!--<el-col :span="3">-->
          <!--<div class="context">-->
            <!--{{o.shipStatId}}-->
          <!--</div>-->
        <!--</el-col>-->
        <el-col :span="3">
          <div class="context">
            {{o.portNam}}
          </div>
        </el-col>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hdQuery: new HdQuery(this),
        hdResult: []
      }
    },
    mounted() {
      this.hdQuery.rows = '13'
      this.hdQuery.sort = 'eta'
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/webresources/login/ship/ShipTopStatic/msckb2/find', this.hdQuery).then(response => {
          const data = response.data;
          this.hdResult = response.data.rows;
        })
      },
    }
  }
</script>

<style scoped>


  /*.active_color {*/
  /*background-color: #222a26;*/
  /*}*/
  /*.nactive_color {*/
  /*background-color: #232a23;*/
  /*}*/
  .box-card {
    width: '100%';
    border-width: 0px;
  }

  .context {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  .context:hover {
    width: 100%;
    overflow: visible;
    height: fit-content;
    white-space: normal;
  }
</style>
