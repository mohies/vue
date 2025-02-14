<template>
  <div class="music-player" :class="{ 'no-song': !currentSong }">
    <div class="player-container">
      <div class="album-cover" v-if="currentSong">
        <img :src="currentSong?.album.cover_medium" alt="Album cover" />
      </div>
      <div class="player-info">
        <h3 class="song-title">{{ currentSong?.title || 'No hay canción seleccionada' }}</h3>
        <p class="artist-name">{{ currentSong?.artist.name || 'Selecciona una canción' }}</p>
      </div>
      <audio ref="audio" :src="currentSong?.preview" @ended="nextSong" @timeupdate="updateProgress" autoplay v-if="currentSong"></audio>

      <div class="controls">
        <button class="play-btn" @click="togglePlay" :disabled="!currentSong">
          <span v-if="isPlaying">⏸️</span>
          <span v-else>▶️</span>
        </button>

        <input
          type="range"
          v-model="currentTime"
          :max="duration"
          class="progress-bar"
          @input="seek"
          :disabled="!currentSong"
        />

        <div class="time-display">
          <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>

        <button class="next-btn" @click="nextSong" :disabled="!currentSong">
          ▶️ Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useMainStore } from '@/stores/stores';

const store = useMainStore();
const currentSong = computed(() => store.getCurrentSong);

// Referencia al elemento audio
const audio = ref(null);

// Variables para controlar la reproducción y el tiempo
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// Watcher para escuchar los cambios en la canción y actualizar la duración
watch(currentSong, (newSong) => {
  if (audio.value) {
    audio.value.pause(); // Pausamos el audio antes de cambiar de canción
    audio.value.currentTime = 0; // Reiniciamos el tiempo a 0
  }

  if (newSong) {
    // Si hay una canción, la configuramos para reproducirla automáticamente
    duration.value = newSong.duration;
    isPlaying.value = true; // Reanudamos la reproducción
    setTimeout(() => {
      audio.value.play(); // Reproducimos la canción después de actualizar el estado
    }, 100); // Esperamos un poco para evitar errores de sincronización
  } else {
    isPlaying.value = false; // Si no hay canción, detenemos la reproducción
  }
});

// Función para reproducir/pausar la canción
const togglePlay = () => {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

// Función para actualizar la posición del audio al mover la barra de progreso
const seek = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value;
  }
};

// Actualizar el tiempo actual del audio cada segundo
watch(() => audio.value?.currentTime, (newTime) => {
  currentTime.value = newTime;
});

// Función para actualizar el progreso del audio
const updateProgress = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime;
    duration.value = audio.value.duration;
  }
};

// Formato de tiempo (minutos:segundos)
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles.scss' as *;

.music-player {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: $background-dark;
  color: $text-light;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.music-player.no-song {
  opacity: 0.5;
  pointer-events: none;
}

.player-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.album-cover img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
}

.player-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.song-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.artist-name {
  font-size: 1rem;
  color: #aaa;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}

.play-btn {
  background-color: $primary-color;
  border: none;
  border-radius: 50%;
  color: $text-light;
  font-size: 1.5rem;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.play-btn:hover {
  background-color: $button-hover;
}

.progress-bar {
  width: 100%;
  margin-left: 10px;
  cursor: pointer;
  appearance: none;
  background-color: #333;
  height: 6px;
  border-radius: 5px;
}

.progress-bar::-webkit-slider-thumb {
  appearance: none;
  background-color: $primary-color;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  cursor: pointer;
}

.time-display {
  margin-left: 15px;
  color: $text-light;
  font-size: 0.9rem;
}

.next-btn {
  background-color: $next-btn-color;
  border: none;
  border-radius: 50%;
  color: $text-light;
  font-size: 1rem;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.next-btn:hover {
  background-color: $next-btn-hover;
}

.no-song {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>