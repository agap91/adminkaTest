export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      //   commit('clearError')
      //   commit('setLoading', true)
      //   try {
      //     const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      //     commit('setUser', new User(user.uid))
      //     commit('setLoading', false)
      //   } catch (error) {
      //     commit('setLoading', false)
      //     commit('setError', error.message)
      //     throw error
      //   }
    },
    async loginUser ({ commit }, { email, password }) {
      try {
        const user = await function () {
          this.axios({
            method: 'post',
            url: 'http://10.0.2.120:3000/api/user/auth',
            data: {
              userEmail: email,
              userPasswordHash: password
            }
          })
            .then(response => {
                alert(3333);
              commit('setUser', response.data)
              // commit('setLoading', false)
              //   Cookies.set('token', 'value2');
              //   Cookies.set('logged', response.data.userToken)
              //   Cookies.set('uid', response.data.userId)
              //   location.href = '/admin'
            })
            .catch(error => {
              console.log(error.response.data)
              // let data = error.response.data;
              // this.errorsShow(data.message);
            })
        }
      } catch (error) {
        // commit('setLoading', false)
        // commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({ commit }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({ commit }) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    },
    loginUser(state, user){
        alert(user)
    }
  }
}
