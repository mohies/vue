<template>
  <div class="info-album" v-if="album">
    <h2>{{ album.title }}</h2>
    <img :src="album.cover_xl" alt="Album Cover" class="album-cover" />
    <p v-if="album.artist">Artista: {{ album.artist.name }}</p>
    <h3>Lista de Canciones</h3>
    <ul>
      <li v-for="track in album.tracks.data" :key="track.id">
        {{ track.title }}
        <button @click="playTrack(track)">Reproducir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/stores/stores';

const route = useRoute();
const album = ref(null);
const store = useMainStore();

const fetchAlbum = async (albumId) => {
  try {
    const response = await fetch(`http://localhost:8080/https://api.deezer.com/album/${albumId}`);
    if (!response.ok) throw new Error('Error al obtener datos del álbum');
    const data = await response.json();
    album.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const playTrack = (track) => {
  store.setCurrentSong(track);
};

onMounted(() => {
  fetchAlbum(route.params.id);
});
</script>

<style scoped>
.info-album {
  text-align: center;
  font-size: 0.9em;
  padding-bottom: 100px; /* Add padding to avoid overlap with the fixed music player */
}
.info-album img {
  max-width: 30%; /* Reduce image size */
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
button {
  margin-left: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
button:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>