<template>

  <el-dialog title="修改密码" :visible.sync="visiable">
    <el-form label-width="100px" :model="hdform" ref="hdform" :rules="checkRules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="text" v-model="hdform.oldPassword" placeholder="请输入旧密码">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="hdform.newPassword" placeholder="请输入密码" autocomplete="new-password">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="重复确认" prop="passwordTemp">
            <el-input type="password" v-model="hdform.passwordTemp" placeholder="请重复输入密码" autocomplete="new-password">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visiable = false">{{$t('取 消')}}</el-button>
      <el-button type="primary" @click="doRegist" :loading="loading"> {{$t('确 定')}}</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    name: 'registform',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (!value || value.length < 2) {
          callback(new Error(this.$t('密码不能小于2位')))
        } else {
          callback()
        }
      }
      const validatePasswordSame = (rule, value, callback) => {
        if (this.hdform.newPassword !== this.hdform.passwordTemp) {
          callback(new Error(this.$t('两次输入密码不一致')))
        } else {
          callback()
        }
      }
      return {
        hdform: {},
        visiable: false,
        tsLoading: false,
        loading: false,
        checkRules: {
          oldPassword: [{ required: true, trigger: 'change', validator: validatePassword }],
          newPassword: [{ required: true, trigger: 'change', validator: validatePassword }],
          passwordTemp: [{ required: true, trigger: 'change', validator: validatePasswordSame }]
        }
      }
    },
    methods:
      {
        show() {
          this.visiable = true
        },
        doRegist() {
          this.$refs['hdform'].validate((valid) => {
            if (!valid) {
              return false
            }
            if (this.hdform.passwordTemp !== this.hdform.newPassword) {
              this.$alert(this.$t('两次密码输入不一致'), this.$t('错误'))
              return false
            }
            this.loading = true
            this.$http.post('/webresources/login/privilege/AuthUser/modifyPasswordVue?oldPassword=' + this.hdform.oldPassword + '&newPassword=' + this.hdform.newPassword).then(response => {
              this.loading = false
              const data = response.data
              this.$message({
                type: data.code === '-1' ? 'error' : 'success',
                message: data.message
              })
              if (data.code === '-1') {
                return
              }
              this.visiable = false
            })
          })
        }
      }
  }
</script>

