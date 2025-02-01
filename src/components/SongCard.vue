<template>
  <div class="song-card">
    <img :src="song.album.cover_medium" alt="Album cover" class="album-cover" />
    <div class="song-info">
      <p class="song-title"><strong>{{ song.title }}</strong></p>
      <p class="song-artist"><em>{{ song.artist.name }}</em></p>
    </div>
    <audio :src="song.preview" controls class="audio-player" />

    <div class="buttons">
      <button @click="$emit('add-to-playlist', song)" class="add-to-playlist">Añadir a Playlist</button>
      <button @click="$emit('toggle-favorite', song)" :class="{ favorite: isFavorite }">
        {{ isFavorite ? '❤️' : '🤍' }} Favorito
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  song: Object,
  isFavorite: Boolean
});
defineEmits(['toggle-favorite', 'add-to-playlist']);
</script>

<style scoped>
.song-card {
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.song-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.album-cover {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: opacity 0.3s ease;
}

.song-info {
  margin-bottom: 10px;
}

.song-title {
  color: #f1f1f1;
  font-size: 1.2rem;
}

.song-artist {
  color: #ccc;
  font-size: 1rem;
}

.audio-player {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #222;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 0.9rem;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.favorite {
  background-color: #dc3545;
}

.favorite:hover {
  background-color: #c82333;
}
</style>
