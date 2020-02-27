import {loginByUsername, logout, getUserInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    userId: '',
    token: getToken(),
    name: '',
    avatar: '',//头像
    roles: [],//角色
    hidBtns: [],//不可见按钮
    orgnId: '',//部门id
    isAdmin: false,
    companyId: '',//单位id
    skin: '',
    messageNum: 0,
    nextChgId: '0',
  },

  mutations: {
    SET_USER: (state, user) => {
      state.userId = user.userId
      state.token = user.token
      state.name = user.name
      state.skin = user.skin
      state.orgnId = user.orgnId
      state.companyId = user.unitId
      state.isAdmin = user.admin
      state.avatar = user.avatar
      state.hidBtns = user.hidBtnLs
      state.nextChgId = user.nextChgId

    },
    //   SET_CODE: (state, code) => {
    //     state.code = code
    //   },
    //   SET_TOKEN: (state, token) => {
    //     state.token = token
    //   },
    //   SET_INTRODUCTION: (state, introduction) => {
    //     state.introduction = introduction
    //   },
    //   SET_SETTING: (state, setting) => {
    //     state.setting = setting
    //   },
    //   SET_STATUS: (state, status) => {
    //     state.status = status
    //   },
    //   SET_NAME: (state, name) => {
    //     state.name = name
    //   },
    //   SET_AVATAR: (state, avatar) => {
    //     state.avatar = avatar
    //   },
    //   SET_ROLES: (state, roles) => {
    //     state.roles = roles
    //   },
    //   SET_COMPANYID: (state,companyId) =>{
    //     state.companyId = companyId
    // }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(account, userInfo.password).then(response => {
          const data = response.data
          if (data.code == '-1') {
            reject(data)
            return false
          }
          setToken(data.token)//保留原来写法,不给值,不能登录wxl
          commit('SET_USER', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data || response.data.code == '-1') { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_USER', data)
          resolve(state)
          // }).catch(error => {
          //   reject(error)
          // })
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
