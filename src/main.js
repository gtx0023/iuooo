import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini' })
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg'

// import '@/permission' // permission control

import '@/mockjs' //  mock数据

// 分享功能集合
import { shareConfig } from './utils/share'
Vue.prototype.shareConfig = shareConfig

Vue.config.productionTip = false

// 字体图标线上地址,在index中使用cdn载入;
// at.alicdn.com/t/font_1258069_e40c6mwl0x8.js

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
