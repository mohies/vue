<template>
  <div class="favorites-container">
    <h1>Mis Favoritos</h1>
    
    <div v-if="favorites.length > 0" class="favorite-songs">
      <div v-for="song in favorites" :key="song.id" class="song-card">
        <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" />
        <p><strong>{{ song.title }}</strong></p>
        <p><em>{{ song.artist.name }}</em></p>
        <audio :src="song.preview" controls></audio>

        <button @click="removeFromFavorites(song.id)">
          ❌ Quitar de Favoritos
        </button>
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

.favorite-songs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.song-card {
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #2c2f38;
  text-align: center;
}

.song-card img {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}

.song-card audio {
  margin-top: 10px;
  width: 100%;
}

button {
  margin-top: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>
