<template>
  <body>
    <router-view></router-view>
  </body>
</template>

<script lang="ts">
  import HambMenu from "./components/Menu.vue"
  import calendar from "./components/Calendar.vue"
  import postRegister from "./components/Post_register.vue"
  import clientRegister from "./components/Client_Register.vue"

  export default{
    components: {
      HambMenu,
      calendar,
      postRegister,
      clientRegister,
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap');


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 50;
    font-family: 'Comfortaa';
  }
  tabela {
    border-radius: 30px;
    width: 100vw;
    height: 100vh;
  }

  ::-webkit-scrollbar-track {
    background-color: #1e1e1e;
}
::-webkit-scrollbar {
    width: 6px;
    background: #0f0f0f;
}
::-webkit-scrollbar-thumb {
    background: #0c0c0c;
}
</style>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap" rel="stylesheet">