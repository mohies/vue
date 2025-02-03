<template>
    <div class="info-album" v-if="album">
      <h2>{{ album.title }}</h2>
      <img :src="album.cover_xl" alt="Album Cover" />
      <p>{{ album.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    album: Object
  });
  </script>
  
  <style scoped>
  .info-album {
    text-align: center;
  }
  </style>