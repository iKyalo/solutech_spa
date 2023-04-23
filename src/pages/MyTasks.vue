<template>
  <div class="container">
    <div class="border-green">
      <h1 class="green">My Tasks</h1>
    </div>
    <LoadingBox v-if="loading" />
    <div v-else>
      <table class="task-table">
        <thead>
          <tr>
            <th>#</th>
            <!-- <th>ID</th> -->
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td><input type="checkbox" v-model="selected_tasks" :value="task.task_id" /></td>
            <!-- <td>{{ task.task_id }}</td> -->
            <td>{{ task.name }}</td>
            <td>{{ task.status_name }}</td>
          </tr>
        </tbody>
      </table>
      <form @submit.prevent="updateStatus">
        <div id="status-change">
          <span>Change Status:</span>
          <select id="status-select" v-model="selectedStatusId" required>
            <option value="" disabled selected hidden>Select an option</option>
            <option v-for="(status, index) in statusOptions" :value="status.id" :key="index">
              {{ status.name }}
            </option>
          </select>
          <button id="status-confirm">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
import config from '../config'
import LoadingBox from '../components/LoadingBox.vue'

export default {
  components: { LoadingBox },
  data() {
    return {
      selected_tasks: [],
      loading: false,
      tasks: [],
      selectedStatusId: '',
      statusOptions: []
    }
  },
  mounted() {
    this.fetchStatuses()
    this.fetchTasks()
  },
  methods: {
    async fetchStatuses() {
      this.loading = true
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/statuses', { headers })
        const statuses = response.data
        console.log(statuses)
        this.statusOptions = statuses
        console.log(this.statusOptions)
        // do something with the statuses
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
    async fetchTasks() {
      this.loading = true
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      const headers = { Authorization: `Bearer ${token}` }
      const payload = { user_id: user.id }
      try {
        const response = await axios.post(config.BASE_URL + '/api/my-tasks', payload, { headers })
        this.tasks = response.data
        console.log(this.tasks)
        this.loading = false
        this.selected_tasks = []
      } catch (error) {
        console.error(error)
        this.loading = false
        this.selected_tasks = []
      }
    },
    async updateStatus() {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      const headers = { Authorization: `Bearer ${token}` }

      const payload = {
        ids: this.selected_tasks,
        status_id: this.selectedStatusId,
        user_id: user.id
      }

      axios
        .post(config.BASE_URL + '/api/task/update', payload, { headers })
        .then((response) => {
          console.log(response.data)
          this.fetchTasks()
          alert('Tasks Updated')
        })
        .catch((error) => {
          console.error(error)
          // handle error
          alert('Something went wrong')
        })
    }
  }
}
</script>
  
<style scoped>
.container {
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
  margin-top: 4rem;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: 10px;
}
.border-green {
  border-bottom: 1px solid #00bd7e;
}
h3 {
  font-size: 1.2rem;
}
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.task-table th,
.task-table td {
  padding: 12px 15px;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #ccc;
}

.task-table th {
  background-color: #f6f6f6;
  font-weight: bold;
}

.task-table tbody tr:hover {
  background-color: #f5f5f5;
}

.task-table tbody tr:first-child {
  border-top: none;
}

.task-table tbody tr:last-child {
  border-bottom: none;
}

.task-table td:first-child {
  width: 30px;
  text-align: center;
}

.task-table td:nth-child(2) {
  width: 300px;
}

.task-table td:nth-child(3) {
  width: 120px;
  text-transform: capitalize;
}

.task-table td:nth-child(4) {
  width: 200px;
}

.task-table input[type='checkbox'] {
  margin-right: 10px;
}

#status-change {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

#status-change span {
  font-weight: bold;
  margin-right: 10px;
}

#status-select {
  font-size: 16px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
}

#status-confirm {
  margin-top: 0rem;
  font-size: 16px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-color: #00bd7e;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

#status-confirm:hover {
  background-color: #007bff;
}
</style>
