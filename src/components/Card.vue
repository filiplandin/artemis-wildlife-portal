<template>
    <div
      class="Card"
      ref="card"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @dragstart.prevent
      :style="{
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
        transition: isDismissing ? 'transform 1.0s' : 'transform 1.0s',
      }"
      :class="{ dismissing: isDismissing }"
    >
      <img class="Card-img" :src="imageUrl" alt="Animal Image" />
        <div class="card-content">
        <h1>{{ animal }}</h1> 
        <!--<h3> Population: {{ user.population }}</h3>-->
        <!--<p>{{ user.location }}</p>
        <p>{{ user.text }}</p>--> <!-- add this line to display the text -->
        </div> 
    </div>
</template>

  
  
<script>
  export default {
    props: {
    animal: {
        type: String,
        required: true
        },
      onDismiss: Function,
      onLike: Function,
      onDislike: Function,
      openModal: Function,
      openChatModal: Function,
    },
    computed:{
        imageUrl(){
            return `https://source.unsplash.com/random/1000x1000?${this.animal}`;
        }
    },
  
    data() {
      return {
        startPoint: null,
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        isDismissing: false
      };
    },
  
    methods: {
      showModal(){
        this.$router.push('/Animals/' + this.animal);
      },

      showChatModal(){
        this.openChatModal(this.animal);
      },

      handleMouseDown(e) {
        const { clientX, clientY } = e;
        this.startPoint = { x: clientX, y: clientY };
        document.addEventListener('mousemove', this.handleMouseMove);
        this.$refs.card.style.transition = 'transform 0s';
      },
  
      handleMouseMove(e) {
        e.preventDefault();
        if (!this.startPoint) return;
        const { clientX, clientY } = e;
        this.offsetX = clientX - this.startPoint.x;
        this.offsetY = clientY - this.startPoint.y;
        this.rotate = this.offsetX * 0.1;
        if (Math.abs(this.offsetX) > this.$refs.card.clientWidth * 0.7) {
          this.dismiss(this.offsetX > 0 ? 1 : -1);
        }
      },
  
      handleMouseUp(e) {
        const { clientX, clientY } = e;
        this.offsetX = clientX - this.startPoint.x;
        this.offsetY = clientY - this.startPoint.y;
        if(this.offsetX < 0.1 && this.offsetY < 0.1){
          this.showModal();
        }
        this.startPoint = null;
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.$refs.card.style.transform = '';
      },
  
      dismiss(direction) {
        this.startPoint = null;
        document.removeEventListener('mouseup', this.handleMoveUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.$refs.card.style.transition = 'transform 1s';
        this.$refs.card.style.transform = `translate(${direction * window.innerWidth}px, ${this.offsetY}px) rotate(${90 * direction}deg)`;
        this.isDismissing = true;
        setTimeout(() => {
          this.$refs.card.remove();
        }, 1000);
        if (typeof this.onDismiss === 'function') {
          this.onDismiss();
        }
        if (typeof this.onLike === 'function' && direction === 1) {
          this.onLike();
          this.showChatModal();
          console.log(this.animal)
        }
        if (typeof this.onDislike === 'function' && direction === -1) {
          this.onDislike();
        }
      }
    }
  };
  </script>
    

<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}

.Card{
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  height: 70vh;
  margin: 20px;
  overflow: hidden;
  position: relative;
  transform: translateZ(calc(-30px * var(--i))) 
             translateY(calc(-20px * var(--i)))
             rotate(calc(-4deg * var(--i)));
  transition: transform 1.0s ease-in-out;
  width: calc(100%);
}

.Card-img{
width: 100%;
height: 70%;
object-fit: cover;
overflow: hidden;
background-size: cover;
  background-position: center;  
}

.card-content {
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  bottom: 0;
  box-sizing: border-box;
  color: #222222;
  height: 30%;
  padding: 20px;
  position: absolute;
  width: 100%;
}

.Card h2 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #dfd21b;
  background-color: rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
}

.Card:hover {
  transform: translateY(-10px);
}

.Card.swipe-left {
  transform: translateX(-100px);
}

.Card.swipe-right {
  transform: translateX(100%);
}

.Card.no-transition {
  transition: none;
}

.Card.swipe-left h2,
.Card.swipe-right h2 {
  transform: translateX(100%)
}
</style>
