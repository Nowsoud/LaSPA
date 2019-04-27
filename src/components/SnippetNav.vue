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
            <router-link tag="button" to="/snippets/saying_no" type="button"
            class="list-group-item list-group-item-action d-flex justify-content-between">
              Saying No<span class="badge badge-primary">{{ sayingNoCount }}</span>
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
            <li class="list-group-item list-group-item-info py-0 pl-2" v-for="(collection, index) in customCollections" :key="index">
              <div class="d-inline-block">{{collection.name}}</div>
              
              <div class="float-right">
                <button class="btn btn-outline-danger" type="button" @click='removeCustomCollection(index)'>
                  <i class='fas fa-minus' style='color: red; font-size: 10px'></i>
                </button>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="col container-fluid">
        <router-view></router-view>
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
        newSnippetTopic: 'Topic',
        newSnippetBody: 'Body'
      }
    },

    computed: {

      ...mapGetters([
        'getRefToUserCustoms', 'getCurrentUser'
      ]),

      isUserSignedIn() {
        return !!this.getCurrentUser && !!this.getRefToUserCustoms
      }
      // customCollections() {
        // this.getReftoUserCustoms.get().then((snapshot) => {
        //   return snapshot.get('collections')
        // }).catch((err) => {
        //   alert(err.message)
        // })
      //   return ['test1', 'test2']
      // }
    },

    watch: {
      isUserSignedIn: function (value) {
        alert('watcher triggered')
        if (value) {
          // console.log("aaa" + this.getRefToUserCustoms)
          this.getRefToUserCustoms.get().then((snapshot) => {
            this.customCollections = snapshot.get('collections')
            console.log(this.customCollections)
          }).catch((err) => {
            alert(err.message)
          })
          // this.fetchCustomCollections
          // this.getRefToUserCustoms.onSnapshot(function (doc) {
          //   console.log(doc.get('collections'))
          //   this.customCollections = doc.get('collections')
          //   console.log(this.customCollections)
          // })
        } else {
          this.customCollections = []
          // unsubscribe()
        }
        // console.log(this.getRefToUserCustoms)
        // console.log(this.$store.state.refToUserCustoms)
        // console.log(value)
      }
    },

    created() {
      db.collection("Greetings").get().then(querySnapshot => {
            this.greetingsCount = querySnapshot.size
      })

      db.collection("saying_no").get().then(querySnapshot => {
            this.sayingNoCount = querySnapshot.size
      })

      this.fetchCustomCollections()
    },

    methods: {

      removeCustomCollection (index) {
        // console.log(this.customCollections[index].name)
        // var  = this.customCollections.filter(el => el!=this.customCollections[index])
        this.getRefToUserCustoms.update({
          collections: this.customCollections.filter(el => el!=this.customCollections[index])
        }).then(this.fetchCustomCollections())
      },

      addCustomCollection: function () {
        var kostyl = this
        var obj = { name: this.newCollectionName, count: 0 }
        this.getRefToUserCustoms.update({
          collections: [...this.customCollections, obj]
        }).then(function () {
          kostyl.customCollections.push(obj)
          // console.log(this)
          // Я хз почему но в этом месте this становится undefined при том что
          // я не использую arrow function. Пришлось на костылях
          // kostyl.getRefToUserCustoms.get().then(function (snapshot) {
          //   kostyl.customCollections = snapshot.get('collections')
          //   console.log(kostyl.customCollections)
          // }).catch((err) => {
          //   alert(err.message)
          // })
        })
      },

      fetchCustomCollections: function () {
        this.getRefToUserCustoms.get().then((snapshot) => {
          this.customCollections = snapshot.get('collections')
          // console.log(this.customCollections)
        }).catch((err) => {
          alert(err.message)
        })
      }
    }

    // watch: {
    //   newCollectionName() {
    //     console.log(this.newCollectionName)
    //   }
    // }
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
