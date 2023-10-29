<template>
<div class="container">
    <div class="menu">
        <router-link class="vsPlayer" to="/locale-game">
            <div class="vsCategorie">
                <h2 >Locale</h2>
            </div>
        </router-link>
        <div class="vsIA">
            <div class="vsCategorie">
                <h2>Online</h2>
            </div>
        </div>
    </div>
</div>

</template>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        justify-content: center; /* Centrer les éléments horizontalement */
        align-items: center; /* Centrer les éléments verticalement */
    }

    .menu{
        display: flex;
        flex-direction: row;
    }
    .vsCategorie{
        display: flex; 
        flex-direction: column; 
        align-items: center;
        justify-content: center; 
        width: 350px;
        height: 350px;
        border-radius: 100%;
        border: 22px solid #E9DB94;
        margin: auto 2vw;
        font-size: 30px;
    }

    .vsPlayer .vsCategorie{
        border: 22px solid #F42A50;
    }

    .vsPlayer{
        display: flex;
        flex-direction: row;
        width: min-content;
        height: min-content;
    }

    .vsIA{
        display: flex;
        flex-direction: row;
        width: min-content;
        height: min-content;
    }

    @media screen and (max-width: 768px) {
        .menu {
            flex-direction: column;
        }
        .vsPlayer, .vsIA {
            height: min-content;
            padding-top: 4vh;
        }
    }

</style>

<script>
export default {
    name: 'VersusMenu'
    }
</script>

