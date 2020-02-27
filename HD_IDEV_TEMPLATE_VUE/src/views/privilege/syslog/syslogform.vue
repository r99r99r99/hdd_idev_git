<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%'>
    <el-form label-width="100px" :model="hdform" ref="hdform">
      <el-row>

        <el-col :span="8" :xs="16">
          <el-form-item label = "实体名" prop="entityName" :rules="$r(0,0,256)">
            <el-input type="text" v-model="hdform.entityName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "菜单名" prop="menuName">
            <el-input type="text" v-model="hdform.menuName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "日志类型" prop="logTypeStr" >
            <el-input type="text" v-model="hdform.logTypeStr" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" :xs="16">
          <el-form-item label = "日志内容" prop="logContent" >
            <el-input type="textarea" :rows="10" v-model="hdform.logContent" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" :xs="16">
          <el-form-item label = "ip及路径" prop="userIp" >
            <el-input type="text" v-model="hdform.userIp" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "创建人" prop="recNam" >
            <el-input type="text" v-model="hdform.recNam" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "创建时间" prop="recTim" >
            <el-input type="text" v-model="hdform.recTim" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "修改人" prop="updNam" >
            <el-input type="text" v-model="hdform.updNam" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "修改时间" prop="updTim">
            <el-input type="text" v-model="hdform.updTim" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>

</template>

<script>
  export default {
    name: 'syslogform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false

      }
    },
    methods: {
      show(logId) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.$http.get('/webresources/login/privilege/SysLog/findone?logId=' + logId).then(response => {
          const data = response.data
          this.hdform = data
        })
      },
    }
  }
</script>

