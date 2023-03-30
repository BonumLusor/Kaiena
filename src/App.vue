<template>
  <cadastroCliente></cadastroCliente>
</template>

<script lang="ts">
  import tabela from "./components/Calendar.vue"
  import cadastroPost from "./components/Cadastro_post.vue"
  import cadastroCliente from "./components/Cadastro_cliente.vue"

  export default{
    components: {
      tabela,
      cadastroPost,
      cadastroCliente,
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
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
</style>
