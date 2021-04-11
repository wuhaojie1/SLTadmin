<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!--<el-input v-model="listQuery.username" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名" />-->
      <!--<el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户Id" />-->
      <!--<el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" />-->
      <!--<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>-->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="ID" prop="id" sortable />

      <el-table-column align="center" label="用户昵称" prop="userName" />
      <el-table-column align="center" label="SLT币种总数量" prop="oriAmount" />
      <el-table-column align="center" label="SLT币种可用数量" prop="balAmount" />
      <el-table-column align="center" label="SLT币种交易最大可用数量" prop="maxAmount" />
      <el-table-column align="center" label="SLT币种交易最小可用数量" prop="minAmount" />
      <el-table-column align="center" label="兑换币种ETH比率" prop="convertRate" />
      <el-table-column align="center" label="兑换币种ETH" prop="convertSymbol" />
      <el-table-column align="center" label="手机号码" prop="createTime" />
      <el-table-column align="center" label="手续费" prop="feeAmount" />
      <el-table-column align="center" label="币种" prop="symbol" />
      <el-table-column align="center" label="交易成功时间" prop="transSuccessTime" />
      <el-table-column align="center" label="交易类型" prop="transType" />

      <el-table-column align="center" label="状态" prop="status">
        <!--<template slot-scope="scope">-->
        <!--<el-tag>{{ statusDic[scope.row.status] }}</el-tag>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { list } from '@/api/otc'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        mobile: undefined,
        userId: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      downloadLoading: false,
      userDialogVisible: false,
      userDetail: {
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      list(this.listQuery).then((response) => {
        this.list = response.data.results.items
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    handleDetail(row) {
      this.userDetail = row
      this.userDialogVisible = true
    },
    handleUserUpdate() {
      updateUser(this.userDetail)
        .then((response) => {
          this.userDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '更新用户成功'
          })
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    }
  }
}
</script>
