<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>短信配置</h3>
      <div class="formBox">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="配置内容">
            <el-input
              v-model="form.expres"
              type="textarea"
              :rows="5"
              style="width: 600px"
            />
          </el-form-item>
          <el-form-item label="是否开启">
            <el-switch v-model="form.delivery" />
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
  name: 'Message',
  components: { },
  data() {
    return {
      form: {
        expres: '',
        delivery: false
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
<style>
  .formBox{
    margin-top: 50px;
  }
  .dialog-footer{
    margin-left: 120px;
    margin-top: 100px;
  }
</style>
