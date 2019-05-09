import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      currentUser: null,
      //ссылка на документ с данными пользователя и его кастомными коллекциями
      refToUserCustoms: null
    },
  
    getters: {
      getCurrentUser: state => {
        return state.currentUser
      },
      getRefToUserCustoms: state => {
        return state.refToUserCustoms
      }
    },
  
    mutations: {
      setCurrentUser: (state, user) => {
        state.currentUser = user
      },

      setRefToUserCustoms (state, reference) {
        state.refToUserCustoms = reference
      }
    },
  
    actions: {
      signInViaGoogle: function ({getters, commit}) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
          return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }).catch(()=>{});
      },
  
      signUserOut: ({commit}) => {
        firebase.auth().signOut()
        commit('setCurrentUser', null)
        alert('Succesfully signed out')
      }
    }
  })
  