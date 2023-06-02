<template>
    <div class="container">

    <div class="register-card">

      <label class="switchBox">
        <div class="option"> Registrar Post</div>
        <div class="switch">
          <input type="checkbox" v-on:click="registerType = !registerType">
          <span class="slider round"></span>
        </div>
        <div class="option"> Registrar Cliente</div>
      </label>
      <br>

      <postRegister v-if="registerType"></postRegister>

      <clientRegister v-if="!registerType"></clientRegister>
      
    </div>

    </div>
  </template>
  
  <script lang="ts">
    import postRegister from "../components/Post_register.vue";
    import clientRegister from "../components/Client_Register.vue";
  
    export default{
      components: {
        postRegister,
        clientRegister
      },

      data(){
        return{
          registerType: true as boolean
        }
      },
      
    }
  
    
  </script>

  <style scoped>

  * {
    color: white;
  }

  .register-card {
    
    display: flex;
    align-items: center;
    width: 30%;
    height: 90%;
    padding: 2rem;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border: double 4px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background-image: linear-gradient(#1a1a1a, #1a1a1a), linear-gradient(45deg, #babdae 0% ,#d66928 20% ,#f8d281 40% ,#698616 60% ,#698616 80% ,#8d1a00 100% );
    overflow: scroll;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100vh;
    width: 100vw;
    color: white;
    background-color: #1e1e1e ;
  }
  
  .switch {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 60px;
  height: 34px;
}

.switchBox{
  display: flex;
  flex-direction: row;
  padding: 1rem;
}

.option {
  padding-top: 8px;
  margin-left: 5px;
  margin-right: 5px;
}

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #000;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  </style>