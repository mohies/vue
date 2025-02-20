<template>
  <div class="album-card" @click="navigateToInfo('album', album.id)">
    <img :src="album.cover_xl" alt="Album Cover" class="album-cover" />
    <div class="album-details">
      <h3 class="album-title">{{ album.title }}</h3>
      <p class="album-artist">{{ album.artist.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; // Importamos useRouter para la navegación

// Definimos las propiedades
defineProps({
  album: Object
});

const router = useRouter(); // Instanciamos el router

// Función para navegar al detalle del álbum o artista
const navigateToInfo = (type, id) => {
  router.push({ name: 'Info', params: { type, id } });
};
</script>

<style scoped>
.album-card {
  display: flex;
  align-items: center;
  gap: 20px; /* Aumentar espacio entre imagen y detalles */
  background-color: #1f1f1f; /* Fondo oscuro para la tarjeta */
  padding: 15px;
  border-radius: 10px; /* Esquinas redondeadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra sutil */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%; /* Que ocupe el 100% del contenedor */
  cursor: pointer; /* Cambiar el cursor al hacer hover */
}

.album-card:hover {
  transform: translateY(-5px); /* Efecto hover para levantar la tarjeta */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* Sombra más intensa en hover */
}

.album-cover {
  width: 90px; /* Tamaño aumentado de la imagen */
  height: 90px;
  border-radius: 5px; /* Esquinas redondeadas para la imagen */
  object-fit: cover; /* Ajuste de la imagen */
}

.album-details {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centrar el texto verticalmente */
}

.album-title {
  font-size: 1rem; /* Tamaño de fuente ajustado */
  font-weight: bold;
  color: #fff; /* Color de texto blanco */
  margin: 0; /* Eliminar margen por defecto */
  text-overflow: ellipsis; /* Evitar que el texto se desborde */
  white-space: nowrap;
  overflow: hidden;
}

.album-artist {
  font-size: 0.9rem;
  color: #bbb; /* Color gris para el artista */
  margin-top: 5px;
}

.album-card:hover .album-title {
  text-decoration: underline; /* Subrayado en hover para el título */
  color: #1DB954; /* Color verde al pasar el mouse */
}

.album-card:hover .album-artist {
  color: #fff; /* Cambio de color en el nombre del artista al pasar el mouse */
}
</style>
