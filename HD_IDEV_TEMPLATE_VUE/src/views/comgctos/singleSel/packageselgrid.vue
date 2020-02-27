<template>
  <el-select v-model="selVal"  clearable  placeholder="请选择"  v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item in option"
      :key="item.spackageId"
      :label="item.packageName"
      :value="item.spackageId">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        option: Array,
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      this.doQuery()
    },
    props: {idVal: String, txtVal: String},// 设置value为props属性-必须
    methods: {
      doQuery() {
        this.hdQuery.add('ifendFlag', '0')
        this.$http.post('/webresources/login/code/SbcPackage/find',this.hdQuery).then(response => {
          const data = response.data
          this.option = data.rows
        })
      }
    },
    computed: {//给外层v-model赋值
      selVal: {
        // 动态计算selVal的值
        get: function () {
          if (this.idVal != null) return this.idVal;
        },
        set: function (val) {//v-model input
          if (val != null) {
            this.$emit('update:idVal', val);
            for (let i = 0; i < this.option.length; i++) {
              if (this.option[i].spackageId == val) {
                let obj = this.option[i]
                this.$emit('update:txtVal', obj.packageName)
              }
            }
          }
        }
      }
    }

  }
</script>
