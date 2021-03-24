/**
 * token相关操作
 */
const tokenName = 'TOKEN'

// 获取token
export function getToken () {
  try {
    const value = wx.getStorageSync(tokenName)
    return value
  } catch (e) {
    console.log('获取token失败', e)
  }
}
// 检查token是否存在
export function judgeToken () {
  const value = wx.getStorageSync(tokenName)
  if (value && value !== '') {
    return true
  } else {
    return false
  }
}
// 保存token
export function saveToken (value) {
  try {
    wx.setStorageSync(tokenName, value)
  } catch (e) {
    console.log('存储token失败', e)
  }
}
// 删除Token
export function deleteToken () {
  try {
    wx.removeStorageSync(tokenName)
  } catch (e) {
    console.log('删除token失败', e)
  }
}