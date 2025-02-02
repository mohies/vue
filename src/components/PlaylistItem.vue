<template>
    <li class="song-item">
      <div class="song-info">
        <span class="song-title">{{ song.title }}</span>
        <span class="song-artist">{{ song.artist.name }}</span>
      </div>
      <button @click="removeSong" class="remove-song-btn">Eliminar</button>
    </li>
  </template>
  
  <script setup>
  import { useMainStore } from '@/stores/stores';
  import { storeToRefs } from 'pinia';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    song: {
      type: Object,
      required: true
    }
  });
  
  const store = useMainStore();
  const { playlist } = storeToRefs(store);
  
  const removeSong = () => {
    store.removeSongFromPlaylist(props.song.id);
  };
  </script>
  
  <style scoped>
  .song-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #444;
  }
  
  .song-info {
    display: flex;
    flex-direction: column;
  }
  
  .song-title {
    font-weight: bold;
    color: #fff;
  }
  
  .song-artist {
    color: #b3b3b3;
  }
  
  .remove-song-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .remove-song-btn:hover {
    background-color: #c82333;
  }
  </style>