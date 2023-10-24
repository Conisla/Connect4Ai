<template>
    <div class="container">
      <div v-if="!joined" class="parent-container">
        <div class="name-container">
          <input type="text" class="user-name" v-model="currentUser" />
          <button class="join-button" v-on:click="join">Join</button>
        </div>
      </div>
  
      <div v-if="joined" class="parent-container-chat">
        <div class="div1">
          <h1>Div 1 (60%)</h1>
          <p>Ceci est le contenu de la première div.</p>
        </div>
  
        <div class="div2">
          <div class="list-container">
            <div v-for="message in messages" :key="message.id">
              <b>{{ message.user }}</b> : {{ message.text }}
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
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.parent-container {
  flex: 1;
  background-color: #e74c3c;
  color: white;
  padding: 20px;
}

.parent-container-chat {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.div1 {
  flex: 80%;
  background-color: #e74c3c;
  color: white;
  padding: 20px;
}

.div2 {
  flex: 20%;
  color: white;
  padding: 20px;
}

.chat-container {
  position: fixed;
  bottom: 20px; /* Ajustez la distance par rapport au bas */
  right: 20px; /* Ajustez la distance par rapport à la droite */
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
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
  height: 100vh;
}

.text-message {
  width: 50%;
  position: absolute;
  bottom: 0px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
}
</style>