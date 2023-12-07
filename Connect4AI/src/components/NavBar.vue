<template>
    <div class="nav-container">
        <div class="nav-main-title">
            <router-link to="/" class="home-button">
                <div>
                    <img width="28" height="28" src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/home.png" alt="home"/>
                </div>
            </router-link>
            <h1>PUISSANCE 4</h1>
        </div>
    </div>
</template>

<style>
.nav-container {
    position: absolute;
    height: auto;
    margin: 0 10vw;
    z-index: 1;
    top: 0;
    display: flex;
    justify-content: space-between; /* Pour aligner le bouton "home" à gauche et le titre au centre. */
}

.nav-main-title {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between; /* Pour aligner le bouton "home" à gauche et le titre au centre. */
    margin: auto;
    border-radius: 0px 0px 20px 20px;
    background: #3F3F3F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 80vw;
    padding: 1vh;
}

.nav-main-title h1 {
    width: 100%;
    color: #B9CAD9;
    align-self: center;
}

.home-button {
    position: absolute;
    margin: 5px 8px;
}
</style>

<script>
export default {
    name: 'NavBar'
}
</script>
