<template>
     <nav>
        <router-link class="linkToPage logo" to="/"><img src="src/assets/img/logo.png" alt=""></router-link>

        <div class="links">
            <router-link class="linkToPage" to="/">Home</router-link>
            <router-link class="linkToPage" to="/animals">Animals</router-link>
            <router-link class="linkToPage" to="/Swipe">Swipe</router-link>
        </div>
      </nav>
      <router-view/>
</template>

<script>
export default {
  name: 'App',
}

</script>

<style>
#app {
    margin: 0;
}

body {
    margin: 0;
}

* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

</style>

<style scoped>


nav {
    display: grid;
    width: 100vw;
    grid-template-columns: 10% 70% 20%;
    grid-template-rows: 3rem;
    grid-template-rows: 1;
    grid-template-areas: "logo . links";
    justify-content: end;
    align-items: center;
    /* margin: 1rem 0 0 0; */
    padding: 0;
    position: fixed;
    background-color: white;
    margin: 0;
    padding: 1rem;
}

h3 {
    margin-right: auto;
}

.links{
    grid-area: links;
}

.linkToPage {
    padding-right: 2rem;
    color: black;
    text-decoration: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 100;
}

.linkToPage:hover {
    color: green;
}

.logo{
    margin: 0 auto 0 2rem;
    grid-area: logo;
    height: 100%;
}

img {
    max-height: 3.5rem;
}

</style>
