<template>
  
  <body>
  <button v-on:click="schedule"> Schedule </button>
    <br>
    <div class="title">
      <router-link to="/"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" style="fill:#ffffff; font-size: 26px; margin-left: 15px"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></router-link>
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
            <div class="postName" v-if="item.post && item.post.name.length < 50"> {{ item.post.name }} </div>
            <div class="postName" v-if="item.post && item.post.name.length >= 50"> {{ item.post.name.slice(0, 50) + "..." }} </div>
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

      switch (this.numberMonth) {
        case 0:
          this.currentMonth = "Janeiro";
          break;
        case 1:
          this.currentMonth = "Fevereiro";
          break;
        case 2:
          this.currentMonth = "Março";
          break;
        case 3:
          this.currentMonth = "Abril";
          break;
        case 4:
          this.currentMonth = "Maio";
          break;
        case 5:
          this.currentMonth = "Junho";
          break;
        case 6:
          this.currentMonth = "Julho";
          break;
        case 7:
          this.currentMonth = "Agosto";
          break;
        case 8:
          this.currentMonth = "Setembro";
          break;
        case 9:
          this.currentMonth = "Outubro";
          break;
        case 10:
          this.currentMonth = "Novembro";
          break;
        case 11:
          this.currentMonth = "Dezembro";
          break;
      }


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

      if(this.currentDay.getDate() > this.numberMonth ) this.pastDays();

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

      switch (this.numberMonth) {
        case 0:
          this.currentMonth = "Janeiro";
          break;
        case 1:
          this.currentMonth = "Fevereiro";
          break;
        case 2:
          this.currentMonth = "Março";
          break;
        case 3:
          this.currentMonth = "Abril";
          break;
        case 4:
          this.currentMonth = "Maio";
          break;
        case 5:
          this.currentMonth = "Junho";
          break;
        case 6:
          this.currentMonth = "Julho";
          break;
        case 7:
          this.currentMonth = "Agosto";
          break;
        case 8:
          this.currentMonth = "Setembro";
          break;
        case 9:
          this.currentMonth = "Outubro";
          break;
        case 10:
          this.currentMonth = "Novembro";
          break;
        case 11:
          this.currentMonth = "Dezembro";
          break;
      }

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

      if(this.currentDay.getDate() > this.numberMonth ) this.pastDays();
      

    },

    async pastDays() {

      let data

      try {

        const response2 = await axios.get(`http://Localhost:3001/calendar/${this.currentClient.id}/${this.numberMonth}/${this.year}`);
        const response3 = await axios.get('http://Localhost:3001/frequency_post');

        data = response2.data.data;
        this.frequency = response3.data.data;

      } catch {

      } finally {

        data.forEach((db: any) => {
          
          this.month.find((e:any) => e.monthDay == db.day)!.post = this.posts.find((e:any) => e.id == db.post)!

        })

        const end = performance.now()


      }

    },

    async schedule() {

      let lastType: any[] = []
      let typesFrequency: any
      const a = this

      try {
        const response = await axios.get('http://Localhost:3001/type_post')
        typesFrequency = response.data.data
      } catch (error: any) {
        console.log("erro:", error.message);
      }

      async function fazerRequisicoes() {
        for (const type of typesFrequency) {
          try {
            const response = await axios.get(`http://localhost:3001/calendar/${a.currentClient.id}/${type.id}`);
            lastType.push(response.data.data[0]);
          } catch (error: any) {
            console.log("erro:", error.message);
          }
        }
      }

      fazerRequisicoes()
        .then(() => {
          let post: post
          let ocupedDays: number[] = []
          
          function cadastrandoPosts(type: any, dia: number) {

            while (ocupedDays.includes(dia) || !a.month.find(Element => Element.monthDay == dia)) {
              dia ++    
            }

            let temp = lastType.find(element => element.type == type.type)
            a.posts.forEach((element: any) => {
              if (element.type == temp.type && element.category != temp.category) {
                post = element;
                return
              }
            });
            a.month.find(Element => Element.monthDay == dia)!.post = post
            lastType[lastType.findIndex(element => element.type == type.type)] = a.month.find(Element => Element.monthDay == dia)!.post

            ocupedDays.push(dia)
            

          }


          typesFrequency.forEach( (type:any) => {

            switch (type.frequency) {
              case "Semanalmente": 

                cadastrandoPosts( type, 1 );
                  
              break
              case "Quinzenal":

                cadastrandoPosts( type, 1 );
                cadastrandoPosts( type, 15 );

              break
              case "Mensalmente":

                cadastrandoPosts( type, 1 );

              break
              case "45 dias":

                console.log("45 dias")

              break
              case "Bimestralmente":

                const temp1 = lastType.find(element => element.type == type.type)!
                if(temp1 && temp1.month < this.numberMonth && temp1.year < this.year) cadastrandoPosts( type, temp1.day );

              break
              case "Anual":

                const temp2 = lastType.find(element => element.type == type.type)!
                if(temp2 && temp2.month == this.numberMonth && temp2.year < this.year) cadastrandoPosts( type, temp2.day );

              break
              case "6 vezes ao mês":

                cadastrandoPosts( type, 1 );
                cadastrandoPosts( type, 6 );
                cadastrandoPosts( type, 10 );
                cadastrandoPosts( type, 15 );
                cadastrandoPosts( type, 19 );
                cadastrandoPosts( type, 24 );

              break
              case "3 vezes ao mês":

                cadastrandoPosts( type, 1 );
                cadastrandoPosts( type, 9 );
                cadastrandoPosts( type, 18 );

              break
            }

          })

        }) 
        

      

      

      

    }
    
  },
  beforeMount(){
    this.numberMonth = this.date.getMonth()
    switch (this.numberMonth) {
      case 0:
        this.currentMonth = "Janeiro";
        break;
      case 1:
        this.currentMonth = "Fevereiro";
        break;
      case 2:
        this.currentMonth = "Março";
        break;
      case 3:
        this.currentMonth = "Abril";
        break;
      case 4:
        this.currentMonth = "Maio";
        break;
      case 5:
        this.currentMonth = "Junho";
        break;
      case 6:
        this.currentMonth = "Julho";
        break;
      case 7:
        this.currentMonth = "Agosto";
        break;
      case 8:
        this.currentMonth = "Setembro";
        break;
      case 9:
        this.currentMonth = "Outubro";
        break;
      case 10:
        this.currentMonth = "Novembro";
        break;
      case 11:
        this.currentMonth = "Dezembro";
        break;
    }

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
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
    }
    if (this.month[0].weekDay == 3){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
    }
    if (this.month[0].weekDay == 4){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
    }
    if (this.month[0].weekDay == 5){
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
      this.month.unshift({monthDay: null, weekDay: null, month: null, year: null, post: null})
    }
    
    if(this.currentDay.getDate() > this.numberMonth ) this.pastDays();

  },

  async created() {


    try {

      const response = await axios.get(`http://localhost:3001/clients/${this.$route.params.id}`);
      const response1 = await axios.get('http://Localhost:3001/long_post');

      this.posts = response1.data.data;

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