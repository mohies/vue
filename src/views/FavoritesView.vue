<template>
  <div class="favorites-container">
    <h1>Mis Favoritos</h1>
    
    <div v-if="favorites.length > 0" class="favorite-list">
      <div v-for="song in favorites" :key="song.id" class="favorite-item">
        <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" />
        <div class="song-info">
          <p><strong>{{ song.title }}</strong></p>
          <p><em>{{ song.artist.name }}</em></p>
        </div>
        <button @click="removeFromFavorites(song.id)">
          ❌ Quitar de Favoritos
        </button>
        <button @click="playSong(song)">Reproducir</button>
      </div>
    </div>

    <div v-else>
      <p>No tienes canciones en favoritos.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/stores';

const store = useMainStore();

// Computed para obtener las canciones favoritas del store
const favorites = computed(() => store.favorites);

// Función para quitar una canción de favoritos
const removeFromFavorites = (songId) => {
  store.removeFromFavorites(songId);
};

// Función para reproducir una canción
const playSong = (song) => {
  store.setCurrentSong(song);
};
</script>

<style scoped>
.favorites-container {
  background-color: #121212;
  color: white;
  padding: 20px;
}

h1 {
  color: #dc3545;
}

.favorite-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.favorite-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #2c2f38;
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
  margin-left: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

button.play {
  background-color: #28a745;
}

button.play:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>
