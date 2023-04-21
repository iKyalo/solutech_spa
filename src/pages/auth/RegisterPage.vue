<template>
  <div class="reg-container">
    <p v-for="(err, i) in errors" :key="i" class="error_msg">
      {{ err[0] }}
    </p>
    <h1>Register</h1>
    <div class="border"></div>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <input
        v-model="name"
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        required
      />

      <label for="email">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
      />

      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        required
      />
      <label for="password">Password Confirmation</label>
      <input
        v-model="password_confirmation"
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        required
      />

      <button type="submit">Register</button>
    </form>
    <div class="link-text">
      <RouterLink to="/login">Already have an account?</RouterLink>
    </div>
  </div>
</template>
  
  <script>
import axios from 'axios'
import config from '../../config'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: []
    }
  },
  methods: {
    register() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      axios
        .post(config.BASE_URL + '/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then((res) => {
          // Redirect to success page on successful registration
          console.log(res.data)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
        })
        .then(this.$router.push('/'))
        .catch((error) => {
          console.log(error)
          this.errors = error.response.data.errors
          console.log(this.errors)
        })
    }
  }
}
</script>
  
  <style>
.error_msg {
  background-color: red;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

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
.reg-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  padding: 20px;
  margin-top: 3rem;
  min-height: 100vh;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding-bottom: 3rem;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #e9e9e9;
}

button {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2e8b57;
}
</style>