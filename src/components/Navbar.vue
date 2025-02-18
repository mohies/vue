<template>
  <nav class="sidebar">
    <div class="container">
      <!-- Logo de Deezer -->
      <img class="logo" src="../imgs/Deezer.png" alt="Deezer Logo" />

      <!-- Nombre de la app -->
      <router-link class="navbar-brand" to="/">🎵 Mi Música</router-link>

      <!-- User Info -->
      <div class="user-info" v-if="user.name">
        <img :src="user.avatar" alt="User Avatar" class="avatar" />
        <p>{{ user.name }}</p>
      </div>

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
      <button class="logout-btn" v-if="user.name" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
// Importamos el store de usuario (usado para gestionar el estado del usuario en toda la aplicación)
import { useUserStore } from '@/stores/user';

// Inicializamos el store del usuario, el cual contiene información sobre el usuario y sus acciones
const userStore = useUserStore();
// Extraemos la información del usuario desde el store
const user = userStore.user;

// Función para manejar el logout (cerrar sesión)
const logout = () => {
  // Limpiamos la información del usuario desde el store (reseteamos el estado del usuario)
  userStore.clearUser();
  // Recargamos la página para reflejar los cambios (por ejemplo, el usuario será redirigido a la pantalla de login)
  location.reload();
};

</script>

<style lang="scss" scoped>
@use '@/assets/styles.scss' as *;

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: $secondary-color;
  color: $text-color;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  color: $primary-color;
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
  color: $text-color;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: $primary-color;
}

/* Botón de Logout */
.logout-btn {
  background-color: $primary-color;
  color: $text-color;
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
  background-color: $button-hover;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
