<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container" />

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="用户ID" prop="id" sortable />

      <el-table-column align="center" label="位置名" prop="categoryName" />
      <el-table-column align="center" label="位置总数量" prop="totalCount" />
      <el-table-column align="center" label="已售位置" prop="costCount" />
      <el-table-column align="center" label="剩余位置" prop="lastCount" />
      <el-table-column align="center" label="价格" prop="price" />

      <el-table-column align="center" label="价格" prop="price" />
      <el-table-column align="center" label="创建时间" prop="addTime" />

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 用户编辑对话框 -->

  </div>
</template>

<script>
import { rechargeList } from '@/api/money'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

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
        pageNum: 1,
        pageSize: 10,
        page: 1,
        limit: 20,
        userId: undefined,
        sort: 'create_time',
        order: 'desc'
      }

    }
  },
  computed: {
    rules() {
      return {
        count: [{ required: true, message: '必填项', trigger: 'blur' }],
        price: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {

    getList() {
      this.listLoading = true
      rechargeList(this.listQuery).then(response => {
        this.list = []
        if (response.data.data) {
          this.list = JSON.parse(response.data.data).list
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
    }
  }
}
</script>
