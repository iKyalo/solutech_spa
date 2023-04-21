<template>
  <div class="container">
    <div class="border-green">
      <h1 class="green">My Tasks</h1>
    </div>
    <table class="task-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Task Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td><input type="checkbox" :name="`task[${index}]`" :value="task.id" /></td>
          <td>{{ task.name }}</td>
          <td>{{ task.status }}</td>
        </tr>
      </tbody>
    </table>
    <div id="status-change">
      <span>Change Status:</span>
      <select id="status-select" v-model="selectedStatus">
        <option v-for="(status, index) in statusOptions" :value="status.id" :key="index">
          {{ status.name }}
        </option>
      </select>
      <button id="status-confirm" @click="updateStatus">Confirm</button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
import config from '../config'

export default {
  data() {
    return {
      tasks: [],
      selectedStatus: '',
      statusOptions: []
    }
  },
  mounted() {
    this.fetchStatuses()
    this.fetchTasks()
  },
  methods: {
    async fetchStatuses() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/statuses', { headers })
        const statuses = response.data
        console.log(statuses)
        this.statusOptions = statuses
        console.log(this.statusOptions)
        // do something with the statuses
      } catch (error) {
        console.error(error)
      }
    },
    async fetchTasks() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/tasks', { headers })
        this.tasks = response.data.tasks
      } catch (error) {
        console.error(error)
      }
    },
    async updateStatus() {
      // Implement this method to update the status of the selected tasks
    }
  }
}
</script>
  
<style scoped>
.btns-box {
  display: flex;
  justify-content: center;
}
.btnFilter {
  margin-left: 1rem;
}
.btn-delete {
  background-color: rgb(231, 40, 40);
}
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
