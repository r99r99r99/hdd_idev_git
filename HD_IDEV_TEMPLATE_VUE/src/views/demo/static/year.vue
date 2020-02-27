<template>
  <div class="boxBg">
    <el-row>
      <div style="font-size: 72px;color:#cfc400; text-align: center;padding-top: 10px;">
        {{total}}  <span style="font-size: 24px;">万吨</span>
      </div>
    </el-row>
    <el-row>

      <el-col  :span="12">
        <div class="static-ship-box">
          {{data[0].name}}{{data[0].value}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="static-ship-box">
          {{data[1].name}}{{data[1].value}}
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
    },
    mounted() {
      this.hdQuery.sort = 'planDte';
      this.hdQuery.rows = 1;
      this.$http.post('/webresources/login/ship/ShipTopStatic/msckb1/find', this.hdQuery).then(response => {
        const data = response.data.rows[0];
        this.data = [{name: '散货', value: parseInt(data.yearCargWgSh/1000)/10}, {name: '件杂货', value: parseInt(data.yearCargWgZh/1000)/10}]
      })
    },
    computed: {
      total: function () {
        let count = 0;
        for (let key of this.data) {
          count += parseInt(key.value);
        }
        return count;
      }
    }
  }
</script>
<style>
  .static-ship-box {
    border-radius: 4px;
    padding: 5px;
    margin: 5px 0;
    height: 20px;
    box-sizing: border-box;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 100%;
    font-size: 15px;
    text-align: center;
  }

</style>
