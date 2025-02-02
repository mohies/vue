<template>
  <div class="playlist-view">
    <h2>Mi Playlist</h2>
    <PlaylistManager />
  </div>
</template>

<script setup>
import PlaylistManager from '@/components/PlaylistManager.vue';
</script>

<style scoped>
.playlist-view {
  text-align: center;
  padding: 20px;
}
</style>
