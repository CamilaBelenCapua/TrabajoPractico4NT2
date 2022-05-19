<template>
  <section class="src-componentes-api-rest-ful">
    <div class="jumbotron">
      <h2 class="apiRest">Api Rest</h2>
      <hr>
      <hr>
      <br>

      <button class="btn btn-warning mr-2" @click="getPostsXHRpromise()">GET XHR PROMISE</button>
      <button style="margin-left: 10px" class="btn btn-success ml-3" @click="getUsuariosFetch()">GET FETCH</button>
      <button style="margin-left: 10px" class="btn btn-info ml-3" @click="getUsuariosAxios()">GET AXIOS</button>
      <button style="margin-left: 10px" class="btn btn-danger mr-3" @click="usuarios=[]">CLEAR</button>

      <div class="media alert alert-info" v-for="(usuario,index) in usuarios" :key="index">
          <div class="media-body ml-4">
              <h4 class="mt-0">
                <u>Usuario {{ index + 1 }} - ID: {{ usuario.id }}</u>
              </h4>
              <br>
              <p>Nombre: <b>{{ usuario.nombre }}</b></p>
              <p>Email: <i>{{ usuario.email }}</i></p>
              <p>Telefono: {{ usuario.telefono }}</p>

              <button class="btn btn-warning mr-3 mt-3" @click="putUsuario(usuario.id)">PUT</button>
              <button style="margin-left: 10px" class="btn btn-danger mt-3" @click="deleteUsuario(usuario.id)">DELETE</button>
          </div>
      </div>

    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-componentes-api-rest-ful',
    props: [],
    mounted () {
    },
    data () {
      return {
        url: 'https://628579bbf0e8f0bb7c04841e.mockapi.io/usuarios/',
        usuarios: []
      }
    },
    methods: {
          wrapperXHRpromise() {
        return new Promise((resolve,reject) => {
         
          const xhr = new XMLHttpRequest()
          xhr.open('get', this.url)

          xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
              let respuesta = JSON.parse(xhr.response)
              resolve(respuesta)
            }
            else {
              console.error('ERROR XHR cb (status)', xhr.status)
              let error = {
                title: 'ERROR XHR cb (status)',
                status: xhr.status
              }
              reject(error)
            }
          })
          xhr.addEventListener('error', e => {
              console.error('ERROR XHR cb (ajax)', e)
              let error = {
                title: 'ERROR XHR cb (ajax)',
                info: e
              }
              reject(error)
          })
          xhr.send()
        }
        )
      },  

      async getPostsXHRpromise() {
          try {
            let respuesta = await this.wrapperXHRpromise()
            this.usuarios = respuesta
          }
          catch(error) {
            console.error('Error XHRpromise', error)
          }
      },

      async getUsuariosFetch() {
          try {
          let response = await fetch(this.url)
          let respuesta = await response.json()
          this.usuarios = respuesta
          }
          catch(error) {
            console.error('Error Fetch', error)
          }
      },

      async getUsuariosAxios() {
       try {
          let { data } = await this.axios(this.url)
          this.usuarios = data
        }
        catch(error) {
          console.error('Error Axios', error)
        } 
      },

      async postUsuario() {
        let usuarioNew = {
          nombre: "Juan",
          direccion: "CABA 123",
          telefono: 12345521
        }

        try {
          let { data: usuario } = await this.axios.post(this.url, usuarioNew, {'content-type' : 'application/json'})
          console.log('AXIOS POST usuario', usuario)
          this.usuarios.push(usuario)
        }
        catch(error) {
          console.error('Error en postUsuario()', error.message)
        }
      },
      
      async putUsuario(id) {
        console.log('putUsuario', id)

        let usuarioUpdate = {
          nombre: "Ana",
          direccion: "CABA 456",
          telefono: 103904803
        }

        try {
          let { data: usuario } = await this.axios.put(this.url+id, usuarioUpdate, {'content-type' : 'application/json'})
          console.log('AXIOS PUT usuario', usuario)

          let index = this.usuarios.findIndex(user => user.id == usuario.id)
          if(index == -1) throw new Error('usuario no encontrado')
          this.usuarios.splice(index, 1, usuario)
        }
        catch(error) {
          console.error('Error en putUsuario()', error.message)
        }
      },

      async deleteUsuario(id) {
        console.log('deleteUsuario', id)

        try {
          let { data: usuario } = await this.axios.delete(this.url+id)
          console.log('AXIOS DELETE usuario', usuario)

          let index = this.usuarios.findIndex(user => user.id == usuario.id)
          if(index == -1) throw new Error('usuario no encontrado')
          this.usuarios.splice(index, 1)
        }
        catch(error) {
          console.error('Error en deleteUsuario()', error.message)
        }
      },            
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-componentes-api-rest-ful {

  }

  .jumbotron {
   
  }

  .apiRest{
    text-align: center;
    color:rgb(5, 94, 97);
}
</style>
