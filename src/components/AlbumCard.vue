<template>
    <div class="album-card">
      <img :src="album.cover_medium" alt="Album cover" />
      <p><strong>{{ album.title }}</strong></p>
      <p><em>{{ album.artist.name }}</em></p>
    </div>
  </template>
  
  <script setup>
  // Definimos las propiedades que el componente espera recibir
  // En este caso, esperamos una propiedad llamada 'album' que es un objeto
  defineProps({
    album: Object
  });
  </script>
  