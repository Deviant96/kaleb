<style>
div h2 {
  text-align: center;
}
</style>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label>Username</label>
        <input
          type="text"
          v-model="username"
          aria-label="Username"
          placeholder="Enter your username"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          aria-label="Password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const username = ref('')
    const password = ref('')
    const error = ref(null)

    const login = async () => {
      try {
        await store.dispatch('auth/loginUser', {
          username: username.value,
          password: password.value
        })
        router.push('/profile')
      } catch (err) {
        error.value = err.response
          ? err.response.data.message
          : 'Server is offline. Please try again later.'
      }
    }

    return {
      username,
      password,
      error,
      login
    }
  }
}
</script>
