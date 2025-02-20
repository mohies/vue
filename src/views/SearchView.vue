<template>
  <div class="search-container">
    <h1>Buscador</h1>
    <p>Busca canciones, álbumes o artistas.</p>
    <p>Para que salgan los resultados debes entrar en <a href="https://cors-anywhere.herokuapp.com/corsdemo"
        target="_blank">https://cors-anywhere.herokuapp.com/corsdemo</a></p>

    <div class="search-filters">
      <label>
        <input type="checkbox" v-model="sortAscending" /> Ordenar Ascendente
      </label>
      <label>
        Duración (en segundos): {{ durationRange }} s
        <input type="range" v-model="durationRange" min="0" max="300" step="10" />
      </label>
    </div>

    <div class="search-input">
      <input type="text" v-model="searchQuery" placeholder="Escribe lo que quieres buscar..."
        @keyup.enter="searchSongs" />
    </div>

    <div class="filter-buttons">
      <button @click="filterType = 'songs'" :class="{ active: filterType === 'songs' }">Canciones</button>
      <button @click="filterType = 'albums'" :class="{ active: filterType === 'albums' }">Álbumes</button>
      <button @click="filterType = 'artists'" :class="{ active: filterType === 'artists' }">Artistas</button>
    </div>

    <SearchResults :results="filteredResults" :filterType="filterType" />

    <div v-if="filteredResults.length === 0 && searchQuery" class="no-results">
      <p>No se encontraron resultados para "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/stores';
import SearchResults from '@/components/SearchResults.vue';

const searchQuery = ref('');
const sortAscending = ref(false);
const durationRange = ref(0);
const searchResults = ref({
  songs: [],
  albums: [],
  artists: []
});
const filterType = ref('songs'); 
const store = useMainStore();
const audio = ref(null);

const route = useRoute();
const router = useRouter();

const navigateToInfo = (type, id) => {
  router.push({ name: 'Info', params: { type, id } });
};

const searchSongs = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value.songs = [];
    searchResults.value.albums = [];
    searchResults.value.artists = [];
    return;
  }

  const songUrl = `http://localhost:8080/https://api.deezer.com/search?q=${encodeURIComponent(searchQuery.value)}`;
  const albumUrl = `http://localhost:8080/https://api.deezer.com/search/album?q=${encodeURIComponent(searchQuery.value)}`;
  const artistUrl = `http://localhost:8080/https://api.deezer.com/search/artist?q=${encodeURIComponent(searchQuery.value)}`;

  try {
    const [songResponse, albumResponse, artistResponse] = await Promise.all([
      fetch(songUrl),
      fetch(albumUrl),
      fetch(artistUrl)
    ]);

    if (!songResponse.ok || !albumResponse.ok || !artistResponse.ok) {
      throw new Error("Error al buscar en Deezer");
    }

    const songData = await songResponse.json();
    const albumData = await albumResponse.json();
    const artistData = await artistResponse.json();

    searchResults.value.songs = songData.data || [];
    searchResults.value.albums = albumData.data || [];
    searchResults.value.artists = artistData.data || [];
  } catch (error) {
    console.error("Error en la búsqueda:", error.message);
  }
};

const filteredResults = computed(() => {
  let results = [];

  if (filterType.value === 'songs') {
    results = searchResults.value.songs;
    if (durationRange.value > 0) {
      results = results.filter(song => song.duration <= durationRange.value);
    }
  } else if (filterType.value === 'albums') {
    results = searchResults.value.albums;
  } else if (filterType.value === 'artists') {
    results = searchResults.value.artists;
  }

  if (sortAscending.value) {
    results = results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
});

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery;
    searchSongs();
  }
});

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q;
    searchSongs();
  }
});
</script>
<style scoped>
.search-container {
  background-color: #1f1f1f;
  color: #fff;
  padding: 30px;
  border-radius: 10px;
}

h1 {
  color: #ff4081;
  font-size: 2rem;
}

.search-input input {
  padding: 12px;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: #333;
  color: white;
  font-size: 1rem;
}

.search-filters {
  margin-bottom: 20px;
}

.search-filters label {
  margin-right: 20px;
  color: white;
}

.filter-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}

.filter-buttons button {
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.filter-buttons button.active {
  background-color: #3700b3;
}

.filter-buttons button:hover {
  background-color: #3700b3;
  transform: scale(1.05);
}

.no-results {
  color: #ff4081;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
