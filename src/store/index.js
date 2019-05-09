import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
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
  