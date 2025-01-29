import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import PlaylistsView from '../views/PlaylistsView.vue';
import SearchView from '../views/SearchView.vue';
import FavoritesView from '../views/FavoritesView.vue';  // Importa la vista de Favoritos

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: PlaylistsView,
  },
  {
    path: '/search',
    name: 'Buscador',
    component: SearchView,
  },
  {
    path: '/favorites',  // Ruta para la vista de favoritos
    name: 'Favoritos',
    component: FavoritesView,  // La vista que creaste para Favoritos
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;
