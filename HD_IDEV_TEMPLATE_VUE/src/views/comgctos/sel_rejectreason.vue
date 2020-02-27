<template>
  <el-dialog title="拒绝原因"  :visible.sync="visible"  top="20vh" width='50%' append-to-body>
        <el-form label-width="40px" :model="hdform" ref="hdform" >
          <el-row>
            <el-col :span="8" :xs="16">
              <el-form-item label="原因">
                <hd-drop field="REASON_TYPE" v-model="hdform.code" @change="setVal"></hd-drop>
              </el-form-item>
            </el-col>
            <el-col :span="16" :xs="16">
              <el-form-item  prop="refuseReason" :rules="[{ required: true, message: '输入非法', trigger: 'change' }]">
                <el-input  type="text" v-model="hdform.refuseReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit"> 确 定</el-button>
    </div>
  </el-dialog>
</template>
<style>

  .el-radio + .el-radio {
    margin-left: 7px;
  }

  .el-button {
    margin-bottom: 0px;
    padding: 6px 15px;
    line-height: 15px;
  }


</style>
<script>

  export default {
    components: {},
    data() {
      return {
        hdform: {},
        visible: false,
        isFirst: true,
        options: [],
        url:'',
        rowobj:{}
      }
    },

    methods: {
      show(url,row) {
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()

        this.visible=true
        this.hdform={}
        this.url=url
        this.rowobj=row
      },
      setVal(){
        if(this.hdform.code){
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].code == this.hdform.code) {
               this.hdform.refuseReason=this.options[i].name
              return true
            }
          }
        }else{
          this.hdform.refuseReason=''
        }
      },
      submit() {
        this.$refs['hdform'].validate((valid) => {
          if (!valid) {
            return false
          }
            this.rowobj.refuseReason=this.hdform.refuseReason
            this.$emit('sel-ok',this.url,this.rowobj)
            this.visible = false
        })
      },
    },
    watch: {
      visible: function (newVal) {
        if (newVal && this.isFirst) {//第一次显示查询,以后不查询
          this.isFirst = false
          this.$http.get( '/webresources/login/privilege/SysCode/findAll?fieldCod=REFUSE_REASON').then(response => {
            this.options = response.data
          })
        }
      }
    }
  }
</script>

