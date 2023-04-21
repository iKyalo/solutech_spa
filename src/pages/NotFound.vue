<script>
export default {
  data() {
    return {}
  }
}
</script>

<template>
  <div class="container">
    <div class="border-green">
      <div class="center">
        <h1 class="green">Page Not Found</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 15%;
}
.btnFilter {
  margin-left: 1rem;
}
.btn-delete {
  background-color: rgb(231, 40, 40);
}
.container {
  padding: 0px;
  min-height: 100vh;
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
  margin: auto;
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
