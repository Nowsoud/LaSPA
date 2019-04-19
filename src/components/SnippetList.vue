<template>
  <div class="container-fluid scrollable">
    <div class="card my-3" v-for="snippet in snippets" :key="snippet.id">
      <SnippetItem :currentSnippet="snippet"></SnippetItem>
    </div>
  </div>
</template>

<script>
  import db from "../firebaseInit.js"
  import SnippetItem from "./SnippetItem.vue";
  export default {
    data() {
      return {
        snippets: []
      }
    },

    components: {
      SnippetItem
    },

    watch: {
      '$route.params.group': {
        immediate: true,
        handler: function(group) {
          this.fetchSnippetsFromCollection(group);
        }
      }
    },
    
    methods: {
      fetchSnippetsFromCollection(collectionName) {
        this.snippets = []
        db.collection(collectionName).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.snippets.push({
              topic: doc.get("topic"),
              body: doc.get("body").split("\\n").join("\n"),
              id: doc.id
            })
          })
        })
      }
    }
  };
</script>

<style scoped>
  .scrollable {
    position: absolute;
    height: 100%;
    overflow-y: scroll;
  }
</style>
