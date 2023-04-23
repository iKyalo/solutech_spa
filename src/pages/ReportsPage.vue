<template>
  <div class="base">
    <div class="w3-bar w3-black">
      <button id="btnStatus" class="w3-bar-item w3-button" @click="openTab('Status')">
        Task Status
      </button>
      <button id="btnCompletions" class="w3-bar-item w3-button" @click="openTab('Completions')">
        Task Completions
      </button>
      <button id="btnActivity" class="w3-bar-item w3-button" @click="openTab('Activity')">
        User Activity
      </button>
    </div>
    <div id="Status" class="box" style="display: block">
      <div>
        <h1>Task Status Report</h1>
        <div class="border"></div>
        <div class="summary">
          <h2>Summary</h2>

          <p>Total tasks: {{ status.total }}</p>
          <p>Completed tasks: {{ status.completed }}</p>
          <p>In progress tasks: {{ status.in_progress }}</p>
          <p>Not started tasks: {{ status.not_started }}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Task name</th>
              <th>Status</th>
              <th>Assigned to</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stat, idx) in status.status_summary" :key="idx">
              <td>{{ stat.id }}</td>
              <td>{{ stat.name }}</td>
              <td class="status-completed" v-if="stat.status_name == 'Completed'">
                {{ stat.status_name }}
              </td>
              <td class="status-in-progress" v-if="stat.status_name == 'In Progress'">
                {{ stat.status_name }}
              </td>
              <td class="status-not-started" v-if="stat.status_name == 'Not Started'">
                {{ stat.status_name }}
              </td>
              <td>{{ stat.user_name }}</td>
            </tr>

            <!-- add more rows as needed -->
          </tbody>
        </table>
      </div>
    </div>
    <div id="Completions" class="box" style="display: none">
      <div class="">
        <h1>Task Completions Report</h1>
        <div class="border"></div>
        <div class="chart-container">
          <div v-for="(task, i) in completions.tasks" :key="i" class="bar-box">
            <div class="bar">
              <div class="bar-fill" :style="'height: ' + task.completion_rate * 10000 + '%'"></div>
            </div>
            <div class="label">{{ task.name.substr(0, 7) }}...</div>
          </div>
        </div>
        <p>Summary:</p>
        <ul class="ul-info">
          <li>Total Tasks Completed: {{ completions.total }}</li>
          <li>Average Completion Time: {{ completions.average }} hours</li>
          <li>Tasks with the highest completion rates:</li>
          <ul>
            <li v-for="(task, i) in completions.tasks" :key="i">
              {{ task.name }} ({{ task.completion_rate * 100 }}%)
            </li>
          </ul>
        </ul>
      </div>
    </div>
    <div id="Activity" class="box" style="display: none">
      <div class="">
        <h2>User Activity Report</h2>
        <div class="border"></div>
        <div class="summary">
          <p>Total Users: {{ activity.total }}</p>
          <p>Active Users: {{ activity.active }}</p>
        </div>
        <table class="user-activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Tasks Assigned</th>
              <th>Tasks Completed</th>
              <th>Average Completion Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, idx) in activity.users" :key="idx">
              <td>{{ user.name }}</td>
              <td>{{ user.tasks_assigned }}</td>
              <td>{{ user.tasks_completed }}</td>
              <td>{{ number_format(user.avg_completion_time) }} hours</td>
            </tr>
            <!-- more users -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
    
<script>
import axios from 'axios'
import config from '../config'

export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      status: {
        total: 0,
        completed: 0,
        in_progress: 0,
        not_started: 0,

        status_summary: []
      },
      completions: {
        total: 0,
        average: 0,
        tasks: []
      },
      activity: {
        total: 0,
        active: 0,
        users: []
      }
    }
  },
  mounted() {
    document.getElementById('btnStatus').style.backgroundColor = 'purple'
    this.fetchStatusData()
    this.fetchCompletionsData()
    this.fetchActivityData()
  },
  methods: {
    async fetchStatusData() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/status/tasks', { headers })
        const res = response.data
        console.log(res)
        this.status.total = res.total_tasks
        this.status.completed = res.completed_tasks
        this.status.in_progress = res.in_progress_tasks
        this.status.not_started = res.not_started_tasks
        this.status.status_summary = res.tasks
      } catch (error) {
        console.error(error)
      }
    },
    async fetchCompletionsData() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/status/stats', { headers })
        const dt = response.data
        console.log(dt)
        this.completions.total = dt.completed_tasks
        this.completions.average = dt.average_completion_time
        this.completions.tasks = dt.top_tasks
        // do something with the statuses
      } catch (error) {
        console.error(error)
      }
    },
    async fetchActivityData() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/status/users', { headers })
        const res = response.data
        console.log(res)
        this.activity.total = res.total
        this.activity.active = res.active
        this.activity.users = res.users
        console.log(this.statusOptions)
        // do something with the statuses
      } catch (error) {
        console.error(error)
      }
    },
    openTab(boxName) {
      const x = document.getElementsByClassName('box')
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
      }
      const buttons = document.getElementsByClassName('w3-button')
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = ''
      }
      document.getElementById(boxName).style.display = 'block'
      document.getElementById(`btn${boxName}`).style.backgroundColor = 'purple'
    },
    number_format(num) {
      num = parseFloat(num)
      return num.toFixed(2)
    }
  }
}
</script>
    
  <style scoped>
.label {
  top: 2rem;
  left: -3rem;
}
.base {
  min-height: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
}

.box {
  width: 100%;
}
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}
.border {
  height: 0rem;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
}
h1 {
  margin-top: 0;
  color: #333;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

.w3-button {
  margin-right: 10px;
}

.w3-bar {
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #eee;
  font-weight: bold;
}

.status-completed {
  color: green;
  font-weight: bold;
}

.status-in-progress {
  color: orange;
  font-weight: bold;
}

.status-not-started {
  color: red;
  font-weight: bold;
}

.summary {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 20px;
}

.summary h2 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 24px;
}

.summary p {
  margin: 0;
  font-size: 18px;
}

.container {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
h1 {
  font-size: 24px;
  margin-bottom: 1px;
}
.chart-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.bar {
  width: 50px;
  height: 100px;
  border: 1px solid black;
  margin: 10px;
  display: flex;
  align-items: flex-end;
}

.bar-fill {
  background-color: blue;
  width: 100%;
}

.bar-box {
  margin-right: 1rem;
}

.label {
  text-align: center;
  font-size: 16px;
  color: black;
}

.report-container {
  margin: 20px;
}

.report-container h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.report-container .summary {
  margin-bottom: 20px;
}

.user-activity-table {
  width: 100%;
  border-collapse: collapse;
}

.user-activity-table th,
.user-activity-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.user-activity-table th {
  background-color: #eee;
  text-align: left;
}

.user-activity-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-activity-table td:first-child {
  font-weight: bold;
}

.user-activity-table td:last-child {
  text-align: right;
}
</style>
    