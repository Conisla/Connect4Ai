<script setup>
  import GameGrid from '../components/GameGrid.vue';
  import Mygamegrid from '../components/Mygamegrid.vue';
</script>

<template>
    <div>
      <GameGrid/>
      <!-- <Mygamegrid/> -->
    </div>
</template>


<script>
export default {
  name:'HomeView',
  components : {
    GameGrid, 
    Mygamegrid
  }
}
</script>
