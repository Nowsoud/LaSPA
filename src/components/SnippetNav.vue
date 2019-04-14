<template>
  <div class="container-fluid fixed-height-to-bottom">
    <div class="row occupy-parent">
      <!-- div with sidebar -->
      <div class="col-md-3">
        <div class="list-group mt-3">
            <router-link
            tag="button"
            to="/snippets/Greetings"
            type="button"
            class="list-group-item list-group-item-action d-flex justify-content-between">
              Greetings<span class="badge badge-primary"> {{ greetingsCount }}</span>
            </router-link>
            <router-link
            tag="button"
            to="/snippets/saying_no"
            type="button"
            class="list-group-item list-group-item-action d-flex justify-content-between">
              Saying No<span class="badge badge-primary">{{ sayingNoCount }}</span>
            </router-link>
        </div>
      </div>
      <div class="col container-fluid">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  export default {
    data() {
      return {
        greetingsCount: 0,
        sayingNoCount: 0
      }
    },

    created() {
      firebase.firestore().collection("Greetings").get().then(querySnapshot => {
            this.greetingsCount = querySnapshot.size
      })

      firebase.firestore().collection("saying_no").get().then(querySnapshot => {
            this.sayingNoCount = querySnapshot.size
      })
    }
  }
</script>

<style scoped>
  .fixed-height-to-bottom {
    position: absolute;
    top: 65px;
    bottom: 0px;
    left: 0;
    right: 0;
  }
  .occupy-parent {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .list-group-item:hover {
    cursor: pointer;
  }
</style>
