<script setup>
import { ref, onMounted, watch } from 'vue';
import Menu from "./components/Navbar.vue";
import MusicPlayer from './components/MusicPlayer.vue';
import WelcomeModal from './components/WelcomeModal.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isUserLoggedIn = ref(!!userStore.user.name);

watch(() => userStore.user.name, (newName) => {
  isUserLoggedIn.value = !!newName;
});
</script>

<template>
  <div id="app">
    <div class="layout">
      <!-- Sidebar Fijo -->
      <Menu />

      <!-- Contenido Principal -->
      <div class="main-content">
        <header class="header">
          <h1>Deezer Music Client</h1>
        </header>

        <main class="content">
          <router-view />
        </main>

        <footer class="footer">
          <p>&copy; 2025 Deezer Music Client. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>

    <!-- MusicPlayer siempre visible en la pantalla -->
    <MusicPlayer />

    <!-- Welcome Modal -->
    <WelcomeModal v-if="!isUserLoggedIn" />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles.scss' as *;

/* Layout Principal */
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  /* Evita que la página tenga doble scroll */
}

/* Sidebar (Navbar) */
.sidebar {
  width: 250px;
  background-color: $background-dark;
  color: $text-light;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Contenido Principal */
.main-content {
  margin-left: 250px;
  /* Deja espacio para el sidebar */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #181818;
  color: $text-light;
  height: 100vh;
  overflow-y: auto;
  /* Permite hacer scroll en el contenido */
}

/* Header */
.header {
  background-color: $primary-color;
  text-align: center;
  padding: 15px;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Contenido */
.content {
  flex-grow: 1;
  padding: 20px;
}

/* Footer */
.footer {
  background-color: #181818;
  text-align: center;
  padding: 10px;
  color: $text-muted;
  font-size: 0.9rem;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative; /* Esto asegura que el MusicPlayer se posicione en relación a este contenedor */
}

.music-player {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}

/* Media Queries para hacer la aplicación responsive */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    margin-top: 50px; /* Ajusta el margen superior para la barra de navegación responsive */
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px; /* Reducimos el padding */
  }

  .main-content {
    margin-left: 0;
    margin-top: 50px; /* Ajusta el margen superior para la barra de navegación responsive */
  }

  .header {
    font-size: 1.2rem;
    padding: 10px;
  }

  .content {
    padding: 10px;
  }

  .footer {
    font-size: 0.8rem;
    padding: 5px;
  }
}

@media (max-width: 480px) {
  .header {
    font-size: 1rem;
  }

  .content {
    padding: 5px;
  }

  .footer {
    font-size: 0.7rem;
  }
}
</style>
