<template>
  <main>
    <h1>{{ animal }}</h1>
    <div id="chat-container">
      <div class="scroll">
        <div class="test"></div>
        <div v-for="message in this.output_history">
          <p class="name"> You</p>
          <div class="chat-bubble user-bubble"> <p>{{message[0]}}</p></div>
          <p class="name">{{ animal }}</p>
          <div class="chat-bubble bot-bubble"> <p>{{message[1]}}</p></div>
        </div> 
        <p v-show="isGettingRespons == true" class="name"> You</p>
        <div v-show="isGettingRespons == true" class="chat-bubble user-bubble"> <p>{{input_message}}</p></div>
        <p v-show="isGettingRespons == true" class="name">{{ animal }}</p>
        <div v-show="isGettingRespons == true" class="chat-bubble user-bubble resonsbubble"> <div class="dots blink_me delay2"></div><div class="dots blink_me delay1"></div><div class="dots blink_me"></div></div>
        <div v-show="showErrorMessages == true" class="chat-bubble user-bubble errorbubble"> <p>{{errorMessage}}</p></div>
        <div id="anchor"></div>

      </div>
      <!-- Add more chat bubbles here -->
      <div id="input-container">
        <input id="input-field"          
        type="text"
        v-model="text"
        placeholder="Say hi!"
        @input="handleInput"
        @keyup.enter="sendMessage"
    />
        <button id="send-btn" @click= "sendMessage" >send</button>
      </div>
    </div>
  </main>
</template> 

<script>
import axios from "axios";

export default {
  name: "Chatbot",
  props: {
    animal: {
      type: String,
      default: "Capybara"
    }
  },
  data() {
    return {
      output_history: [],
      isGettingRespons: false,
      input_message: "",
      showErrorMessages: false,
      errorMessage: "",
      text: "",
      history: []
    }
  },
  methods: {
    handleInput(event) {
      this.input_message = event.target.value;
    },
    async sendMessage() {
      if (!this.text.trim()) return;
      this.showErrorMessages = false;
      this.isGettingRespons = true;
      this.input_message = this.text;
      const user_input = this.text;
      this.text = '';
      try {
        const completion = await this.chat(user_input);
        this.isGettingRespons = false;
        this.message = completion;
        this.$nextTick(() => {
          const anchor = document.getElementById("anchor");
          if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
        });
      } catch (err) {
        this.isGettingRespons = false;
        this.showErrorMessages = true;
        this.errorMessage = "Error contacting the chatbot.";
      }
    },
    async chat(user_input) {
      let bot_input = "you are still a " + this.animal + ", write answers with 2-3 sentences. " + user_input;
      const messages = [
        {
          role: "user",
          content: "for this conversation, you are a " + this.animal + " and an expert on your own species, do not say that you are an AI. Be informative about your specific species and the family of species that you belong to. write in a cute way. Keep answers to one to three sentences. Thank you!"
        }
      ];
      for (let [input_text, completion_text] of this.history) {
        messages.push({ role: "user", content: input_text });
        messages.push({ role: "user", content: completion_text });
      }
      messages.push({ role: "user", content: bot_input });

      try {
        const response = await axios.post("http://localhost:3001/api/chat", {
          messages: messages,
          animal: this.animal
        });
        let completion_text = response.data.completion;
        this.history.push([bot_input, completion_text]);
        this.output_history.push([user_input, completion_text]);
        return completion_text;
      } catch (error) {
        throw error;
      }
    }
  }
}
</script>

<style scoped>

.test {
  /* display: flex; */
  flex: 1 1 auto;
}


* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
    h1 {
        color:Black;
        text-align: center;
        padding-top: 6rem;

    }
    div.scroll {
        margin:4px, 4px;
        padding:4px;
        background-color: White;
        width: 100%;
        height: 70vh;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
  flex-direction: column;
        /* display: flex; */
        /* flex-direction: column-reverse; 'column' for start, 'column-reverse' for end */

        /* flex-direction: column;
        justify-content: end; */

    }

    #chat-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    
  }
  .chat-bubble {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    margin: 10px 0;
    max-width: 100%;
    padding: 10px;
    position: relative;
    text-align: left;
  }

  .user-bubble {
    align-self: flex-start;
    background-color: #dcf8c6;
  }

  #input-container {
    display: flex;
    margin-top: 20px;
  }
  #input-field {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 16px;
  }
  #send-btn {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  .name{
    font-size: 11px;
  }

  .resonsbubble {
    width: 10%;
    display: flex;
    justify-content: space-evenly;


  }

  .errorbubble {
    width: 100%;
    text-align: center;
    background-color: #f34f5d;
  }

  main {
  }

  .blink_me {
    animation: blinker 1.2s linear infinite;
}
.delay1 {
  animation-delay: 0.3s;

}

.delay2 {
  animation-delay: 0.5s;

}


.dots {
  width: 1rem;
  height: 1rem;
  background-color: rgb(214, 214, 214);
  border-radius: 50%;
}

@keyframes blinker {
  50% {
    opacity: 0.25;
  }
}

</style>