<script setup>
import Menu from "./components/Navbar.vue";
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
          <p>&copy; 2024 Deezer Music Client. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Variables */
$primary-color: #1DB954;
$background-dark: #121212;
$text-light: #ffffff;
$text-muted: #b3b3b3;

/* Layout Principal */
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden; /* Evita que la página tenga doble scroll */
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
  margin-left: 250px; /* Deja espacio para el sidebar */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #181818;
  color: $text-light;
  height: 100vh;
  overflow-y: auto; /* Permite hacer scroll en el contenido */
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
</style>
