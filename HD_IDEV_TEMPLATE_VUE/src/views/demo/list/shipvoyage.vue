<template>
  <div class="boxBg">
    <el-card class="box-card" shadow="never">
      <div class="shipTable item hd-title">
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
      </div>
      <marquee class="wrap" vspace='-100' behavior="alternate" direction="down" scrollamount='1'>
        <div v-for="(o,i) in hdResult" style="height: 30px"
             :class="{'shipTable':true, 'active_color':i%2 != 0, 'nactive_color':i%2 != 1}">
          <el-col :span="6">
            {{o.eta}}
          </el-col>
          <el-col :span="6">
            {{o.shipName}}
          </el-col>
          <el-col :span="6">
            {{o.enShipName}}
          </el-col>
          <el-col :span="6">
        <span v-if="o.shipStatFlag=='Y'">
          {{o.lastBerth}}
        </span>
            <span v-if="o.shipStatFlag=='E'">
          预报
        </span><span v-if="o.shipStatFlag=='M'">
          锚地
        </span><span v-if="o.shipStatFlag=='L'">
          离港
        </span>
          </el-col>
        </div>
      </marquee>
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
      this.hdQuery.rows = '12'
      this.init()
    },
    methods: {
      init() {
        this.$http.post('/webresources/login/ship/ShipTopStatic/shipvoyagelist/find', this.hdQuery).then(response => {
          const data = response.data;
          this.hdResult = response.data.rows;
          for (let i = 0; i < 20; i++) {
            this.hdResult.push(this.hdResult[i]);
          }
        })
      },
    }
  }
</script>

