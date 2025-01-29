// src/stores/favoritesStore.js
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => {
    return {
      favorites: [], // Array de canciones favoritas
    };
  },
  actions: {
    addFavorite(song) {
      // Verificar si la canción ya está en favoritos
      if (!this.favorites.some(fav => fav.id === song.id)) {
        this.favorites.push(song);
      }
    },
    removeFavorite(songId) {
      this.favorites = this.favorites.filter(song => song.id !== songId);
    }
  }
});
