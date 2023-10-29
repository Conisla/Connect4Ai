<template>
    <NavBar/>

    <div class="container">
        <GameMenu @menu-toggle="toggleMenu" />
        <GameGrid :mode=0 :vsAI=false />
    </div>
</template>

<style>
.container{
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-content: center;
    padding-top: 10vh;
}


</style>

<script>
import GameMenu from '../components/GameMenu.vue'
import NavBar from '../components/NavBar.vue';
import GameGrid from '../components/GameGrid.vue';

export default {
    name:'LocaleGameView',
    
    components : {
        GameGrid,
        NavBar,
        GameMenu
    }
}
</script>