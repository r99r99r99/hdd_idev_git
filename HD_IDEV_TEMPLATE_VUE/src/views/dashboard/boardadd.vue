<template>
  <el-dialog title="添加小部件" :visible.sync="visible" width='30%' append-to-body top="15vh">
    <el-container style="height:30vh">
      <ex-main>
        <el-cascader
          style="width:100%"
          :options="data"
          :props="{value:'id',label:'text'}"
          @change="handleChange">
        </el-cascader>
      </ex-main>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>

  import Sortable from 'sortablejs'

  export default {
    components: {},
    data() {
      return {
        visible: false,
        data: []

      }
    },
    mounted() {
    },
    methods: {
      show() {
        this.visible = true
        this.doQuery()
      },
      doQuery() {
        this.$http.post('/webresources/login/privilegeVue/findMyMenu?privilegeType=2').then(response => {
          let dataRs = response.data
          for (let i = 0; i < dataRs.length; i++) {
            this.removeChildPropWhenNoChild(dataRs[i])
          }
          this.data = dataRs[0].children
        })
      },
      removeChildPropWhenNoChild(datals) {
        if (datals.children === null) {
          return false
        }
        if (datals.children.length == 0) {
          this.$delete(datals, "children");
        } else {
          for (let i = 0; i < datals.children.length; i++) {
            this.removeChildPropWhenNoChild(datals.children[i])
          }
        }
      },
      handleChange(one) {//one是个id数组
        let id = one[one.length - 1]
        for (let i = 0; i < this.data.length; i++) {
          let findOne = this.findObj(this.data[i], id)
          if (findOne) {
            this.$emit("getObj", findOne)
            this.visible = false
            return findOne
          }
        }
      },
      findObj(obj, id) {
        if (obj.id == id) {
          return obj
        }
        if (!obj.children) {
          return false;
        }
        for (let i = 0; i < obj.children.length; i++) {
          let objOne = this.findObj(obj.children[i], id)
          if (objOne) {
            return objOne
          }
        }
      }


    }
  }
</script>
