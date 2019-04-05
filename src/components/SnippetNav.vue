<template>
  <div class="container-fluid fixed-height-to-bottom">
    <div class="row occupy-parent">
      <!-- div with sidebar -->
      <div class="col-md-3">
        <div class="list-group mt-3" @mouseleave="hoveredIndex = null">
          <button
            type="button"
            @mouseover="hoveredIndex = index"
            class="list-group-item list-group-item-action d-flex justify-content-between"
            :class="{active: index === indexOfSelectedTopic, 'list-group-item-primary': index === hoveredIndex && index !== indexOfSelectedTopic}"
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
      indexOfSelectedTopic: 0,
      hoveredIndex: null
    };
  }
};
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
