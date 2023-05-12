import request from '@/utils/axios'

export function captcha() {
  return request({
    url: '/api/reloadImgCaptcha',
    method: 'post'
  })
}
