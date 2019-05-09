<template>
  <div id="app">
    <NavBar/>
    <router-view style="z-index:-1"/>
  </div>
</template>
<style>
#app {
  background-image: url("./assets/background.png");
  background-position: center center;
  background-size: contain;
  height: 100vh;
}
</style>

<script>
import NavBar from "./components/NavBar.vue";
import firebase from "firebase/app";
export default {
  name: "app",
  components: {
    NavBar
  },
  data() {
    return {};
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      var store = this.$store;
      if (user) {
        store.commit("setCurrentUser", user);

        firebase
          .firestore()
          .collection("customCollections")
          .doc(user.uid)
          .get()
          .then(function(docSnapshot) {
            store.commit("setRefToUserCustoms", docSnapshot.ref);
            store.commit('updateUsersCustoms')
            
            if (docSnapshot.exists) {
              console.log("doc exists, nothing to do");
            } else {
              console.log("doc doesnt exist");

              var newUserCustoms = {
                userEmail: user.email,
                userID: user.uid,
                collections: []
              };
              docSnapshot.ref.set(newUserCustoms).then(function() {
                console.log("data successfuly written");
              });
            }
            console.log(store.getters.getRefToUserCustoms.path);
          })
          .catch(err => {
            alert(err.message);
          });
      }
    });
  }
};
</script>
