<template>
    <div v-if="menuVisible" class="menu">
      <div class="form-group">
        <label>Mode de jeu:</label>
        <select v-model="mode">
          <option value=false>Joueur vs Joueur</option>
          <option value=true>Joueur vs IA</option>
        </select>
      </div>
      <div class="form-group" v-if="mode">
        <label>Niveau de l'IA:</label>
        <select v-model="aiDifficulty">
          <option value="easy">Facile</option>
          <option value="medium">Moyen</option>
          <option value="hard">Difficile</option>
        </select>
      </div>
      <button @click="toggleMenu">Cacher le menu</button>
    </div>
  </template>

  <style>
  .menu {
    border-radius: 15px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centre horizontalement */
    align-items: center; /* Centre verticalement */
    color: black;
    width: 15vw;
    height: 25vh;
  }

  .form-group{
    margin:auto auto;
    padding: 5px;
    display: flex;
    flex-direction: column;
  }

  .menu button{
    margin: 4vh 0;
  }
  

  </style>
  
  <script>
  export default {
    name:'GameMenu',
    data() {
      return {
        menuVisible: true,
        mode: '0',
        aiDifficulty: 'easy'
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      }
    }
  };
  </script>
  