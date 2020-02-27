import store from '@/store/index'

const TokenKey = 'Admin-Token'
//加上这句,关闭浏览器,下次需要重新登录
//window.onunload = removeToken

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  if (store && store.state) {
    store.state.user.token = token
  }
  return window.localStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
