<template>
  <body>
    <br>
    <div class="title">
      <h1> {{ currentMonth }} / {{ year }} </h1>
      <h3>{{ currentClient.name }}</h3> 
    </div>

    <div class="navButtons">
      <button v-on:click="pastMonth"> Último mês </button>
      <button v-on:click="nextMonth"> Próximo mês </button>  
    </div>

    <br>
    <div class="grid-container-header">
      <div class="calendar" v-for = "item in weekDaysName" :key="item.id">
        <div class="content">{{ item.day }}</div>
      </div>
    </div>
    <div class="grid-container" id="grid">
      <div class="day" v-for="item, index in month" v-on:click="cardToggle(item.monthDay)" :key="index"> 
        <div class="content"> {{ item.monthDay }}  </div>
      </div>
      <div class="day" v-for="n in (25 - month.length)" :key="n">
        <div class="content"></div>
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
import axios from "axios";
import { client, relationalData, relational } from '../Types/Clients_Register'

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
      date: new Date(),
      currentClient: {} as client,
      color: "" as string
    }
  },
  methods:{
    cardToggle(monthDay: number | null) {

      this.selected = monthDay;

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

    setTimeout(() => {
      document.getElementById("grid")!.style.backgroundImage = this.color
    }, 500)
    
  },

  async created() {


    try {

      const response = await axios.get(`http://localhost:3001/clients/${this.$route.params.id}`);

      this.currentClient = response.data.data

      console.log(this.currentClient)

    } catch (err) {

      

    } finally {

      if (this.currentClient.color != null) {

        let border = "linear-gradient(45deg, "

        const length = this.currentClient.color!.split(",").length
        border = "linear-gradient(45deg, "

        if (length != 1) {

          this.currentClient.color!.split(",").forEach((color, index) => {

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

          this.color = border

        }
        else {
          document.getElementById("grid")!.style.backgroundColor =  this.currentClient.color
        }

      }
      else  {
        this.color = "#fff"
        document.getElementById("grid")!.style.backgroundColor = this.color
      }
    }   
  }
  
  
})
</script>

<style scoped>

  

  #postInput {
    border: none;
    background-color: rgba(21, 21, 21, 0);
    height: 10vh;
  }

  body {
    background-color: #1e1e1e;
    color: white;
    height: 92vh;
    width: 100vw;
    overflow: hidden;
  }
  .calendar {
    border-bottom: solid 2px;
    border-color: transparent;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 1.5em;
  }
  .day {
    height: 100%;
    width: 100%;
    text-align: left;
    cursor: pointer;
    row-gap: 3px;
    column-gap: 3px;
  }

  div {
    margin: auto auto;
  }
  .grid-container {
    display: grid;
    border: 2px;
    border-color: transparent;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    row-gap: 4px;
    column-gap: 4px;
    height: 80%;
    width: 80%;
  }
  .grid-container-header {
    margin-top: -12px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
    row-gap: 4px;
    column-gap: 4px;
    width: 80%;
    background-clip: border-box;
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

  .title {
    display: flex;
    z-index: 10;
    margin-left: 7.5%;
    margin-bottom: -1vh;
  }

  .navButtons {
    margin-left: 7.5%;
    padding: 0;
    padding-bottom: -1vh;
  }

  .grid-container {
    background-clip: border-box;
  }

  .content {
    background-color: #1e1e1e;
    width: 100%;
    height: 100%;
    margin-top: 2px;
  }

</style>