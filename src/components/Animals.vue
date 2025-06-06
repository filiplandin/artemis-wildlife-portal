<template>
    <main>
        <h1 class="easeIn">Animals</h1>
        <form class="search-form" @submit.prevent="search">
            <input type="text" v-model="searchQuery" placeholder="Search for an animal" class="search-input" />
        </form>

        <div>

            <router-link :to="`/Animals/${animal.common_name}`" class="card easeIn"  v-for="(animal, index) in filteredAnimals" :key="index">
                <img class="img" :src="`https://source.unsplash.com/1000x1000?${animal.common_name}`"  alt="">
                <p class="nameText">{{ animal.common_name }}</p>
            </router-link>   

            <section v-for="index in requests" class="blink_me">
                <div class="img-filler"></div>
            </section>

      
        </div>
    </main>
</template>


<script>
import { createWebHistory } from 'vue-router';
const history = createWebHistory();
// const handleSearch = (query) => {
  // Construct URL with search query as parameter
  // const url = `/animal?query=${encodeURIComponent(query)}`;
 // const url = `/animals/${query}`;

  // Redirect to Animal page with search query as parameter
 // window.location.href = url;
//};

import ApiHelper from '../apiHelper.js';
import json from '../json_files/total_population.json'

    export default {
    components: {},
    el: '#toolBtns',
    data() {
        return {
            animals: [],
            searchQuery: '',
            activeBtn:'btn1',
            requests: 0,
            jsonObj: {},
            it: 1,

        };
    },
    // Funktionen körs innan sidan är skapad.
    created() {
        this.jsonObj = json;
        this.getAnimals(); // Get animals from API
        console.log(this.animals)
        this.requests = this.jsonObj.length;
        console.log(this.requests)


    },
    computed:{
        filteredAnimals() {
            return this.animals.filter(animal => // Filter animals with search string
                animal.common_name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
            );
        }
    },

    // add json file with img url and use that and await until it is loaded.

    // filter animals with search string, call to 
    methods: {
        /*
        search(event) {
            event.preventDefault();
            const query = this.searchQuery.trim();
            if (query.length > 0) {
                const url = `/animals/${query}`;
                history.push(url);
            }
        },
        */
        getAnimals() {
            this.jsonObj.forEach(animal => {
                this.addAnimal(animal)
                this.it ++;

            });            
        },
        addAnimal(animal) {
            setTimeout(() => {
                    this.animals.push(animal);
                    this.requests--;

                }, 150 * this.it);
        },
        handleClick(){
            this.active = !this.active;
        }
    }
}
</script>


<style scoped>

h1 {
    text-align: center;
    margin-bottom: 2rem;
}
.search-form{
    width: 91.5%;
    height: 44px;
    /* border-radius: 5px; */
    display:flex;
    flex-direction:row;
    align-items:center;
    margin: 0 auto;
    margin-bottom: 1rem;
}

.search-form:hover {
    background-color: rgb(248, 248, 248);
}




.search-input {
    all: unset;
    font: 16px system-ui;
    color: #504f4f;
    height: 100%;
    width: 100%;
    padding: 6px 10px;
}

placeholder {
    color: #dad9d9;
    opacity: 0.6;  
}

div {
    display: grid;
    grid-template-columns: 22% 22% 22% 22% ;
    /* grid-template-rows: 13rem 13rem 13rem 13rem 13rem 13rem; */
    grid-gap: 1rem;
    max-width: 100%;
    justify-content: center;
}

section{
    background-color: #F2F2F2;
}

main {
    margin: 0 2rem 2rem 2rem;
    padding-top: 5rem;
    max-width: 100%;
}

.img{
    width: 100%;
    height: 75%;
    place-self: center;
    object-fit: cover;
}

.img-filler {
    width: 100%;
    height: 75%;
    background-color: #e1dfda;
}

.card {
    background-color: #F2F2F2;
    text-decoration: none;
    text-transform: capitalize;
    height: 13rem;
    display: flex;
    flex-direction: column; 
    align-content: center;
    justify-content: space-between;
}

.card:hover {
    box-shadow: 1px 1px 5px #5b544f;

}

.nameText {
    height: 25%;
    text-decoration: none;
    color: #261B12;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
    display: flex;
    align-self: center;
    align-items: center;
    font-size: 1.1rem;
}


h1 {
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bolder;
    font-size: 3rem;
    color: #261B12;
}

button {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: 1rem 2rem;
    border-radius: 2rem;
    margin: 0.5rem;
    background-color: white;
    color: #465932;
    border-color: #465932;
}


.blink_me {
    height: 13rem;
    animation: blinker 1.5s linear infinite;
}

.easeIn {
    animation: easein 0.5s linear backwards;
}

@keyframes blinker {
  50% {
    opacity: 0.25;
  }
}

@keyframes easein {
  0% {
    opacity: 0.5;
  }
}

</style>
