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
            <img :src="song.album.cover_xl" alt="Portada del álbum" class="album-image" @click="navigateToAlbum(song.album.id)" />
            <!-- Reproductor de audio sin controles -->
            <audio :src="song.preview"></audio>
            <!-- Botón para reproducir la canción -->
            <button @click="playSong(song)">Reproducir</button>
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
              <img :src="song.album.cover_xl" alt="Portada del álbum" class="album-image" @click="navigateToAlbum(song.album.id)" />
              <!-- Reproductor de audio sin controles -->
              <audio :src="song.preview"></audio>
              <!-- Botón para reproducir la canción -->
              <button @click="playSong(song)">Reproducir</button>
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
            <img :src="song.album.cover_xl" alt="Portada del álbum" class="album-image" @click="navigateToAlbum(song.album.id)" />
            <!-- Reproductor de audio sin controles -->
            <audio :src="song.preview"></audio>
            <!-- Botón para reproducir la canción -->
            <button @click="playSong(song)">Reproducir</button>
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
  import { useMainStore } from '@/stores/stores'; // Asegúrate de importar el store de Pinia
  import { useUserStore } from '@/stores/user';

  // Datos reactivos
  const featuredSongs = ref([]);
  const gridSongs = ref([]);
  const searchResults = ref([]); // Resultados de búsqueda

  // Obtener la ruta actual
  const route = useRoute();
  const router = useRouter();

  // Obtener el store
  const mainStore = useMainStore();
  const userStore = useUserStore();
  const user = userStore.user;

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
  const handleSearch = (query) => {
    if (!query.trim()) return;
    router.push({ name: 'Buscador', query: { q: query } }); // Redirigir a la página de búsqueda con el término de búsqueda
  };

  // Función para reproducir la canción
  const playSong = (song) => {
    mainStore.setCurrentSong(song); // Establecer la canción actual en el store
    // Puedes agregar lógica adicional para reproducir la canción aquí
  };

  // Función para navegar a la página del álbum
  const navigateToAlbum = (albumId) => {
    router.push({ name: 'Info', params: { type: 'album', id: albumId } });
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

  <style lang="scss" scoped>
  @use '@/assets/styles.scss' as *;

  .home-view {
    padding: 20px;
    font-family: 'Inter', sans-serif;
    background-color: $secondary-color;
    color: $text-color;
    text-align: center;
    min-height: 100vh; /* Asegura que la página no se corte */
  }

  /* Títulos */
  h2, h3 {
    color: $primary-color;
    font-weight: 600;
    margin-bottom: 20px;
  }

  /* Contenedor de canciones destacadas */
  .featured-carousel, .featured-grid, .search-results {
    margin-bottom: 40px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Grids de canciones */
  .song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Grid para canciones pequeñas */
  .song-grid-small {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  /* Tarjetas */
  .song-card, .song-card-small {
    text-align: center;
    padding: 15px;
    border-radius: 15px;
    background-color: $card-bg;
    box-shadow: 0 4px 10px $shadow-color;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 320px;
  }

  .song-card:hover {
    transform: scale(1.05);
  }

  /* Imágenes */
  .album-image {
    width: 100%;
    max-width: 200px;
    border-radius: 15px;
    object-fit: cover;
  }

  /* Audio */
  audio {
    margin-top: 10px;
    width: 100%;
  }

  /* Carrusel */
  .carousel-caption {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 10px;
  }

  .carousel-control-prev-icon, .carousel-control-next-icon {
    background-color: $primary-color;
    border-radius: 50%;
  }

  /* Botones */
  button {
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: $primary-color;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: $button-hover;
  }
  </style>