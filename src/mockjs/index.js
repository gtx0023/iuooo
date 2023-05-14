import Vue from 'vue'
import Mock from 'mockjs'
process.env.NODE_ENV === 'development' ? Vue.use(Mock) : null

import getImgCaptcha from '@/mockjs/data/getImgCaptcha'
import login from '@/mockjs/data/user/login'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 验证码
Mock.mock('/api/reloadImgCaptcha', 'post', getImgCaptcha)

// user相关
Mock.mock('/user/login', 'post', login)

export default Mock
