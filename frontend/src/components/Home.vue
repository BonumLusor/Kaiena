<template>
  <div class="container">
    <div class="grid-container">
      <div v-for="item in clients" class="client" v-bind:id="item.name">{{ item.name }}</div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { client } from '../Types/Clients_Register';
import { border } from '../Types/Home';
import axios from "axios";

export default defineComponent({

  name: 'Home',

  data() {
    return {
      clients: [] as client[],
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

          let border = "linear-gradient(45deg, "

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


})

</script>

<style>

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
  }

</style>