<template>
  <div style="height: 100%;">
    <el-form v-bind="$attrs" v-on="$listeners" ref="hdform">
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
/**
   * 实现上一条下一条翻页等整合的form 使用参照AuthOrgnForm.vue
   * @module HdForm
   */
export default {
  name: 'HdTosForm',
  inheritAttrs: false,
  data() {
    return {
      visible: false,
      tsLoading: false,
      loading: false,
      hdResult: {},
      index: -1, // 当前位置
      visible: false,
      formThis: {}, // 外层form
      gridThis: { hdQuery: {}, hdResult: {}}// hdcomgrid对应的列表
    }
  },
  /**
     * Props
     * @prop {String} findoneUrl 单值查询的url,与hdcomgrid的一致,非标准格式需要写
     * @prop {String} saveoneUrl form的ref
     * @prop {String} removeUrl form的ref
     * @prop {Array} 或String,noCopy 复制时,不拷贝的,主键必然要加
     * @prop {Boolean} readForm 是否只显示关闭按钮 默认为false
     */
  props: {
    findoneUrl: String,
    saveoneUrl: String,
    removeUrl: String,
    noCopy: [Array, String], // 不拷贝的主键,请确保第一位是主键  //:noCopy="['codeId']"或者noCopy="codeId"
    readForm: { type: Boolean, default: false }
  },
  mounted() {

  },
  methods: {
    show: function(row, gridThis) {
      this.visible = true
      this.$nextTick(() => {
        this.gridThis = gridThis
        this.choose(row)
        if (row) {
          for (let i = 0; i < this.gridThis.hdResult.rows.length; i++) { // 给index赋初值
            if (row == this.gridThis.hdResult.rows[i]) {
              this.index = i
              this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
            }
          }
        }
      })
    },
    choose: function(row) { // row为''是增加
      // 弹窗重复使用时,清除校验项目
      if (row) { // 列表的数据
        const newRow = $.extend({}, row)
        newRow._oldRow = row
        this.$emit('update:model', newRow)// 不能影响列表
        return true
      }
      this.$http.post(this.findoneUrl ? this.findoneUrl : this.gridThis.findoneUrl, this.gridThis.hdQuery).then(response => { // 增加的
        const data = response.data
        data._isAdd = true// 新增标志
        this.$emit('update:model', data)
        this.$nextTick(() => {
          if (this.$refs.hdform) {
            this.$refs.hdform.clearValidate()
          }
        })
      })
      //        for (let index = 0; index < this.hdQuery.rows; index++) {
      //          let tempId = eval("this.hdResult.rows[index]." + this.hdParam.idName);
      //          if (tempId === id) {
      //            this.index = index;
      //            break;
      //          }
      //        }
    },
    goBack() {
      if (this.index <= 0) {
        if (this.gridThis.hdQuery.page <= 1) { // 开头不能上一条
          return true
        }
        this.gridThis.hdQuery._noLoadingOnce = true
        this.gridThis.hdQuery.doCurPageChange(this.gridThis.hdQuery.page - 1).then(() => { // 异步
          this.index = this.gridThis.hdResult.rows.length - 1
          this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
          this.choose(this.gridThis.hdQuery.selRow)
          return true
        })
      } else {
        this.index--
        this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
        this.choose(this.gridThis.hdQuery.selRow)
      }
    },
    goNext() {
      if (this.index >= this.gridThis.hdResult.rows.length - 1) { // 需要翻页
        this.gridThis.hdQuery._noLoadingOnce = true
        this.gridThis.hdQuery.doCurPageChange(this.gridThis.hdQuery.page + 1).then(() => { // 翻页成功才能执行
          this.index = 0
          this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
          this.choose(this.gridThis.$refs.hdgrid.hdQuery.selRow)
          return true
        })
      } else {
        this.index++
        this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
        this.choose(this.gridThis.$refs.hdgrid.hdQuery.selRow)
      }
    },
    pageBack() {
      this.gridThis.hdQuery._noLoadingOnce = true
      this.gridThis.hdQuery.doCurPageChange(this.gridThis.hdQuery.page - 1).then(() => {
        this.index = 0
        this.gridThis.$refs.hdgrid.setCurrentRow(0)
        this.choose(this.gridThis.hdQuery.selRow)
      })
    },
    pageNext() {
      this.gridThis.hdQuery._noLoadingOnce = true
      this.gridThis.hdQuery.doCurPageChange(this.gridThis.hdQuery.page + 1).then(() => {
        this.index = 0
        this.gridThis.$refs.hdgrid.setCurrentRow(0)
        this.choose(this.gridThis.hdQuery.selRow)
      })
    },
    /**
       * @function doCopy 支持深度复制(对象中嵌套对象)
       * */
    doCopy() {
      const one = $.extend(true, {}, this.gridThis.hdQuery.selRow)
      let noCpLs = ['recNam', 'recTim', 'updNam', 'updNam', 'updTim', 'idevVersionUse']
      if (this.noCopy) {
        if (typeof this.noCopy == 'string') { // 可以是字符串或者数组
          noCpLs.push(this.noCopy)
        } else {
          noCpLs = noCpLs.concat(this.noCopy)
        }
        for (let j = 0; j < noCpLs.length; j++) { // 不需要复制的属性给null
          eval('one.' + noCpLs[j] + ' = null')
        }
      }
      this.$message({
        type: 'success',
        message: '复制完成',
        duration: 1500
      })
      one._isAdd = true
      this.choose(one)
    },
    /**
       * @function doSave  触发事件:this.$emit('saveCall', data.data, this.$attrs.model._isAdd)
       * */
    doSave() {
      const promise = new Promise((resolve, reject) => {
        this.$refs.hdform.validate((valid) => {
          if (!valid) {
            reject()
            return false
          }
          this.loading = true
          this.$http.post(this.saveoneUrl ? this.saveoneUrl : this.gridThis.saveoneUrl, this.$attrs.model).then(response => {
            this.loading = false
            const data = response.data
            this.$message({
              type: data.code == '-1' ? 'error' : 'success',
              message: data.message,
              duration: 1500
            })
            if (data.code == '-1') {
              reject(data);
              this.$emit('saveErrorCall', data)
              return true;
            }
            this.$emit('saveCall', data.data, this.$attrs.model._isAdd)
            if (this.$attrs.model._isAdd) {
              this.index++ // 插入的index+1
              this.gridThis.hdResult.rows.splice(this.index, 0, data.data)
              this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
            } else {
              Object.assign(this.gridThis.hdResult.rows[this.index], data.data)
            }
            this.$emit('update:model', $.extend({}, data.data))
            resolve(data)
            // this.visible = false
          }).catch(() => {
            reject()
          })
        })
      })
      return promise
    },
    /**
       * @function doDel  触发事件: this.$emit('delCall', this.gridThis.hdQuery.selRow)
       * */
    doDel() {
      const promise = new Promise((resolve, reject) => {
        this.$confirm('确定删除本数据?', '提示', {}).then(() => {
          this.$http.post(this.removeUrl ? this.removeUrl : this.gridThis.removeUrl, this.$attrs.model).then(response => {
            const data = response.data
            this.$emit('delCall', this.gridThis.hdQuery.selRow)
            this.$message({
              type: data.code == '-1' ? 'error' : 'success',
              showClose: true,
              duration: 1500,
              message: data.message
            })
            if (data.code == '-1') {
              reject(data)
              return
            }
            this.gridThis.hdResult.rows.remove(this.gridThis.hdQuery.selRow)
            if (this.gridThis.hdResult.rows.length != 0) {
              this.gridThis.$refs.hdgrid.setCurrentRow(this.index)
              this.choose(this.gridThis.hdQuery.selRow)
            } else {
              this.doAdd()// 删除最后一条时增加
            }
            resolve(data)
            // this.hdQuery.doCurPageChange(1);
            // this.visible = false
          }).catch(() => {
            reject()
          })
        }).catch(() => {
          reject()
        })
      })
      return promise
    },
    doAdd() {
      this.choose('')
    }
  }
}
</script>

