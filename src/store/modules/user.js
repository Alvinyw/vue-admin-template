import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  constantRoutes,
  resetRouter
} from '@/router'

function lazy(name) {
  if (name !== 'layout') {
    return () => import(`@/views/${name}`)
  } else {
    return () => import(`@/${name}`)
  }
}

function generaMenu(routers, data) {
  data.forEach((item) => {
    let menu = Object.assign({}, item)
    menu.component = lazy(menu.component)
    if (item.children) {
      menu.children = []
      generaMenu(menu.children, item.children)
    }
    routers.push(menu)
  })
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  routes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  ADD_ROUTES: (state, routes) => {
    let routesAry = []
    generaMenu(routesAry, routes) // 将后台的路由数据components转化成组件
    router.addRoutes(routesAry) // 添加路由
    //router.push('/')

    state.routes = routesAry
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_NAME', username)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  //添加路由
  addRoutes({
    commit
  }, addrouter) {
    return new Promise(resolve => {
      commit('ADD_ROUTES', addrouter)
      sessionStorage.setItem('routes', JSON.stringify(addrouter))
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
