import newAxios from "@/axios";


const API_URL = import.meta.env.VITE_AUTH_URL;

class AuthService {
  async login(user) {
    return newAxios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  async register(user) {
    return newAxios.post(API_URL + 'register', {
      name: user.name,
      username: user.username,
      password: user.password
    })
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }
}

export default new AuthService()
