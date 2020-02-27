<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%'>
    <el-form label-width="100px" :model="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label="表名" prop="tableName" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.tableName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="字段名" prop="columnName" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.columnName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="字段注解" prop="columnComment" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.columnComment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="字段类型" prop="columnType" :rules="$r(0,0,10)">
            <el-input type="text" v-model="hdform.columnType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="长度" prop="columnLen" :rules="$r(0,'number',0,99999)">
            <el-input type="number" v-model="hdform.columnLen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="比例" prop="columnScale" :rules="$r(0,'number',0,99999)">
            <el-input type="number" v-model="hdform.columnScale"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="默认值" prop="defaultValue" :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.defaultValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading"> 确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
    export default {
        name: 'comexcolumnform',
        data() {
            return {
                hdform: {},
                visible: false,
                tsLoading: false,
                loading: false

            }
        },
        methods: {
            show(exColumnId) { // 换为本表主键
                //弹窗重复使用时,清除校验项目
                if (this.$refs['hdform'])
                    this.$refs['hdform'].resetFields()
                this.visible = true
                this.$http.get('/webresources/login/tech/ComExColumn/findone?exColumnId=' + exColumnId).then(response => {
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
                    this.$http.post('/webresources/login/tech/ComExColumn/saveone', this.hdform).then(response => {
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
                    }).catch(() => {
                        this.loading = false
                    })
                })
            }
        }
    }
</script>

