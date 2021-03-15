import { judgeToken, getToken } from '../utils/permission'


/**
 * 服务器根路径
 */
export const BASE_URL = ''

/**
 * 各种请求Get,post,delete,put方法
 */
export function Get (apiUrl, param, header) {
  return request('GET', apiUrl, param, header)
}
export function Post (apiUrl, param, header) {
  return request('Post', apiUrl, param, header)
}
export function Put (apiUrl, param, header) {
  return request('Put', apiUrl, param, header)
}
export function Delete (apiUrl, param, header) {
  return request('Delete', apiUrl, param, header)
}


/**
 * apiUrl请求返回的状态码所要提示的信息表
 * '@apiUrl': {
    @StatusCode: '提示语'
  }
 */
const TipInfoMenu = {
  '/test': {
    204 : '提示语'
  }
}
const ErrInfoMenu = {
  404: '未找到',
  404: '参数或类型不对',
  415: '不支持的媒体类型',
  500: '内部服务器错误'
}

/**
 * 对请求失败的状态码，进行处理，提示对应信息
 */
function HttpStatusCodeTip(res,apiUrl) {
  if ( res.statusCode < 400) {
    wx.showToast({
      title: res.data.message || TipInfoMenu[apiUrl][res.statusCode],
      icon: 'success',
      duration: 2000
    })
  } else {
    consoe.err(`statusCode：${res.statusCode}`)
    if (res.statusCode === 401) {
      // 无权限要进行特殊处理
    } else {
      consoe.err(`${ErrInfoMenu[res.statusCode]}`)
    }
    
  }
}

/**
 * 发送请求的函数
 */
export function request (method, apiUrl, param, header) {
  // 过滤传参param, 删除所有为 null 的参数
  for (var key in param) {
    if (param[key] === null) {
      delete param[key]
    }
  }
  // 判断本地缓存是否含有token，如果含有token，header携带参数
  let headerValue
  if (judgeToken()) {
    headerValue = Object.assign({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    }, header)
  } else {
    headerValue = Object.assign({
      'Content-Type': 'application/json'
    }, header)
  }

  let response, error
  // header不设置的时候content-type时 默认为 application/json
  /**
   * 关于状态码的相关信息，看README.md
   */
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + apiUrl,
      method: method,
      header: headerValue,
      data: param || {},
      success (res) {
        HttpStatusCodeTip(res, apiUrl)
        response = res.data
        if (res.statusCode < 400) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail (err) {
        HttpStatusCodeTip(err, apiUrl)
        error = err
        reject(err)
      },
      complete () {
        // 为了在控制台显示每次的请求数据，方便调试
        console.info('==============>发送请求<==============')
        console.warn(`请求方法: ${ method },请求数据: ${ BASE_URL }${ apiUrl }`)
        if (param) console.warn('参数：', param)
        if (response) {
          console.warn('请求成功：', response)
        } else {
          console.warn('请求失败：', error)
        }
        console.info('==============>请求结束<==============')
      }
    })
  })
}