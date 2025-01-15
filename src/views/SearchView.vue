<template>
  <div>
    <!-- Sección de búsqueda -->
    <h1>Buscador</h1>
    <p>Busca canciones, artistas o álbumes.</p>
    <p>En esta sección ya se ha configurado una llamada a la API pública de Deezer.</p>
    <p>Para que salgan los resultados debes entrar en <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">https://cors-anywhere.herokuapp.com/corsdemo</a></p>
  
    <!-- Resultados de búsqueda de álbum -->
    <div class="search-page">
      <h1>Resultados del Álbum</h1>
      <div class="album-info">
        <h2>{{ albumData.title }}</h2>
        <img :src="albumData.cover_medium" alt="Portada del álbum" />
        <p><strong>Artista:</strong> {{ albumData.artist?.name }}</p>
        <p><strong>Fecha de lanzamiento:</strong> {{ albumData.release_date }}</p>
      </div>

      <div class="songs">
        <h3>Canciones</h3>
        <div class="song-cards">
          <div
            v-for="song in albumData.tracks?.data"
            :key="song.id"
            class="song-card"
          >
            <p><strong>{{ song.title }}</strong></p>
            <audio :src="song.preview" controls></audio>
            <button @click="addToPlaylist(song)">Añadir a Playlist</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de la Playlist -->
    <div class="playlist">
      <h2>Mi Playlist</h2>
      <div v-if="playlist.songs.length > 0">
        <ul>
          <li v-for="song in playlist.songs" :key="song.id">
            <p>{{ song.title }}</p>
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
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/stores'; // Asegúrate de que la ruta es correcta

const albumData = ref({});
const store = useMainStore();

// Accede a la playlist actual
const playlist = store.getCurrentPlaylist;

// Función para obtener datos del álbum desde la API de Deezer
const fetchAlbumData = async () => {
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/586206062');
    if (!response.ok) throw new Error('Error al obtener los datos');
    const data = await response.json();
    
    albumData.value = data;
    
    // Actualiza el estado de búsqueda en el store
    store.setSearchResults({
      albums: [data],
      songs: data.tracks.data,
      artists: [data.artist],
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

// Llama a la función al montar el componente
onMounted(fetchAlbumData);

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

.album-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
}

.album-info img {
  margin-top: 10px;
  width: 200px;
  border-radius: 10px;
}

.songs {
  margin-top: 20px;
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

/* Estilos para la vista de la playlist */
.playlist {
  margin-top: 40px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #dee2e6;
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
</style>
