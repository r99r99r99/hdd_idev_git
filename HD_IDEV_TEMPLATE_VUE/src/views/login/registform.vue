<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width:100%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 150px;
    display: block;
  }
</style>
<style scoped>
.loginBody{background:none!important;}
  .container_class{
    border:1px solid gray

  }
  .welcom_div{
    margin-bottom:10px;
    color:green;
  }
  .el-header-col{
    font-size:20px;
    margin-bottom:15px;
    color:black;
    font-weight: bold;
  }
  .back_div{
    width:100%;height:100%;
    background: url("images/regist_logo.jpg");
    background-size: 100%;
  }
  .main_div{
    width:60%;height:100%;margin-left:20%;background-color: white; padding:20px;
    min-height:500px;
    overflow: auto;
  }
</style>
<template>
  <div style="" class="back_div">
  <div class="main_div" style="">
    <el-form label-width="100px" :model="hdform" ref="hdform" :rules="checkRules" >
      <el-row class="welcom_div">
        <el-col :span="16" ><div style="margin-left:30px;font-size:20px;font-weight: bold;">账号注册</div></el-col>
        <el-col align="right" :span="8"><div >已有账号，点击登录  <el-button @click="doLogin" size="small">登录</el-button></div></el-col>
      </el-row>
      <el-row><el-col :span="24"><div>&nbsp;</div></el-col></el-row>
      <el-row :gutter="20">
        <el-col :span="24" class="el-header-col">账号信息:</el-col>
        <el-col :span="8" >
          <el-form-item label="登录账号" prop="regAccount">
            <el-input type="text" v-model="hdform.regAccount" placeholder="请输入登录账号">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"><div>&nbsp;</div></el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="密码" prop="regPassword">
            <el-input type="password" v-model="hdform.regPassword" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"><div>&nbsp;</div></el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="重复确认" prop="regPassword2">
            <el-input type="password" v-model="hdform.regPassword2" placeholder="请重复输入密码">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20"><el-col :span="24"><div>&nbsp;</div></el-col></el-row>
      <el-row>
        <el-col :span="24" class="el-header-col">申请人信息:</el-col>
        <el-col :span="8">
          <el-row>
            <el-form-item label="姓名" prop="regName">
              <el-input type="text" v-model="hdform.regName" placeholder="请输入姓名">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row><div>&nbsp;</div></el-row>
          <el-row>
            <el-form-item label="手机号" prop="handset">
              <el-input type="text" v-model="hdform.handset" placeholder="请输入手机号">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row><div>&nbsp;</div></el-row>
          <el-row>
            <el-form-item label="联系电话" prop="linktel">
              <el-input type="text" v-model="hdform.linktel" placeholder="请输入联系电话">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row><div>&nbsp;</div></el-row>
          <el-row>
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="hdform.email" placeholder="请输入邮箱">
              </el-input>
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-form-item label="身份证号" prop="card">
              <el-input type="text" v-model="hdform.card" placeholder="请输入二代居民身份证号">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="身份证正面" prop="pathFro">
              <el-upload
                class="avatar-uploader"  :action="UploadUrl()"
                :show-file-list="false"
                :on-success="uploadFroSuccess">
                <img v-if="imageFroUrl"  style="width:100%;" :src="imageFroUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-col >
        <el-col :span="8">
          <el-row><el-form-item label="">&nbsp;</el-form-item></el-row>
          <el-row>
            <el-form-item label="身份证反面" prop="pathRev">
              <el-upload
                class="avatar-uploader"  :action="UploadUrl()"
                :show-file-list="false"
                :on-success="uploadRevSuccess">
                <img v-if="imageRevUrl" style="width:100%;" :src="imageRevUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>
      <el-row><el-col :span="24"><div>&nbsp;</div></el-col></el-row>
    </el-form>
    <el-row>
      <el-col :span="24" class="el-header-col">客户列表:&nbsp;&nbsp;
      <el-button size="small"  type="primary" @click="addClient"> 增加</el-button></el-col></el-row>
    <el-table :data="clientData"  >
      <el-table-column  width="120px" prop="clientName"  align="left"  label="中文名称"></el-table-column>
      <el-table-column width="120px" align="left"  label="中文简称" prop="shortName"></el-table-column>
      <el-table-column prop="enClientName"  align="left"  label="英文名称"  width="120px"></el-table-column>
      <el-table-column width="120px" align="left"  label="税号" prop="taxNo"></el-table-column>
      <el-table-column width="120px" align="left"   label="法人代表" prop="directorName"></el-table-column>
      <el-table-column width="120px" align="left"  label="联系地址" prop="addresTxt"></el-table-column>
      <el-table-column width="120px" align="left"  label="移动电话" prop="mobile"></el-table-column>
      <el-table-column width="120px" align="left"  label="办公电话" prop="telephone"></el-table-column>
      <el-table-column fixed="right"  label="操作" >
        <template slot-scope="scope">
          <el-button @click="viewRow(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="delRow(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer" align="left" style="margin-top:10px;">
      <!--<el-button @click="visiable = false" >取 消</el-button>-->
      <el-button type="primary" @click="doRegist" :loading="loading" style="width:200px;">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
    </div>
    <remoteregclientform ref="remoteregclientform" @sel-ok="setClientData"></remoteregclientform>
  </div>
  <!--</el-dialog>-->
  </div>
</template>

<script>
  import remoteregclientform from './remoteregclientform'
  import {TableColumn as ElTableColumn} from 'element-ui'

  export default {
    name: 'registform',
    components: {remoteregclientform,ElTableColumn},
    data() {

      const validateName = (rule, value, callback) => {
        if (!value || value.length < 1) {
          callback(new Error('姓名不能为空'))
        } else {
          callback()
        }
      }
      const validateAccount = (rule, value, callback) => {
        if (!value || value.length < 3) {
          callback(new Error('账户长度不能少于3'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!value || value.length < 2) {
          callback(new Error('密码不能小于2位'))
        } else {
          callback()
        }
      }
      const validatePasswordSame = (rule, value, callback) => {
        if (this.hdform.regPassword != this.hdform.regPassword2) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      return {
        hdform: {},
        clientData:[],
        rowNum:-1,
        imageFroUrl:"",
        imageRevUrl:'',
        tsLoading: false,
        loading: false,
        checkRules: {
          regName: [{required: true, trigger: 'change', validator: validateName}],
          regAccount: [{required: true, trigger: 'change', validator: validateAccount}],
          regPassword: [{required: true, trigger: 'change', validator: validatePassword}],
          regPassword2: [{required: true, trigger: 'change', validator: validatePasswordSame}]
        }
      }
    },
    methods:{
      doLogin(){
        let registHref = location.href.replace("regist","login")
        window.location.href = registHref;
      },
      UploadUrl(){
        return "/outernet/login/priviledge/RegistLogin/fileUploadSrc?fmRelId=123456789765&frmModel=REMOTE_REG";
      },
      uploadRevSuccess(response,file) {
        let data = response
        this.$message({
          type: data.code === '-1' ? 'error' : 'success',
          message: data.message
        })
        if( data.code != '-1'){
          this.imageRevUrl = URL.createObjectURL(file.raw);
          this.hdform.pathRev = response.data.sysFmId
        }
      },
      uploadFroSuccess(response,file) {
        let data = response
        this.$message({
          type: data.code === '-1' ? 'error' : 'success',
          message: data.message
        })
        if( data.code != '-1'){
          this.imageFroUrl = URL.createObjectURL(file.raw);
          this.hdform.pathFro = response.data.sysFmId
        }
      },
      viewRow(row){
        for(let i=0;i<this.clientData.length;i++){
          if(this.clientData[i]==row){
            this.rowNum = i;
            break;
          }
        }
        this.$refs.remoteregclientform.show(this.clientData[this.rowNum]);
      },
      delRow(row){
        this.clientData.removeone(row);
      },
      setClientData(row){
        if(this.rowNum==-1){
          this.clientData.push(row)
        }else{
          this.clientData[this.rowNum] = row;
        }
      },
      addClient(){
        this.rowNum = -1;
        this.$refs.remoteregclientform.show()
      },
      doRegist() {
        this.$refs['hdform'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.hdform.regPassword2 != this.hdform.regPassword) {
            this.$alert('两次密码输入不一致', '错误')
            return false
          }
          this.loading = true
          for(var i=0;i<this.clientData.length;i++){
            if(this.clientData[i].shortName==null||this.clientData[i].shortName==''){
              this.clientData[i].shortName = this.clientData[i].clientName;
            }
          }
          let clientData = JSON.stringify(this.clientData);
          let regData = JSON.stringify(this.hdform);
          this.$http.post('/outernet/login/busi/RemoteReg/saveData',{"regData":regData,"clientData":clientData}).then(response => {
            this.loading = false
            let data = response.data
            this.$message({
              type: data.code == '-1' ? 'error' : 'success',
              message: data.message
            })
            if (data.code == '-1') {
              return
            }else{
              this.doLogin()
            }
          })
        })
      }
    }
  }
</script>

