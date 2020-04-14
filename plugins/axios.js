import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

if (process.client) {
  Vue.use(VueAxios, axios)
}
