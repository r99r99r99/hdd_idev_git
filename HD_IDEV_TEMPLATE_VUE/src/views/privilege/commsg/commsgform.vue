<template>
  <el-dialog title="编辑" :visible.sync="visible" width='80%' top="5vh">
    <el-form label-width="100px" :model="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label="CODE" prop="msgCode"
                        :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.msgCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="标题" prop="title"
                        :rules="$r(1,0,256)">
            <el-input type="text" v-model="hdform.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="类型" prop="msgTypeCode" :rules="$r(1)">
            <hd-drop field="MSG_TYPE" v-model="hdform.msgTypeCode" style="width: 100%"></hd-drop>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :xs="16">
          <el-form-item label="打开路径" prop="url"
                        :rules="$r(0,0,256)">
            <el-input type="text" v-model="hdform.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :xs="16">
          <el-form-item label="内容" prop="content" :rules="$r(0,0,4000)">
            <el-input v-model="hdform.content" type="textarea"
                      :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-tabs type="border-card" v-model="hdform.msgWayCode">
            <el-tab-pane :label="$t('按用户')" name="BY_USER">
              <commsgtrans :orgnIds="hdform.sendIds" :msgId="hdform.msgId" ref="commsgtrans"></commsgtrans>
            </el-tab-pane>
            <el-tab-pane :label="$t('按角色')" name="BY_ROLE">
              <commsgRole :orgnIds="hdform.sendIds" :msgId="hdform.msgId" ref="commsgRole"></commsgRole>
            </el-tab-pane>
            <el-tab-pane :label="$t('按组织')" name="BY_ORGN">
              <commsgOrgn :orgnIds="hdform.sendIds" :msgId="hdform.msgId" ref="commsgOrgn"></commsgOrgn>
            </el-tab-pane>
          </el-tabs>
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
  import commsgtrans from './commsgtrans'
  import commsgOrgn from './commsgOrgn'
  import commsgRole from './commsgRole'
  export default {
    components: {commsgtrans, commsgOrgn, commsgRole},
    name: 'commsgform',
    data() {
      return {
        hdform: {
          msgWayCode: 'BY_USER'
        },
        visible: false,
        loading: false,
        findUrl: ''
      }
    },
    methods: {
      show(msgId) { // 换为本表主键
        // 弹窗重复使用时,清除校验项目
        if (this.$refs['hdform']) {
          this.$refs['hdform'].resetFields()
        }
        this.visible = true;
        this.$http.get('/webresources/login/com/ComMsg/findone?msgId=' + msgId).then(response => {
          console.log('show', this.hdform.msgWayCode);
          const data = response.data
          this.hdform = data
          console.log('show', this.hdform.msgWayCode);
          if (this.hdform.msgWayCode == null) {
            this.hdform.msgWayCode = 'BY_USER';
          }
          this.$nextTick(()=>{
            this.initFormContent(this.hdform.msgWayCode);
          })
        })
      },

      submit() {
        this.$refs['hdform'].validate((valid) => {
          if (!valid) {
            return false
          }
          this.loading = true
          this.hdform.sendIds = this.getOrgIds();
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
          }, error => {
            this.visible = false
          })
        })
      },
      handleChange(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
      },
      initFormContent(val) {
        if(val === 'BY_USER') {
          this.$refs.commsgtrans.initQuery();
        }
        if(val === 'BY_ROLE') {
          this.$refs.commsgRole.initQuery();
        }
        if(val === 'BY_ORGN') {
          this.$refs.commsgOrgn.doQuery();
        }
      },
      getOrgIds() {
        const val = this.hdform.msgWayCode
        if(val === 'BY_USER') {
          return this.$refs.commsgtrans.getOrgIds();
        }
        if(val === 'BY_ROLE') {
          return this.$refs.commsgRole.getOrgIds();
        }
        if(val === 'BY_ORGN') {
          return this.$refs.commsgOrgn.getOrgIds();
        }
      }
    },
    watch: {
      'hdform.msgWayCode' : function (val) {
        console.log('msgWayCode changed');
        this.initFormContent(val)
      }
    }
  }
</script>

