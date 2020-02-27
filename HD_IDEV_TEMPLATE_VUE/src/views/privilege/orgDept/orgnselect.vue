<template>
  <div>
    <el-popover :disabled="disabled" placement="bottom-start" ref="popSel" v-model="visible">
      <div :style="{height: height}">
        <orgTree :idVal="idVal" @org-node-click='doSel' ref='orgTree'></orgTree>
      </div>
    </el-popover>
    <div>
      <!--readonly 在选择区隐藏时,不能输入-->
      <el-input :clearable="false" :disabled="disabled"
                :placeholder="placeholder?this.$t(placeholder):this.$t('请选择')" :readonly="!visible"
                @focus="focus" @mouseenter.native="doMouseEnter"
                @mouseleave.native="doMouseLeave" ref="sel" v-model="searchVal" v-popover:popSel>
        <i @click.stop="doClear" class="el-input__icon el-icon-circle-close" slot="suffix" style="cursor:pointer "
           v-if="!threePointShow"></i>
        <i @click="$emit('pop')" class="el-input__icon el-icon-more" slot="suffix" style="cursor:pointer"
           v-if="threePointShow"></i>
      </el-input>
    </div>
  </div>
</template>
<style>
  .lucencyInput .el-input__inner {
    border: 0px;
  }
</style>
<script>
  import orgTree from './orgTree'

  /**
   * 自定义列表下拉
   * @module orgnselect
   */
  export default {
    name: 'orgnselect',
    components: {
      orgTree
    },
    data() {
      return {
        threePointShow: true,
        searchVal: this.txtVal,
        // isFocus: false,
        visible: false,
        isFirst: true, // 是否第一次打开
        searchHandler: Object,
        isSoftFocus: false // 点击弹窗内容时,input重新获得焦点,但是不能触发focus
        // focusTime: 0
      }
    },
    inheritAttrs: false,
    /**
     * Props  继承hd-com-grid的属性和事件
     * @prop {String} txtVal 双向绑定 这里是为了clear清空用
     * @prop {String} idVal 双向绑定 这里是为了clear清空用
     * @prop {String} placeholder
     * @prop {String} disabled 只读
     * @prop {Object} hdQuery  查询封装类
     * @prop {String} height  默认为40vh
     * @prop {Function} beforeQuery  查询前的事件,通常需要绑定anyQuery
     */
    props: {
      txtVal: String,
      idVal: String,
      placeholder: String,
      disabled: Boolean,
      hdQuery: Object,
      url: String, // 全路径
      height: {// 高度
        type: String,
        default: '40vh'
      },
      beforeQuery: Function
    }, // 设置value为props属性-必须
    mounted() {
      $(this.$parent.$el).find('.el-popover__reference').removeAttr('tabIndex')// 焦点用
    },
    methods: {
      focus() {
        // this.focusTime = new Date().getTime()
        this.$emit('focus')
        if (this.isSoftFocus) { // click时
          this.isSoftFocus = false // 点击时,防止焦点触发
          return false
        }
        setTimeout(() => { // 否则会和默认的冲突
          this.visible = true
        }, 150)
        // this.isFocus = true
      },
      doClear() {
        this.$emit('update:txtVal', '')
        this.$emit('update:idVal', '')
        this.$emit('clear')
      },
      doMouseEnter() {
        if (this.disabled) {
          return false
        }
        if (this.idVal) {
          this.threePointShow = false
        }
      },
      doMouseLeave() {
        this.threePointShow = true
      },
      doSel(data) {
        this.$emit('update:txtVal', data.text)
        this.$emit('update:idVal', data.id)
        this.visible = false
      }
    },

    watch: {
      // searchVal: function(newVal) {
      //   this.$refs.orgTree.filter(newVal)
      //   // this.visible = true
      // },
      txtVal: function (newVal) {
        this.searchVal = this.txtVal
      },
      visible: function (newVal) {
        console.log('newVal', newVal)
        console.log(this.$refs.orgTree)
        if (newVal) {
          this.$refs.orgTree.filter('')
        } else {
          this.searchVal = this.txtVal
        }
      }
    }
  }

</script>
