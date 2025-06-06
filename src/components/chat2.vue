<template>
    <h1>Chat with {{ animal }}</h1>
  
    <div id="chat-container">
        <div class="scroll">
          <!-- Vue.js automatically updates the data property (text) with the input value, so you don't need the handleInput method -->
          <!-- message = array of two elements, message[0] = user's message & message[1] = bot's response -->
          <div v-for="message in chat_history">
            <p class="name"> you</p>
            <div class="chat-bubble user-bubble"> <p>{{message[0]}}</p></div>
            <p class="name">{{Animal}}</p>
            <div class="chat-bubble bot-bubble"> <p>{{message[1]}}</p></div>
          </div>
       </div>
  
      <!-- Add more chat bubbles here -->
      <div id="input-container">
        <input id="input-field"          
          type="text"
          v-model="text"
          placeholder="Say hi!"
          @keyup.enter="sendMessage"
        />
        <button id="send-btn" @click="sendMessage">send</button>
      </div>
    </div>
    </template> 
  
<script>
import axios from "axios";
export default {
  name: "Chatbot",
  props: ['animal'],
  data() {
      return {
          text: '',         // v-model for input
          chat_history: [], // Array of [user, bot] message pairs for display
          animal: this.animal ? this.animal : "Beetle"
      }
  },
  methods: {
      async sendMessage() {
        if(!this.text.trim()) return;
        const user_input = this.text.trim();
        this.text = "";

        // Prepare chat history for API call
        let messages = [
          {
            role: "user",
            content: "for this conversation, you are a " + this.animal + " from dalarna and an expert on your own species, do not say that you are an AI. Be informative about your specific species and the family of species that you belong to. write in a cute way. Keep answers to one to three sentences. Thank you!",
          }
        ];
        for (let [user, bot] of this.chat_history) {
          messages.push({ role: "user", content: user });
          messages.push({ role: "user", content: bot });
        }
        // Current user message
        let bot_input = "you are still a " + this.animal + " from dalarna, write answers with 2-3 sentences. " + user_input;
        messages.push({ role: "user", content: bot_input });

        try {
          const response = await axios.post("http://localhost:3001/api/chat", {
            messages: messages,
            animal: this.animal
          });
          let bot_response = response.data.completion;
          this.chat_history.push([user_input, bot_response]);
        } catch (error) {
          console.error(error);
        }
      }
  }
};
</script>
      
      <style>
      h1 {
          color:Black;
          text-align: center;
      }
      div.scroll {
          margin:4px, 4px;
          padding:4px;
          background-color: White;
          width: 100%;
          height: 70vh;
          overflow-x: hidden;
          overflow-y: auto;
      }
  
      #chat-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      height: 100vh;
      
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
  
  
  </style>
  
  
  <!-- <template>
    <div>
      <h1>Chat</h1>
      <input
        type="text"
        v-model="input_message"
        placeholder="send a message!"
      />
  
      <button @click="sendMessage">Send</button>
  
      <p>{{ message }}</p>
    </div>
  </template> -->