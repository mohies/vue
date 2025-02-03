<template>
  <div class="info-song" v-if="song">
    <h2>{{ song.title }}</h2>
    <img :src="song.album.cover_xl" alt="Album Cover" />
    <p>{{ song.artist.name }}</p>
    <audio :src="song.preview" controls></audio>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  song: Object
});
</script>

<style scoped>
.info-song {
  text-align: center;
}
</style>