<template>
  <div class="container-fluid">
    <div class="row occupy-parent">
      <!-- div with sidebar -->
      <div class="col-md-3">
        <div class="list-group mt-3">
          
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
          <!-- <i class='fas fa-plus' style='color: green' @click='addCustomCollection'></i> -->

          <ul class="list-group">
            <li v-if="!isUserSignedIn" class="list-group-item list-group-item-danger">Sign in to customize own snippets</li>
            <li class="list-group-item list-group-item-info p-0" v-for="(collection, index) in customCollections" :key="index">
              <router-link tag="div" :to="{ path: '/snippets/customs', query: { collection: collection }}" class="float-left w-75">
                {{collection.name}}
              </router-link>
              
              <div class="float-right w-25">
                <button class="btn btn-outline-danger py-0 w-100" type="button" @click='removeCustomCollection(index)'>
                  <i class='fas fa-minus' style='color: red; font-size: 10px'></i>
                </button>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="col container-fluid">
        <router-view style="height: 90vh;"/>
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
        customCollections: [],
        newCollectionName: "",
        greetingsCount: 0,
        sayingNoCount: 0,
      }
    },

    computed: {

      ...mapGetters([
        'getRefToUserCustoms', 'getCurrentUser'
      ]),

      isUserSignedIn() {
        return !!this.getCurrentUser && !!this.getRefToUserCustoms
      }
    },

    watch: {
      isUserSignedIn: function (value) {
        // alert('watcher triggered')
        if (value) {
          this.fetchCustomCollections()
        } else {
          this.customCollections = []
        }
      }
    },

    created() {
      db.collection("Greetings").get().then(querySnapshot => {
            this.greetingsCount = querySnapshot.size
      })

      db.collection("saying_no").get().then(querySnapshot => {
            this.sayingNoCount = querySnapshot.size
      })

      if (this.isUserSignedIn) {
        this.fetchCustomCollections()
      }
    },

    methods: {

      removeCustomCollection (index) {
        this.getRefToUserCustoms.update({
          collections: this.customCollections.filter(el => el!=this.customCollections[index])
        }).then(this.fetchCustomCollections())
      },

      addCustomCollection: function () {
        var obj = { name: this.newCollectionName, count: 0 }
        this.getRefToUserCustoms.update({
          collections: [...this.customCollections, obj]
        }).then(() => {
          this.fetchCustomCollections()
        })
      },

      fetchCustomCollections: function () {
        this.getRefToUserCustoms.get().then((snapshot) => {
          this.customCollections = snapshot.get('collections')
          //каждому объекту-коллекции добавляю метод toString()
          //чтобы, в адресной строке писалось его имя, а не 
          // [object Object]. Первое решение какое пришло в голову
          // Имя каждой коллекции должно быть уникальным
          // для каждого пользователя, иначе можно присамонить сатану
          this.customCollections.forEach(function(collection) {
            collection.toString = function() {
              return this.name
            }
          })
        }).catch((err) => {
          alert(err.message)
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
