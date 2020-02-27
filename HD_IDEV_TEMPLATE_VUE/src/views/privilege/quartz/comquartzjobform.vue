<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%'>
    <el-form label-width="100px" :model="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label = "实体名" prop="beanName" :rules="$r(0,0,50)">
            <el-input type="text" v-model="hdform.beanName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "cron表达式" prop="cronExpression" :rules="$r(0,0,50)">
            <el-input type="text" v-model="hdform.cronExpression" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "是否使用" prop="isPause" :rules="$r(0)"><!--1暂停，0不暂停就是使用-->
            <el-switch v-model="hdform.isPause" active-value="0" inactive-value="1"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "任务名称" prop="jobName" :rules="$r(0,0,50)">
            <el-input type="text" v-model="hdform.jobName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "执行方法" prop="methodName" :rules="$r(0,0,50)">
            <el-input type="text" v-model="hdform.methodName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "参数名称" prop="params" :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.params" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "备注" prop="remark" :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.remark" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('取 消')}}</el-button>
      <el-button type="primary" @click="submit" :loading="loading"> {{$t('确 定')}}</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    name: 'comquartzjobform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false

      }
    },
    methods: {
      show(qjId) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.$http.get('/webresources/login/com/ComQuartzJob/findone?qjId=' + qjId).then(response => {
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
          this.$http.post('/webresources/login/com/ComQuartzJob/saveone', this.hdform).then(response => {
            this.loading = false
            const data = response.data
            this.$message({
              type: data.code == '-1' ? 'error' : 'success',
              message: data.message
            })
            if (data.code == '-1') {
              return
            }
            this.$emit('save-ok') // 主页面调用弹窗时添加
            this.visible = false
          })
        })
      }
    }
  }
</script>

