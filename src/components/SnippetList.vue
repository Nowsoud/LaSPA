<template>
  <div class="container-fluid">
    <div class="card mt-3" v-for="(snippet, index) in snippets" :key="index">
      <div class="card-body">
        <h5 class="card-title">{{snippet.snippet_description}}</h5>
        <!-- <h6 class="card-subtitle mb-2">Official greeting when you don't know name of a receiver</h6> -->
        <p class="card-text">{{snippet.snippet_text}}</p>
        <a href="#" class="card-link">Edit</a>
        <a href="#" class="card-link text-danger">Remove</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    snippets: Array
  },
  data() {
    return {};
  }
};
</script>
