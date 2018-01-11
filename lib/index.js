/* eslint-disable prefer-arrow-callback */
/* eslint-disable camelcase */
const Axios = require('axios')
const phantom = require('phantom')
const { userAgent, loginUrl, captchaUrl, api } = require('./utils/config')

// 请求拦截器：自动处理 cookie
Axios.interceptors.request.use(config => {
  const { p_uin, p_skey } = config.params
  config.headers = {
    cookie: `p_uin=${p_uin}; p_skey=${p_skey}`
  }
  return config
})

const errMsg = {
  failed: 'Login failed: Please check your account password is correct',
  check:
    'Login failed: Your account is logged in offsite (Unable to verify verification code)'
}

module.exports = class QzoneApi {
  static login(uin, pwd) {
    return new Promise(async (resolve, reject) => {
      const instance = await phantom.create([], {
        logger: {
          info: () => {}
        }
      })
      const page = await instance.createPage()
      try {
        // 监听页面加载完成事件
        // 当模拟登录成功后会执行跳转动作
        // 在此处获取 cookie 和用户信息
        await page.on('onLoadFinished', async function() {
          const url = await page.property('url')
          if (url === loginUrl) return // 忽略登录页面

          // 获取用户信息
          const user = await page.evaluate(function() {
            return {
              login: user.isLogin(),
              owner: user.isOwner(),
              token: user.getToken()
            }
          })

          // 获取服务端返回的 Cookie
          const cookies = await page.property('cookies')
          await instance.exit()

          // 返回异步结果
          resolve({ user, cookies })
        })

        // 验证是否登录成功
        await page.on('onResourceReceived', async function(response) {
          const { url, status, stage, headers } = response
          if (url.startsWith(captchaUrl)) {
            // 异地登录，需要验证码
            reject(new Error(errMsg.check))
          } else if (
            status === 200 &&
            stage === 'start' &&
            url.startsWith(api.login)
          ) {
            // 获取 Set-Cookie 响应头中是否包含 skey 字符串
            // 如果包含则表示登录成功
            const hasKey = headers
              .find(x => x.name === 'Set-Cookie')
              .value.includes('skey')

            // 登录失败
            if (!hasKey) {
              await instance.exit()
              reject(new Error(errMsg.failed))
            }
          }
        })

        await page.property('viewportSize', { width: 375, height: 667 })
        await page.setting('userAgent', userAgent)

        // 打开Qzone登录页面
        await page.open(loginUrl)
        // 模拟登录
        await page.evaluate(
          function(args) {
            document.getElementById('u').value = args.uin
            document.getElementById('p').value = args.pwd
            document.getElementById('go').dispatchEvent(new Event('click'))
          },
          { uin, pwd }
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  static getAlbumList(params) {
    return Axios.get(api.album, { params }).then(res => res.data.data)
  }
  static getPhotoList(params) {
    return Axios.get(api.photo, { params }).then(res => res.data.data)
  }
}
