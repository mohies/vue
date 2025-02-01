<template>
    <div class="search-container">
      <h1>Buscador</h1>
  
      <!-- Barra de búsqueda -->
      <SearchBar @search="handleSearch" />
  
      <!-- Filtros -->
      <div class="search-filters">
        <label>
          <input type="checkbox" v-model="sortAscending" /> Ordenar Ascendente
        </label>
        <label>
          Duración (en segundos): {{ durationRange }} s
          <input type="range" v-model="durationRange" min="0" max="300" step="10" />
        </label>
      </div>
  
      <!-- Resultados de la búsqueda -->
      <SearchResults 
        :results="filteredResults" 
        :favorites="favorites"
        @toggle-favorite="toggleFavorite"
        @add-to-playlist="addToPlaylist"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useMainStore } from '@/stores/stores';
  import SearchBar from '@/components/SearchBar.vue';
  import SearchResults from '@/components/SearchResults.vue';
  
  const store = useMainStore();
  const searchResults = ref([]);
  const searchQuery = ref('');
  const sortAscending = ref(false);
  const durationRange = ref(0);
  const favorites = computed(() => store.favorites);
  
  const handleSearch = async (query) => {
    searchQuery.value = query;
    try {
      const response = await fetch(
        `http://localhost:8080/https://api.deezer.com/search?q=${query}`
      );
      if (!response.ok) throw new Error('Error al obtener los datos');
      const data = await response.json();
      searchResults.value = data.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const filteredResults = computed(() => {
    let results = searchResults.value;
    if (durationRange.value > 0) {
      results = results.filter(song => song.duration <= durationRange.value);
    }
    if (sortAscending.value) {
      results = results.sort((a, b) => a.title.localeCompare(b.title));
    }
    return results;
  });
  
  const toggleFavorite = (song) => {
    store.favorites.some(fav => fav.id === song.id)
      ? store.removeFromFavorites(song.id)
      : store.addToFavorites(song);
  };
  
  const addToPlaylist = (song) => {
    store.addSongToPlaylist(song);
  };
  </script>
  