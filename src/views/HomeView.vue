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
          <img :src="song.album.cover_xl" alt="Portada del álbum" class="album-image" />
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
            <img :src="song.album.cover_xl" alt="Portada del álbum" class="album-image" />
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
          <img :src="song.album.cover_xl" alt="Portada del álbum" class="album-image" />
          <audio :src="song.preview" controls></audio>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Para gestionar las rutas
import SearchBar from '@/components/SearchBar.vue';
import SongCarousel from '@/components/SongCarousel.vue';

// Datos reactivos
const featuredSongs = ref([]);
const gridSongs = ref([]);
const searchResults = ref([]); // Resultados de búsqueda

// Obtener la ruta actual
const route = useRoute();
const router = useRouter();

// Función para obtener canciones destacadas
const fetchFeaturedSongs = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/https://api.deezer.com/chart`
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
      `http://localhost:8080/https://api.deezer.com/search?q=${query}` // Cambiar la URL base
    );
    if (!response.ok) throw new Error('Error al realizar la búsqueda');
    const data = await response.json();

    searchResults.value = data.data; // Asigna resultados de búsqueda
  } catch (error) {
    console.error('Error en la búsqueda:', error);
  }
};

// Limpiar los resultados de búsqueda al navegar
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    searchResults.value = []; // Limpiar los resultados al navegar a Home
  }
});

// Llamar a la función al montar el componente
onMounted(fetchFeaturedSongs);
</script>

<style scoped>
/* Fuentes y colores principales */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

:root {
  --primary-color: #4caf50; /* Verde moderno */
  --secondary-color: #f5f5f5; /* Fondo suave */
  --text-color: #333333;
  --card-shadow: rgba(0, 0, 0, 0.1);
}

.home-view {
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background-color: var(--secondary-color);
  color: var(--text-color);
  text-align: center; /* Centrado de los textos */
}

/* Título principal */
.page-title {
  font-size: 2.5em;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 30px;
}

/* Títulos secundarios */
h2, h3 {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 20px;
}

/* Resultados de búsqueda y carrusel */
.featured-carousel,
.featured-grid,
.search-results {
  margin-bottom: 40px;
}

/* Grillas */
.song-grid, .song-grid-small {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.song-grid-small {
  grid-template-columns: repeat(4, 1fr); /* 4 columnas pequeñas */
  gap: 10px;
}

/* Tarjetas */
.song-card, .song-card-small {
  text-align: center;
  padding: 15px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 6px 10px var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Asegura que los elementos se distribuyan de manera uniforme */
  height: 350px; /* Altura fija para las tarjetas */
}

/* Título de la canción */
.song-card p {
  font-size: 1em; /* Ajusta el tamaño del texto */
  font-weight: bold;
  margin: 0;
  overflow: hidden; /* Evita que el texto se desborde */
  white-space: nowrap; /* No permitir que el texto se divida en varias líneas */
  text-overflow: ellipsis; /* Añadir "..." si el texto es demasiado largo */
}

/* Imágenes de álbum */
.album-image {
  margin: 10px 0;
  width: 100%;
  max-width: 300px; /* Limitar tamaño de imagen */
  height: auto;
  border-radius: 15px;
  object-fit: cover;
  transition: transform 0.3s ease;
  flex-shrink: 0; /* Impide que la imagen se reduzca demasiado */
}

/* Audio */
audio {
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  flex-grow: 1; /* Permite que el audio se expanda */
}

/* Carrusel */
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 10px;
}

.carousel-content img {
  border-radius: 15px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: var(--primary-color);
  border-radius: 50%;
}

/* Botones */
button {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #388e3c; /* Color más oscuro */
}
</style>
