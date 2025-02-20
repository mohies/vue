<template>
  <div class="artist-card" @click="navigateToInfo('artist', artist.id)">
    <img :src="artist.picture_xl" alt="Artist Picture" class="artist-picture" />
    <div class="artist-details">
      <h3>{{ artist.name }}</h3>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; // Importamos useRouter para la navegación

// Definimos las propiedades
defineProps({
  artist: Object
});

const router = useRouter(); // Instanciamos el router

// Función para navegar al detalle del artista
const navigateToInfo = (type, id) => {
  router.push({ name: 'Info', params: { type, id } });
};
</script>

<style scoped>
.artist-card {
  display: flex;
  align-items: center;
  gap: 20px; /* Mayor espacio entre la imagen y el nombre */
  background-color: #1f1f1f; /* Fondo oscuro para la tarjeta */
  padding: 15px;
  border-radius: 10px; /* Esquinas redondeadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra sutil */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%; /* Que ocupe el 100% del contenedor */
  cursor: pointer; /* Cambia el cursor para indicar que es clickeable */
}

.artist-card:hover {
  transform: translateY(-5px); /* Efecto hover para levantar la tarjeta */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* Sombra más intensa en hover */
}

.artist-picture {
  width: 100px; /* Tamaño más grande para la imagen del artista */
  height: 100px;
  border-radius: 50%; /* Redondear la imagen */
  object-fit: cover; /* Ajuste de la imagen para que cubra el espacio sin distorsionarse */
}

.artist-details {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra el texto verticalmente */
  flex: 1; /* Ocupa el espacio restante */
}

.artist-details h3 {
  font-size: 1.2rem;
  color: #fff;
  font-weight: bold;
  margin: 0;
}
</style>
