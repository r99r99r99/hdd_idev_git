<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/com/ComQuartzJob">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" style="width: 200px;" class="filter-item" :placeholder="$t('实体名称，任务名称')"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()"  :keyMap="['alt','q']">{{$t('搜索')}}</el-button>
          <el-button class="filter-item"  @click="doEdit('')" type="primary" icon="edit" :keyMap="['alt','a']">{{$t('新增')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger"  :keyMap="['alt','d']">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row.qjId)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row.qjId)"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="实体名" prop="beanName" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="cron表达式" prop="cronExpression" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="是否使用" prop="isPause" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.isPause == '0' ? '√' : '×'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="任务名称" prop="jobName" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="执行方法" prop="methodName" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="参数名称" prop="params" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="备注" prop="remark" sortable>
        </el-table-column>
      </hd-com-grid>
    </el-main>
    <comquartzjobform ref="comquartzjobform" @save-ok="$refs.grid.doQuery()"></comquartzjobform>
  </el-container>
</template>
<script>
  import comquartzjobform from './comquartzjobform'
  export default {
    name: 'comquartzjob',
    components: {  comquartzjobform },
    data() {
      return {
        hdQuery: new HdQuery(this),
      }
    },

    mounted() {

    },
    methods: {

      doEdit(qjId) { // 增加或编辑
        this.$refs['comquartzjobform'].show(qjId)
      },
    }
  }
</script>
