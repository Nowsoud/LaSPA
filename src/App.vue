<template>
  <div id="app">
    <NavBar/>
    <SnippetViewer/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SnippetViewer from "./components/SnippetViewer.vue";

export default {
  name: "app",
  components: {
    NavBar,
    SnippetViewer
  }
};
</script>
