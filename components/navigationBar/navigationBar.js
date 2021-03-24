// components/navigationBar/navigationBar.js
import { getNavBarHeight } from '../../utils/common'
const app = getApp()
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**组件的属性列表**/
  properties: {
    title: {
      type: String,
      value: ''
    },
    returnType: {
      type: String,
      value: 'navigateBack'
    },
    delta: {
      type: Number,
      value: 1
    },
    url: {
      type: String,
      value: ''
    },
    iconType: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    titleHeight: getNavBarHeight() + 'px',
    statusBarHeight: app.globalData.navBarInfo.statusBarHeight + 'px'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickReturn:() => {
      if (this.properties.returnType === 'navigateBack') {
        console.info('当前页面栈', getCurrentPages())
        wx.navigateBack({
          delta: this.properties.delta
        })
      } else if (this.properties.returnType === 'redirectTo') {
        wx.redirectTo({
          url: this.properties.url
        })
      } else {
        wx.switchTab({
          url: this.properties.url
        })
      }
    }
  }
})
