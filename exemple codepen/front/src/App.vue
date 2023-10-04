<script setup>
import { RouterView } from 'vue-router'
import navBar from './components/navBar.vue';
</script>

<template>
  <navBar/>
  <button class="btn" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
      <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/menu--v6.png" alt="menu--v6"/>
  </button>
  <RouterView />
</template>
