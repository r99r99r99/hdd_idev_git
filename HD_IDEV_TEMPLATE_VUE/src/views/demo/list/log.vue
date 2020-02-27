<template>
  <div class="boxBg">
    <el-card class="box-card">
      <!--  <div  class="shipTable item hd-title">
          <el-col :span="6">
            时间
          </el-col>
          <el-col :span="6">
            中文船名
          </el-col>
          <el-col :span="6">
            英文船名
          </el-col>
          <el-col :span="6">
            位置
          </el-col>
        </div>-->
      <div v-for="(o,i) in hdResult" style="height: 25px;text-align: left"
           :class="{'shipTable':true, 'active_color':i%2 != 0, 'nactive_color':i%2 != 1}">
        <el-col :span="24">
          <marquee direction=left align=middle style="margin-left: 30px">{{o.classLog}}</marquee>
          <!--<div class="context">
            {{o.classLog}}
          </div>-->
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
      this.hdQuery.rows = '6'
      this.hdQuery.sort = 'planDte';
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/webresources/login/ship/ShipTopStatic/msckb1/find', this.hdQuery).then(response => {
          const data = response.data;
          this.hdResult = response.data.rows;
        })
      },
    }
  }
</script>
