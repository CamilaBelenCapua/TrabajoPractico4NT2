<template>
  <div class="container-fluid">
    <div>
      <h1>Bienvenidos a VueJS CLI</h1>
      <br>
      <Formulario/>
    </div> 
  </div>
</template>

<script>

import Formulario from './components/Formulario/IndexFormulario.vue'

export default {
  name: 'App',
  components: {
    Formulario
   }
}
</script>

<style>
  h1 {
    color: rgb(255, 106, 0);    
  }
</style>
