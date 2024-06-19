import { reactive } from 'vue'
import jwtDecode from 'jwt-decode'

const state = reactive({
  user: null
})

function fetchUser() {
  const token = localStorage.getItem('jwt')
  if (token) {
    const decoded = jwtDecode(token)
    state.user = decoded
  }
}

function getUsername() {
  return state.user?.username
}

export default {
  state,
  fetchUser,
  getUsername
}
