<template>
  <div class="search-container">
    <!-- Sección de búsqueda -->
    <h1>Buscador</h1>
    <p>Busca canciones.</p>
    <p>Para que salgan los resultados debes entrar en <a href="https://cors-anywhere.herokuapp.com/corsdemo"
        target="_blank">https://cors-anywhere.herokuapp.com/corsdemo</a></p>

    <!-- Barra de búsqueda -->
    <SearchBar @search="handleSearch" />

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

    <!-- Resultados de la búsqueda -->
    <div class="search-page" v-if="filteredResults.length > 0">
      <h2>Resultados de la Búsqueda</h2>
      <div class="song-list" v-if="filterType === 'songs'">
        <div v-for="song in filteredResults" :key="song.id" class="song-item">
          <img :src="song.album.cover_medium" alt="Album cover" class="album-cover"
            @click="navigateToInfo('album', song.album.id)" />
          <div class="song-info">
            <p><strong @click="navigateToInfo('song', song.id)" class="hover-underline">{{ song.title }}</strong></p>
            <p><em @click="navigateToInfo('artist', song.artist.id)" class="hover-underline">{{ song.artist.name }}</em>
            </p>
          </div>
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
      <div class="album-cards" v-if="filterType === 'albums'">
        <div v-for="album in filteredResults" :key="album.id" class="album-card">
          <img :src="album.cover_medium" alt="Album cover" class="album-cover"
            @click="navigateToInfo('album', album.id)" />
          <p><strong @click="navigateToInfo('album', album.id)" class="hover-underline">{{ album.title }}</strong></p>
          <p><em @click="navigateToInfo('artist', album.artist.id)" class="hover-underline">{{ album.artist.name }}</em>
          </p>
        </div>
      </div>
      <div class="artist-cards" v-if="filterType === 'artists'">
        <div v-for="artist in filteredResults" :key="artist.id" class="artist-card">
          <img :src="artist.picture_medium" alt="Artist image" class="artist-image"
            @click="navigateToInfo('artist', artist.id)" />
          <p><strong @click="navigateToInfo('artist', artist.id)" class="hover-underline">{{ artist.name }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/stores';
import SearchBar from '@/components/SearchBar.vue'; // Importa el componente SearchBar

const searchQuery = ref('');
const sortAscending = ref(false);
const durationRange = ref(0);
const searchResults = ref({
  songs: [],
  albums: [],
  artists: []
});
const filterType = ref('songs');
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
    searchResults.value.albums = [];
    searchResults.value.artists = [];
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/https://api.deezer.com/search?q=${searchQuery.value}`
    );
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();

    searchResults.value.songs = data.data.filter(item => item.type === 'track');
    searchResults.value.albums = data.data.filter(item => item.type === 'album');
    searchResults.value.artists = data.data.filter(item => item.type === 'artist');
  } catch (error) {
    console.error('Error:', error);
  }
};

// Computed para ordenar resultados
const filteredResults = computed(() => {
  let results = [];

  if (filterType.value === 'songs') {
    results = searchResults.value.songs;
    if (durationRange.value > 0) {
      results = results.filter(song => song.duration <= durationRange.value);
    }
  } else if (filterType.value === 'albums') {
    results = searchResults.value.albums;
  } else if (filterType.value === 'artists') {
    results = searchResults.value.artists;
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

// Función para manejar la búsqueda desde el componente SearchBar
const handleSearch = (query) => {
  searchQuery.value = query;
  searchSongs();
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

<style lang="scss" scoped>
@use '@/assets/styles.scss' as *;

.search-container {
  background-color: $secondary-color;
  color: $text-color;
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
  color: $text-color;
}

/* Filtros */
.search-filters {
  margin-bottom: 20px;
}

.search-filters label {
  margin-right: 20px;
  color: $text-color;
}

/* Botones de filtro */
.filter-buttons {
  margin-bottom: 20px;
}

.filter-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: $next-btn-color;
  color: $text-color;
  transition: background-color 0.3s ease;
}

.filter-buttons button.active {
  background-color: $next-btn-hover;
}

.filter-buttons button:hover {
  background-color: $next-btn-hover;
}

/* Estilos de resultados */
.song-list,
.album-cards,
.artist-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.song-item,
.album-card,
.artist-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid $next-btn-color;
  border-radius: 10px;
  background-color: #2c2f38;
}

.song-item img,
.album-card img,
.artist-card img {
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
  background-color: #28a745;
  color: $text-color;
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

.album-cover,
.artist-image {
  transition: transform 0.3s ease;
}

.album-cover:hover,
.artist-image:hover {
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