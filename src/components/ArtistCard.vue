<template>
  <div class="artist-card">
    <img :src="artist.picture_medium" alt="Artist image" />
    <p><strong>{{ artist.name }}</strong></p>
  </div>
</template>

<script setup>
defineProps({
  artist: Object
});
</script>
