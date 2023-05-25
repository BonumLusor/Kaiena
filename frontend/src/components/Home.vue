<template>
  <div class="container">

    <div class="grid-container">
      <div v-for="item, index in clients" class="client" v-bind:id="item.name" :key="item.id" v-on:click="selected = index; cardToggle();">{{ item.name }}</div>
    </div>
    

    <div class="card" id="infoCard">
      <p v-if="selected != null">{{ clients[selected].name }}</p>
      <p v-if="selected != null">{{ clients[selected].city }}</p>
      <p v-if="selected != null">{{ clients[selected].color }}</p>
      <p v-if="selected != null && clients[selected].cod_categories_client == 2"> Dentista </p>
      <p v-else-if="selected != null && clients[selected].cod_categories_client == 1"> Clínica </p>
      <router-link v-if="selected != null" class="link" :to="{name: 'Calendar', params: {id:clients[selected].id}}" v-on:click="{store.commit('setStage', 'Calendar');}"> Ir para o cronograma </router-link>
      <button  id="close" v-on:click="selected = null; cardToggle()">&times;</button>
    </div>

  </div>
  
  

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { client } from '../Types/Clients_Register';
import { border } from '../Types/Home';
import axios from "axios";
import { useStore } from '../store/index';

export default defineComponent({

  setup() {
    const store = useStore()
    return { store }
  },

  name: 'Home',

  data() {
    return {
      clients: [] as client[],
      selected: null as number | null,
    }
  },

  async created() {


    try {

      const response = await axios.get("http://localhost:3001/clients");

      this.clients = response.data.data
    } catch (err) {

      console.log(err);

    } finally {

      this.clients.forEach((item) => {

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

            item.color = border

          }
      }
      setTimeout(() => {
        this.clients.forEach( (item) => {

          document.getElementById(item.name)!.style.borderImage = item.color!; 
          document.getElementById(item.name)!.style.borderImageSlice = "1";
          document.getElementById(item.name)!.style.borderImageWidth = "2px";

        })
      }, 0)
       
      })

    }
  },

  methods: {
  
    cardToggle(index = null) {

      let card: HTMLElement = document.getElementById("infoCard")!; 
      if (card?.classList.contains("active")) {
        card.classList.remove("active");
      }
      else {
        card?.classList.add("active");
        document.onkeydown = function(evt) {
          const event = evt || window.event;
          var isEscape = false;
          if ("key" in event) {
            isEscape = (event.key === "Escape" || event.key === "Esc");
          }
          if (isEscape) {
            card.classList.remove("active");
          } 
        };
      }

    }
  }

})

</script>

<style scoped>

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    row-gap: 3px;
    column-gap: 3px;
    height: 80%;
    width: 80%;
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
    height: 94vh;
    overflow: hidden;

  }

  .client {
    border: solid 1px;
    height: 100%;
    width: 100%;
    text-align: center;
    cursor: pointer;
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

</style>