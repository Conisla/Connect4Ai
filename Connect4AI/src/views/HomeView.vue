<script setup>
import NavBar from '../components/NavBar.vue';
import GameGrid from '../components/GameGrid.vue';
import VersusMenu from '../components/VersusMenu.vue';
</script>

<template>
  <NavBar/>
  <VersusMenu/>
</template>

<style>



</style>


<script>
export default {
  name:'HomeView',
  components : {
    GameGrid,
    NavBar,
    VersusMenu
  }
}
</script>
