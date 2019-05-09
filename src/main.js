import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './routes.js'
import VueRouter from 'vue-router'
import "./firebaseInit.js"
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

//ДЕЛАЛ ПО ГАЙДУ НА СКРИМБЕ. ПОТОМ МОЖНО ВЫНЕСТИ store В ОТДЕЛЬНЫЙ ФАЙЛ
const store = new Vuex.Store({
  state: {
    currentUser: null
  },

  getters: {
    getCurrentUser: state => {
      return state.currentUser
    }
  },

  mutations: {
    setCurrentUser: (state, user) => {
      state.currentUser = user
    }
  },

  actions: {
    signInViaGoogle: ({commit}) => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        commit('setCurrentUser', user)
      })
      .catch((err) => {
        alert(err.message)
      });
    },

    signUserOut: ({commit}) => {
      firebase.auth().signOut()
      commit('setCurrentUser', null)
      alert('Succesfully signed out')
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
