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
      <audio ref="audio" :src="currentSong?.preview" @ended="nextSong" @timeupdate="updateProgress" autoplay
        v-if="currentSong"></audio>

      <div class="controls">
        <button class="play-btn" @click="togglePlay" :disabled="!currentSong">
          <span v-if="isPlaying">⏸️</span>
          <span v-else>▶️</span>
        </button>

        <input type="range" v-model="currentTime" :max="duration" class="progress-bar" @input="seek"
          :disabled="!currentSong" />

        <div class="time-display">
          <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Importamos las funciones necesarias de Vue
import { computed, ref, watch } from 'vue';
// Importamos el store principal (probablemente para acceder a datos globales)
import { useMainStore } from '@/stores/stores';

// Obtenemos el store principal y lo guardamos en una constante
const store = useMainStore();

// Creamos una propiedad computada para obtener la canción actual desde el store
const currentSong = computed(() => store.getCurrentSong);

// Referencia al elemento de audio en el DOM
const audio = ref(null);

// Variables para controlar la reproducción y el tiempo
const isPlaying = ref(false); // Indica si la canción se está reproduciendo
const currentTime = ref(0); // Guarda el tiempo actual de la canción
const duration = ref(0); // Guarda la duración total de la canción

// Watcher para escuchar cambios en la canción actual (currentSong)
// Observamos la variable `currentSong` y ejecutamos la función cada vez que cambia
watch(currentSong, (newSong) => {
  // Si ya hay una canción reproduciéndose (audio.value existe), la pausamos y reiniciamos
  if (audio.value) {
    audio.value.pause(); // Pausamos la canción actual si existe
    audio.value.currentTime = 0; // Reiniciamos la canción al principio (tiempo = 0)
  }

  // Si hay una nueva canción (newSong no es null o undefined)
  if (newSong) {
    // Actualizamos la duración de la canción
    duration.value = newSong.duration; // Establecemos la duración de la nueva canción
    
    // Indicamos que la canción está comenzando a reproducirse
    isPlaying.value = true; // Marcamos que la canción está sonando

    // Usamos `setTimeout` para darle un pequeño retraso antes de reproducirla
    setTimeout(() => {
      audio.value.play(); // Reproducimos la nueva canción después del retraso
    }, 100); // 100ms de retraso para evitar problemas de sincronización
  } else {
    // Si no hay una nueva canción (newSong es null o undefined), detenemos la reproducción
    isPlaying.value = false; // Marcamos que la canción no está sonando
  }
});


// Función para alternar entre reproducir/pausar la canción
const togglePlay = () => {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause(); // Si está sonando, la pausamos
    } else {
      audio.value.play(); // Si está pausada, la reproducimos
    }
    isPlaying.value = !isPlaying.value; // Cambiamos el estado de reproducción
  }
};

// Función para cambiar la posición del audio cuando movemos la barra de progreso
const seek = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value; // Establecemos el tiempo actual en la barra de progreso
  }
};

// Watcher para actualizar el tiempo actual del audio cada vez que cambia
watch(() => audio.value?.currentTime, (newTime) => {
  currentTime.value = newTime; // Actualizamos el tiempo actual con el nuevo valor
});

// Función para actualizar el progreso del audio (en tiempo y duración)
const updateProgress = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime; // Actualizamos el tiempo actual
    duration.value = audio.value.duration; // Actualizamos la duración total de la canción
  }
};

// Función para formatear el tiempo en formato minutos:segundos
const formatTime = (time) => {
  const minutes = Math.floor(time / 60); // Obtenemos los minutos
  const seconds = Math.floor(time % 60); // Obtenemos los segundos
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Devolvemos el tiempo con formato adecuado
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