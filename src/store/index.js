import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      currentUser: null,
      //ссылка на документ с данными пользователя и его кастомными коллекциями
      refToUserCustoms: null,
      usersCustoms:null
    },
  
    getters: {
      getCurrentUser: state => {
        return state.currentUser
      },
      getRefToUserCustoms: state => {
        return state.refToUserCustoms
      },
      getUsersCustoms: state => {
        return state.usersCustoms
      }
    },
  
    mutations: {
      setCurrentUser: (state, user) => {
        state.currentUser = user
      },

      setRefToUserCustoms (state, reference) {
        state.refToUserCustoms = reference
      },
      updateUsersCustoms(state){
        state.refToUserCustoms.get()
        .then((snapshot) => {
          state.usersCustoms = snapshot.get('collections')  
        }).catch((err) => {
          alert(err.message)
        })
      },
      removeCustomCollectionByName(state,name){
        return state.refToUserCustoms.update({
          collections: state.getters.getUsersCustoms().filter(el => el.name!=name)
        })
      },
      addCustomCollection: (state, newCollectionName)=>{
        var obj = { name: newCollectionName, count: 0 }
        return state.refToUserCustoms.update({
          collections: [...state.getters.getUsersCustoms, obj]
        })
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
      }
    }
  })
  