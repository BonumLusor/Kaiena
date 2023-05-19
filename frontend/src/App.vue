<template>
  <HambMenu></HambMenu>
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
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  tabela {
    width: 100vw;
    height: 100vh;
  }
  body {
    overflow: hidden;
  }
</style>
