<template>
  <div class="container">

    <div class="grid-container">
      <div v-for="item, index in clients" class="client" v-bind:id="item.name" :key="item.id" v-on:click="modalToggle(index)">
        <p style="color:black" class="client-card">{{ item.name }}</p>
      </div>
      <router-link to="/register" class="client add addLink">
        +
      </router-link>
    </div>

    <div>

    <Modal v-if="showModal" @close="showModal = false">
      <template #header>
        <h3 v-if="selected != null">{{ clients[selected].name }}</h3>
      </template>
        <p v-if="selected != null && clients[selected].cod_categories_client == 2"> Dentista </p>
        <p v-else-if="selected != null && clients[selected].cod_categories_client == 1"> Clínica </p>
        <p v-if="selected != null">{{ clients[selected].city }}</p>
        <p v-if="selected != null">{{ clients[selected].color }}</p>
      <template #footer>
        <router-link v-if="selected != null" class="link" :to="{name: 'Calendar', params: {id:clients[selected].id}}" v-on:click="{store.commit('setStage', 'Calendar');}"> Ir para o cronograma </router-link>
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
    Modal
  },

  async created() {


    try {

      const response = await axios.get("http://localhost:3001/clients");

      this.clients = response.data.data
    } catch (err) {

      console.log(err);

    } finally {

      this.clients.forEach((item) => {

        let border: string

        if (item.color != null) {

          let border = ""
          let hover = ""

          const length = item.color!.split(",").length
          border = "linear-gradient(rgba(220, 220, 220, 1), rgba(220, 220, 220, 1)), linear-gradient(45deg, ";
          hover = "linear-gradient(white, white), linear-gradient(45deg, "

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

            console.log(item.name , border)
            setTimeout(() => {

              document.getElementById(item.name)!.style.backgroundOrigin = "border-box";
              document.getElementById(item.name)!.style.backgroundClip = "padding-box, border-box";
              document.getElementById(item.name)!.style.border = "double 4px transparent;";
              document.getElementById(item.name)!.style.borderRadius = "10px";
              document.getElementById(item.name)!.style.backgroundImage = border; 

              document.getElementById(item.name)!.addEventListener("mouseover", (event) => {

                document.getElementById(item.name)!.style.backgroundImage = hover; 

              });

              document.getElementById(item.name)!.addEventListener("mouseleave", (event) => {

                document.getElementById(item.name)!.style.backgroundImage = border; 

              });

            }, 0)
          }
          
        }
      
       
      })

    }
  },

  methods: {
  
    modalToggle(index: number | null  = null) {

      this.selected = index;

      this.showModal = !this.showModal;

    }
  }

})

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  @font-face {
    font-family: "Comfortaa" ;
    src: url(../../fontes/Comfortaa-Regular.ttf);
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

  .container {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(220, 220, 220, 1);
    color: black;
    margin-top: 5vh ;
    padding: 0;
    margin: 0;
    height: fit-content;
    scroll-behavior: #1e1e1e;

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



</style>