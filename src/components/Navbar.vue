<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Enlace al Home sin logo -->
      <router-link class="navbar-brand" to="/">Mi Aplicación</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/playlists">Playlists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Buscador</router-link>
          </li>
          <!-- Botón de Logout -->
          <li class="nav-item">
            <button class="btn btn-danger" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const logout = () => {
  // Lógica para cerrar sesión
  console.log("Cerrar sesión");
}
</script>

<style scoped>
/* Estilo opcional para personalizar el texto o apariencia */
.navbar-brand {
  font-size: 1.5rem; /* Tamaño de fuente del nombre de la aplicación */
}

.navbar-nav .nav-link {
  padding: 10px 15px; /* Ajustar el padding de los enlaces */
}
</style>
