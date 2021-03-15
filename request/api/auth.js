import { Post } from '../request'

export const api = {
  Login: function (value) {
    return Post('/login', value)
  }
}