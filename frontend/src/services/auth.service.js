import axios from 'axios'

const API_URL = import.meta.env.VITE_AUTH_URL

class AuthService {
  async login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      name: user.name,
      username: user.username,
      password: user.password
    })
  }

  isAuthenticated() {
    return !!localStorage.getItem('user')
  }
}

export default new AuthService()
