<template>
  <div class="favorites-view">
    <h1>Favoritos</h1>
    
    <!-- Si hay canciones favoritas, mostrar en una lista -->
    <div v-if="favorites.length > 0">
      <ul>
        <li v-for="song in favorites" :key="song.id">
          <img :src="song.album.cover_xl" alt="Cover" class="favorite-cover"/>
          <p>{{ song.title }} - {{ song.artist.name }}</p>
        </li>
      </ul>
    </div>

    <!-- Si no hay canciones favoritas, mostrar un mensaje -->
    <div v-else>
      <p>No tienes canciones favoritas aún.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Datos de ejemplo para canciones favoritas
const favorites = ref([
  { 
    id: 1, 
    title: 'Song 1', 
    artist: { name: 'Artist 1' },
    album: { cover_xl: 'https://link_to_cover_1.jpg' }
  },
  { 
    id: 2, 
    title: 'Song 2', 
    artist: { name: 'Artist 2' },
    album: { cover_xl: 'https://link_to_cover_2.jpg' }
  },
]);

</script>

<style scoped>
.favorites-view {
  padding: 20px;
}

.favorite-cover {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

h1 {
  color: #1DB954;
}
</style>
