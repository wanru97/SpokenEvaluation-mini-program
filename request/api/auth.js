import { Post, Get } from '../request'

export const api = {
  Login: function (value) {
    return Post('/login', value)
  },
  getUserInfo:() => {
    return Get('/Info')
  }
}