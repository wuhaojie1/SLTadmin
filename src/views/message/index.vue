<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>内容配置</h3>
      <div class="formBox">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="配置内容" prop="content">
            <el-input
              v-model="form.content"
              type="textarea"
              :rows="5"
              style="width: 600px"
            />
          </el-form-item>
          <el-form-item label="是否开启">
            <el-switch v-model="form.showFlag" />
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
        content: '',
        showFlag: false
      }
    }
  },
  computed: {
    rules() {
      return {
        content: [{ required: true, message: '配置内容不能为空', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      messageDetail().then(response => {
        if (response.data.data) {
          this.form = response.data.data
        } else {
        }
      }).catch(() => {

      })
    },
    handleSave() {
      updateMessage(this.form).then(response => {
        console.log(response)
        if (response.data.errorCode === 0) {
          this.$notify.success({
            title: '成功',
            message: '内容配置成功'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        }
      }).catch((error) => {
        this.getDetail()
        this.$notify.error({
          title: '失败',
          message: error.data.errorStr
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
