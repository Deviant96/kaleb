import { jwtDecode } from 'jwt-decode'
import AuthService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await AuthService.login(credentials)
        const { access_token } = response
        const user = jwtDecode(access_token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', access_token)
        commit('loginSuccess', user)
        return Promise.resolve(user)
      } catch (error) {
        commit('loginFailure')
        return Promise.reject(error)
      }
    },
    logout({ commit }) {
      AuthService.logout()
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      commit('logout')
    },
    async registerUser({ commit }, user) {
      try {
        const response = await AuthService.register(user)
        commit('registerSuccess')
        return Promise.resolve(response.data)
      } catch (error) {
        commit('registerFailure')
        return Promise.reject(error)
      }
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    }
  },
  getters: {
    user: (state) => state.user
  }
}
