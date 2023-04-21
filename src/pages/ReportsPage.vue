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
              <th>Task name</th>
              <th>Status</th>
              <th>Assigned to</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stat, idx) in status.status_summary" :key="idx">
              <td>Task 1</td>
              <td class="status-completed">Completed</td>
              <td>User 1</td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td class="status-in-progress">In progress</td>
              <td>User 2</td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td class="status-not-started">Not started</td>
              <td>User 3</td>
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
          <div class="bar" style="height: 60%"></div>
          <div class="label">Task 1</div>
          <div class="bar" style="height: 40%"></div>
          <div class="label">Task 2</div>
          <div class="bar" style="height: 80%"></div>
          <div class="label">Task 3</div>
        </div>
        <p>Summary:</p>
        <ul class="ul-info">
          <li>Total Tasks Completed: {{ completions.total }}</li>
          <li>Average Completion Time: {{ completions.average }} hours</li>
          <li>Tasks with the highest completion rates:</li>
          <ul>
            <li>Task 3: 80%</li>
            <li>Task 1: 60%</li>
            <li>Task 2: 40%</li>
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
            <tr>
              <td>John Doe</td>
              <td>20</td>
              <td>18</td>
              <td>2 days</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>15</td>
              <td>12</td>
              <td>3 days</td>
            </tr>
            <tr>
              <td>Mike Johnson</td>
              <td>10</td>
              <td>8</td>
              <td>2.5 days</td>
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
        user_tasks: []
      }
    }
  },
  mounted() {
    document.getElementById('btnStatus').style.backgroundColor = 'purple'
    this.fetchStatusData()
    // this.fetchCompletionsData()
    // this.fetchActivityData()
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
        this.status.not_started = res.status.not_started_tasks
      } catch (error) {
        console.error(error)
      }
    },
    async fetchCompletionsData() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/status/users', { headers })
        const statuses = response.data
        console.log(statuses)
        this.statusOptions = statuses
        console.log(this.statusOptions)
        // do something with the statuses
      } catch (error) {
        console.error(error)
      }
    },
    async fetchActivityData() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios.get(config.BASE_URL + '/api/status/stats', { headers })
        const statuses = response.data
        console.log(statuses)
        this.statusOptions = statuses
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
  height: 300px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-content: stretch;
  align-items: baseline;
}
.chart-container .bar {
  width: 50px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: bottom;
  background-color: #36a2eb;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease-in-out;
}
.chart-container .label {
  display: inline-block;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
}
.chart-container .value {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
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
    