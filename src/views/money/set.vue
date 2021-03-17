<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>手续费设置</h3>
      <div class="formBox">
        <el-form ref="form" :model="form" label-width="120px" style="width:600px;">
          <el-form-item label="slt提现手续费">
            <el-input v-model="form.slt" type="text" />
          </el-form-item>
          <el-form-item label="eth提现手续费">
            <el-input v-model="form.eth" type="text" />
          </el-form-item>
          <el-form-item label="otc交易手续费">
            <el-input v-model="form.otc" type="text" />
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
import { messageDetail, updateMessage } from '@/api/message'
export default {
  name: 'Set',
  components: { },
  data() {
    return {
      form: {
        slt: '',
        eth: '',
        otc: ''
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      messageDetail(this.listQuery.userId).then(response => {
        if (response.data.data) {
          this.from = response.data.data
        } else {
        }
      }).catch(() => {

      })
    },
    handleSave() {
      updateMessage(this.from).then(response => {
        if (response.data.data) {
          this.from = response.data.data
          this.$notify.success({
            title: '成功',
            message: '内容配置成功'
          })
        } else {
        }
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
