<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-permission="['POST /admin/category/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <!--<el-input v-model="listQuery.username" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名" />-->
      <!--<el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户Id" />-->
      <!--<el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" />-->
      <!--<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>-->
    </div>

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
          <el-button type="primary" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 用户编辑对话框 -->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类目名" prop="category">
          <el-select v-model="dataForm.categoryId" v-loading="listCategoryLoading" :disabled="dialogStatus==='edit'">
            <el-option v-for="item in listCategory" :label="item.name" :value="item.id" />
            <!--<el-option label="二级类目" value="L2" />-->
          </el-select>
        </el-form-item>
        <el-form-item label="位置数量" prop="count">
          <el-input v-model="dataForm.count" type="text" :disabled="dialogStatus==='edit'" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="dataForm.price" type="text" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, edit } from '@/api/location'
import { listCategory } from '@/api/category'
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
        page: 1,
        limit: 20,
        username: undefined,
        mobile: undefined,
        userId: undefined,
        sort: 'add_time',
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
    this.getCateList()
  },
  methods: {

    getList() {
      this.listLoading = true
      list(this.listQuery.userId).then(response => {
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

    getCateList() {
      this.listCategoryLoading = true
      listCategory()
        .then(response => {
          if (response.data.data.list.length > 0) {
            this.listCategory = response.data.data.list
            this.dataForm.categoryId = response.data.data.list[0].id
          }
          this.listCategoryLoading = false
        })
        .catch(() => {
          this.listCategory = []
          this.listCategoryLoading = false
        })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.dataForm.categoryId = row.categoryId
      this.dataForm.count = row.totalCount
      this.dataForm.price = row.price
      this.dataForm.id = row.id
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
    createData() {
      this.$refs.dataForm.validate(success => {
        if (success) {
          add(this.dataForm)
            .then((response) => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '新增位置成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '新增位置失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },

    handleDelete(row) {
      this.$confirm('此操作将删除该位置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
