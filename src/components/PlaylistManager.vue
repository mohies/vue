<template>
  <div class="playlist-manager">
    <div v-for="playlist in playlists" :key="playlist.id" class="playlist-card">
      <div class="playlist-header">
        <h3>{{ playlist.name }}</h3>
        <button @click="addRandomSongToPlaylist(playlist.id)" class="add-song-btn">Agregar Canción</button>
      </div>

      <ul class="song-list">
        <li v-for="song in playlist.songs" :key="song.id" class="song-item">
          {{ song.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Definir las propiedades que el componente recibe
import { defineProps } from 'vue';

// Definir los eventos que el componente emitirá
const emit = defineEmits(['add-to-playlist']);

const props = defineProps({
  playlists: Array,
});

const addRandomSongToPlaylist = (playlistId) => {
  const randomSong = {
    id: Date.now(),
    title: 'Canción Aleatoria ' + Math.floor(Math.random() * 100),
  };

  // Emitir el evento con los parámetros necesarios
  emit('add-to-playlist', playlistId, randomSong);
};
</script>

<style scoped>
.playlist-manager {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.playlist-card {
  background-color: #282828;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.playlist-header h3 {
  font-size: 1.5rem;
  font-weight: bold;
}

.add-song-btn {
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.add-song-btn:hover {
  background-color: #17a84f;
}

.song-list {
  list-style-type: none;
  padding-left: 0;
}

.song-item {
  color: #b3b3b3;
  font-size: 1rem;
  padding: 5px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.song-item:hover {
  color: #1DB954;
}
</style>
