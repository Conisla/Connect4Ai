<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <!-- Sidebar (offcanvas) -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
    <div class="offcanvas-header">

      <h5 class="offcanvas-title" id="sidebarLabel">Menu</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Fermer"></button>
    </div>

    <div class="offcanvas-body">

      <ul class="list-unstyled">
        <li><router-link to="/">Accueil</router-link></li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
    name:'navBar',
}
</script>