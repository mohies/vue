<template>
  <div class="info-artist" v-if="artist">
    <h2>{{ artist.name }}</h2>
    <img :src="artist.picture_xl" alt="Artist Picture" />
    <h3>Álbumes</h3>
    <div class="albums" v-if="albums.length">
      <div v-for="album in albums" :key="album.id" class="album" @click="navigateToAlbum(album.id)">
        <img :src="album.cover_medium" alt="Album Cover" />
        <p>{{ album.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const artist = ref(null);
const albums = ref([]);

const fetchArtist = async (artistId) => {
  try {
    const response = await fetch(`http://localhost:8080/https://api.deezer.com/artist/${artistId}`);
    if (!response.ok) throw new Error('Error al obtener datos del artista');
    const data = await response.json();
    artist.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchAlbums = async (artistId) => {
  try {
    const response = await fetch(`http://localhost:8080/https://api.deezer.com/artist/${artistId}/albums`);
    if (!response.ok) throw new Error('Error al obtener álbumes del artista');
    const data = await response.json();
    albums.value = data.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const navigateToAlbum = (albumId) => {
  router.push({ name: 'Info', params: { type: 'album', id: albumId } });
};

onMounted(() => {
  const artistId = route.params.id;
  fetchArtist(artistId);
  fetchAlbums(artistId);
});
</script>

<style scoped>
.info-artist {
  text-align: center;
  font-size: 0.9em;
}
.info-artist img {
  max-width: 50%;
}
.albums {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.album {
  margin: 10px;
  text-align: center;
  cursor: pointer;
}
.album img {
  max-width: 100px;
  border-radius: 5px;
}
</style>