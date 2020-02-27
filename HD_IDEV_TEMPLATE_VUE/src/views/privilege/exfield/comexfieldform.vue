<template>
  <el-dialog title="编辑" :visible.sync="visible" width='60%' top="10vh">
    <!--:hdform.sync 对应的form对象 formRef对应的是el-form的 ref="hdform"-->
    <hd-form @saveCall="saveCall" @delCall="delCall"
             label-width="100px" :model.sync="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label = "编码" prop="gridCode" :rules="$r(0,0,20)">
            <el-input type="text" v-model="hdform.gridCode" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "是否使用" prop="useFlg" :rules="$r(0,0,1)">
            <el-input type="text" v-model="hdform.useFlg" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "表达宽度" prop="formWidth" :rules="$r(0,0,22)">
            <el-input type="text" v-model="hdform.formWidth" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "表单高度" prop="formHeigth" :rules="$r(0,0,22)">
            <el-input type="text" v-model="hdform.formHeigth" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "列表默认宽度" prop="gridWidth" :rules="$r(0,0,22)">
            <el-input type="text" v-model="hdform.gridWidth" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "默认值" prop="defaultValue" :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.defaultValue" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "描述" prop="placeHolder" :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.placeHolder" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "规则" prop="rules" :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.rules" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label = "对应列" prop="columnId" :rules="$r(0,0,36)">
            <el-input type="text" v-model="hdform.columnId" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </hd-form>
    <div slot="footer" class="dialog-footer">
      <hd-form-btn ref="hdformbtn" style="float: left"></hd-form-btn>
      <el-button @click="visible = false">{{$t('取 消')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>

    export default {
        name: 'comexfieldform',
        components: {  },
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
        }
    }
</script>

