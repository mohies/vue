<template>
  <div class="playlist-view">
    <h2>Mi Playlist</h2>
    <PlaylistManager /> 
  </div>
</template>

<script setup>
import PlaylistManager from '@/components/PlaylistManager.vue'; // Importamos el componente
</script>

<style scoped>
.playlist-view {
  text-align: center;
  padding: 20px;
}

.playlist-song {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #2c2f38;
  margin-bottom: 10px;
}

.album-cover {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
}

.song-info {
  flex-grow: 1;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>
