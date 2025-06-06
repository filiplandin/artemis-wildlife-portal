<template>
  <section>
    <main>
      <div id="swiper">
        <transition-group name="card-transition" tag="div">
          <Card
            v-for="(animal, index) in visibleAnimals"
            :key="index"
            :animal="animal.common_name"
            :style="{ 'z-index': 250 - index, position: 'absolute' }"
            :on-dislike="onDislike"
            :on-like="onLike"
            :on-dismiss="onDismiss"
            :openModal="openModal"
            :openChatModal="openChatModal"            
          />
        </transition-group>
      </div>
      
    </main>
    <div class="left-section">
        <img class="dislike" id="dislike" name="heart-dislike-outline" src="src/assets/img/heart-dislike-sharp.svg">
    </div>
    <div class="right-section">
        <img class="like" id="like" name="heart-like-outline" src="src/assets/img/heart.svg">
    </div>
  </section>
    <div>
      <Modal
       :searchString="current_animal"
        v-show="isModalVisible"
        @close="closeModal">
      </Modal>
    </div>
    <div>
     
    </div>
    <div>
    <!-- The Chat Modal -->
      <div class="match-popup" 
        :searchString="current_animal"
        v-show="isChatModalOpen" 
        @click="closeChatModal">

      <!-- Chat Modal content -->
        <div class="match-popup-content" @click.stop>
        <span class="close" @click="closeChatModal">&times;</span>
          <div class="match-popup-header">
            <h2 class="match-popup-title">It's a match!</h2>
          </div>
          <div class="match-popup-body">
            <p class="match-popup-message">
            You and {{ current_animal }} have matched! 
            Do you want to chat with your match?
          </p>
          <button class="no-popup-button" @click="isChatModalOpen = false">No</button>
          <router-link class="linkToPage" :to="`../Animals/${current_animal}/chat`">
            <button class="yes-popup-button">Yes</button>
          </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<!-- <button class="yes-popup-button" @click="$router.push({ name: 'Chat', params: { animal: currentAnimanl }})">Yes</button> -->

<script>
import Card from "./Card.vue";
import Modal from "./Modal.vue";
import json from '../json_files/total_population.json'

export default {
  name: "Swiper",
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
      isChatModalOpen: false,
      current_animal: '',
      currentIndex: 0,
      requests: 5,
      matchedUsers: [],
      animals:[],
      jsonObj:{},
      visibleAnimals:[],


    };
  },
created(){
  this.jsonObj = json;
  this.getAnimals();
  //console.log(this.animals)
  this.showAnimals();

  
},

computed:{

},

methods: {

  openModal(animal) {
    this.current_animal = animal.common_name;
    this.isModalVisible = true;
  },

  closeModal() {
    this.isModalVisible = false;
  },

  openChatModal(){
    this.isChatModalOpen = true;
  },

  closeChatModal(){
    this.isChatModalOpen = false;
  },

  onLike(animal) {
    this.matchedUsers.push(this.animals[this.currentIndex]);
    this.current_animal=this.animals[this.currentIndex].common_name;
    this.currentIndex++;
    this.showAnimals();
    this.isChatModalOpen = true;
    this.appendNewCard();
    
  },

  closeMatchPopup() {
    this.$emit('close');
  },

  closeMatchPopup(){
    this.isMatch = false;
  },

  onDislike() {
    this.currentIndex++;
    this.showAnimals();
  },
  onDismiss() {
    this.appendNewCard();
  },
  appendNewCard() {
    const newAnimal = {
      id: this.currentIndex,
      name: this.common_name,
      /*swedishName: 'Rådjur',
      population: 1000000,
      location: 'Sverige', */
    };
  },

  showAnimals(){
      this.visibleAnimals.push(this.animals[this.currentIndex]);
  },

  async getAnimals() {
    this.jsonObj.forEach(animal => {
        this.animals.push(animal);
    });
  },

}
  
};

</script>


<style scoped>

section{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  grid-template-areas: 
    "dislike main like";
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: relative;
  background: linear-gradient(225deg, #8fbc8f57, #228B22);
}

main {
width: 100%;
height: 100vh;
overflow: hidden;
display: flex;
justify-content: space-evenly;
align-items:center;
grid-area: main;
}

#swiper{
    height: 70vh;
    aspect-ratio: 2 / 3;
    perspective: 1000px;
    perspective-origin: center 50%;
    transform-style: preserve-3d;
    position: absolute;
    left: 1/2;
}
  
  .Card-transition-enter-active,
  .Card-transition-leave-active {
    transition: all 0.3s;
  }
  
  .card-transition-enter,
  .card-transition-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.match-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.match-popup-content {
  background-color: #fff;
  border-radius: 5px;
  max-width: 500px;
  width: 80%;
  padding: 20px;
}

.match-popup-header {
  text-align: center;
  margin-bottom: 20px;
}

.match-popup-title {
  font-size: 2rem;
  color: #4caf50;
}

.match-popup-body {
  text-align: center;
}

.match-popup-message {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.yes-popup-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.2s ease;
}

.yes-popup-button:hover {
  background-color: #388e3c;
}


.no-popup-button {
background-color: rgb(205, 35, 35);
color: white;
border: none;
border-radius: 5px;
padding: 10px 20px;
cursor: pointer;
font-size: 1.2rem;
transition: background-color 0.3s ease;
}

.no-popup-button:hover {
background-color: rgb(187, 3, 3);
}

.dislike{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  height:100%; 
  justify-content: center;
  align-items: center;
}

.like{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  height:100%; 
  justify-content: center;
  align-items: center;
}

.left-section{
  position: center;  overflow: hidden;
  display: relative;
  justify-content: space-evenly;
  align-items:center;
  grid-area: dislike;
}
.right-section{
  position: center;  overflow: hidden;
  display: relative;
  justify-content: space-evenly;
  align-items:center;
  grid-area: like;
}

  </style>
  