<template>
  <el-dialog
    :append-to-body="true"
    :width="wxModal.width"
    :height="wxModal.height"
    :visible.sync="wxModal.show"
    :before-close="handleClose"
  >
    <div class="wxContent">
      <p class="qrtitle">打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮</p>
      <div class="qrcode" ref="qrCodeUrl5"></div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'wxCodeModal',
  data() {
    return {}
  },
  props: {
    wxModal: Object
  },
  mounted() {},
  methods: {
    creatQrCode() {},
    handleClose() {
      this.$emit('hideWxCodeModal')
    }
  },
  watch: {
    'wxModal.show': {
      handler(newName) {
        console.log(newName)
        newName ? this.creatQrCode() : ''
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.wxContent {
  text-align: center;
  padding: 20px;
  .qrtitle {
    margin-bottom: 30px;
  }
  .qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
