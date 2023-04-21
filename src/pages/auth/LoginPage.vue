<template>
  <div class="login-container">
    <h2>Login</h2>
    <div class="border"></div>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input v-model="email" type="email" name="email" id="email" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" name="password" id="password" required />

      <button type="submit">Login</button>
    </form>
    <div class="link-text">
      <RouterLink to="/register">Don't have an account?</RouterLink>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
import config from '../../config'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      try {
        const response = await axios.post(config.BASE_URL + '/api/login', {
          email: this.email,
          password: this.password
        })
        console.log(response.data)
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        alert(error.response.data.message)
      }
    }
  }
}
</script>
  
  <style>
.link-text {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
.border {
  height: 1rem;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
}
.login-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  margin-top: 3rem;
  min-height: 77vh;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding-bottom: 3rem;
  padding-top: 2rem;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type='email'],
input[type='password'] {
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #008cba;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #006f8c;
}
</style>