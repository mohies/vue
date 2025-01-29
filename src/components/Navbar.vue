<template>
  <nav class="sidebar">
    <div class="container">
      <!-- Logo de Deezer -->
      <img class="logo" src="../imgs/Deezer.png" alt="Deezer Logo" />

      <!-- Nombre de la app -->
      <router-link class="navbar-brand" to="/">🎵 Mi Música</router-link>

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
        <!-- Nuevo enlace para los favoritos -->
        <li class="nav-item">
          <router-link class="nav-link" to="/favorites">Favoritos</router-link>
        </li>
      </ul>

      <!-- Botón de Logout -->
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";

const logout = () => {
  console.log("Cerrar sesión");
};
</script>

<style scoped>
/* Sidebar fijo a la izquierda */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: #121212; /* Fondo oscuro */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Asegura que los elementos se distribuyan de manera uniforme */
  padding: 20px;
  align-items: center;
}

/* Logo de Deezer */
.logo {
  width: 150px; /* Ajusta el tamaño del logo */
  margin-bottom: 20px;
  display: block; /* Esto asegura que el logo sea un bloque para centrarlo */
  margin-left: auto; /* Centra el logo */
  margin-right: auto; /* Centra el logo */
}

/* Nombre de la aplicación */
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1DB954; /* Color verde tipo Spotify */
  text-decoration: none;
  margin-bottom: 30px;
  display: block;
}

/* Estilo de los enlaces */
.navbar-nav {
  list-style: none;
  padding: 0;
  width: 100%;
  text-align: center;
}

.nav-item {
  margin-bottom: 15px;
}

.nav-link {
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #1DB954;
}

/* Botón de Logout */
.logout-btn {
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  margin-top: auto;
}

.logout-btn:hover {
  background-color: #18a748;
}
</style>
