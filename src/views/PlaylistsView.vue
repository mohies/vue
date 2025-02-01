<template>
  <div class="playlist-view">
    <h1>Gestión de Playlists</h1>
    
    <!-- Mostrar el componente PlaylistManager -->
    <PlaylistManager :playlists="playlists" @add-to-playlist="addToPlaylist" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PlaylistManager from '@/components/PlaylistManager.vue';

const playlists = ref([
  { id: 1, name: 'Mi Playlist 1', songs: [] },
  { id: 2, name: 'Mi Playlist 2', songs: [] },
]);

const addToPlaylist = (playlistId, song) => {
  const playlist = playlists.value.find(p => p.id === playlistId);
  if (playlist && !playlist.songs.some(s => s.id === song.id)) {
    playlist.songs.push(song);
  }
};
</script>

<style scoped>
.playlist-view {
  background-color: #121212;
  color: #fff;
  padding: 30px;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1DB954;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Spotify Circular', sans-serif;
}
</style>
