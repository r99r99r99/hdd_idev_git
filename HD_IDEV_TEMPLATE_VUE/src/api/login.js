import axios from 'axios'
import {Message} from 'element-ui'

export function loginByUsername(account, password) {
  const data = {
    account: account,
    password,
  }
  return axios.get('/PrivilegeVueController/login', {params: data})
}

export function logout() {
  return axios.get('/PrivilegeVueController/loginOut')
}

export function getUserInfo(token) {
  return axios.get('/PrivilegeVueController/loginByToken?tokenId=' + token).catch(error => {
    Message({
      type: 'error',
      message: "请检查后端服务是否启动:"+error.response.data,
      duration: 9999,
      showClose: true
    })
  })
}


