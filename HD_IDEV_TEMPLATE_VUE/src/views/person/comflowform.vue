<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%'>
    <el-form label-width="100px" :model="hdform" ref="hdform">
       <el-row>
 	<el-col :span="8" :xs="16">
		<el-form-item label = "工作流表主键" prop="flowId" :rules="$r(1,0,36)">
			<el-input type="text" v-model="hdform.flowId" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "业务主键" prop="busiId" :rules="$r(0,0,36)">
			<el-input type="text" v-model="hdform.busiId" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "业务类型" prop="busiType" :rules="$r(0,0,30)">
			<el-input type="text" v-model="hdform.busiType" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "当前状态,每传递一次都要变更" prop="curType" :rules="$r(0,0,10)">
			<el-input type="text" v-model="hdform.curType" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "用户ID" prop="userId" :rules="$r(0,0,36)">
			<el-input type="text" v-model="hdform.userId" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "业务描述" prop="content" :rules="$r(0,0,512)">
			<el-input type="text" v-model="hdform.content" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="orgnId" :rules="$r(0,0,36)">
			<el-input type="text" v-model="hdform.orgnId" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="teamOrgnId" :rules="$r(0,0,36)">
			<el-input type="text" v-model="hdform.teamOrgnId" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "备注信息" prop="description" :rules="$r(0,0,1000)">
			<el-input type="text" v-model="hdform.description" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "记录时间" prop="recTim" :rules="$r(1,0,11)">
			<el-input type="text" v-model="hdform.recTim" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "操作员" prop="recNam" :rules="$r(0,0,36)">
			<el-input type="text" v-model="hdform.recNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "最终修改人" prop="updNam" :rules="$r(0,0,36)">
			<el-input type="text" v-model="hdform.updNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "最终修改时间" prop="updTim" :rules="$r(1,0,11)">
			<el-input type="text" v-model="hdform.updTim" ></el-input>
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
    name: 'comflowform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false

      }
    },
    methods: {
      show(flowId) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.$http.get('/webresources/login/tech/ComFlow/findone?flowId=' + flowId).then(response => {
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
          this.$http.post('/webresources/login/tech/ComFlow/saveone', this.hdform).then(response => {
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

