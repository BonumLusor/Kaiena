<template>
  <div>
    <form id="Cadastro" @submit="submit">
      <div class="form">
        <input name="Nome" required>
        <label class="text-over" for="name">
          <span>Nome</span>
        </label>
      </div>
      <div class="form">
        <select name="Tipo" class="selector" required>
          <option value="">Tipo</option>
          <option v-for="item in types" :key="item.id"> {{ item.name }} </option>
        </select>
      </div>
      <div class="form checkbox">
        <input name="Dentista" type="checkbox" value="dentista">
        <label for=""> Dentista </label>
        <input name="Clínica" type="checkbox" value="Clinica">
        <label for=""> Clínica </label>
      </div>
      <div class="form">
        <input name="Descricao" type="text" placeholder="Descrição" required>
      </div>
      <div class="form">
        <button type="submit" class="btn"> Cadastrar </button>
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

  * {
    color: white;
  }

  .checkbox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .selector {
    appearance: none;
    font-size: 1.3rem;
    width: 100%;
    padding: 20px 5px 5px;
    border: none;
    background: transparent;
  }

  .form {
    color: white;
    overflow: hidden;
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #1a1a1a ;
  }

  input {
    font-size: 1.3rem;
    width: 100%;
    padding: 20px 5px 5px;
    border: none;
    background-color: #1a1a1a ;
  }


  .text-over {
    pointer-events: none;
    font-size: 1.3rem;
  }

  span {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 28px;
    transition: all 0.3s ease;
  }

  .text-over::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 100%;
    border-bottom: 3px solid #e0138c;
    transform: translateX(-100%);
    transition: all 0.3s ease;
  }

  input:focus + .text-over span,
  input:valid + .text-over span {
    transform: translateY(-150%);
    font-size: 14px;
    bottom: 10px;
    color: #e0138c;
  }

  input:focus + .text-over::after,
  input:valid + .text-over::after {
    transform: translateX(0%);
  }

  .btn {
    display: inline-block;
    padding: .75rem 1.25rem;
    border-radius: 10rem;
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: .15rem;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .btn:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent; 
    border-radius: 10rem;
    z-index: -2;
  }

  .btn:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #000; 
    transition: all .3s;
    border-radius: 10rem;
    z-index: -1;
  }

  .btn:hover {
    color: #fff;
  }

  .btn:hover:before {
    width: 100%;
  }

</style>