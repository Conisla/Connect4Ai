<template>
  <form @submit="handleSubmit" class="game_container">
    <div class="game_menu">
      <div class="form-group">
        <label>Mode de jeu:</label>
        <select v-model="formData.vsAI">
          <option value="false">Joueur vs Joueur</option>
          <option value="true">Joueur vs IA</option>
        </select>
      </div>
      <div class="form-group" v-if="formData.vsAI">
        <label>Niveau de l'IA:</label>
        <select v-model="formData.mode">
          <option value=0>Facile</option>
          <option value=1>Moyen</option>
          <option value=2>Difficile</option>
        </select>
      </div>
      <button type="submit">JOUER</button>
    </div>
  </form>

  </template>

  <style>
  .game_container{
    top: 0;
    z-index: 10;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centre horizontalement */
    align-items: center; /* Centre verticalement */
  }
  .game_menu {
    z-index: 11;
    border-radius: 15px;
    padding: 20px;
    background-color: lightgray;
    color: black;
    width: 250px;
    height: 200px;
  }

  .form-group{
    margin:auto auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .game_menu button{
    margin: 20px 0;
  }
  

  </style>
  
  <script>
  export default {
    name:'GameMenu',
    data() {
      return {
        formData : {
          vsAI: false,
          mode: 0
        }
        
      };
    },
    methods: {
    handleSubmit(event) {
      event.preventDefault(); // Empêche le rechargement de la page
      this.$emit("form-submitted", this.formData);
    },
    }
  };
  </script>
  