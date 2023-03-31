<template>
    <div>
      <form id="Cadastro_cliente">
        <div class="form">
          <input name="Nome" type="text" placeholder="Nome" required>
        </div>

        <div v-on:click="set()" class="form">
          <input name="Tipo" type="radio" value="Dentista">
          <label for=""> Dentista </label>
          <input name="Tipo" type="radio" value="Clinica">
          <label for=""> Clínica </label>
        </div>

        <div class="form">
          <select name="Relacional" id="" required>
            <option value="">Selecione o colaborativo</option>
            <option value="" v-for="item in current" > {{ item.name }} </option>
          </select>
        </div>
        
        <div class="form">
          <input type="button" value="Cadastrar" class="btn">
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, toRaw } from 'vue';
    import { client, Relational } from '../Types/Clients_Register.ts'

    export default defineComponent({

      name: 'clientRegister',

      data() {
          return {
            clients: [] as client[],
            current: [] as client[],
          }
      },

      methods: {
        async get() {

          
        },
        
        set() {
          
          let clientes = toRaw(this.clients);
          let i: number = -1;
          this.current = [];

          let form: any = document.getElementById('Cadastro_cliente');
          if(form.elements.namedItem('Tipo').value == 'Dentista') {
            i = 2;
          } else if(form.elements.namedItem('Tipo').value == 'Clinica') {
            i = 1;
          }

          if(i == -1 ) {
            alert('Selecione o tipo de cliente');
          } else {
            clientes.forEach((item:client) => {
              if (item.cod_categorie_client == i) {
                this.current.push(item);
              }
            })
          }

        },

      },

      async mounted() {

        

        let clientes:client[] = []
        let Relacional: number[] = []

        const url: any = "http://localhost:3000/Clients";
          const response: any = await fetch(url);
          const data: Promise<object> = response.json();
          data.then((k: any) => {
            k.forEach((item: client) => {
              clientes.push(item)
            });
          });

        const url2: any = "http://localhost:3000/Clients_Relational";
          const response2: any = await fetch(url2);
          const data2: Promise<object> = response2.json();
          data2.then((k: any) => {
            for(let i = 0; i < k.length; i++) {
              clientes.forEach((cliente: client, index: number) => {
                k.forEach((item: Relational) => {
                  if(cliente.id == item.cod_clients || cliente.id == item.cod_relational) {
                  console.log(clientes.splice(index, 1))
                  }
                })
              })
            }
          });
       
        this.clients = clientes

      }

      
    })

  </script>
  
  <style>
    .form {
      margin-bottom: 20px;
    }
  </style>