<template>
  <div class="container">

    <div class="grid-container">
      <div v-for="item, index in clients" class="client" v-bind:id="item.name" :key="item.id" v-on:click="modalToggle(index)">
        <p class="client-card">{{ item.name }}</p>
      </div>
      <router-link to="/register" class="client add addLink">
        +
      </router-link>
      
    </div>

    <div>

    <Modal v-if="showModal" @close="showModal = false">
      <template #header>
        <!-- <h3 v-if="selected != null">{{ clients[selected].name }}</h3> -->
      </template>
        <p v-if="selected != null && clients[selected].cod_categories_client == 2"> 
          {{ clients[selected].name }}
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" fill="#ffffff" /></svg>
        </p>
        <p v-else-if="selected != null && clients[selected].cod_categories_client == 1"> 
        {{ clients[selected].name }}
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M480 0c17.7 0 32 14.3 32 32H624c8.8 0 16 7.2 16 16V176c0 8.8-7.2 16-16 16H512V512H448V192 32c0-17.7 14.3-32 32-32zM276.8 39.7L416 159V512h1l-.2 0H96c-17.7 0-32-14.3-32-32V288H32c-13.4 0-25.4-8.3-30-20.9s-1-26.7 9.2-35.4l224-192c12-10.3 29.7-10.3 41.7 0zM224 208v48H176c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320h48c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H288V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16z" fill="#ffffff" /></svg>
        </p>
        <p contenteditable="true" id="city" v-if="selected != null">{{ clients[selected].city }}</p>
        <div v-if="selected != null && clients[selected].color != null && clients[selected] != null">
         <!--  <p contenteditable="true" id="color" v-for="color, index in clients[selected].color.split(",")">{{ color }}</p>  -->
        </div>
        <p v-if="selected != null"> 
          {{ clients[selected].color }}
        </p>
      <template #footer>
        <router-link v-if="selected != null" class="link button_calendar" :to="{name: 'Calendar', params: {id:clients[selected].id}}" v-on:click="{store.commit('setStage', 'Calendar');}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          Ir para o cronograma 
        </router-link>
      </template>
    </Modal>
  </div>

  </div>
  
  

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { client } from '../Types/Clients_Register';
import axios from "axios";
import { useStore } from '../store/index';
import Modal from './partials/modal.vue';

export default defineComponent({

  setup() {
    const store = useStore()
    const showModal = ref(false);
    return { store, showModal }
  },

  name: 'Home',

  data() {
    return {
      clients: [] as client[],
      selected: null as number | null,
    }
  },

  components: {
    Modal  },

  async mounted() {

    

    try {

      const response = await axios.get("http://localhost:3001/clients");

      this.clients = response.data.data
    } catch (err) {

      console.log(err);

    } finally {

      this.clients.forEach((item) => {

        console.log(item.name)

        let border: string

        if (item.color != null) {

          let border = ""
          let hover = ""

          const length = item.color!.split(",").length
          border = "linear-gradient(#1e1e1e, #1e1e1e), linear-gradient(45deg, ";
          hover = "linear-gradient(#080808, #080808), linear-gradient(45deg, "

          if (length != 1) {

            item.color!.split(",").forEach((color, index) => {

              let percent
              if (index == 0) percent = 0
              else if (index == length - 1) percent = 100
              else percent = index * Math.round(100/(length - 1))
              

              border += `${color} ${percent}% `
              hover += `${color} ${percent}% `

              if (index != length - 1) {
                border += ","
                hover += ","
              }
              else {
                border += ")"
                hover += ")"
              }

            })

            setTimeout(() => {

              const element = document.getElementById(item.name)!


              element.style.backgroundOrigin = "border-box";
              element.style.backgroundClip = "padding-box, border-box";
              element.style.border = "double 4px transparent;";
              element.style.borderRadius = "10px";
              element.style.backgroundImage = border; 

              element.addEventListener("mouseover", (event) => {

                element.style.backgroundImage = hover; 

              });

              element.addEventListener("mouseleave", (event) => {

                element.style.backgroundImage = border; 

              });

            }, 0)
          }
          
        }
      
       
      })

    }
  },

  

  methods: {
  
    modalToggle(index: number | null  = null) {
      
      if (this.showModal){

        const city = document.getElementById("city")!
        const color = document.getElementById("color")!

        
        if (city.innerText != this.clients[this.selected!].city || color.innerText != this.clients[this.selected!].color) {
          let clientData = {
            id: this.clients[this.selected!].id,
            city: city.innerText,
            color: color.innerText,
          }

          this.clients[this.selected!].city = city.innerText;
          this.clients[this.selected!].color = color.innerText;

          console.log(clientData)

          axios.put("http://localhost:3001/clients", clientData);
        }
        
      }

      this.selected = index;

      this.showModal = !this.showModal;

    },
  }

})

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap');

  @font-face {
    font-family: "Comfortaa" ;
    src: url(../../fontes/Comfortaa-Regular.ttf);
  }

  body {
    font-family: 'Comfortaa';
  }
  
  textarea {
    font-size: 1.3rem;
    width: 100%;
    border: none;
    background-color: #1a1a1a ;
    resize: initial;
    min-height: fit-content;
  }

  .grid-container {
    font-family: "Montserrat";
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    row-gap: 20px;
    column-gap: 20px;
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    padding: 3rem;
  }

  .client-card {
    
    font-size: 1.25rem;
    font-weight: 200; 	
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .client:hover {
    background-image: linear-gradient(#080808, #080808), linear-gradient(45deg, #ff0000, #ff0000);
    transition: 0.5s;
  }

  .container {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    color: white;
    margin-top: 5vh ;
    padding: 0;
    margin: 0;
    height: fit-content;
    scroll-behavior: #1e1e1e;
    font-family: "Comfortaa";
  }

  .client {
    border: 15px;
    height: 12.5rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: double 4px transparent;

    
  }

  #close {
    font-size: 25px;
    font: bold;
    font-weight: 700;
    position: absolute;
    top: 0vh;
    left: 75vw;
    width: 10px;
    height: 10px;
  }

  #close:hover {
  color: rgb(120, 22, 22);
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
  }

  button {
    margin-left: 2.5vw;
    appearance: none;
    background-color: transparent;
    border: 0px;
    border-radius: 15px;
    box-sizing: border-box;
    color: #3B3B3B;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    padding: 10px;
    padding-left: 0px;
  }

  button:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
  }

  .link {
    margin-left: 2.5vw;
    appearance: none;
    background-color: transparent;
    border: 0px;
    border-radius: 15px;
    box-sizing: border-box;
    color: #3B3B3B;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    padding: 10px;
    padding-left: 0px;
    text-decoration: none;
  }

  .add {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    border: solid 4px white
  }

  .addLink {
    text-decoration: none;
    color: white;
  }

  .button_calendar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    background-color: #a52a2a;
    color: white;
    padding: 1rem;
    border-radius: 1.5rem;
    height: 3rem;
    font-family: "Comfortaa";
    transition: 0.2s;
  }

  .button_calendar:hover {
    background-color: #952a2a;
  }

  p{
    padding-bottom: 5px;
  }

</style>