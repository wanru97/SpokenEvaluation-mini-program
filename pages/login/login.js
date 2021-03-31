// pages/login/login.js
const app = getApp()
import { getNavBarHeight, showToast, getUserInfo } from '../../utils/common'
import { api } from '../../request/api/auth'
import { saveToken } from '../../utils/token'
Page({
  data: {
    titleHeight: getNavBarHeight(),
    statusBarHeight: app.globalData.navBarInfo.statusBarHeight,
    username: '',
    password: ''
  },
  onLoad: function (options) {
    const app = getApp()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  Login(){
    if (this.checkValue()) {
      let param = {
        username: this.data.username,
        password: this.data.password
      }
      api.Login(param).then((res) => {
        console.info('登陆成功', res)
        saveToken(res.token)
        // 去获取用户信息
        getUserInfo()
        // wx.redirectTo({
        //   url: '../index/index'
        // })
      }).catch((err) => {
        console.error('登陆失败')
        // TODO mock还没有模拟出来失败的数据
      })
    } else {
      return null
    }
  },
  checkValue() {
    if (this.data.username === '') {
      showToast('请输入用户名!')
      return false
    } else if (this.data.password === '') {
      showToast('请输入密码!')
      return false
    } else {
      return true
    }
  },
  inputPassword(e) {
    this.data.password = e.detail.value
  },
  inputUsername(e) {
    this.data.username = e.detail.value
  },
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})