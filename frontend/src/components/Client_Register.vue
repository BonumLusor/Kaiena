<template>

    <div>
      <form id="Cadastro_cliente">
        <div class="form">
          <input name="Nome" required>
          <label class="text-over" for="name">
            <span>Nome</span>
          </label>
        </div>

        <div class="form">
            <input type="color" v-bind:name="'cor' + n" id="cCor" value="#0000FF" v-for="n, index in colors" :key="index">
            <button type="button" v-on:click="colors++">+</button>
            <button type="button" v-on:click="colors--">-</button>
        </div>
        
        <div class="form">
          <input v-bind:name="'city' + n" type="text"  required v-for="n in cities" :key="n">
          <label class="text-over" for="city">
            <span>Cidade</span>
          </label>
          <button type="button" v-on:click="cities++">+</button>
          <button type="button" v-on:click="cities--">-</button>
        </div>


        <div  class="form">
          <div v-for="item in categories" :key="item.id">
            <input name="Tipo" type="radio" :value="item.id" v-on:click="set(item.id)">
            <label for=""> {{item.category}} </label>
          </div>
        </div>

        <div  class="form">
            <input name="Tipo" type="radio" :value="2">
            <label for="Tipo"> 5 Dias </label>
            <input name="Tipo" type="radio" :value="2">
            <label for="Tipo"> 3 Dias </label>
        </div>

        <!-- <div class="form">
          <input name="monday" type="checkbox" value="monday">
            <label for=""> Segunda </label>
          <input name="tuesday" type="checkbox" value="tuesday">
            <label for=""> Terça </label>
          <input name="wednesday" type="checkbox" value="wednesday">
            <label for=""> Quarta </label>
          <input name="thursday" type="checkbox" value="thursday">
            <label for=""> Quinta </label>
          <input name="friday" type="checkbox" value="friday">
            <label for=""> Sexta </label>
        </div> -->

        <div class="form">
          <select name="Relacional" id="colaborated" class="selector">
            <option v-on:click="colaborated(0)">Sem colaborativo</option>
            <option v-for="item in current" v-bind:value="item.id" v-on:click="colaborated(1)" v-bind:key="item.id"> {{ item.name }} </option>
          </select>  
        </div>

        <div class="form disabled" v-if="related" id="relatedDay">
          <input name="relatedDay" type="radio" value="monday">
            <label for=""> Segunda </label>
          <input name="relatedDay" type="radio" value="tuesday">
            <label for=""> Terça </label>
          <input name="relatedDay" type="radio" value="wednesday">
            <label for=""> Quarta </label>
          <input name="relatedDay" type="radio" value="thursday">
            <label for=""> Quinta </label>
          <input name="relatedDay" type="radio" value="friday">
            <label for=""> Sexta </label>
        </div>
        
        <div class="form">
          <button type="submit" class="btn"> Cadastrar </button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, shallowRef } from 'vue';
    import { client, relationalData, relational, category } from '../Types/Clients_Register'
    import axios from "axios";

    export default defineComponent({

      name: 'clientRegister',

      data() {
          return {
            current: [] as client[],
            related: [] as number[],
            clients: [] as client[],
            cities: 1 as number,
            colors: 1 as number,
            categories: [] as category[]
          }
      },

      methods: {
        
        set(n:number) {

          this.current = (this.clients.filter((item:client) => item.cod_categories_client != n && !this.related.includes(item.id)))

        },

        colaborated(switcher: number) {

          const colaboratedDay = document.getElementById("relatedDay") as any;

          if(switcher != 0) {
            colaboratedDay.classList.remove("disabled")
            colaboratedDay.classList.add("enabled")
          } else {
            colaboratedDay.classList.add("disabled")
            colaboratedDay.classList.remove("enabled")
          }

        },

      },

      async created() {

        try {

          const response = await axios.get("http://localhost:3001/clients");

          this.clients = response.data.data
        } catch (err) {

          console.log(err);

        }

        try {

          const response = await axios.get("http://localhost:3001/clients_relational");
          response.data.data.forEach((item: relational) => {
            this.related.push(item.cod_clinic);
            this.related.push(item.cod_radiologist);
          });

        } catch (err) {

          console.log(err);

        }
        try {

          const response = await axios.get("http://localhost:3001/category_client");

          this.categories = response.data.data

        } catch (err) {

          console.log(err);

        }

       
        
      },

      mounted() {
        const form = document.getElementById("Cadastro_cliente") as any;
        
        form.addEventListener("submit", (e:any)=> {
          const form = document.getElementById("Cadastro_cliente") as any;
          
          let weekDays: string = "";
          let city = "";
          let colors = "";

          for(let i = 1; i <= this.colors; i++) {
            colors += form.elements.namedItem(`cor${i}`).value;
            if (i != this.colors) colors += ",";
          }

          for(let i = 1; i <= this.cities; i++) {
            city += form.elements.namedItem(`city${i}`).value;
            if (i != this.cities) city += ",";
          }

          if (form.elements.namedItem("monday")!.checked) {
            weekDays += form.elements.namedItem("monday")!.value;
          }
          if (form.elements.namedItem("tuesday")!.checked) {
            weekDays += "," + form.elements.namedItem("tuesday")!.value;
          }
          if (form.elements.namedItem("wednesday")!.checked) {
            weekDays += "," + form.elements.namedItem("wednesday")!.value;
          }
          if (form.elements.namedItem("thursday")!.checked) {
            weekDays += "," + form.elements.namedItem("thursday")!.value;
          }
          if (form.elements.namedItem("friday")!.checked) {
            weekDays += "," + form.elements.namedItem("friday")!.value;
          }
          let clientData = {

              name: form.elements.namedItem("Nome").value,
              cod_categories_client: form.elements.namedItem("Tipo").value,
              color: colors,
              city: city,
              week_days: weekDays,
          
          };

          let newID: number = this.clients.length + 1;

          let relationalData: relationalData

          if (form.elements.namedItem("Tipo").value == 1) {

            relationalData: relationalData = {
              cod_radiologist: parseInt(form.elements.namedItem("Relacional").value),
              cod_clinic: newID,
              related_day: form.elements.namedItem("relatedDay").value,
            };


          }
          else {
              
              relationalData: relationalData = {
                cod_radiologist: newID,
                cod_clinic: parseInt(form.elements.namedItem("Relacional").value),
                related_day: form.elements.namedItem("relatedDay").value,
              };

  
          }

          axios.post("http://localhost:3001/clients", clientData);
          if (relationalData.cod_radiologist && relationalData.cod_clinic) axios.post("http://localhost:3001/clients_relational", relationalData);
            
        })
      }
    })

  </script>
  
  <style>
    .form {
      margin-bottom: 20px;
    }

    .disabled {
      display: none;
    }

    .enabled {
      display: block;
    }


  </style>