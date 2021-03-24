// app.js
// import { start } from './utils/start'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // start.getNavBarHeight()
  },
  // onUnlaunch() {
  //   console.log('xioahui')
  // },
  globalData: {
    userInfo: null,
    navBarInfo: wx.getSystemInfoSync()
  }
})
