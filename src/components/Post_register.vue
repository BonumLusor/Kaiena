<template>
  <div>
    <form id="Cadastro" @submit="submit">
      <div class="form">
        <input name="Nome" type="text" placeholder="Nome" required>
      </div>
      <div class="form">
        <select name="Tipo" id="" required>
          <option value="">Selecione o tipo</option>
          <option v-for="item in types" :key="item.id"> {{ item.name }} </option>
        </select>
      </div>
      <div class="form">
        <input name="Dentista" type="checkbox" value="dentista">
        <label for=""> Dentista </label>
        <input name="Clínica" type="checkbox" value="Clinica">
        <label for=""> Clínica </label>
      </div>
      <div class="form">
        <input name="Descricao" type="text" placeholder="Descrição" required>
      </div>
      <div class="form">
        <input type="submit" value="Cadastrar" class="btn">
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { type } from '../Types/Post_Register'

  export default defineComponent({

    name: 'postRegister',

    data() {
        return {
          types: [
            { id: 1, name: "Post simples" },
            { id: 2, name: "Reels" },
            { id: 3, name: "Carrossel" },
            { id: 4, name: "Carrossel animado" },
            { id: 5, name: "Stories" },
            { id: 6, name: "Destaque" },
            { id: 7, name: "Feed"}
          ] as type[]
        }
    },

    methods: {
      submit(e: Event) {
        e.preventDefault();
        let form = document.getElementById('Cadastro') as any;
        if (form.elements.namedItem('Dentista')?.checked || form.elements.namedItem('Clínica')?.checked) {
          var post = {
            nome: form.elements.namedItem('Nome')?.value,
            type: form.elements.namedItem('Tipo')?.value,
            dentista: form.elements.namedItem('Dentista')?.checked,
            clinica: form.elements.namedItem('Clínica')?.checked,
            descricao: form.elements.namedItem('Descricao')?.value,
          }
        } else {
          alert('Preencha todos os campos')
        }
      },
    }
  })
</script>

<style>
  .form {
    margin-bottom: 20px;
  }
</style>