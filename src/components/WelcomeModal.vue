<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="saveUser">
        <div class="form-group">
          <label for="username">Nombre:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label>Elige un avatar:</label>
          <div class="avatar-options">
            <img v-for="(avatar, index) in avatars" :key="index" :src="avatar" :alt="'Avatar ' + (index + 1)" @click="selectAvatar(avatar)" :class="{ selected: selectedAvatar === avatar }" />
          </div>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const username = ref('');
const selectedAvatar = ref('');
const avatars = [
  'avatar1.png',
  'avatar2.png',
  'avatar3.png',
  'avatar4.png'
];

const selectAvatar = (avatar) => {
  selectedAvatar.value = avatar;
};

const saveUser = () => {
  if (selectedAvatar.value) {
    userStore.setUser({ name: username.value, avatar: selectedAvatar.value });
  } else {
    alert('Por favor, selecciona un avatar.');
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* Ensure it is above other elements */
}

.modal-content {
  background: #121212;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 90%;
  max-width: 400px;
  z-index: 10001; /* Ensure it is above the carousel arrows */
}

h2 {
  color: #1DB954;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #222;
  color: white;
}

.avatar-options {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.avatar-options img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.avatar-options img.selected {
  border-color: #1DB954;
}

button {
  margin-top: 20px;
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #188d41;
}
</style>
