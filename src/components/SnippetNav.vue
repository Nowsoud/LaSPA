<template>
  <div class="container-fluid">
    <div class="row occupy-parent">
      <!-- div with sidebar -->
      <div class="col-md-3">
        <div class="list-group mt-5">
            <h5>General snippets</h5>
            <router-link
              tag="button" to="/snippets/Greetings" type="button"
              class="list-group-item list-group-item-action d-flex justify-content-between">
                Greetings
              <span class="badge badge-primary"> {{ greetingsCount }} </span>
            </router-link>

            <router-link
              tag="button" to="/snippets/saying_no" type="button"
              class="list-group-item list-group-item-action d-flex justify-content-between">
                Saying No
              <span class="badge badge-primary">{{ sayingNoCount }}</span>
            </router-link>

        </div>

        <div class="list-group mt-5">
          <h5>Custom snippets</h5>
          <div v-show="isUserSignedIn" class="input-group input-group-sm">
            <div class="input-group-prepend">
              <span class="input-group-text">Name</span>
            </div>
            <input type="text" v-model="newCollectionName" placeholder="New collection" class="form-control">
            <div class="input-group-append">
              <button class="btn btn-outline-success" type="button" @click='addCustomCollection'>
                <!-- иконки с w3c -->
                <i class='fas fa-plus' style='color: green'></i>
              </button>
            </div>
          </div>

          <ul class="list-group mt-3">
            <li v-if="!isUserSignedIn" class="list-group-item list-group-item-danger">Sign in to customize own snippets</li>
            <li class="list-group-item list-group-item-action" v-for="(collection, index) in customCollections" :key="index">
              <router-link tag="div" :to="{ path: '/snippets/customs', query: { collection: collection }}" class="float-left w-75">
                {{collection.name}}
              </router-link>
              <!-- I think we should add "remove collection" button to CustomSnippetList view -->
              
              <!--button class="btn btn-outline-danger" type="button" @click='removeCustomCollection(index)'>
                  <i class='fas fa-minus' style='color: red'></i>
              </button-->
            </li>
          </ul>
        </div>

      </div>
      <div class="col container-fluid">
        <router-view style="height: 100%"/>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '../firebaseInit.js';
  import { mapGetters } from 'vuex'
  
  export default {
    data() {
      return {
        newCollectionName: "",
        greetingsCount: 0,
        sayingNoCount: 0,
      }
    },

    computed: {
      customCollections() {
        return this.$store.state.usersCustoms
      },
      ...mapGetters([
        'getRefToUserCustoms', 'getCurrentUser'
      ]),
      isUserSignedIn() {
        return !!this.getCurrentUser && !!this.getRefToUserCustoms
      }
    },

    created() {
      
      db.collection("Greetings").get().then(querySnapshot => {
            this.greetingsCount = querySnapshot.size
      })

      db.collection("saying_no").get().then(querySnapshot => {
            this.sayingNoCount = querySnapshot.size
      })
      
    },

    methods: {
      addCustomCollection: function () {
        this.$store.dispatch("addCustomCollection",this.newCollectionName).then(() => {
          this.$store.dispatch('updateUsersCustoms')
        })
      }
    }
  }
</script>

<style scoped>
  .list-group-item:hover {
    cursor: pointer;
  }
</style>
