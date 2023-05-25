<template>
    <div>
      <nav id="menu">        
        <div class="option">
          <router-link class="link" to="/" id="Home" v-on:click="{store.commit('setStage', 'Home');}"> Home </router-link>
        </div>
        <div class="option" >
          <router-link class="link" to="/Register" id="Register" v-on:click="{store.commit('setStage', 'Register');}"> Cadastro </router-link>
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


  },

  mounted () {
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