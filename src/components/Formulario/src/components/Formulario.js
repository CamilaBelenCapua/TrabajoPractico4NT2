export default {
    name: 'src-componentes-formulario',
    components: {},
    props: [],
    data () {
      return {
        formState : {},
        datos : this.getInicialData(),
        nombreMinLength : 5,
        nombreMaxLength : 15,
        edadMin: 18,
        edadMax: 120
      }
    },
    computed: {
  
    },
    mounted () {
  
    },
    methods: {
      getInicialData() {
        return {
          nombreCompleto: null,
          edad: null,
          email: null
        }
      },
      enviar() {
        console.log({...this.datos})
        this.datos = this.getInicialData()
        this.formState._reset()  
      }
    }
  }
  
  
  