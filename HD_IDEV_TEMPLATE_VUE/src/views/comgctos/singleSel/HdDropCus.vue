<template>
  <el-select v-model="selVal" filterable clearable :placeholder="placeholder?placeholder:'请选择'" style="width:100%"
             v-bind="$attrs" v-on="$listeners" @change="change" :filter-method="filterMe"
             @visible-change="visibleChange">
    <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code">

      <!--item[myts]可以实现动态label-->
      <span style="float: left">{{ item.name }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
    </el-option>
  </el-select>
</template>

<script>
  /**
   * 继承ElSelect属性和事件,syscode下的field只需要传入field,其它的需要传入url
   * 在华东Drop基础上定义的 可以添加全部的
   * @module HdDrop
   */
  export default {
    name: 'HdDropCus',
    data() {
      return {
        options: [],
        backUpArr: []// 备份
      }
    },
    /**
     * Props
     * @prop {String} value v-model双向绑定
     * @prop {String} field syscode时,传入下拉field
     * @prop {String} placeholder
     * @prop {String} url 不使用syscode下拉时指定url
     * @prop {String} txtVal  加.sync双向绑定 选择的label
     * @prop {Array} codeIn  有值时,只显示指定的code :codeIn="['A','S']"
     */
    props: ['value', 'field', 'placeholder', 'name', 'url', 'txtVal', 'codeIn'], // 设置value为props属性-必须,name.sync(不能用)和txtVal.sync双向
    inheritAttrs: false,
    mounted() {
      if (this.url || this.field) {
        this.doQuery()
      }
    },
    methods: {
      doQuery() {
        let quUrl = ''
        if (!this.url) {
          quUrl = '/webresources/login/privilege/SysCode/findAll?fieldCod=' + this.field
        } else {
          quUrl = this.url
        }
        this.$http.get(quUrl).then(response => {
          let allCod={};
          allCod.code="-1";
          allCod.name="全部";
          this.backUpArr=new Array();
          this.backUpArr.push(allCod);
          this.backUpArr=this.backUpArr.concat(response.data);
          this.options =this.backUpArr;
          if (this.codeIn) { // 如果options的code和codeIn相同,就显示
            this.options = this.options.filter((item) => {
              return this.codeIn.find(v => v == item.code)
            })
          }
        })
      },
      change(val) {
        this.upName(val)
        this.$emit('change', val)
      },
      visibleChange(val) { // 下拉隐藏时还原
        if (!val) { // 隐藏时
          this.options = this.backUpArr
        }
      },
      filterMe(val) { // 过滤 根据name code
        if (val) { // val存在
          this.options = this.backUpArr.filter((item) => {
            if (item.code.indexOf(val) >= 0 || item.name.indexOf(val) >= 0) {
              return true
            }
          })
        } else { // val为空时，还原数组
          this.options = this.backUpArr
        }
      },
      upName(value) {
        if (!value) {
          this.$emit('update:name', null)// 匹配不上
        }
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].code == value) {
            const obj = this.options[i]
            this.$emit('update:name', obj.name)// 用txtVal
            this.$emit('update:txtVal', obj.name)
            return true
          }
        }
      }
    },
    watch: {
      //      // 针对编辑时，不改变 hddrop里的内容
      //      val: function (value) {
      //        for (let i = 0; i < this.options.length; i++) {
      //          if (this.options[i].code == value) {
      //            let obj = this.options[i]
      //            this.$emit('update:name', obj.name)
      //            return true
      //          }
      //        }
      //      },
      //      //针对增加编辑时，改变了hddrop里的值
      //      value: function (value) {
      //        for (let i = 0; i < this.options.length; i++) {
      //          if (this.options[i].code == value) {
      //            let obj = this.options[i]
      //            this.$emit('update:name', obj.name)
      //            return true
      //          }
      //        }
      //      }
      url: function () {
        this.doQuery()
      },
      field: function () {
        this.doQuery()
      },
      codeIn: {
        handler(newValue, oldValue) { // codeIn改变时计算
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] != oldValue[i]) {
              this.doQuery()
              return true
            }
          }
        },
        deep: true
      }
    },
    computed: {// 给外层v-model赋值
      selVal: {
        // 动态计算selVal的值
        get: function () {
          if (!this.value) { // filterMe在null时不触发,''就没问题
            return ''
          }
          return this.value
        },
        set: function (val) { // v-model input
          // upName(val)//更新name
          this.$emit('input', val)
        }
      }
    }
  }
</script>
