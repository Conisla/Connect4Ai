<script setup>
  import GameGrid from '../components/GameGrid.vue';
</script>


<template>
    
      <div v-if="!joined" class="login-container">
        <div class="name-container">
          <input type="text" class="user-name" v-model="currentUser" />
          <button class="join-button" v-on:click="join">Join</button>
        </div>
      </div>
  
      <div v-if="joined" class="parent-container-chat">
        <div class="chat-container">
          
          <div class="list-container">
            <div v-for="message in messages" :key="message.id">
              <b>
                {{ message.user }}
              </b>
              : {{ message.text }}
            </div>
          </div>
  
          <div class="text-input-container">
            <textarea
              v-model="text"
              class="text-message"
              v-on:keyup.enter="sendMessage"
            ></textarea>
          </div>
        </div>

        
        <div class="game-container ">
          <GameGrid/>
        </div>
  
        
      </div>

</template>
  
<script>
import io from 'socket.io-client';
export default {
    data(){
        return {
            joined : false,
            currentUser: "",
            text: "",
            messages: [],
        };
    },
    methods: {
        join(){
            this.joined = true;
            this.socketInstance = io('http://localhost:3000');

            this.socketInstance.on('message:received', (data) => {
                this.messages = this.messages.concat(data);
            })
        },
        sendMessage(){
            this.addMessage();
            // console.log(this.text);
            this.text = ""
            
        },
        addMessage() {
            const message = {
                id: new Date().getTime(),
                text: this.text,
                user: this.currentUser,
            };

            this.messages = this.messages.concat(message);

            this.socketInstance.emit('message', message);
        },
    },

    name: "ChatApp",
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  position: fixed;
  padding-top: 150px;
  width: 100%;
  height: 100%;
}

.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.parent-container-chat {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.game-container {
  flex: 80%;
  color: white;
  padding: 20px;
}

.chat-container {
  flex: 20%;
  background-color: #e74c3c;
  color: white;
}

.user-name {
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
}

.join-button {
  height: 30px;
  font-size: 20px;
}

.text-input-container {
  height: 90vh;
}

.text-message {
  left: 1px;
  width: 20%;
  position: absolute;
  bottom: 8px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>