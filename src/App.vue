<template>
  <div id="app">
    <NavBar/>
    <router-view/>
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
    return {}
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      var store = this.$store;
      if (user) {
        store.commit("setCurrentUser", user)

        firebase
          .firestore()
          .collection("customCollections")
          .doc(user.uid)
          .get()
          .then((docSnapshot) => {
            store.commit("setRefToUserCustoms", docSnapshot.ref)
            store.dispatch('updateUsersCustoms')
            if (!docSnapshot.exists) {
              docSnapshot.ref
                .set({userEmail: user.email,
                      userID: user.uid, 
                      collections: []})
                .then(() => console.log("empty collections for new user was created"))
            }
          })
          .catch(err => console.error(err.message));
      }
    });
  }
};
</script>
