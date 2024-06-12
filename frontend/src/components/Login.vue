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
        <input type="text" v-model="username" aria-label="Username" placeholder="Enter your username" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" aria-label="Password" placeholder="Enter your password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    async login() {
      try {
        await this.loginUser({
          username: this.username,
          password: this.password,
        });
        this.$router.push('/profile');
      } catch (err) {
        this.error = err.response ? err.response.data.message : 'Server is offline. Please try again later.';
      }
    },
  },
};
</script>
