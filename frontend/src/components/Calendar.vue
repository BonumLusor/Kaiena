<template>
  <body>
    <br>
    <h1> {{ currentMonth }} / {{ year }} </h1>
    
    <h3>Cliente</h3>
    <button v-on:click="pastMonth"> Último mês </button>
    <button v-on:click="nextMonth"> Próximo mês </button>

    <br>
    <div class="grid-container-header">
      <div class="calendar" v-for = "item in weekDaysName" :key="item.id">
        {{ item.day }}
      </div>  
    </div>
    <div class="grid-container">
      <div class="day" v-for="item in month" v-on:click="cardToggle(item.monthDay)"> 
        <div> {{ item.monthDay }}  </div>
      </div>
    </div>

      <div class="card" id="infoCard">
        <div> {{ selected }} </div>
        <button v-on:click=" selected = null; cardToggle(null)" id="close">&times;</button>
      </div>

  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { numberMonth } from '../Types/Calendar';
// import { promise } from '../../node_modules/mysql2'

export default defineComponent({
  name: "calendar",
  data(){
    return{
      weekDaysName: [
        {day: "Segunda", id: 1},
        {day: "Terça", id: 2},
        {day: "Quarta", id: 3},
        {day: "Quinta", id: 4},
        {day: "Sexta", id: 5},       
      ],
      month: [] as numberMonth[],
      selected: null as number | null,
      numberMonth: 0 as number,
      currentMonth: null as string | null,
      year: 0 as number,
      date: new Date()
    }
  },
  methods:{
    cardToggle(monthDay: number) {

      this.selected = monthDay;

      let card: HTMLElement = document.getElementById("infoCard")!;
      if (card?.classList.contains("active")) card.classList.remove("active");
      else card?.classList.add("active");
    },

    nextMonth(){ 
      this.month = []

      if (this.numberMonth < 11) {
        this.numberMonth++
        this.date.setDate(1)
        this.date.setMonth(this.numberMonth)
      }
      else {
        this.numberMonth = 0
        this.year++
        this.date.setFullYear(this.year)
        this.date.setMonth(this.numberMonth)
      }

      if (this.numberMonth == 0) this.currentMonth = "Janeiro"
      if (this.numberMonth == 1) this.currentMonth = "Fevereiro"
      if (this.numberMonth == 2) this.currentMonth = "Março"
      if (this.numberMonth == 3) this.currentMonth = "Abril"
      if (this.numberMonth == 4) this.currentMonth = "Maio"
      if (this.numberMonth == 5) this.currentMonth = "Junho"
      if (this.numberMonth == 6) this.currentMonth = "Julho"
      if (this.numberMonth == 7) this.currentMonth = "Agosto"
      if (this.numberMonth == 8) this.currentMonth = "Setembro"
      if (this.numberMonth == 9) this.currentMonth = "Outubro"
      if (this.numberMonth == 10) this.currentMonth = "Novembro"
      if (this.numberMonth == 11) this.currentMonth = "Dezembro"

      let monthLength = 0
      if (this.numberMonth == 0 || this.numberMonth == 2 || this.numberMonth == 4 || this.numberMonth == 6 || this.numberMonth == 7 || this.numberMonth == 9 || this.numberMonth == 11){
        monthLength = 31
      }
      if (this.numberMonth == 3 || this.numberMonth == 5 || this.numberMonth == 8 || this.numberMonth == 10 ){
        monthLength = 30
      }
      if (this.numberMonth == 1){
        monthLength = 28
      }

      for (let i = 1; i <= monthLength; i++) {
      this.date.setDate(i)
      if (this.date.getDay() == 0 || this.date.getDay() == 6) continue
      let temp = {
        monthDay: this.date.getDate(),
        weekDay: this.date.getDay()
      }
      this.month.push(temp)
    }
    
    
      
      if (this.month[0].weekDay == 2){
        this.month.unshift({monthDay: null, weekDay: null})
      }
      if (this.month[0].weekDay == 3){
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
      }
      if (this.month[0].weekDay == 4){
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
      }
      if (this.month[0].weekDay == 5){
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
      }
    },
    pastMonth() { 
      this.month = []

      if (this.numberMonth > 0) {
        this.numberMonth--
        this.date.setDate(1)
        this.date.setMonth(this.numberMonth)
      }
      else {
        this.numberMonth = 11
        this.year--
        this.date.setFullYear(this.year)
        this.date.setMonth(this.numberMonth)
      }

      if (this.numberMonth == 0) this.currentMonth = "Janeiro"
      if (this.numberMonth == 1) this.currentMonth = "Fevereiro"
      if (this.numberMonth == 2) this.currentMonth = "Março"
      if (this.numberMonth == 3) this.currentMonth = "Abril"
      if (this.numberMonth == 4) this.currentMonth = "Maio"
      if (this.numberMonth == 5) this.currentMonth = "Junho"
      if (this.numberMonth == 6) this.currentMonth = "Julho"
      if (this.numberMonth == 7) this.currentMonth = "Agosto"
      if (this.numberMonth == 8) this.currentMonth = "Setembro"
      if (this.numberMonth == 9) this.currentMonth = "Outubro"
      if (this.numberMonth == 10) this.currentMonth = "Novembro"
      if (this.numberMonth == 11) this.currentMonth = "Dezembro"

      let monthLength = 0
      if (this.numberMonth == 0 || this.numberMonth == 2 || this.numberMonth == 4 || this.numberMonth == 6 || this.numberMonth == 7 || this.numberMonth == 9 || this.numberMonth == 11){
        monthLength = 31
      }
      if (this.numberMonth == 3 || this.numberMonth == 5 || this.numberMonth == 8 || this.numberMonth == 10 ){
        monthLength = 30
      }
      if (this.numberMonth == 1){
        monthLength = 28
      }

        for (let i = 1; i <= monthLength; i++) {
        this.date.setDate(i)
        if (this.date.getDay() == 0 || this.date.getDay() == 6) continue
        let temp = {
          monthDay: this.date.getDate(),
          weekDay: this.date.getDay()
        }
        this.month.push(temp)
      }
      
      
      if (this.month[0].weekDay == 2){
        this.month.unshift({monthDay: null, weekDay: null})
      }
      if (this.month[0].weekDay == 3){
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
      }
      if (this.month[0].weekDay == 4){
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
      }
      if (this.month[0].weekDay == 5){
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
        this.month.unshift({monthDay: null, weekDay: null})
      }

    }
  },
  beforeMount(){
    this.numberMonth = this.date.getMonth()
      if (this.numberMonth == 0) this.currentMonth = "Janeiro"
      if (this.numberMonth == 1) this.currentMonth = "Fevereiro"
      if (this.numberMonth == 2) this.currentMonth = "Março"
      if (this.numberMonth == 3) this.currentMonth = "Abril"
      if (this.numberMonth == 4) this.currentMonth = "Maio"
      if (this.numberMonth == 5) this.currentMonth = "Junho"
      if (this.numberMonth == 6) this.currentMonth = "Julho"
      if (this.numberMonth == 7) this.currentMonth = "Agosto"
      if (this.numberMonth == 8) this.currentMonth = "Setembro"
      if (this.numberMonth == 9) this.currentMonth = "Outubro"
      if (this.numberMonth == 10) this.currentMonth = "Novembro"
      if (this.numberMonth == 11) this.currentMonth = "Dezembro"
    this.year = this.date.getFullYear()
  },
  mounted(){  
    
    let monthLength = 0
    if (this.numberMonth == 0 || this.numberMonth == 2 || this.numberMonth == 4 || this.numberMonth == 6 || this.numberMonth == 7 || this.numberMonth == 9 || this.numberMonth == 11){
      monthLength = 31
    }
    if (this.numberMonth == 3 || this.numberMonth == 5 || this.numberMonth == 8|| this.numberMonth == 10 ){
      monthLength = 30
    }
    if (this.numberMonth == 1){
      monthLength = 28
    }

    for (let i = 1; i <= monthLength; i++) {
      this.date.setDate(i)
      if (this.date.getDay() == 0 || this.date.getDay() == 6) continue
      let temp = {
        monthDay: this.date.getDate(),
        weekDay: this.date.getDay()
      }
      this.month.push(temp)
    }
    
    if (this.month[0].weekDay == 2){
      this.month.unshift({monthDay: null, weekDay: null})
    }
    if (this.month[0].weekDay == 3){
      this.month.unshift({monthDay: null, weekDay: null})
      this.month.unshift({monthDay: null, weekDay: null})
    }
    if (this.month[0].weekDay == 4){
      this.month.unshift({monthDay: null, weekDay: null})
      this.month.unshift({monthDay: null, weekDay: null})
      this.month.unshift({monthDay: null, weekDay: null})
    }
    if (this.month[0].weekDay == 5){
      this.month.unshift({monthDay: null, weekDay: null})
      this.month.unshift({monthDay: null, weekDay: null})
      this.month.unshift({monthDay: null, weekDay: null})
      this.month.unshift({monthDay: null, weekDay: null})
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
    border-bottom: none;
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

  h1 {
    margin-left: 2.5vw;
    margin-top: -15px;
    z-index: 2;
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
    font-size: 25px;
    font: bold;
    font-weight: 700;
    position: absolute;
    top: 0vh;
    left: 75vw;
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
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
  }

</style>