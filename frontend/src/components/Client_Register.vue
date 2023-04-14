<template>
    <div>
      <form id="Cadastro_cliente">
        <div class="form">
          <input name="Nome" type="text" placeholder="Nome" required>
        </div>

        <div  class="form">
          <input name="Tipo" type="radio" value="2" v-on:click="set(2)">
          <label for=""> Dentista </label>
          <input name="Tipo" type="radio" value="1" v-on:click="set(1)">
          <label for=""> Clínica </label>
        </div>

        <div class="form">
          <select name="Relacional" id="" required>
            <option value="">Selecione o colaborativo</option>
            <option v-for="item in current" v-bind:value="item.id" v-bind:key="item.id"> {{ item.name }} </option>
          </select>  
        </div>
        
        <div class="form">
          <button type="submit" class="btn"> Cadastrar </button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from 'vue';
    import { client, relationalData } from '../Types/Clients_Register'
    import axios from "axios";

    export default defineComponent({

      name: 'clientRegister',

      data() {
          return {
            clients: [] as client[],
            current: [] as client[],
            relations: [] as any[],
          }
      },

      methods: {
        
        set(n:number) {

          console.log(this.relations.includes(this.clients[0].id), this.clients[0].name)
          
          this.current = this.clients.filter((item:client) => item.cod_categories_client != n && this.relations.includes(item.id) == false);

        },

      },

      async created() {
        try {

          const response = await axios.get("http://localhost:3000/clients");
          this.clients = response.data;

          } catch (err) {

          console.log(err);

        }

        try {

          const response = await axios.get("http://localhost:3000/clients_relational");
          response.data.forEach((item: any) => {
            this.relations.push(item.cod_clients);
            this.relations.push(item.cod_relational);
          })

        } catch (err) {

          console.log(err);

        }

        console.log(this.relations);
      },

      mounted() {
        const form = document.getElementById("Cadastro_cliente") as any;
        
        form.addEventListener("submit", (e:any)=> {
          e.preventDefault;
          let i: number;
          let clientData = {
            name: form.elements.namedItem("Nome").value,
            cod_categories_client: form.elements.namedItem("Tipo").value,
          };

          let newID: number = this.clients[this.clients.length - 1].id + 1

          let relationalData: relationalData

          if (form.elements.namedItem("Nome").value == 1) {

            relationalData: relationalData = {
              cod_clients: parseInt(form.elements.namedItem("Relacional").value),
              cod_relational: newID
            };


          }
          else {
              
              relationalData: relationalData = {
                cod_clients: newID,
                cod_relational: parseInt(form.elements.namedItem("Relacional").value)
              };

  
          }
          axios.post("http://localhost:3000/clients", clientData);
          axios.post("http://localhost:3000/clients_relational", relationalData); 
          console.log(relationalData)
            
        })
      }
    })

  </script>
  
  <style>
    .form {
      margin-bottom: 20px;
    }
  </style>