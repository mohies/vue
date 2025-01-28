<template>
  <div id="song-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        class="carousel-item"
        :class="{ active: index === 0 }"
        v-for="(song, index) in songs"
        :key="song.id"
      >
        <div class="carousel-content">
          <!-- Cambiado a cover_xl -->
          <img :src="song.album.cover_xl" class="d-block w-100" alt="Song Cover" />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ song.title }}</h5>
            <p>{{ song.artist.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles del carrusel -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#song-carousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#song-carousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  songs: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.carousel-content img {
  border-radius: 15px;
  max-height: 500px; /* Limita la altura máxima */
  object-fit: cover; /* Ajusta la imagen sin deformarla */
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 10px;
}
</style>
