<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div :class="{ topnav: true, responsive: isResponsive }" :id="navId">
      <RouterLink :class="{ active: isCurrentRoute('/') }" to="/">Home</RouterLink>

      <!-- <RouterLink :class="{ active: isCurrentRoute('/notfound') }" to="/notfound"
        >Not Found</RouterLink
      > -->
      <!-- <RouterLink :class="{ active: isCurrentRoute('/login') }" to="/login">Login</RouterLink> -->
      <!-- <RouterLink :class="{ active: isCurrentRoute('/register') }" to="/register"
        >Register</RouterLink
      > -->
      <RouterLink :class="{ active: isCurrentRoute('/tasks') }" to="/tasks">Tasks</RouterLink>
      <RouterLink :class="{ active: isCurrentRoute('/reports') }" to="/reports">Reports</RouterLink>
      <a style="float: right" @click="logout">Logout</a>
      <a href="javascript:void(0);" class="icon" @click="toggleResponsive">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
</template>
  
  <script>
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  data() {
    return {
      navId: 'myTopnav',
      isResponsive: false,
      route: this.$route.path
    }
  },
  methods: {
    toggleResponsive() {
      this.isResponsive = !this.isResponsive
    },
    isCurrentRoute(route) {
      return this.$route.path === route
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/login')
    }
  }
}
</script>
  
  <style scoped>
.topnav {
  background-color: #333;
  overflow: hidden;
  position: fixed;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  z-index: 9999;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: fixed;
  }
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>