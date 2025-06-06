<template>
    <main>
        <div class="header">
            <h1>{{ this.animal.binomial }}</h1>
            <h2>{{ animalName }}</h2>
        </div>

        <p v-if="animal.description != null" class="informationText" id="text1"> {{ animal.description }}</p>
        <p v-if="animal.description == null" class="informationText" id="text1">Maecenas id arcu felis. Nunc vulputate tellus eget dui feugiat aliquet. Ut id massa in ipsum egestas efficitur. Donec faucibus risus sed sodales luctus. Sed sapien ligula, hendrerit nec sodales pretium, hendrerit id justo. Nam maximus dignissim tincidunt. Curabitur condimentum pulvinar est, a vestibulum arcu cursus eget. Integer pharetra, mi vitae bibendum sollicitudin, mauris metus egestas quam, varius aliquam erat lectus sed eros. Sed velit erat, blandit id diam quis, rhoncus sollicitudin eros. Integer a nisi blandit, efficitur nisi sit amet, molestie tellus. Mauris finibus sodales libero laoreet auctor. Vestibulum id magna ultricies, fermentum metus in, luctus lorem. Maecenas lacus urna, mollis eu ex sed, accumsan dapibus libero. Pellentesque at lobortis quam, at semper nisi. Quisque vehicula congue condimentum.</p>
        
        <!-- <img src="src/assets/img/placeholder.jpg" alt=""> -->

        <div class="boxes">
            <div class="animalInfoBox">
                <h2>General information</h2>
                <p v-if="animal.size != null" >Height: {{ animal.size }}</p>
                <p v-if="animal.size == null" >Height: Information Missing</p>
                <p v-if="animal.weight != null">Weight: {{ animal.weight }}</p>
                <p v-if="animal.weight == null">Weight: Information Missing</p>
                <p v-if="animal.life_span != null">Lifespan: {{ animal.life_span }}</p>
                <p v-if="animal.life_span == null">Lifespan: Information Missing</p>
            </div>

            <div class="animalChatBox">
                <h2>Chat with {{article}} {{ animalName }} today!</h2>
                <p>Do you want to learn more about this animal? Click the button below!</p>
                <router-link class="linkToPage" :to= "`${chaturl}`">                
                    <button>Chat with {{ article }} {{animal.common_name}}</button>
                </router-link>

            </div>
        </div>

        <div class="graf">
           <ScatterChart :animalLatinName="animalName"></ScatterChart>
        </div>
        
        <p v-if="animal.population_description != null" class="informationText" id="text2">{{ animal.population_description }}</p>
        <p v-if="animal.population_description == null" class="informationText" id="text2">Proin efficitur tortor cursus facilisis fringilla. Nam placerat rutrum mauris, sit amet tincidunt nibh condimentum et. Suspendisse nec nulla consectetur, blandit enim vel, accumsan metus. Ut neque orci, finibus vitae imperdiet et, faucibus non tellus. Mauris blandit felis at purus maximus, et aliquam dolor tristique. Nullam sed nunc molestie, efficitur diam sollicitudin, dictum tortor. Sed posuere vitae nibh in pretium. Sed hendrerit dolor eget erat consectetur, non tincidunt lorem sagittis. Maecenas nisl nisi, hendrerit a varius ut, laoreet luctus mauris. Aliquam at ipsum vel magna sagittis tempus non et felis.</p>

    </main>
</template>

<script>
    
    import ApiHelper from '../apiHelper.js';
    import ScatterChart from './ScatterChart.vue';
    import json from '../json_files/total_population.json'

    export default {
        components: {
            ScatterChart,
        },
        data() {
            return {
                animalName: this.$route.params.id,
                chaturl: this.$route.params.id + "/chat",
                animal: {},
                jsonObj: {},
            }
        },
        created() {
            this.jsonObj = json;
            this.getAnimalInformation();
            console.log(this.animal)
        },
    methods: {
        getAnimalInformation() {
            this.jsonObj.forEach(animal => {
                if (animal.common_name == this.animalName) {
                    // replace _ with space in animal binomial
                    animal.binomial = animal.binomial.replace(/_/g, " ");
                    this.animal = animal; 
                    return;
                }
            });
        }

    },
    computed: {
        article() {
            const firstChar = this.animal.common_name.charAt(0).toLowerCase();
        return ['a', 'e', 'i', 'o', 'u'].includes(firstChar) ? 'an' : 'a';
  }
  // ... rest of your computed properties
}

}
</script>

<style scoped>

.informationText {
    font-size: 1.2rem;
}

button {
    background-color: rgb(240, 236, 230);
    padding: 1rem;
    border-radius: 2rem;
    border-style: solid;
    font-size: 1.2rem;
    border-color: #9bd4c0;
    width: 80%;
    margin-top: 1rem;
}

button:hover {
    background-color: #9bd4c0;
    color: white;
}
.graf {
    width: 40rem;
    height: 30rem;
    grid-area: graf;
}

.animalChatBox {
    background-color: rgb(240, 236, 230);
    max-width: 15vw;
    max-height: 25rem;
    border-radius: 3rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}   

.animalInfoBox {
    background-color: rgb(240, 236, 230);
    max-width: 15vw;
    max-height: 15rem;
    border-radius: 3rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    margin-bottom: 2rem;
}



h2 {
    padding-bottom: 1rem;
}

.header {
    grid-area: header;
    text-align: left;
}

#text1 {
    grid-area: t1;
    padding: 0 2rem 2rem 0;
}

#text2 {
    grid-area: t2;
    padding: 0 2rem 0 2rem;
}

.boxes {
    grid-area: cb;

}

main {
    padding: 3rem;
    padding-top: 6rem;
    display: grid; 
    grid-template-areas: "header header header"
                         "t1 t1 cb"
                         "graf t2 cb";
    grid-template-columns: 45% 35% 20% ;

}
</style>
