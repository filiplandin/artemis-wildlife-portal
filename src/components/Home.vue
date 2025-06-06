
<template>
    <main>
        <!-- <h1>Landingpage</h1>-->
        <div class="textDiv">
            <h2 class="easeInSlow">Do you have a favorite animal?</h2>
            <h1 class="easeIn">Chat with your<br>Favorites Today!</h1>
            <p class="easeInSlow">But it does not have to be your favorite animal it could be any animal you want to get to know better.</p>
            <router-link class="buttonToPage easeInSlow" to="/Swipe"><button>Swipe today!</button></router-link>
        </div>

        <HomeImage class="imges"></HomeImage>
        

        <!-- <div class="bubble"></div> -->
        <!-- <img src="src/assets/img/jonah-pettrich-JY6SQqlJLXE-unsplash.jpg" alt=""> -->
        <!-- <img src="src/assets/img/nick-fewings-2qXNT7LMfpY-unsplash.jpg" alt=""> -->
    </main>


</template>

<script>
import HomeImage from './homeImg.vue'


export default {
  components: {
    HomeImage,
  },
  data() {
    return {
        
    }
  },
  methods: {
    
  },
        
}

</script>


<style scoped>

    h1 {
        font-weight: 600;
        font-size: 3.5rem;
        padding: 1rem 0;
    }

    h2 {
        font-weight: 400;
        font-size: 1.5rem;
    }
    
    h3 {

    }
    p {
        max-width: 90%;
        line-height: 150%;
        font-weight: 200;
        font-size: 1.2rem;

        margin-bottom: 1rem;
    }

    .textDiv {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 5rem;
        grid-area: textDiv;
    }

    .imges {
        grid-area: imges;
        display: flex;
        justify-self: center;
        align-self: flex-end;
        padding-bottom: 4rem;
    }

    .ct {
        grid-area: ct;
        color: #c7c7c7;
        width: fit-content;
        letter-spacing: 0.2rem;
        max-width: 100%;
        white-space: nowrap;

        animation-name: rightToLeft;
        animation-duration: 25s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;

        /* position: absolute; */
        /* bottom: 0.2rem; */

    }

    .textHolder {

        position: absolute;
        bottom: 0.2rem;
        width: 100vw;
        overflow: hidden;
    }

    @keyframes rightToLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-140.5%);
  }
}

    main {
        display: grid;
        grid-template-columns: 40% 50%;
        grid-template-rows: 100%;
        grid-template-areas: 
        "textDiv imges"
        "ct ct";
        justify-content: center;
        height: 100vh;
        width: 100vw;
    }

    button {
        background-color: white;
        padding: 1rem;
        border-radius: 2rem;
        border-style: solid;
        font-size: 1.2rem;
        border-color: #9bd4c0;
        width: 80%;
    }

    button:hover {
        background-color: #9bd4c0;
        color: white;
    }

    /* .bubble {
        background-color: #9bd4c0;
        width: 40rem;
        height: 40rem;
        border-radius: 30rem 0 0 0;
    } */

    .easeInSlow {
        animation: easein 2s linear backwards;
    }

    .easeIn {
        animation: easein 1s linear backwards;
    }

    @keyframes easein {
  0% {
    opacity: 0;
  }
}

</style>
