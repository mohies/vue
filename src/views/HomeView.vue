<template>
  <div class="home-view">
    <!-- Barra de búsqueda -->
    <SearchBar @search="handleSearch" />

    <!-- Resultados de la búsqueda -->
    <section v-if="searchResults.length > 0" class="search-results">
      <h2>Resultados de Búsqueda</h2>
      <div class="song-grid">
        <div v-for="song in searchResults" :key="song.id" class="song-card">
          <p><strong>{{ song.title }}</strong></p>
          <img :src="song.album.cover_xl" alt="Portada del álbum" />
          <audio :src="song.preview" controls></audio>
        </div>
      </div>
    </section>

    <!-- Carrusel de canciones destacadas -->
    <section v-else-if="featuredSongs.length > 0" class="featured-carousel">
      <h2>Canciones Destacadas</h2>
      <SongCarousel :songs="featuredSongs" />

      <!-- 4 canciones pequeñas debajo del carrusel -->
      <div class="featured-grid-small">
        <h3>Más Canciones</h3>
        <div class="song-grid-small">
          <div v-for="song in gridSongs" :key="song.id" class="song-card-small">
            <p><strong>{{ song.title }}</strong></p>
            <img :src="song.album.cover_xl" alt="Portada del álbum" />
            <audio :src="song.preview" controls></audio>
          </div>
        </div>
      </div>
    </section>

    <!-- Grid de canciones destacadas si no hay búsqueda -->
    <section v-else class="featured-grid">
      <h2>Más Canciones Populares</h2>
      <div class="song-grid">
        <div v-for="song in gridSongs" :key="song.id" class="song-card">
          <p><strong>{{ song.title }}</strong></p>
          <img :src="song.album.cover_xl" alt="Portada del álbum" />
          <audio :src="song.preview" controls></audio>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import SongCarousel from '@/components/SongCarousel.vue';

// Datos reactivos
const featuredSongs = ref([]);
const gridSongs = ref([]);
const searchResults = ref([]); // Resultados de búsqueda

// Función para obtener canciones destacadas
const fetchFeaturedSongs = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`
    );
    if (!response.ok) throw new Error('Error al obtener canciones destacadas');
    const data = await response.json();

    // Asigna canciones al carrusel y la cuadrícula
    featuredSongs.value = data.tracks.data.slice(0, 5); // 5 canciones para el carrusel
    gridSongs.value = data.tracks.data.slice(5, 9); // 4 canciones para la cuadrícula pequeña debajo del carrusel
  } catch (error) {
    console.error('Error al cargar canciones destacadas:', error);
  }
};

// Función para manejar la búsqueda
const handleSearch = async (query) => {
  try {
    if (!query.trim()) return;

    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`
    );
    if (!response.ok) throw new Error('Error al realizar la búsqueda');
    const data = await response.json();

    searchResults.value = data.data; // Asigna resultados de búsqueda
  } catch (error) {
    console.error('Error en la búsqueda:', error);
  }
};

// Llamar a la función al montar el componente
onMounted(fetchFeaturedSongs);
</script>

<style scoped>
.home-view {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.featured-carousel,
.featured-grid,
.search-results {
  margin-bottom: 40px;
}

.song-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.song-grid-small {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Cuatro columnas pequeñas */
  gap: 10px;
}

.song-card,
.song-card-small {
  text-align: center;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.song-card img,
.song-card-small img {
  margin: 10px 0;
  width: 100%;
  max-width: 200px; /* Limitar tamaño de imagen en las canciones pequeñas */
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

audio {
  margin-top: 10px;
  width: 100%;
}
</style>
