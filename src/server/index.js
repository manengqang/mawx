import { getStore } from 'redux'
import './interceper'

console.log('env')
console.log('process', __NODE_ENV__)

// 封装wx.request()
const fetchRequest = (method, url, data) => {
  let store = getStore()

  // 是否符合任意场景，上拉加载等
  wepy.showLoading()

  return new Promise((resolve, reject) => {
    wepy.request({
      method,
      url: url,
      data: data,
      header: {
        'Authorization': 'token'
      },
      success(res) {
        // 跳转登录页
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        wepy.hideLoading()
      }
    })
  })
}

// 获取用户信息
export const userInfo = (params) => {
  // 配置client
  const client = {
    client_id: 'abc',
    client_secret: 'efg'
  }

  // 配置平台
  const platfrom = {
    type_code: 'epadmin'
  }

  return fetchRequest('POST', 'v1/user/info', {params, ...client, ...platfrom})
}