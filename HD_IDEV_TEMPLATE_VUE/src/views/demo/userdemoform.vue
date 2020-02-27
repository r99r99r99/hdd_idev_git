<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%' top="10vh">
    <!--:hdform.sync 对应的form对象 formRef对应的是el-form的 ref="hdform"-->
    <hd-form @saveCall="saveCall" @delCall="delCall"
             label-width="100px" :model.sync="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label="租户标识" prop="tenantId" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.tenantId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="作业公司" prop="orgnId" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.orgnId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="所属公司" prop="teamOrgnId" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.teamOrgnId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="账户" prop="account" :rules="$r(1,0,20)">
            <el-input type="text" v-model="hdform.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="账号过期日期" prop="accountPassDate" :rules="$r(0,0,11)">
            <el-input type="text" v-model="hdform.accountPassDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </hd-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('取 消')}}</el-button>
      <el-button :loading="loading" @click="doSave" keyType="save" type="primary">
        {{$t('确 定')}}
      </el-button>
      <!--	<hd-form-btn ref="hdformbtn" style="float: left"></hd-form-btn>
        <el-button @click="visible = false">{{$t('取 消')}}</el-button>-->
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: 'userdemoform',
    components: {},
    data() {
      return {
        hdform: {},
        visible: false
      }
    },
    props: {
      hdQuery: Object
    },
    methods: {
      show(row) { // 换为本表主键
        this.visible = true
        this.$nextTick(() => {
          this.$refs.hdform.show(row, this.$vnode.context.$refs.grid)// form
          this.$refs.hdformbtn.show(this.$vnode.context.$refs.grid, this.$refs.hdform)// 按钮
        })
      },
      saveCall(row, isAdd) {

      },
      delCall(row) {
        if (!row.orgnId) { // 新增就删除
          return false
        }
      },
      doSave() {
        this.loading = true
        this.$refs.hdForm.doSave().then(() => {
          this.loading = false
          this.visible = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

