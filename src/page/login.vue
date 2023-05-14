<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <div class="login-form-bg">
        <section class="form_contianer">
          <div class="titleArea rflex">
            <span class="title">用户登录</span>
          </div>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            class="loginForm"
          >
            <el-form-item prop="username" class="login-item">
              <span class="loginTips"><icon-svg icon-class="iconuser" /></span>
              <el-input
                @keyup.enter.native="submitForm('loginForm')"
                class="area"
                type="text"
                placeholder="用户名"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-item">
              <span class="loginTips"><icon-svg icon-class="iconLock" /></span>
              <el-input
                @keyup.enter.native="submitForm('loginForm')"
                class="area"
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="login-item">
              <span class="loginTips"><icon-svg icon-class="iconLock" /></span>
              <el-input
                @keyup.enter.native="submitForm('loginForm')"
                class="area"
                type="password"
                placeholder="验证码"
                v-model="loginForm.captcha"
              >
                <el-image class="captchaImg" slot="append" :src="captchaData.img"></el-image>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('loginForm')"
                class="submit_btn"
              >登 录</el-button
              >
            </el-form-item>
          </el-form>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { captcha } from '@/api/check'
import { setToken } from '@/utils/auth'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      captchaData: {}
    }
  },
  mounted() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      captcha().then((res) => {
        this.captchaData = res.data
      })
    },
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      })
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          login(this.loginForm).then((res) => {
            console.log('res', res)
            const userList = res.data.userList
            setToken('Token', userList.token)
            this.$router.push({ path: '/' })
            this.$store.dispatch('initLeftMenu') // 设置左边菜单始终为展开状态
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_page {
  position: absolute;
  width: 100%;
  min-width: 1080px;
  height: 100%;
  background: url(/public/assets/img/bg1.jpg) no-repeat center center;
  background-size: cover;
}
.login-form-bg{
  position: absolute; top: 0; right: 0; width: 600px; height: 100%; background: rgba(0,0,0,0.1);
}
.form_contianer {
  position: absolute;
  top: 35%;
  right: 115px;
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  box-sizing: border-box;
  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
    .logo {
      width: 40px;
      margin-right: 10px;
    }
    .title {
      i {
        color: #ff6c60;
      }
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }
    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      // color: #FF7C1A;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
    .captchaImg{
      width: 85px; padding-top: 3px;
    }
  }
}

.manage_tip {
  margin-bottom: 20px;
  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
}

.tiparea {
  text-align: left;
  font-size: 12px;
  color: #4cbb15;
  padding: 10px 0;
  .tip {
    margin-left: 54px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.loginForm {
  .el-button--primary {
    background-color: #ff7c1a;
    border: 1px solid #ff7c1a;
  }
}
.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;
  .title {
    font-size: 14px;
    color: #8b9196;
    margin-bottom: 10px;
  }
  ul {
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .svg-icon {
        font-size: 24px;
      }
    }
  }
}
</style>
