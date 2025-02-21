import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    currentSong: null,
    favorites: [],
    songs: [], // Lista de canciones de búsqueda
    playlist: {
      id: 1,
      name: 'Mi Playlist Favorita',
      songs: [], // Ahora la playlist es un objeto único
    }
  }),

  actions: {
    setCurrentSong(song) {
      this.currentSong = song;
    },

    // Métodos de favoritos
    addToFavorites(song) {
      if (!this.favorites.some(fav => fav.id === song.id)) {
        this.favorites.push(song);
      }
    },

    removeFromFavorites(songId) {
      this.favorites = this.favorites.filter(fav => fav.id !== songId);
    },

    // Métodos para gestionar la playlist dinámica
    addSongToPlaylist(song) {
      if (!this.playlist.songs.some(s => s.id === song.id)) {
        this.playlist.songs.push(song);
      }
    },

    removeSongFromPlaylist(songId) {
      this.playlist.songs = this.playlist.songs.filter(song => song.id !== songId);
    },


  },

  getters: {
    getCurrentSong() {
      return this.currentSong;
    },
    getFavorites() {
      return this.favorites;
    },
    getPlaylist() {
      return this.playlist;
    },
  }
});