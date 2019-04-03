<template>
  <div class="container-fluid">
    <div class="row">
      <!-- div with sidebar -->
      <div class="col-md-3">
        <div class="list-group mt-3">
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex justify-content-between"
            :class="{active: index === indexOfSelectedTopic}"
            v-for="(snippet, index) in snippets"
            :key="index"
            @click="indexOfSelectedTopic = index"
          >
            {{snippet.snippet_theme}}
            <span
              class="badge badge-pill"
              :class="[index === indexOfSelectedTopic ? 'badge-light' : 'badge-primary']"
            >{{snippet.snippets_count}}</span>
          </button>
        </div>
      </div>
      <div class="col container-fluid">
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title"></h5>
            <!-- <h6 class="card-subtitle mb-2">Official greeting when you don't know name of a receiver</h6> -->
            <p class="card-text"></p>
            <a href="#" class="card-link">Edit</a>
            <a href="#" class="card-link text-danger">Remove</a>
          </div>
        </div>
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
    return {
      indexOfSelectedTopic: 0
    };
  }
};
</script>
