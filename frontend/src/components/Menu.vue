<template>
    <div>
      <nav id="menu">        
        <div class="option">
          <router-link class="link" to="/" id="Home" v-on:click="{store.commit('setStage', 'Home'); activePage()}"> Home </router-link>
        </div>
        <div class="option">
          <router-link class="link" to="/Calendar" id="Calendar" v-on:click="{store.commit('setStage', 'Calendar'); activePage()}"> Calendário </router-link>
        </div>
        <div class="option" >
          <router-link class="link" to="/Register" id="Register" v-on:click="{store.commit('setStage', 'Register'); activePage()}"> Cadastro </router-link>
        </div>
        
	    </nav>
    </div>

   
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from '../store/index';

  export default defineComponent({
  name: "HambMenu",

  setup() {
    const store = useStore()
    return { store }
  },

  data(){
    return {
    }
  },

  methods: {

    activePage() {
      if (this.store.state.stage == 'Register') {
        document.getElementById("Register")!.style.color = "green";
        document.getElementById("Calendar")!.style.color = "white";
        document.getElementById("Home")!.style.color = "white";
      }
      else if (this.store.state.stage == 'Calendar') {
        document.getElementById("Calendar")!.style.color = "green";
        document.getElementById("Register")!.style.color = "white";
        document.getElementById("Home")!.style.color = "white";
      }
      else if (this.store.state.stage == 'Home') {
        document.getElementById("Register")!.style.color = "white";
        document.getElementById("Home")!.style.color = "green";
        document.getElementById("Calendar")!.style.color = "white";

      }
    },

  },

  mounted () {
    this.activePage()
  }


  
  })

</script>

<style scoped>

.option {
  margin-top: -1vh;
  color: white;
  margin-bottom: 30px;
}

.link {
  text-decoration: none;
  color: white
}

div.option:hover{
    color: whitesmoke;
    text-decoration: underline;
}

nav {
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8vh;
  left: 0;
  opacity: 100%;
  z-index: 20;
  background-color: rgba(15, 15, 15, 1);
  padding-bottom: 20px;
}


nav div{
    color: white;
    font-size: 25px;
    padding: 12px 10px 12px 32px;
    margin-top: 10px;
}



</style>