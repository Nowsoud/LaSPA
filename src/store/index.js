import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      currentUser: null,
      //ссылка на документ с данными пользователя и его кастомными коллекциями
      refToUserCustoms: null,
      usersCustoms: null
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
      setUsersCustoms(state, array){
        state.usersCustoms = array
        // state.refToUserCustoms.get()
        // .then((snapshot) => {
        //   console.log(snapshot.get('collections'))
        //   // state.usersCustoms = snapshot.get('collections')
        //   state.usersCustoms = obj
        //   console.log(state.usersCustoms)
        // }).catch((err) => {
        //   alert(err.message)
        // })
        // setTimeout(function() { alert('123');}, 3000)
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

      updateUsersCustoms: function ({state, commit}) {
        state.refToUserCustoms.get()
        .then((snapshot) => {
          commit('setUsersCustoms', snapshot.get('collections'))
          // console.log(snapshot.get('collections'))
          // state.usersCustoms = snapshot.get('collections')
          // state.usersCustoms = obj
          // console.log(state.usersCustoms)
        }).catch((err) => {
          alert(err.message)
        })
      },

      signInViaGoogle: function () {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
          return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }).catch(()=>{});
      },
  
      signUserOut: ({commit}) => {
        firebase.auth().signOut()
        commit('setCurrentUser', null)
        commit('setRefToUserCustoms', null)
        commit('setUsersCustoms', null)
      }
    }
  })
  