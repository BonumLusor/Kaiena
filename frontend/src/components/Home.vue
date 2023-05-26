<template>
  <div class="container">

    <div class="grid-container">
      <div v-for="item, index in clients" class="client" v-bind:id="item.name" :key="item.id" v-on:click="modalToggle(index)">{{ item.name }}</div>
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
import Modal from './modal.vue';

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

          let border = "linear-gradient(0deg, "

          const length = item.color!.split(",").length
          border = "linear-gradient(45deg, "

          if (length != 1) {

            item.color!.split(",").forEach((color, index) => {

              let percent
              if (index == 0) percent = 0
              else if (index == length - 1) percent = 100
              else percent = index * Math.round(100/(length - 1))
              

              border += `${color} ${percent}% `

              if (index != length - 1) {
                border += ","
              }
              else {
                border += ")"
              }

            })

            console.log(border)
            setTimeout(() => {
              document.getElementById(item.name)!.style.borderImage = border; 
              document.getElementById(item.name)!.style.borderImageSlice = "1";
              document.getElementById(item.name)!.style.borderImageWidth = "3px";
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

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    row-gap: 3px;
    column-gap: 6px;
    width: 100%;
    height: fit-content;
    min-height: 100vh;
  }

  .container {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(21, 21, 21, 0.965);
    color: white;
    margin-top: 5vh ;
    padding: 0;
    margin: 0;
    height: fit-content;

  }

  .client {
    border: 6px;
    height: 12.5rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    position: absolute;
    top: 10vh;
    left: 10vw;
    width: 80vw;
    height: 80vh;
    background-color: rgba(21, 21, 21, 1);
    color: white;
    z-index: -11111;
    opacity: 0;
    transition: opacity 0.5s;
    transition-delay: z-index 1;
  }

  .card.active {
    opacity: 1;
    z-index: 10;
    transition: opacity 0.3s;
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