<template >
  <el-select  v-model="selVal" clearable  multiple :placeholder="placeholder?placeholder:'请选择'"   v-bind="$attrs" v-on="$listeners" >
    <el-option v-for="item in option"
               :key="item.setypeId"
               :label="item.typeName"
               :value="item.setypeId">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        option: [],
        hdQuery: new HdQuery(this)
      }
    },
    props: ['value','placeholder'],// 设置value为props属性-必须
    mounted() {
      //this.doQuery()
    },
    methods: {
      doQuery() {
        this.$http.post('/webresources/login/code/SbcEquipType/find',this.hdQuery).then(response => {
          const data = response.data
          this.option = data.rows
        })
      },
      modelquery(sekindId){
        this.hdQuery.query.sekindId=sekindId
        this.$http.post('/webresources/login/code/SbcEquipType/find',this.hdQuery).then(response => {
          const data = response.data
          this.option = data.rows
        })
      }
    },
    computed: {//给外层v-model赋值
      selVal: {
        // 动态计算selVal的值
        get: function () {
          if (this.value) return this.value;
        },
        set: function (val) {//v-model input
          if(val){
            this.$emit('input',val);
          }
        }
      }
    },


  }
</script>
