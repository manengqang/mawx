import wepy from 'wepy';

export default class extends wepy.app {
    constructor () {
        super();
        // 拦截request请求
        this.intercept('request', {
            // 发出请求时的回调函数
            config (p) {
                // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
                p.header = {
                  'Authorization': 'token'
                }
                console.log('config request: ', p);
                // 必须返回OBJECT参数对象，否则无法发送请求到服务端
                return p;
            },

            // 请求成功后的回调函数
            success (p) {
                // 可以在这里对收到的响应数据对象进行加工处理
                console.log('request success: ', p);
                // token被刷新，用户不存在
                if (p.data.code === 40506) {
                  // 清除本地缓存
                  // 返回登录页面
                }
                // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                return p;
            },

            //请求失败后的回调函数
            fail (error) {
                console.log('request fail: ', p);
                if (error.response) {
                  if (error.response.status == 401) {
                      WebApi.$initLocalStorage()
                      if (error.response.data.code == 40402) {
                          WebApi.$alert('该账号已在其他地方登录,请重新登录')
                      }
                      if (error.response.data.code == 40407 || error.response.data.code == 40401) {
                          WebApi.$alert('认证过期，请重新登录')
                      }
                      router.replace({ path: '/login' })
                  }
                  if (error.response.status == 403) {
                      WebApi.$alert('没有权限!')
                  }
                  if (error.response.status >= 500) {
                      WebApi.$alert('服务器异常,请稍后重试!')
                  }
                  return Promise.reject(error.response)
                } 
                // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                return error;
            },

            // 请求完成时的回调函数(请求成功或失败都会被执行)
            complete (p) {
                console.log('request complete: ', p);
            }
        });
    }
}