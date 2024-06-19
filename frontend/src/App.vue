<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}

nav a {
  margin: 0 16px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

button {
  width: 100%;
  padding: 0;
  background-color: transparent;
  color: red;
  border: none;
  font-weight: 800;
  cursor: pointer;
}

button:hover {
  background-color: unset;
}
</style>

<template>
  <nav>
    <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
    <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
    <RouterLink v-if="isLoggedIn" to="/profile">Profile</RouterLink>
    <button v-if="isLoggedIn" @click="logout">Logout</button>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => !!store.state.auth.user)

const logout = () => {
  store.dispatch('auth/logout')
  router.push('/login')
}
</script>
