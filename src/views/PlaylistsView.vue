<template>
  <div class="playlist-view">
    <h2>Mi Playlist</h2>
    <div v-for="song in playlist.songs" :key="song.id" class="playlist-song">
      <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" />
      <div class="song-info">
        <p><strong>{{ song.title }}</strong></p>
        <p><em>{{ song.artist.name }}</em></p>
      </div>
      <button @click="playSong(song)">Reproducir</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/stores';
import PlaylistManager from '@/components/PlaylistManager.vue';

const store = useMainStore();
const playlist = computed(() => store.getPlaylist);

const playSong = (song) => {
  store.setCurrentSong(song);
};
</script>

<style scoped>
.playlist-view {
  text-align: center;
  padding: 20px;
}

.playlist-song {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #2c2f38;
  margin-bottom: 10px;
}

.album-cover {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
}

.song-info {
  flex-grow: 1;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>
