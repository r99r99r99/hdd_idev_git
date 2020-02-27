import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zh',
    visitedViews: [],
    cachedViews: [],
    selectedView: {},
    vocRec: '', // 语音内容
    refreshPage: false // 右键刷新时会变成true,然后再变成false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    ADD_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.name === view.name)) return
      const comname = view.matched[1].components.default.name// 组件的name
      state.visitedViews.push({
        comname: comname,
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name',
        enTitle: view.meta.enTitle || 'no-name',
        addQuery: view.meta.addQuery
      })
      state.cachedViews.push(comname)
    },
    DEL_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.name === view.name) {
          state.visitedViews.splice(i, 1)
          state.cachedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.name === view.name) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          state.cachedViews = state.cachedViews.slice(i, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: state => {
      state.visitedViews = []
      state.cachedViews = []
    },
    DEL_CACHED_VIEW: (state, view) => {

    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    addView({ commit }, view) {
      commit('ADD_VIEW', view)
    },
    delView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VIEWS', view)
        //  dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_ALL_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    refreshView({ commit, state }, view) { // 只有刷新时才会用
      state.refreshPage = true
      const vuevm = this._vm
      let index = null// 移除缓存的位置
      for (const [i, v] of state.cachedViews.entries()) {
        if (v === view.comname) {
          state.cachedViews.splice(i, 1)
          index = i
        }
      }
      vuevm.$nextTick(() => {
        state.refreshPage = false
        state.cachedViews.splice(index, 0, view.comname)
      })
    },
  }
}

export default app
