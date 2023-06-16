<template>
  
  <body>
    <br>
    <div class="title">
      <div id="name"> <h3>{{ currentClient.name }}</h3> </div>
      <div class="month"> 
        <h1> {{ currentMonth }} / {{ year }} </h1> 
        <div class="navButtons">
          <button v-on:click="pastMonth"> Último mês </button>
          <button v-on:click="nextMonth"> Próximo mês </button>  
        </div>
      </div>
      
    </div>

    <br>
    <div class="calendar">

      <div class="grid-container-header">
        <div class="weekDays" v-for = "item in weekDaysName" :key="item.id">
          <div class="content">{{ item.day }}</div>
        </div>
      </div>
      <div class="grid-container" id="grid">
        <div class="day" v-for="item, index in month" v-on:click="modalToggle(index)" :key="index"> 
          <div class="content"> 
            <div class="days" :class="{'today': (currentDay.getDate() == item.monthDay && currentDay.getMonth() == item.month && currentDay.getFullYear() == item.year)}"> {{ item.monthDay }} </div>
            <div class="postName" v-if="item.post"> {{ item.post.name }} </div>
            <div class="postCategory" v-if="item.post"> {{ item.post.category }} </div>
          </div>
        </div>
        <div class="day" v-for="n in (25 - month.length)" :key="n">
          <div class="content"></div>
        </div>
      </div>

    </div>

    <Modal v-if="showModal" @close="showModal = false">
      <template #header>
        <h3 v-if="selected != null && month[selected] != null">Dia {{ month[selected].monthDay }}</h3>
      </template>
        <p v-if="selected != null && month[selected] != null && month[selected].post != null"> Título: {{ month[selected].post.name }} </p>
        <br>
        <p v-if="selected != null && month[selected] != null && month[selected].post != null"> Tipo: {{ month[selected].post.type }} </p>
        <br>
        <p v-if="selected != null && month[selected] != null && month[selected].post != null && month[selected].post.link_curadoria"> Link curadoria: {{ month[selected].post?.link_curadoria }} </p>
        <br> 
        <p v-if="selected != null && month[selected] != null && month[selected].post != null"> {{ month[selected].post.category }} </p>
        <br>
        <p v-if="selected != null && month[selected] != null && month[selected].post != null"> Legenda: {{ month[selected].post.subtitle }} </p>
      <template #footer>
      </template>
    </Modal>

  </body>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { numberMonth, post } from '../Types/Calendar';
import axios from "axios";
import { client, relationalData, relational } from '../Types/Clients_Register'
import Modal from './partials/modal.vue';

export default defineComponent({
  name: "Calendar",
  
  setup() {
    const showModal = ref(false);
    return { showModal }
  },

  components: {
    Modal
  },

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
      currentDay: new Date(),
      frequency: [],
      posts: [] as post[],
    }
  },
  methods:{


    modalToggle(index: number) {

      if (this.month[index].monthDay == null) return

      this.selected = index;
    
      this.showModal = !this.showModal;

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
        weekDay: this.date.getDay(),
        month: this.date.getMonth(),
        year: this.date.getFullYear(),
        post: null
      }
      this.month.push(temp)
    }
    
    
      
      if (this.month[0].weekDay == 2){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }
      if (this.month[0].weekDay == 3){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }
      if (this.month[0].weekDay == 4){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }
      if (this.month[0].weekDay == 5){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
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
          weekDay: this.date.getDay(),
          month: this.date.getMonth(),
          year: this.date.getFullYear(), 
          post:null
        }
        this.month.push(temp)
      }
      
      
      if (this.month[0].weekDay == 2){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }
      if (this.month[0].weekDay == 3){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }
      if (this.month[0].weekDay == 4){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }
      if (this.month[0].weekDay == 5){
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
        this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      }

      this.schedule()
      

    },

    async schedule() {

      let data

      try {

        const response1 = await axios.get('http://Localhost:3001/long_post');
        const response2 = await axios.get(`http://Localhost:3001/calendar/${this.currentClient.id}/${this.numberMonth}/${this.year}`);
        const response3 = await axios.get('http://Localhost:3001/frequency_post');

        this.posts = response1.data.data;
        data = response2.data.data;
        this.frequency = response3.data.data;

      } catch {

      } finally {

        const init = performance.now()

        data.forEach((db: any) => {
          
          this.month.find((e:any) => e.monthDay == db.day)!.post = this.posts.find((e:any) => e.id == db.post)!

        })

        const end = performance.now()

        console.log(end - init)

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
        weekDay: this.date.getDay(),
        month: this.date.getMonth(),
        year: this.date.getFullYear(), 
        post:null
      }
      this.month.push(temp)
    }
    
    if (this.month[0].weekDay == 2){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
    }
    if (this.month[0].weekDay == 3){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
    }
    if (this.month[0].weekDay == 4){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
    }
    if (this.month[0].weekDay == 5){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post:null})
    }
    
    this.schedule()

  },

  async created() {


    try {

      const response = await axios.get(`http://localhost:3001/clients/${this.$route.params.id}`);

      this.currentClient = response.data.data


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

          
          document.getElementById("grid")!.style.backgroundImage = border
          document.getElementById("name")!.style.backgroundImage = border

        }
        else {
          document.getElementById("grid")!.style.backgroundColor =  this.currentClient.color
        }

      }
      else  {
        document.getElementById("grid")!.style.backgroundColor = "#fff";
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
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .weekDays {
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

  .calendar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin-top: -3.4rem;
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
    width: 100%
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
    width: 100%;
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
    width: 100vw;
    margin-top: 0px;
  }

  .navButtons {
    display: flex;
    margin-left: 7.5%;
    padding: 0;
    padding-bottom: -1vh;
  }


  .content {
    position: relative;
    background-color: #1e1e1e;
    width: 100%;
    height: 100%;
    margin-top: 2px;
  }

  .month {
    margin-left: 55vw;
    align-self: flex-end;
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 55rem;
    align-items: center;
  }

  #name {
    font-size: 1.5rem;
    background-clip: text;
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent;
    width: 40rem
  }

  .days {
    position: absolute;
    width: 30px;
    text-align: center;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;
    margin-top: 2px;
  }

  .today {
    border: 2px solid #fff;
  }

  .postName {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 90%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;
    margin-top: 2px;
    font-size: 0.8rem;
  }

  .postCategory {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 140%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;
    margin-top: 2px;
    font-size: 0.8rem;
  }

</style>