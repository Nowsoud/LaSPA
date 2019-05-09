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
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        //логиним через гугл и если удалось то
        .then(function (user) {
          //сохраняем firebase.auth().currentUser в переменной currentUser
          commit('setCurrentUser', user)
          //надо сразу получить ссылку на его личный документ с кастомками
          //и записать в refToUserCustoms, если пользователь не новый
          //а если новый, то создать на серваке firestore новый документ,
          //получить на него ссылку и записать в refToUserCustoms
          //айдишник документа с кастомками для каждого пользователя такой же,
          //какой айдишник у этого пользователь в firebase.auth
          firebase.firestore().collection("customCollections").doc(user.user.uid).get().then(function(docSnapshot) {
            //DocumentReference.get() всегда возвразает DocumentSnapshot и если такого дока на серваке нет
            //то его поля будут пустые, а поле exists = false
            //поэтому ссылку приписываем сразу вне зависимости от того
            //существует документ для этого пользователя или нет
            commit('setRefToUserCustoms', docSnapshot.ref)
            if (docSnapshot.exists) {
              console.log('doc exists, nothing to do')
            } else {
              console.log('doc doesnt exist')
              //в документе пользователя храним его имейл, его айдишник
              //и коллекции с его кастомными снипетами
              var newUserCustoms = {
                userEmail: user.user.email,
                userID: user.user.uid,
                collections: []
              }
              //заливаем данные пользователя в его пустой документ
              docSnapshot.ref.set(newUserCustoms).then(function () {
                console.log('data successfuly written')
              })
            }
            console.log(getters.getRefToUserCustoms.path)
          }).catch((err) => {
            alert(err.message)
          })
        })
        .catch((err) => {
          alert(err.message)
        })
      },
  
      signUserOut: ({commit}) => {
        firebase.auth().signOut()
        commit('setCurrentUser', null)
        alert('Succesfully signed out')
      }
    }
  })
  