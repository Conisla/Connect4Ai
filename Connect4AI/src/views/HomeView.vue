<script setup>
  import GameGrid from '../components/GameGrid.vue';
  import Mygamegrid from '../components/Mygamegrid.vue';
  import Chat from '../components/Chat.vue';
</script>

<template>
    <div>
      <!-- <GameGrid/> -->
      <Chat/>
      <!-- <Mygamegrid/> -->
    </div>
</template>


<script>
export default {
  name:'HomeView',
  components : {
    GameGrid, 
    Mygamegrid,
    Chat
  }
}
</script>
