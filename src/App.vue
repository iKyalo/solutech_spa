<script setup>
import { RouterView } from 'vue-router'
import TheNavBar from './components/TheNavBar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="wrapper">
    <!-- <TheNavBar /> -->
    <TheNavBar v-if="showNavBar" />

    <RouterView />
    <TheFooter />
  </div>
</template>

<script>
export default {
  computed: {
    showNavBar() {
      return (
        this.$route.path !== '/login' &&
        this.$route.path !== '/signup' &&
        this.$route.path !== '/register'
      )
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-color: none;
}
</style>
