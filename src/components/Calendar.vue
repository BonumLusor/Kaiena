<template>
  <body>
    <br>
    <h1> {{ mesName }} / {{ ano }}</h1>
    <h3>Cliente</h3>
    <button v-on:click="ultMes"> Último mês </button>
    <button v-on:click="proxMes"> Próximo mês </button>

    <br>
    <div class="grid-container-header">
      <div class="calendar" v-for = "item in semana" :key="item.id">
        {{ item.dia }}
      </div>  
    </div>
    <div class="grid-container">
      <div class="day" v-for="item in diasMes" v-on:click="selected = item.diaMes"> 
        <div> {{ item.diaMes }}  </div>
      </div>
    </div>
    <div class="card" v-if="selected">
      <div> {{ selected }} </div>
      <button v-on:click=" selected = null" id="close"> X </button>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mes } from '../Types/Calendar'

export default defineComponent({
  name: "tabela",
  data(){
    return{
      semana: [
        {dia: "Segunda", id: 1},
        {dia: "Terça", id: 2},
        {dia: "Quarta", id: 3},
        {dia: "Quinta", id: 4},
        {dia: "Sexta", id: 5},       
      ],
      diasMes: [] as mes[],
      selected: null as number | null,
      mes: 0 as number,
      mesName: null as string | null,
      ano: 0 as number,
      data: new Date()
    }
  },
  methods:{
    proxMes(){ 
      this.diasMes = []

      if (this.mes < 11) {
        this.mes++
        this.data.setDate(1)
        this.data.setMonth(this.mes)
      }
      else {
        this.mes = 0
        this.ano++
        this.data.setFullYear(this.ano)
        this.data.setMonth(this.mes)
      }

      if (this.mes == 0) this.mesName = "Janeiro"
      if (this.mes == 1) this.mesName = "Fevereiro"
      if (this.mes == 2) this.mesName = "Março"
      if (this.mes == 3) this.mesName = "Abril"
      if (this.mes == 4) this.mesName = "Maio"
      if (this.mes == 5) this.mesName = "Junho"
      if (this.mes == 6) this.mesName = "Julho"
      if (this.mes == 7) this.mesName = "Agosto"
      if (this.mes == 8) this.mesName = "Setembro"
      if (this.mes == 9) this.mesName = "Outubro"
      if (this.mes == 10) this.mesName = "Novembro"
      if (this.mes == 11) this.mesName = "Dezembro"

      let mesLength = 0
      if (this.mes == 0 || this.mes == 2 || this.mes == 4 || this.mes == 6 || this.mes == 7 || this.mes == 9 || this.mes == 11){
        mesLength = 31
      }
      if (this.mes == 3 || this.mes == 5 || this.mes == 8 || this.mes == 10 ){
        mesLength = 30
      }
      if (this.mes == 1){
        mesLength = 28
      }

      for (let i = 1; i <= mesLength; i++) {
      this.data.setDate(i)
      if (this.data.getDay() == 0 || this.data.getDay() == 6) continue
      let temp = {
        diaMes: this.data.getDate(),
        diaSemana: this.data.getDay()
      }
      this.diasMes.push(temp)
    }
    
    
      
      if (this.diasMes[0].diaSemana == 2){
        this.diasMes.unshift({diaMes: null, diaSemana: null})
      }
      if (this.diasMes[0].diaSemana == 3){
        this.diasMes.unshift({diaMes: null, diaSemana: null})
        this.diasMes.unshift({diaMes: null, diaSemana: null})
      }
      if (this.diasMes[0].diaSemana == 4){
        this.diasMes.unshift({diaMes: null, diaSemana: null})
        this.diasMes.unshift({diaMes: null, diaSemana: null})
        this.diasMes.unshift({diaMes: null, diaSemana: null})
      }
      if (this.diasMes[0].diaSemana == 5){
        this.diasMes.unshift({diaMes: null, diaSemana: null})
        this.diasMes.unshift({diaMes: null, diaSemana: null})
        this.diasMes.unshift({diaMes: null, diaSemana: null})
        this.diasMes.unshift({diaMes: null, diaSemana: null})
      }
    },
    ultMes() { 
      this.diasMes = []

      if (this.mes > 0) {
        this.mes--
        this.data.setDate(1)
        this.data.setMonth(this.mes)
      }
      else {
        this.mes = 11
        this.ano--
        this.data.setFullYear(this.ano)
        this.data.setMonth(this.mes)
      }

      if (this.mes == 0) this.mesName = "Janeiro"
      if (this.mes == 1) this.mesName = "Fevereiro"
      if (this.mes == 2) this.mesName = "Março"
      if (this.mes == 3) this.mesName = "Abril"
      if (this.mes == 4) this.mesName = "Maio"
      if (this.mes == 5) this.mesName = "Junho"
      if (this.mes == 6) this.mesName = "Julho"
      if (this.mes == 7) this.mesName = "Agosto"
      if (this.mes == 8) this.mesName = "Setembro"
      if (this.mes == 9) this.mesName = "Outubro"
      if (this.mes == 10) this.mesName = "Novembro"
      if (this.mes == 11) this.mesName = "Dezembro"

      let mesLength = 0
    if (this.mes == 0 || this.mes == 2 || this.mes == 4 || this.mes == 6 || this.mes == 7 || this.mes == 9 || this.mes == 11){
      mesLength = 31
    }
    if (this.mes == 3 || this.mes == 5 || this.mes == 8 || this.mes == 10 ){
      mesLength = 30
    }
    if (this.mes == 1){
      mesLength = 28
    }

      for (let i = 1; i <= mesLength; i++) {
      this.data.setDate(i)
      if (this.data.getDay() == 0 || this.data.getDay() == 6) continue
      let temp = {
        diaMes: this.data.getDate(),
        diaSemana: this.data.getDay()
      }
      this.diasMes.push(temp)
    }
    
    
    if (this.diasMes[0].diaSemana == 2){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
    if (this.diasMes[0].diaSemana == 3){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
    if (this.diasMes[0].diaSemana == 4){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
    if (this.diasMes[0].diaSemana == 5){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }

    
    }
  },
  beforeMount(){
    this.mes = this.data.getMonth()
      if (this.mes == 0) this.mesName = "Janeiro"
      if (this.mes == 1) this.mesName = "Fevereiro"
      if (this.mes == 2) this.mesName = "Março"
      if (this.mes == 3) this.mesName = "Abril"
      if (this.mes == 4) this.mesName = "Maio"
      if (this.mes == 5) this.mesName = "Junho"
      if (this.mes == 6) this.mesName = "Julho"
      if (this.mes == 7) this.mesName = "Agosto"
      if (this.mes == 8) this.mesName = "Setembro"
      if (this.mes == 9) this.mesName = "Outubro"
      if (this.mes == 10) this.mesName = "Novembro"
      if (this.mes == 11) this.mesName = "Dezembro"
    this.ano = this.data.getFullYear()
  },
  mounted(){  
    
    let mesLength = 0
    if (this.mes == 0 || this.mes == 2 || this.mes == 4 || this.mes == 6 || this.mes == 7 || this.mes == 9 || this.mes == 11){
      mesLength = 31
    }
    if (this.mes == 3 || this.mes == 5 || this.mes == 8|| this.mes == 10 ){
      mesLength = 30
    }
    if (this.mes == 1){
      mesLength = 28
    }

    for (let i = 1; i <= mesLength; i++) {
      this.data.setDate(i)
      if (this.data.getDay() == 0 || this.data.getDay() == 6) continue
      let temp = {
        diaMes: this.data.getDate(),
        diaSemana: this.data.getDay()
      }
      this.diasMes.push(temp)
    }
    
    if (this.diasMes[0].diaSemana == 2){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
    if (this.diasMes[0].diaSemana == 3){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
    if (this.diasMes[0].diaSemana == 4){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
    if (this.diasMes[0].diaSemana == 5){
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
      this.diasMes.unshift({diaMes: null, diaSemana: null})
    }
  },
  
})
</script>

<style scoped>

  

  #postInput {
    border: none;
    background-color: rgba(21, 21, 21, 0);
    height: 10vh;
  }

  body {
    background-color: rgba(21, 21, 21, 0.965);
    color: white;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .calendar {
    border-color: rgb(185, 185, 185);
    border-style: solid;
    height: 5vh;
    width: 15vw;
    text-align: center;
    font-size: 1.5em;

  }
  .day {
    border-color: rgb(185, 185, 185);
    border-style: solid;
    height: 15vh;
    width: 15vw;
    text-align: left;
    cursor: pointer
  }

  div {
    margin: auto auto;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    row-gap: 3px
  }
  .grid-container-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    gap: -5px -5px -5px -5px -5px;
  }

  .card {
    position: absolute;
    top: 10vh;
    left: 10vw;
    width: 80vw;
    height: 80vh;
    background-color: rgba(21, 21, 21, 1);
    color: white;
    z-index: 1000;
  }

  h1 {
    margin-left: 2.5vw
  }

  h3 {
    margin-left: 2.5vw
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

  #close {
    position: absolute;
    top: 0vh;
    left: 76vw;
    width: 10px;
    height: 10px;
  }

  button:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
  }
  #close:hover {
  color: rgb(120, 22, 22);
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
  }

</style>