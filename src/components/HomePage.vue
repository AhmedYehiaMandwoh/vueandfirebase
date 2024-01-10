<template>
  <div>
  <Header />
  <HeroSection />

  </div>
</template>

<script>
import { useLoadUsers, deleteUser } from '@/firebase'
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'

export default {
  components: {
    Header,
    HeroSection
  },
  setup() {
    const users = useLoadUsers()
    return { users, deleteUser }
  }
}
</script>
