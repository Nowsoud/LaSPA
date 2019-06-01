<template>
  <div class="container-fluid scrollable">
    <div class="my-3" v-for="(snippet, index) in snippets" :key="index">
      <SnippetItem :currentSnippet="snippet" :isGeneral=true></SnippetItem>
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
          this.snippets = querySnapshot.docs
        })
      }
    }
  };
</script>