<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>手续费设置</h3>
      <div class="formBox">
        <el-form ref="form" :model="form" label-width="120px" style="width:600px;" :rules="rules">
          <el-form-item label="提现费率" prop="drawRate">
            <el-input v-model="form.drawRate" type="text" />
          </el-form-item>
          <el-form-item label="otc卖手续费" prop="otcSellRate">
            <el-input v-model="form.otcSellRate" type="text" />
          </el-form-item>
          <el-form-item label="otc购买手续费" prop="otcBugRate">
            <el-input v-model="form.otcBugRate" type="text" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { detail, edit } from '@/api/configCharge'
export default {
  name: 'Set',
  components: { },
  data() {
    return {
      form: {
        drawRate: '',
        otcSellRate: '',
        otcBugRate: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        drawRate: [{ required: true, message: '提现费率不能为空', trigger: 'blur' }],
        otcSellRate: [{ required: true, message: 'otc卖手续费不能为空', trigger: 'blur' }],
        otcBugRate: [{ required: true, message: 'otc购买手续费不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      detail().then(response => {
        if (response.data.data) {
          this.form = response.data.data
        } else {
        }
      }).catch(() => {

      })
    },
    handleSave() {
      this.$refs.form.validate((success) => {
        if (success) {
          edit(this.form).then(response => {
            if (response.data.errno === 0) {
              this.$notify.success({
                title: '成功',
                message: '手续费更新成功'
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            }
          }).catch(() => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
