<template>
  <div class="boxBg">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-color-box" style="background-color: #003eff">
          <div class="value">{{data[0].name}}</div>
          <div class="value">{{data[0].value}}万吨</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="demo-color-box" style="background-color: #db0100">
          <div class="value">{{data[1].name}}</div>
          <div class="value">{{data[1].value}}万吨</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-color-box" style="background-color: #9c9400">
          <div class="value">{{data[2].name}}</div>
          <div class="value">{{data[2].value}}万吨</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="demo-color-box"style=" background-color: #009909">
          <div class="value">{{data[3].name}}</div>
          <div class="value">{{data[3].value}}万吨</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hdQuery: new HdQuery(this),
        data: []
      }
    }, mounted() {
      this.hdQuery.sort = 'planDte';
      this.hdQuery.rows = 1;
      this.$http.post('/webresources/login/ship/ShipTopStatic/msckb1/find', this.hdQuery).then(response => {
        const data = response.data.rows[0];
        this.data = [{ name: '外贸进口', value: parseInt(data.yearCargoWgtWj/10000)},
          { name: '外贸出口', value: parseInt(data.yearCargoWgtWc/10000) },
          { name: '内贸进口', value: parseInt(data.yearCargoWgtNj/10000) },
          { name: '内贸出口', value: parseInt(data.yearCargoWgtNc/10000) }]
      })
    },
  }
</script>
<style>
  .demo-color-box {
    border-radius: 4px;
    padding: 15px;
    margin: 5px 0;
    height: 60px;
    box-sizing: border-box;
    color: #ffffff;
    font-family:Arial,Helvetica,sans-serif;font-size:100%;
    font-size: 15px;
    text-align: center;
  }

</style>
