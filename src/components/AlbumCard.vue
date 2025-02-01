<template>
    <div class="album-card">
      <img :src="album.cover_medium" alt="Album cover" />
      <p><strong>{{ album.title }}</strong></p>
      <p><em>{{ album.artist.name }}</em></p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    album: Object
  });
  </script>
  