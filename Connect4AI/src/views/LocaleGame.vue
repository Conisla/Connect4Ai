<template>
    <NavBar/>

    <div class="container">
        <GameMenu @form-submitted="handleFormSubmitted" v-if="showForm" />
        <GameGrid :mode=formData.mode :vsAI=formData.vsAI v-if="!showForm"/>
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
    },
    data() {
        return {
            showForm: true,
            formData: {},
        };
    },
    methods: {
        handleFormSubmitted(formData) {
        
        if(formData.vsAI == "true"){
            this.formData.vsAI = true
            this.formData.mode = parseInt(formData.mode);
        }
        else{
            this.formData.vsAI = false
            this.formData.mode = 0;
        }
        this.showForm = false;
        console.log(this.formData);
        },
    },
}
</script>