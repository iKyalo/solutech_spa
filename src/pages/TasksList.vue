<template>
  <div class="container">
    <ModalTask :title="'Add New Task'" :show="show" @close="closeModal">
      <form @submit.prevent="addTask">
        <label for="task-input">Task Title:</label>
        <input type="text" id="task-input" v-model="new_task.title" required />

        <label for="description-input">Task Description:</label>
        <textarea id="description-input" v-model="new_task.description"></textarea>

        <label style="margin-top: 10px" for="due-date-input">Due Date:</label>
        <input type="date" id="due-date-input" v-model="new_task.date" />

        <button type="submit">Add Task</button>
      </form>
    </ModalTask>
    <!-- <ModalFilter :title="'Filter'" :show="false" @close="closeFilter">
      <form @submit.prevent="submitFilter">
        <label for="task-input">Task Title:</label>
        <input type="text" id="task-input" v-model="new_task.title" required />

        <label for="description-input">Task Description:</label>
        <textarea id="description-input" v-model="new_task.description"></textarea>

        <label style="margin-top: 10px" for="due-date-input">Due Date:</label>
        <input type="date" id="due-date-input" v-model="new_task.date" />

        <button type="submit">Add Task</button>
      </form>
    </ModalFilter> -->
    <div class="border-green">
      <h1 class="green">Task List</h1>
    </div>
    <div class="btns-box">
      <button class="btnAddTask" @click="openModal">Add New</button>
      <!-- <button class="btnFilter" @click="openFilter">Filter</button> -->
    </div>
    <table class="task-table">
      <thead>
        <tr>
          <th style="width: 10%">#</th>
          <th style="width: 20%">Task Name</th>
          <th style="width: 20%">Status</th>
          <th style="width: 30%">Assigned To</th>
          <th style="width: 20%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ ++index }}</td>
          <td>{{ task.name }}</td>
          <td>{{ task.status_name }}</td>
          <td>{{ task.user_name }}</td>
          <td><button class="btn-edit">Edit</button> <button class="btn-delete">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import ModalTask from '../components/ModalTask.vue'
import config from '../config'

export default {
  components: { ModalTask },
  data() {
    return {
      show: false,
      filter: false,
      tasks: [],
      new_task: {
        title: '',
        description: '',
        date: ','
      }
    }
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        try {
          const response = await axios.get(config.BASE_URL + '/api/tasks', { headers })
          const tasks = response.data.tasks
          console.log(tasks)
          this.tasks = tasks
          console.log(this.tasks)
          // do something with the statuses
        } catch (error) {
          console.error(error)
        }
      } catch (error) {
        console.error(error)
      }
    },
    openModal() {
      console.log('opened')
      this.show = true
    },
    openFilter() {
      console.log('opened')
      this.filter = true
    },
    closeModal() {
      console.log('closed')
      this.show = false
    },
    resetForm() {
      this.new_task.title = ''
      this.new_task.description = ''
      this.new_task.date = ''
    },
    addTask() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      axios
        .post(config.BASE_URL + '/api/tasks', this.new_task, { headers })
        .then((response) => {
          // handle success response
          console.log(response.data)
          this.resetForm()
          alert('Task Added Successfully')
          this.fetchTasks
        })
        .catch((error) => {
          // handle error response
          console.error(error.response.data.message)
        })
    },
    submitFilter() {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      axios
        .post(config.BASE_URL + '/api/tasks', this.new_task, { headers })
        .then((response) => {
          // handle success response
          console.log(response.data)
          this.resetForm()
          alert('Task Added Successfully')
          this.fetchTasks
        })
        .catch((error) => {
          // handle error response
          console.error(error.response.data.message)
        })
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
</style>
