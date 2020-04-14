import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import cookies from 'cookie-universal-nuxt'

if (process.client) {
  Vue.use(VueAxios, axios)
}

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      showPopup: false,
      user: null,
      token: null
    },
    mutations: {
      popup (state) {
        state.showPopup = !state.showPopup
      },
      setUser (state, payload) {
        state.user = payload
      },
      setToken (state, payload) {
        state.token = payload
      }
    },
    actions: {
      login (state, { email, password }) {
        try {
          axios({
            method: 'post',
            url: 'http://10.0.2.120:3000/api/user/auth',
            data: {
              userEmail: email,
              userPasswordHash: password
            }
          })
            .then(response => {
              //   Cookies.set('uid', response.data.userId)
              this.$cookies.set('token', response.data.userToken, {
                //   Cookies.set('token', response.data.userToken, {
                path: '/',
                maxAge: 60 * 60 * 24 * 1
              })
              state.commit('setUser', response.data)
              // commit('setLoading', false)
              //   Cookies.set('token', 'value2');
              //   Cookies.set('logged', response.data.userToken)
              //   Cookies.set('uid', response.data.userId)
              //   location.href = '/admin'
            })
            .catch(error => {
              console.log(error)
              // let data = error.response.data;
              // this.errorsShow(data.message);
            })
        } catch (error) {
          // commit('setLoading', false)
          // commit('setError', error.message)
          throw error
        }
      }
    },
    getters: {
      user (state) {
        return state.user
      }
    }
  })

export default store
