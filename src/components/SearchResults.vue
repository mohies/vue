<template>
  <div class="search-results">
    <h2>Resultados</h2>
    
    <h3>Canciones</h3>
    <div class="song-cards">
      <SongCard 
        v-for="song in songs" 
        :key="song.id" 
        :song="song" 
        :isFavorite="favorites.some(fav => fav.id === song.id)"
        @toggle-favorite="$emit('toggle-favorite', song)"
        @add-to-playlist="$emit('add-to-playlist', song)"
      />
    </div>

    <h3>Álbumes</h3>
    <div class="album-cards">
      <AlbumCard v-for="album in albums" :key="album.id" :album="album" />
    </div>

    <h3>Artistas</h3>
    <div class="artist-cards">
      <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SongCard from './SongCard.vue';
import AlbumCard from './AlbumCard.vue';
import ArtistCard from './ArtistCard.vue';

const props = defineProps({
  results: Array,
  favorites: Array
});

const songs = computed(() => props.results.filter(item => item.type === 'track'));
const albums = computed(() => props.results.filter(item => item.type === 'album'));
const artists = computed(() => props.results.filter(item => item.type === 'artist'));

defineEmits(['toggle-favorite', 'add-to-playlist']);
</script>

<style scoped>
.search-results {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

/* Contenedores flexibles para los tipos de resultados */
.song-cards,
.album-cards,
.artist-cards {
  display: flex;
  flex-wrap: wrap;  /* Asegura que los elementos se ajusten a varias filas si no caben en una */
  gap: 15px; /* Espacio entre los elementos */
  justify-content: flex-start;  /* Alinea los elementos a la izquierda */
}

/* Ajustamos el tamaño y espaciado de cada tarjeta */
.song-card,
.album-card,
.artist-card {
  flex: 1 1 200px; /* Esto hace que las tarjetas tengan un tamaño flexible con un mínimo de 200px */
  max-width: 250px; /* Controla el ancho máximo de cada tarjeta */
}

/* Estilos para las tarjetas (canción, álbum, artista) */
.song-card,
.album-card,
.artist-card {
  background-color: #2c2f38;
  border-radius: 10px;
  padding: 10px 15px; /* Padding reducido */
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;  /* Asegura que los elementos dentro de la tarjeta estén alineados en columna */
  justify-content: flex-start;  /* Distribuye el espacio en la parte superior de la tarjeta */
  height: 200px; /* Fija una altura para las tarjetas */
  gap: 5px; /* Agrega un pequeño espacio entre los elementos */
}

/* Hacemos que las canciones no estén separadas en exceso */
.song-card img {
  width: 100%;
  height: auto;
  max-height: 80px; /* Limita la altura de la imagen */
  object-fit: cover;
  margin-bottom: 5px; /* Reducimos el margen debajo de la imagen */
}

/* Ajustes de estilo para el nombre de la canción */
.song-card p {
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.9rem; /* Ajustamos el tamaño del texto */
  flex-grow: 1; /* Hace que el texto ocupe el espacio restante en la tarjeta */
  margin-bottom: 5px; /* Reducimos el margen debajo del nombre de la canción */
}

.song-card:hover,
.album-card:hover,
.artist-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease-in-out;
}
</style>
