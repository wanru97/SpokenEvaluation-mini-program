const app = getApp()

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
    // 或许还有其他方法可以使用，以下
    //wx.getMenuButtonBoundingClientRect(); 
    //let navigationHeight = Math.floor(custom.bottom + custom.top - res.statusBarHeight);
    return title - toolBar
}

