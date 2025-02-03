<template>
  <div class="info-artist" v-if="artist">
    <h2>{{ artist.name }}</h2>
    <img :src="artist.picture_xl" alt="Artist Picture" />
    <p>{{ artist.bio }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  artist: Object
});
</script>

<style scoped>
.info-artist {
  text-align: center;
}
</style>