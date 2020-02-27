]<template>
  <el-dialog title="客户资料" :visible.sync="visible" top="10vh" width='60%'>
    <el-container style="height:50vh">
      <el-aside width="100%" :arrowShow="false" >
        <el-form label-width="100px" :model="hdformFlag" ref="hdformFlag">
          <el-row>
            <el-col class="el-line">基本信息</el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="中文名称" prop="clientName" >
                <el-input type="text" v-model="hdformFlag.clientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="中文简称" prop="shortName" >
                <el-input type="text" v-model="hdformFlag.shortName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="英文名称" prop="enClientName">
                <el-input type="text" v-model="hdformFlag.enClientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16"></el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="税号" prop="taxNo">
                <el-input type="text" v-model="hdformFlag.taxNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="开户银行" prop="bankName">
                <el-input type="text" v-model="hdformFlag.bankName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="银行账号" prop="accountNo">
                <el-input type="text" v-model="hdformFlag.accountNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="法人代表" prop="directorName">
                <el-input type="text" v-model="hdformFlag.directorName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="联系地址" prop="addresTxt">
                <el-input type="text" v-model="hdformFlag.addresTxt"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="所属行业" prop="industryField">
                <el-input type="text" v-model="hdformFlag.industryField"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="建立日期" prop="clientDate">
                <el-date-picker v-model="hdformFlag.clientDate" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="移动电话" prop="mobile">
                <el-input type="text" v-model="hdformFlag.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="办公电话" prop="telephone">
                <el-input type="text" v-model="hdformFlag.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="hdformFlag.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="邮政编码" prop="zip">
                <el-input type="text" v-model="hdformFlag.zip"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="传真" prop="fax">
                <el-input type="text" v-model="hdformFlag.fax"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="网址" prop="website" >
                <el-input type="text" v-model="hdformFlag.website"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="业务联系人" prop="contracts">
                <el-input type="text" v-model="hdformFlag.contracts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :xs="16">
              <el-form-item label="经手人" prop="brokerage">
                <el-input type="text" v-model="hdformFlag.brokerage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :xs="16">
              <el-form-item label="备注" prop="description">
                <el-input type="text" v-model="hdformFlag.description"></el-input>
              </el-form-item>
            </el-col>

          <el-col class="el-line">客户性质</el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="船公司" prop="shipCorpFlag">
              <el-switch v-model="hdformFlag.shipCorpFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="船代" prop="shipAgentFlag">
              <el-switch v-model="hdformFlag.shipAgentFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="箱公司" prop="cntrCorpFlag">
              <el-switch v-model="hdformFlag.cntrCorpFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="箱主" prop="cntrOperFlag">
              <el-switch v-model="hdformFlag.cntrOperFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="委托人" prop="consignFlag">
              <el-switch v-model="hdformFlag.consignFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="货代" prop="forwarderFlag">
              <el-switch v-model="hdformFlag.forwarderFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="货主" prop="consignorFlag">
              <el-switch v-model="hdformFlag.consignorFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="中转公司" prop="transFlag">
              <el-switch v-model="hdformFlag.transFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="报关公司" prop="customsFlag">
              <el-switch v-model="hdformFlag.customsFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="船主" prop="shipOwnerFlag">
              <el-switch v-model="hdformFlag.shipOwnerFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="发货人" prop="cnorFlag">
              <el-switch v-model="hdformFlag.cnorFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="收货人" prop="cneeFlag">
              <el-switch v-model="hdformFlag.cneeFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="车队" prop="fleetFlag">
              <el-switch v-model="hdformFlag.fleetFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="16">
            <el-form-item label="旅行社" prop="travelAgencyFlag">
              <el-switch v-model="hdformFlag.travelAgencyFlag" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          </el-row>
        </el-form>
      </el-aside>

    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading"> 确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>


  export default {
   components: {},
    name: 'remoteregclientform',
    data() {
      return {
        labelPosition:"right",
        hdformFlag: {},
        visible: false,
        tsLoading: false,
        loading: false
      }
    },
    methods: {
      show(row) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        /*if (this.$refs['hdformFlag'])
          this.$refs['hdformFlag'].resetFields()
         */
        this.hdformFlag = {}
        this.visible = true
        if(row){
          this.hdformFlag = row;
        }
      },
      submit() {
        // console.debug(this.hdformFlag)
        this.$refs['hdformFlag'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if(this.hdformFlag.clientName==null||this.hdformFlag.clientName==''){
            this.$message({
              type: 'error',
              message:"中文名称必填"
            })
            return ;
          }
          this.visible = false;
          this.$emit('sel-ok',this.hdformFlag)
        })
      }
    }
  }
</script>

