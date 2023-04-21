<template>
  <div class="modal" v-if="open">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <span class="close" @click="close">&times;</span>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: 'ModalTask',
  props: {
    title: {
      type: String,
      default: 'Modal Title'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      open: this.show
    }
  },
  methods: {
    close() {
      this.open = false
    }
  }
}
</script>
    
    <style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.close {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
    