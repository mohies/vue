import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentSong: null,
    favorites: [],
    songs: [], // Lista de canciones de búsqueda
  }),
  actions: {
    setCurrentSong(song) {
      this.currentSong = song;
    },

    setCurrentSongToNext() {
      if (this.songs.length > 0 && this.currentSong) {
        const currentIndex = this.songs.findIndex(song => song.id === this.currentSong.id);
        const nextSong = this.songs[(currentIndex + 1) % this.songs.length] || this.songs[0]; // Si es la última, volvemos a la primera
        this.setCurrentSong(nextSong);
      }
    },

    // Otros métodos de favoritos
    addToFavorites(song) {
      if (!this.favorites.some(fav => fav.id === song.id)) {
        this.favorites.push(song);
      }
    },

    removeFromFavorites(songId) {
      this.favorites = this.favorites.filter(fav => fav.id !== songId);
    },
  },
  getters: {
    getCurrentSong() {
      return this.currentSong;
    },
    getFavorites() {
      return this.favorites;
    },
  }
});
