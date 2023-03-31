<template>
    <div>
      <button class="btn-abrir" v-on:click="nav">&#9776;</button>
      <nav id="menu" class="fechado">        
        <div class="fechar" v-on:click="nav">&times;</div>
        <div class="navegar">
          <a> Cadastro Post </a> 
        </div>
        <div class="navegar">
          <a> Cadastro Cliente </a>
        </div>
	    </nav>
    </div>

   
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
  name: "HambMenu",
  data(){
    return {
      
    }
  },

  methods: {
    nav() {

      let nav: HTMLElement = document.getElementById("menu");

      if(nav?.classList.contains("active")){
        nav.classList.remove("active");
      }
      else {
        nav.classList.add("active");
      }

    }
  },

  mounted() {
    console.log("mounted")
  }
  
  })

</script>

<style scoped>

.navegar {
  display: flex;
  flex-direction: row;
  height: 15vh;
  width: 90%;
  cursor: pointer;
} 

a{
  text-decoration: none;
  margin: 7vh 0;
}

div.navegar:hover{
    color: whitesmoke;
    text-decoration: underline;
}

.btn-abrir{
  width: 4vw;
  height: 6vh;
  position: absolute;
  appearance: none;
  border: none;
  background-color: transparent;
  margin-left: 94%;
  color: white;
  font-size: 25px;
}
.btn-abrir:hover{
    background: white;
    color: #6b5d5d;
    opacity: 50%;
}

nav {
    position: absolute;
    background-color: rgba(21, 21, 21, 0.965);
    position: fixed;
    width: 100%;
    height: 50vh;
    top: -50vh;
    left: 0;
    z-index: 1;
    overflow: hidden;
    transform: translateY(-50vh);
    transition: all 0.5s;
    opacity: 100%;
    z-index: 20;
}

nav.active{
  transform: translateY(50vh);
  transition: all 0.4s;
}

nav div{
    color: white;
    font-size: 25px;
    padding: 12px 10px 12px 32px;
    margin-top: 10px;
}


  .fechar {
    font: bold;
    font-weight: 700;
    font-size: 30px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    margin-left: 94%;
  }
 .fechar:hover{
    font: bold;
    font-weight: 700;
    color: rgb(120, 22, 22);
    transform: translateY(-2px);
} 


</style>