<template>
  <el-dialog :visible.sync="visible" title="编辑" width='60%'>
    <el-form :model="hdform" label-width="100px" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item :rules="$r(1,0,36)" label="版本号" prop="versionNo">
            <el-input :clearable="false" type="text" v-model="hdform.versionNo">
              <hd-btn hint="版本号使用字符串排序,请确保版本号是最大的,并且上传的apk的版本号必须和本版号一致" icon="el-icon-question" slot="suffix"></hd-btn>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item :rules="$r(0,0,1)" label="强制升级" prop="isMust">
            <el-switch active-value="1" inactive-value="0" v-model="hdform.isMust"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="22" :xs="22">
          <el-form-item :rules="$r(0,0,2048)" label="更新信息(提示用户)" prop="updateMsg">
            <el-input :rows="6" type="textarea" v-model="hdform.updateMsg"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="8" :xs="16">-->
        <!--<el-form-item :rules="$r(0,0,1)" label="强制升级" prop="isMust">-->
        <!--<el-switch active-value="1" inactive-value="0" v-model="hdform.isMust"></el-switch>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="22" :xs="22">
          <el-form-item :rules="$r(0,0,512)" label="备注" prop="remark">
            <el-input :rows="6" type="textarea" v-model="hdform.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer" slot="footer">
      <el-button @click="visible = false">{{$t('取 消')}}</el-button>
      <el-button :loading="loading" @click="submit" type="primary"> {{$t('确 定')}}</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    name: 'authmobileupdateform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false

      }
    },
    methods: {
      show(updateId) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.$http.get('/webresources/login/mobile/AuthMobileUpdate/findone?updateId=' + updateId).then(response => {
          const data = response.data
          this.hdform = data
        })
      },

      submit() {
        // console.debug(this.hdform)
        this.$refs['hdform'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true
          this.$http.post('/webresources/login/mobile/AuthMobileUpdate/saveone', this.hdform).then(response => {
            this.loading = false
            const data = response.data
            this.$message({
              type: 'success',
              message: this.$t('保存成功,请上传app')
            })
            this.$emit('save-ok', data.data) // 主页面调用弹窗时添加
            this.visible = false
          }).catch(() => {
            this.loading = false
          })
        })
      }
    }
  }
</script>

