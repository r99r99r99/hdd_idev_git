<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/com/ComQuartzLog" recHide :default-sort="{prop: '', order: 'descending'}">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" style="width: 200px;" class="filter-item" :placeholder="$t('实体名称，任务名称')"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()"  :keyMap="['alt','q']">{{$t('搜索')}}</el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger"  :keyMap="['alt','d']">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row.qlId)"></hd-btn>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="实体名称" prop="beanName" sortable>
        </el-table-column>
        <el-table-column width="120px" align="center" label="cron表达式" prop="cronExpression" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="执行时间" prop="exceptionDetail" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="是否成功" prop="isSuccess" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="任务名称" prop="jobName" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="任务参数" prop="params" sortable>
        </el-table-column>
        <el-table-column width="120px" align="center" label="运行时间(秒)" prop="time" sortable>
        </el-table-column>
        <el-table-column width="200px" align="center" label="记录时间" prop="logTime" :inputProp="$datetime" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="方法名" prop="methodName" sortable>
        </el-table-column>
      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    name: 'comquartzlog',
    components: {   },
    data() {
      return {
        hdQuery: new HdQuery(this),
      }
    },

    mounted() {

    },
    methods: {

    }
  }
</script>
