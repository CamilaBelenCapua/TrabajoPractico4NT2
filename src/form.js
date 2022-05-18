import Vue from 'vue'
import VueForm from 'vue-form'
import './form'

var options = {
    validators: {
        'no-espacios' : function(value) {
            return !value.includes(' ')
        }
    }
}

Vue.use(VueForm, options)