<template>
  <div>
    <h1>Detalles de {{ type }}</h1>
    <component :is="DynamicComponent" :id="id"></component>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { type, id } = route.params;

// Cargar dinámicamente el componente según el tipo
const DynamicComponent = computed(() => {
  if (type === 'artist') {
    return defineAsyncComponent(() => import('@/components/InfoArtist.vue'));
  } else if (type === 'album') {
    return defineAsyncComponent(() => import('@/components/InfoAlbum.vue'));
  } else if (type === 'song') {
    return defineAsyncComponent(() => import('@/components/InfoSong.vue'));
  }
});
</script>