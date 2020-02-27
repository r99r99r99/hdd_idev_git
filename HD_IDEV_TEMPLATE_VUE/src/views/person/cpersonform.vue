<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%'>
    <el-form label-width="100px" :model="hdform" ref="hdform">
       <el-row>
 	<el-col :span="8" :xs="16">
		<el-form-item label = "" prop="id" :rules="$r(1,0,32)">
			<el-input type="text" v-model="hdform.id" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "系统生成的流水号" prop="personNo" :rules="$r(0,0,32)">
			<el-input type="text" v-model="hdform.personNo" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "姓名" prop="personNam" :rules="$r(0,0,50)">
			<el-input type="text" v-model="hdform.personNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "性别(0:男；1：女)" prop="personSex" :rules="$r(0,0,1)">
			<el-input type="text" v-model="hdform.personSex" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "工号" prop="personJobNumber" :rules="$r(0,0,100)">
			<el-input type="text" v-model="hdform.personJobNumber" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "人员类型（1：临时访客，2：长期人员）" prop="personKnd" :rules="$r(0,0,1)">
			<el-input type="text" v-model="hdform.personKnd" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "人员类别（等级等区分s_code）" prop="personTyp" :rules="$r(0,0,2)">
			<el-input type="text" v-model="hdform.personTyp" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "身份证件号码" prop="personCardNo" :rules="$r(0,0,100)">
			<el-input type="text" v-model="hdform.personCardNo" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "工作单位代码" prop="personDeptCod" :rules="$r(0,0,50)">
			<el-input type="text" v-model="hdform.personDeptCod" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "联系电话" prop="personLinkTel" :rules="$r(0,0,10)">
			<el-input type="text" v-model="hdform.personLinkTel" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "人员二维码" prop="personEwMark" :rules="$r(0,0,255)">
			<el-input type="text" v-model="hdform.personEwMark" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "信息来源途径（1：录入；2：人事系统接口3：...）" prop="infoWay" :rules="$r(0,0,1)">
			<el-input type="text" v-model="hdform.infoWay" ></el-input>
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
		<el-form-item label = "" prop="updNam" :rules="$r(0,0,20)">
			<el-input type="text" v-model="hdform.updNam" ></el-input>
		</el-form-item>
	</el-col>
	<el-col :span="8" :xs="16">
		<el-form-item label = "备注" prop="remarkTxt" :rules="$r(0,0,255)">
			<el-input type="text" v-model="hdform.remarkTxt" ></el-input>
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
    name: 'cpersonform',
    data() {
      return {
        hdform: {},
        visible: false,
        tsLoading: false,
        loading: false

      }
    },
    methods: {
      show(id) { // 换为本表主键
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.$http.get('/webresources/login/person/CPerson/findone?id=' + id).then(response => {
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
          this.$http.post('/webresources/login/person/CPerson/saveone', this.hdform).then(response => {
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

