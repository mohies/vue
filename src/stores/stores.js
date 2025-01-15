import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    // Datos del usuario
    user: {
      name: '',
      avatar: '',
      isLoggedIn: false,
    },

    // Playlists
    playlists: [
      {
        id: 1,
        name: 'Mi Playlist',
        songs: [],
      },
    ],

    // Canción actual
    currentSong: null,

    // Estado de búsqueda
    searchResults: {
      songs: [],
      albums: [],
      artists: [],
    },
  }),

  getters: {
    isUserLoggedIn: (state) => state.user.isLoggedIn,
    getCurrentPlaylist: (state) => state.playlists[0], // Devuelve la primera playlist
  },

  actions: {
    // Manejo de usuario
    loginUser(name, avatar) {
      this.user = { name, avatar, isLoggedIn: true };
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    logoutUser() {
      this.user = { name: '', avatar: '', isLoggedIn: false };
      localStorage.removeItem('user');
    },

    loadUserFromStorage() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.user = storedUser;
      }
    },

    // Manejo de playlists
    addSongToPlaylist(song) {
      const playlist = this.playlists[0]; // Accedemos a la primera playlist directamente desde el estado
      if (!playlist.songs.find((s) => s.id === song.id)) {
        playlist.songs.push(song); // Agrega la canción a la playlist si no está ya
        this.playlists = [...this.playlists]; // Forzamos la reactividad actualizando el estado
      }
    },

    removeSongFromPlaylist(songId) {
      const playlist = this.playlists[0];
      playlist.songs = playlist.songs.filter((song) => song.id !== songId);
      this.playlists = [...this.playlists]; // Forzamos la reactividad
    },

    // Canción actual
    setCurrentSong(song) {
      this.currentSong = song;
    },

    // Búsquedas
    setSearchResults(results) {
      this.searchResults = results;
    },

    clearSearchResults() {
      this.searchResults = {
        songs: [],
        albums: [],
        artists: [],
      };
    },
  },
});
