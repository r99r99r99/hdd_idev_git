<template>
  <el-dialog title="编辑" :visible.sync="visible" width='65%' top="10vh">
    <!--:hdform.sync 对应的form对象 formRef对应的是el-form的 ref="hdform"-->
    <hd-form saveoneUrl="webresources/login/privilege/AuthOrgn/save"
             removeUrl="webresources/login/privilege/AuthOrgn/entity/remove"
             :findoneUrl="findoneUrl"
             noCopy="orgnId" @saveCall="saveCall" @delCall="delCall"
             label-width="100px" :model.sync="hdform" ref="hdform">
      <el-row>
        <el-col :span="8" :xs="16">
          <el-form-item label="组织名称" prop="name"
                        :rules="$r(1,0,200)">
            <el-input type="text" v-model="hdform.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="组织编码" prop="orgnCod"
                        :rules="$r(0,0,300)">
            <el-input type="text" v-model="hdform.orgnCod"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="英文名" prop="enName"
                        :rules="$r(0,0,200)">
            <el-input type="text" v-model="hdform.enName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="组织简称" prop="shortNam"
                        :rules="$r(0,0,100)">
            <el-input type="text" v-model="hdform.shortNam"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="组织类型" prop="orgnTyp"
                        :rules="$r(1)">
            <hd-drop field="ORGN_TYP" v-model="hdform.orgnTyp"></hd-drop>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="上级部门" prop="parentId"
                        :rules="$r(1)">
            <orgnselect style="width: 100%" :txtVal.sync="hdform.parentName"
                        :idVal.sync="hdform.parentId"></orgnselect>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="描述" prop="description"
                        :rules="$r(0,0,255)">
            <el-input type="text" v-model="hdform.description"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="16">
          <el-form-item label="排序" prop="sorter" :rules="$r(0,0,99999,'number',0)">
            <hd-num v-model="hdform.sorter"></hd-num>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="创建人" prop="recNam">
            <el-input type="text" v-model="hdform.recNam" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="创建时间" prop="recTim">
            <el-input type="text" v-model="hdform.recTim" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="更新人" prop="updNam">
            <el-input type="text" v-model="hdform.updNam" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="16">
          <el-form-item label="更新时间" prop="updTim">
            <el-input type="text" v-model="hdform.updTim" disabled></el-input>
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
import orgnselect from './orgnselect'
import orgTree from '../orgDept/orgTree'
import HdFormBtn from '../../../hdcom/HdFormBtn.vue'

export default {
  name: 'authorgnform',
  components: {
    HdFormBtn,
    orgnselect, orgTree
  },
  data: function() {
    return {
      hdform: {},
      parentId: '',
      findoneUrl: '',
      visible: false
    }
  },
  props: {
    hdQuery: Object
  },
  methods: {
    show(row, parentId) { // 换为本表主键
      this.parentId = parentId
      this.hdform.parentId = parentId
      this.visible = true
      this.findoneUrl = 'webresources/login/privilege/AuthOrgn/findone?parentId=' + parentId
      this.$nextTick(() => {
        this.$refs.hdform.show(row, this.$vnode.context.$refs.grid)// form
        this.$refs.hdformbtn.show(this.$vnode.context.$refs.grid, this.$refs.hdform)// 按钮
      })
    },
    saveCall(row, isAdd) {
      this.$emit('change', {
        type: isAdd ? 'add' : 'edit',
        parentId: row.parentId,
        data: { id: row.orgnId, text: row.name }
      })
    },
    delCall(row) {
      if (!row.orgnId) { // 新增就删除
        return false
      }
      this.$emit('change', {
        type: 'remove',
        parentId: this.parentId,
        data: { id: row.orgnId }
      })
    },
    handleNodeClick(data) {
      //        this.$emit('org-node-click', data)
      //        this.currentNodeData = data
    }
  }
}
</script>

