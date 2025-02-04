<template>
  <div class="search-container">
    <!-- Sección de búsqueda -->
    <h1>Buscador</h1>
    <p>Busca canciones.</p>
    <p>Para que salgan los resultados debes entrar en <a href="https://cors-anywhere.herokuapp.com/corsdemo"
        target="_blank">https://cors-anywhere.herokuapp.com/corsdemo</a></p>

    <!-- Filtro de orden -->
    <div class="search-filters">
      <label>
        <input type="checkbox" v-model="sortAscending" /> Ordenar Ascendente
      </label>
      <label>
        Duración (en segundos): {{ durationRange }} s
        <input type="range" v-model="durationRange" min="0" max="300" step="10" />
      </label>
    </div>

    <!-- Campo de búsqueda de canción -->
    <div class="search-input">
      <input type="text" v-model="searchQuery" placeholder="Escribe el nombre de la canción"
        @keyup.enter="searchSongs" />
    </div>

    <!-- Resultados de la búsqueda -->
    <div class="search-page" v-if="searchResults.songs.length > 0">
      <h2>Resultados de la Búsqueda</h2>
      <div class="song-cards">
        <div v-for="song in sortedResults" :key="song.id" class="song-card">
          <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" @click="navigateToInfo('album', song.album.id)" />
          <p><strong @click="navigateToInfo('song', song.id)" class="hover-underline">{{ song.title }}</strong></p>
          <p><em @click="navigateToInfo('artist', song.artist.id)" class="hover-underline">{{ song.artist.name }}</em></p>
          <audio ref="audio" :src="song.preview"></audio>
          
          <!-- Botón para añadir a playlist -->
          <button @click="togglePlaylist(song)" :class="{ 'in-playlist': isInPlaylist(song) }">
            {{ isInPlaylist(song) ? 'Quitar de Playlist' : 'Añadir a Playlist' }}
          </button>
          
          <!-- Botón de favoritos -->
          <button @click="toggleFavorite(song)" :class="{ favorite: isFavorite(song) }">
            {{ isFavorite(song) ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos' }}
          </button>

          <!-- Botón para reproducir canción -->
          <button @click="playSong(song)">Reproducir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/stores'; 

const searchQuery = ref('');
const sortAscending = ref(false);
const durationRange = ref(0);
const searchResults = ref({
  songs: [],
});
const store = useMainStore();
const audio = ref(null); // Definimos la referencia al elemento audio

const route = useRoute();
const router = useRouter();

const navigateToInfo = (type, id) => {
  router.push({ name: 'Info', params: { type, id } });
};

// Buscar canciones en Deezer
const searchSongs = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value.songs = [];
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/https://api.deezer.com/search?q=${searchQuery.value}`
    );
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();

    searchResults.value.songs = data.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Computed para ordenar resultados
const sortedResults = computed(() => {
  let results = searchResults.value.songs;

  if (durationRange.value > 0) {
    results = results.filter(song => song.duration <= durationRange.value);
  }

  if (sortAscending.value) {
    results = results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
});

// Playlist
const togglePlaylist = (song) => {
  if (isInPlaylist(song)) {
    store.removeSongFromPlaylist(song.id);
  } else {
    store.addSongToPlaylist(song);
  }
};

const isInPlaylist = (song) => {
  return store.getPlaylist.songs.some(s => s.id === song.id);
};

// Favoritos
const toggleFavorite = (song) => {
  if (isFavorite(song)) {
    store.removeFromFavorites(song.id);
  } else {
    store.addToFavorites(song);
  }
};

const isFavorite = (song) => {
  return store.favorites.some(fav => fav.id === song.id);
};

// Reproducir canción
const playSong = (song) => {
  store.setCurrentSong(song);  // Establece la canción actual en el store

  // Esperamos a que termine la canción para reproducir la siguiente
  if (audio.value) {
    audio.value.src = song.preview; // Actualizamos la fuente del audio
    audio.value.play(); // Reproducimos la canción
    audio.value.onended = () => {
      nextSongInSearchResults();  // Reproducir la siguiente canción en la lista de búsqueda
    };
  }
};

// Actualizar la búsqueda cuando cambie la ruta
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery;
    searchSongs();
  }
});

// Ejecutar la búsqueda inicial si hay un término de búsqueda en la ruta
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q;
    searchSongs();
  }
});

console.log("Playlist actual:", store.getPlaylist);
</script>

<style scoped>
/* Fondo oscuro */
.search-container {
  background-color: #121212;
  color: white;
  padding: 20px;
}

/* Estilos de títulos */
h1 {
  color: #dc3545;
}

/* Estilos de búsqueda */
.search-input input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #333;
  color: white;
}

/* Filtros */
.search-filters {
  margin-bottom: 20px;
}

.search-filters label {
  margin-right: 20px;
  color: white;
}

/* Estilos de resultados */
.song-cards {
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

/* Estilos de favoritos */
.favorite {
  background-color: #dc3545 !important;
}

.favorite:hover {
  background-color: #c82333 !important;
}

/* Estilos de playlist */
.in-playlist {
  background-color: #ffc107 !important;
}

.in-playlist:hover {
  background-color: #e0a800 !important;
}

.album-cover {
  transition: transform 0.3s ease;
}

.album-cover:hover {
  transform: scale(1.1);
}

.hover-underline {
  cursor: pointer;
  position: relative;
}

.hover-underline::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  bottom: -2px;
  left: 0;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>