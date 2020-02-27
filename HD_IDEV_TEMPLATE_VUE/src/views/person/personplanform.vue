<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%'>
    <el-form label-width="100px" :model="hdform" ref="hdform">
       <el-row>
 	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="id" :rules="$r(0,0,32)">
			<el-input type="text" v-model="hdform.id" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "对应c_person表的person_no" prop="personNo" :rules="$r(0,0,32)">
			<el-input type="text" v-model="hdform.personNo" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "身份证号" prop="personCardNo" :rules="$r(0,0,32)">
			<el-input type="text" v-model="hdform.personCardNo" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "姓名" prop="presonNam" :rules="$r(0,0,50)">
			<el-input type="text" v-model="hdform.presonNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "部门" prop="personDeptCod" :rules="$r(0,0,50)">
			<el-input type="text" v-model="hdform.personDeptCod" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "联系方式" prop="personLinkTel" :rules="$r(0,0,20)">
			<el-input type="text" v-model="hdform.personLinkTel" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "去向单位" prop="planPlace" :rules="$r(0,0,50)">
			<el-input type="text" v-model="hdform.planPlace" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "访问事项" prop="planMatter" :rules="$r(0,0,50)">
			<el-input type="text" v-model="hdform.planMatter" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "预约生效时间" prop="effctTim" :rules="$r(0,0,7)">
			<el-input type="text" v-model="hdform.effctTim" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "预约截止时间" prop="validTim" :rules="$r(0,0,7)">
			<el-input type="text" v-model="hdform.validTim" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "可进门次数" prop="inNumbers" :rules="$r(0,0,22)">
			<el-input type="text" v-model="hdform.inNumbers" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "预计进入口门（可不填）" prop="inGateNo" :rules="$r(0,0,100)">
			<el-input type="text" v-model="hdform.inGateNo" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "预计出口门（可不填）" prop="outGateNo" :rules="$r(0,0,100)">
			<el-input type="text" v-model="hdform.outGateNo" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="ifendId" :rules="$r(0,0,1)">
			<el-input type="text" v-model="hdform.ifendId" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="ifendNam" :rules="$r(0,0,20)">
			<el-input type="text" v-model="hdform.ifendNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="ifendTim" :rules="$r(0,0,7)">
			<el-input type="text" v-model="hdform.ifendTim" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="recTim" :rules="$r(0,0,7)">
			<el-input type="text" v-model="hdform.recTim" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="recNam" :rules="$r(0,0,20)">
			<el-input type="text" v-model="hdform.recNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="updTim" :rules="$r(0,0,7)">
			<el-input type="text" v-model="hdform.updTim" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="udpNam" :rules="$r(0,0,20)">
			<el-input type="text" v-model="hdform.udpNam" ></el-input>
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
    name: 'personplanform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false

      }
    },
    methods: {
      show(noPkName) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.$http.get('/webresources/login/person/PersonPlan/findone?noPkName=' + noPkName).then(response => {
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
          this.$http.post('/webresources/login/person/PersonPlan/saveone', this.hdform).then(response => {
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

