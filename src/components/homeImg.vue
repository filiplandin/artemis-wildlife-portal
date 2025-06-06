<template>
    <section v-show="!isLoading">
        <img ref="mainPhoto" class="img easein" src="src/assets/img/doruk-yemenici-FRJamIO-TB0-unsplash.jpg">
        <!-- <p id="text1" class="easeinOut">Hello my name is Cava and I am the cow.</p>
        <p id="text2" class="">Hello my name is Cava  a cow.</p>
        <p id="text3" class="">Hello and I am a cow.</p>
        <p id="text4" class="">Hello my name is Andrew</p> -->
        <!-- <p>I have hade a long week. How about you?</p> -->
    </section>
</template>

<script>
export default {
    // import { ref } from 'vue';

    data() {
    return {
        images: ["src/assets/img/doruk-yemenici-FRJamIO-TB0-unsplash.jpg", "src/assets/img/nick-fewings-2qXNT7LMfpY-unsplash.jpg", "src/assets/img/jonah-pettrich-JY6SQqlJLXE-unsplash.jpg"],
        index: 0, 
        photoAnimationSpeed: 5000,
        newPhoto: true,
    }
  },
  mounted() {
    this.changePhoto();
    this.removeAddClass();
  },
  methods: {
    changePhoto() {
        this.$refs.mainPhoto.src = this.images[this.index];
        if (this.index == 2) {
            this.index = 0;
        } else {
            this.index++;
        }
        setTimeout(this.changePhoto, this.photoAnimationSpeed);
    },
    removeAddClass() {
      setTimeout(function() {
        this.newPhoto = 'true';
      }, 2500);
      setTimeout(function() {
        this.newPhoto = 'false';
      }, 2500);
    },

    async removeClass() {
        this.newPhoto = true;
    }
  },
}
</script>

<style scoped>

    .img 
    { 
        width: 40rem;
        height: 40rem;
        object-fit: cover;
        border-radius: 50%;
    }

    .easein {
        animation: easein 1s linear backwards;
    }

    p {
        position: absolute;
        background-color: rgb(179, 186, 160);
        padding: 1rem;
        border-radius: 200rem;

    }

    #text1 {
        right: 5vw;
        top: 75vh;

    }

    #text2 {
        right: 37vw;
        top: 20vh;

    }

    #text3 {
        right: 2vw;
        top: 40vh;
    }
    #text4 {
        right: 43vw;
        top: 60vh;

    }


@keyframes easein {
  0% {
    opacity: 0;
  }
}

@keyframes easeinOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>