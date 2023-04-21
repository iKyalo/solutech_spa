<template>
  <footer class="dark-footer">
    <p>&copy; {{ currentYear }}, Solutech</p>
  </footer>
</template>
  
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>
  
  <style>
.dark-footer {
  background-color: #333;
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 20px;
  margin-top: 2rem;
}
</style>
  