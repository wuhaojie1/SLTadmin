<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container" />

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="提现编号" prop="bizNo" sortable />

      <el-table-column align="center" label="币种" prop="symbol" />
      <el-table-column align="center" label="提现总额" prop="amount" />
      <el-table-column align="center" label="手续费" prop="feeAmount" />
      <el-table-column
        align="center"
        label="实际到账"
        prop="actAmount" /
        <el-table-column
        align="center"
        label="地址"
        prop="address"
      />

      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag>{{ statusMsg[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" prop="updateTime" />

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template v-if="scope.row.status==='APPLY'" slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePass(scope.row)">通过</el-button>
          <el-button type="danger" size="mini" @click="handleRefuse(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 用户编辑对话框 -->

  </div>
</template>

<script>
import { drawList, drawUpdate } from '@/api/money'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      listCategory: null,
      listCategoryLoading: false,
      dialogStatus: '',
      textMap: {
        edit: '编辑',
        create: '创建'
      },
      dataForm: {
        id: '',
        categoryId: '',
        count: '',
        price: ''
      },
      dialogFormVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        userId: undefined,
        sort: 'create_time',
        order: 'desc'
      },
      statusMsg: {
        REFUSE: '提现审核未通过',
        APPLY: '等待审核中',
        SUCCESS: '审核成功'
      }

    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
    rules() {
      return {
        count: [{ required: true, message: '必填项', trigger: 'blur' }],
        price: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {

    getList() {
      this.listLoading = true
      drawList(this.listQuery).then(response => {
        this.list = []
        if (response.data.data) {
          this.list = response.data.data.list
          this.total = 1
          this.listLoading = false
        } else {
          this.list = []
          this.total = 0
          this.listLoading = false
        }
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

    updateData() {
      this.$refs.dataForm.validate(success => {
        if (success) {
          edit(this.dataForm)
            .then((response) => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '编辑位置成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '编辑位置失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },

    handlePass(item) {
      const params = {
        id: item.id,
        opt: 'PASS',
        userId: this.userId
      }
      drawUpdate(params)
        .then((response) => {
          this.$notify.success({
            title: '成功',
            message: '审核通过'
          })
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },

    handleRefuse(item) {
      const params = {
        id: item.id,
        opt: 'REFUSE',
        userId: this.userId
      }
      drawUpdate(params)
        .then((response) => {
          this.$notify.success({
            title: '成功',
            message: '拒绝提现成功'
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
