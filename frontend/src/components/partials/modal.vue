<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModal" @keydown.esc="closeModal">
      <div class="modal-wrapper" @click.stop>
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title">
              <slot name="header"></slot>
            </div>
            <button  class="close-button" v-on:click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>




<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Modal',
  emits: ['close'],
  setup(_, { emit }) {
    const closeModal = () => {
      emit('close');
    };
    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    return {
      closeModal,
    };
  },
  beforeUnmount() {
  },
});
</script>12

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  background-color: rgba(30, 30, 30, 0.7);
}

.modal-container {
  position: relative;
  width: 60vw;
  max-width: 90%;
  background-color: #111d;
  padding: 20px;
  border-radius: 8px;
  height: 50vh;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.modal-title {
  flex: 1;
}

.modal-header .close-button {
  cursor: pointer;
  font-size: 16px;
  color: #999;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  position: relative;
  top: 45%;
  display: flex;
  justify-content: flex-start;
}

.close-button {
  margin-left: 2.5vw;
    appearance: none;
    background-color: transparent;
    border: 0px;
    border-radius: 15px;
    box-sizing: border-box;
    color: #3B3B3B;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin-top: -0.5rem;
  font-size: 25px;
  font: bold;
  font-weight: 700;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 91.6%;
  bottom: 93%;
}

.close-button:hover {
  color: rgb(120, 22, 22);
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}


/* Restante dos estilos CSS */
</style>
