<template>
  <div class="info-view">
    <button @click="showArtist">Mostrar Artista</button>
    <button @click="showAlbum">Mostrar Álbum</button>
    <button @click="showSong">Mostrar Canción</button>

    <InfoArtist v-if="currentView === 'artist'" :artist="artist" />
    <InfoAlbum v-if="currentView === 'album'" :album="album" />
    <InfoSong v-if="currentView === 'song'" :song="song" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InfoArtist from '@/components/InfoArtist.vue';
import InfoAlbum from '@/components/InfoAlbum.vue';
import InfoSong from '@/components/InfoSong.vue';

const route = useRoute();
const currentView = ref(null);
const artist = ref(null);
const album = ref(null);
const song = ref(null);

const fetchArtist = async (artistId) => {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}`);
    if (!response.ok) throw new Error('Error al obtener datos del artista');
    const data = await response.json();
    artist.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchAlbum = async (albumId) => {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${albumId}`);
    if (!response.ok) throw new Error('Error al obtener datos del álbum');
    const data = await response.json();
    album.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchSong = async (songId) => {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${songId}`);
    if (!response.ok) throw new Error('Error al obtener datos de la canción');
    const data = await response.json();
    song.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const showArtist = async () => {
  await fetchArtist(route.params.id); // Usa el ID del artista desde la ruta
  currentView.value = 'artist';
};

const showAlbum = async () => {
  await fetchAlbum(route.params.id); // Usa el ID del álbum desde la ruta
  currentView.value = 'album';
};

const showSong = async () => {
  await fetchSong(route.params.id); // Usa el ID de la canción desde la ruta
  currentView.value = 'song';
};

// Ejecutar la función adecuada según el tipo de vista
onMounted(() => {
  const type = route.query.type;
  if (type === 'artist') {
    showArtist();
  } else if (type === 'album') {
    showAlbum();
  } else if (type === 'song') {
    showSong();
  }
});
</script>

<style scoped>
.info-view {
  text-align: center;
  padding: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #188d41;
}
</style>