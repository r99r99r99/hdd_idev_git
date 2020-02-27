<template>
  <el-dialog title="编辑" :visible.sync="visible" width='80%' top="5vh">
    <el-form label-width="100px" :model="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label="CODE" prop="msgCode"
                        :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.msgCode" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="标题" prop="title"
                        :rules="$r(1,0,256)">
            <el-input type="text" v-model="hdform.title" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="类型" prop="msgTypeCode" :rules="$r(1)">
            <hd-drop field="MSG_TYPE" v-model="hdform.msgTypeCode" style="width: 100%" ></hd-drop>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :xs="16">
          <el-form-item label="打开路径" prop="url"
                        :rules="$r(0,0,256)">
            <el-input type="text" v-model="hdform.url" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :xs="16">
          <el-form-item label="内容" prop="content" :rules="$r(0,0,4000)">
            <el-input v-model="hdform.content" type="textarea"
                      :rows="3" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
<!--    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading"> 确 定</el-button>
    </div>-->
  </el-dialog>

</template>

<script>

  export default {
    name: 'commsgtoform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false,
        hdRtData: {rows: []}, // 已选人员
        findUrl: ''
      }
    },
    methods: {
      show(msgId) { // 换为本表主键
        // 弹窗重复使用时,清除校验项目
        if (this.$refs['hdform']) {
          this.$refs['hdform'].resetFields()
        }
        this.hdRtData.rows = []
        this.visible = true
        this.$http.get('/webresources/login/com/ComMsg/findone/rec?msgId=' + msgId).then(response => {
          const data = response.data
          this.hdform = data
          if (this.hdform.userList != null) {
            this.hdRtData.rows = this.hdform.userList
            this.$refs.commsgtrans.doQuery()
          }
        })
      },

      submit() {
        this.$refs['hdform'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.hdform.userList = this.hdRtData.rows
          this.loading = true
          this.$http.post('/webresources/login/com/ComMsg/saveone', this.hdform).then(response => {
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
      },
      handleChange(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
      }
    }
  }
</script>

