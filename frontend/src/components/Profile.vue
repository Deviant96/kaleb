<template>
  <div>
    <h2>Profile</h2>
    <template v-if="user">
      <p>Welcome, {{ user.user.username }}!</p>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.state.auth.user)

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/login')
    }

    return { user, logout }
  }
}
</script>