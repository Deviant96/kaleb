<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label>Name</label>
        <input type="text" v-model="name" aria-label="Name" placeholder="Enter your name" required />
      </div>
      <div>
        <label>Username</label>
        <input type="text" v-model="username" aria-label="Username" placeholder="Enter your username" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" aria-label="Password" placeholder="Enter password" required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" v-model="confirmPassword" aria-label="Confirm Password" placeholder="Enter password confirmation" required />
      </div>
      <div>
        <button type="submit">Register</button>
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
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      error: null
    };
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }
      
      try {
        await this.registerUser({
          name: this.name,
          username: this.username,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response ? err.response.data.message : 'Server is offline. Please try again later.';
      }
    },
  },
};
</script>
