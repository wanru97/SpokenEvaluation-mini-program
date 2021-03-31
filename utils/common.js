const app = getApp()
import { api } from '../request/api/auth'
// 处理自定义导航栏高度的函数
export function getNavBarHeight () {
  let title
    const menu = {
      iPhone: 64,
      iPhoneX: 88,
      Android: 68,
      samsung: 72
    }
    const systemInfo = app.globalData.navBarInfo
    const toolBar = systemInfo.statusBarHeight // 时间、信号等工具栏的高度
    if (systemInfo.model.indexOf('iPhone')!== -1) {
      if (systemInfo.system.indexOf('iPhone X')!== -1) {
        title = menu.iPhoneX
      } else {
        title = menu.iPhone
      }
    } else if (systemInfo.system.indexOf('Android')!== -1) {
      title = menu.Android
    } else {
      title = menu.samsung
    }
    // 或许还有其他方法可以使用，以下,好像是通过胶囊定位的方法来进行计算
    // wx.getMenuButtonBoundingClientRect(); 
    // let navigationHeight = Math.floor(custom.bottom + custom.top - res.statusBarHeight);
    return title - toolBar
}
// 消息提示函数
export function showToast(msg,icon = 'none') {
  wx.showToast({
    title: msg,
    icon: icon,
    duration: 2000
  })
}

// 获取用户信息
export function getUserInfo() {
  api.getUserInfo().then(res => {
    console.info('用户信息获取成功',res)
  }).catch(err => {
    console.warn('用户信息获取失败',err)
    wx.reLaunch({
      url: '../pages/login/login'
    })
  })
}

