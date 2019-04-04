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
        <SnippetList :snippets="snippets[indexOfSelectedTopic].snippets"/>
      </div>
    </div>
  </div>
</template>
<script>
import SnippetList from "./SnippetList.vue";
export default {
  components: {
    SnippetList
  },
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
