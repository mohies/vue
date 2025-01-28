<template>
  <div>
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
          <!-- Mostrar imagen del álbum -->
          <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" />

          <p><strong>{{ song.title }}</strong></p>
          <p><em>{{ song.artist.name }}</em></p> <!-- Nombre del artista -->

          <audio :src="song.preview" controls></audio>
          <button @click="addToPlaylist(song)">Añadir a Playlist</button>
        </div>
      </div>
    </div>

    <!-- Sección de la Playlist (Fija en la parte inferior) -->
    <div class="playlist">
      <h2>Mi Playlist</h2>
      <div v-if="playlist.songs.length > 0">
        <ul>
          <li v-for="song in playlist.songs" :key="song.id">
            <!-- Mostrar imagen del álbum en la playlist -->
            <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" />

            <p>{{ song.title }}</p> <!-- Nombre de la canción -->
            <audio :src="song.preview" controls></audio>
            <button @click="removeFromPlaylist(song.id)">Eliminar de Playlist</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No tienes canciones en tu playlist.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/stores'; // Asegúrate de que la ruta es correcta

const searchQuery = ref(''); // Campo para la consulta de búsqueda
const sortAscending = ref(false); // Orden ascendente
const durationRange = ref(0); // Duración de la canción (rango)
const searchResults = ref({
  songs: [],
});
const store = useMainStore(); // Accede al store

// Accede a la playlist actual
const playlist = store.getCurrentPlaylist;

// Función para obtener datos de la API de Deezer según la búsqueda
const searchSongs = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value.songs = []; // Si el campo está vacío, no muestra resultados
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/https://api.deezer.com/search?q=${searchQuery.value}`
    );
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();

    searchResults.value.songs = data.data; // Asigna los resultados de las canciones
  } catch (error) {
    console.error('Error:', error);
  }
};

// Computed property para obtener los resultados ordenados
const sortedResults = computed(() => {
  let results = searchResults.value.songs;

  // Ordenar por duración si se ha seleccionado un rango
  if (durationRange.value > 0) {
    results = [...results].filter(song => song.duration <= durationRange.value); // Filtra canciones por duración
  }

  // Si el filtro de orden ascendente está activo, ordenamos por título
  if (sortAscending.value) {
    results = results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
});

// Función para añadir una canción a la playlist
const addToPlaylist = (song) => {
  store.addSongToPlaylist(song); // Llama a la acción del store para agregar la canción
};

// Función para eliminar una canción de la playlist
const removeFromPlaylist = (songId) => {
  store.removeSongFromPlaylist(songId); // Llama a la acción del store para eliminar la canción
};
</script>

<style scoped>
h1 {
  color: #dc3545;
}

.search-page {
  padding: 20px;
}

.search-input input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.song-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.song-card {
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #e9ecef;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
}

button:hover {
  background-color: #218838;
}

/* Estilos para la vista de la playlist - Fija en la parte inferior */
.playlist {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 50%;
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-top: 1px solid #dee2e6;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #dee2e6;
}

li img.album-cover {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
}

li p {
  flex-grow: 1;
  margin: 0;
  padding-left: 10px;
}

audio {
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

/* Estilo para los filtros de búsqueda */
.search-filters {
  margin-bottom: 20px;
}

.search-filters label {
  margin-right: 20px;
}

input[type="range"] {
  width: 100%;
  margin-top: 10px;
}
</style>
