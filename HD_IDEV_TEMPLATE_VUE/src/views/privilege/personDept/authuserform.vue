<template>
  <el-dialog :visible.sync="visible" title="编辑" width='60%'>

    <hd-form :model="hdform" label-width="100px" ref="hdform" :exFieldCode="exFieldCode">
      <el-row>
        <el-col :span="24">
          <HdTempSave :auto="true" :saveFun="saveFunTemp" @reload="loadFromTemp" ref="hdTempSave"
                      style="float: right" v-if="visible"></HdTempSave>
        </el-col>
        <el-col :span="12" :xs="16">
          <el-form-item :rules="$r(1,2,20)" label="姓名" prop="name">
            <el-input type="text" v-model="hdform.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="16">
          <el-form-item :rules="$r(1,3,20)" label="账户" prop="account">
            <el-input type="text" v-model="hdform.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="16">
          <el-form-item :rules="$r(1)" label="部门" prop="orgnName">
            <!--<el-input type="text" v-model="hdform.orgnId" ></el-input>-->
            <orgncascader :idVal.sync="hdform.orgnId" :txtVal.sync="hdform.orgnName"
                        style="width: 100%"></orgncascader>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="16">
          <el-form-item label="账号过期日期" prop="accountPassDate">
            <el-date-picker v-bind="$date" v-model="hdform.accountPassDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="16">
          <el-form-item :rules="$r(0,0,255)" label="描述" prop="description">
            <el-input type="text" v-model="hdform.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label="账户锁定标志">
            <el-switch active-value="1" inactive-value="0" v-model="hdform.lockId"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="账户停用标志">
            <el-switch active-value="1" inactive-value="0" v-model="hdform.stopId"></el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="16">
          <el-form-item label="密码永不过期">
            <el-switch active-value="1" inactive-value="0" v-model="hdform.pwNeverPassId"></el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="16">
          <el-form-item label="个人不可改密">
            <el-switch active-value="1" inactive-value="0" v-model="hdform.donotChgId"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="登录先改密">
            <el-switch active-value="1" inactive-value="0" v-model="hdform.nextChgId"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </hd-form>
    <div class="dialog-footer" slot="footer">
      <el-button @click="visible = false">{{$t('取 消')}}</el-button>
      <el-button :hotKeyRange="$options.name" :loading="loading" @click="submit" keyType="save" type="primary">
        {{$t('确 定')}}
      </el-button>
    </div>
  </el-dialog>

</template>

<script>
  import orgncascader from './orgncascader'
  // import ExtendForm from "../../../hdcom/ExtendForm";

  export default {
    name: 'authuserform',
    components: {
        ExtendForm,
      orgncascader
    },
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false
      }
    },
    props: {
      orgnId: String,
      orgnName: String,
      exFieldCode: String,
    },
    methods: {
      show(userId, orgnId, orgnName) { // 换为本表主键

        this.visible = true
        this.$http.post('/webresources/login/privilege/AuthUser/findone?userId=' + userId + '&orgnId=' + orgnId).then(response => {
          const data = response.data
          this.hdform = data
          if (!userId) {//这块代码已经没用,后端已经赋值,而且推荐后端写
            this.hdform.orgnId = orgnId
            this.hdform.orgnName = orgnName
          }
          // 弹窗重复使用时,清除校验项目
          if (this.$refs['hdform']) {
              this.$refs['hdform'].$refs.hdform.resetFields()
          }
        })

      },

      submit() {
        // console.debug(this.hdform)
        this.$refs['hdform'].$refs.hdform.validate((valid) => {
          if (!valid) {
            return false
          }
          this.loading = true
          // this.hdform.orgnId = this.parentId
          this.$http.post('/webresources/login/privilege/AuthUser/save', this.hdform).then(response => {
            this.loading = false
            const data = response.data
            this.$message({
              type: data.code === '-1' ? 'error' : 'success',
              message: data.message
            })
            if (data.code === '-1') {
              return
            }
            this.$emit('save-ok') // 主页面调用弹窗时添加
            this.visible = false
          }).catch(() => {//数据同步的校验,时,会从这里触发
            this.loading = false
          })
        })
      },
      saveFunTemp() {
        return this.hdform
      },
      loadFromTemp(storeFrom) {
        Object.assign(this.hdform, storeFrom)
      },
    }
  }
</script>

