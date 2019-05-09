<template>
  <div id="app">
    <NavBar/>
    <router-view style="z-index:-1"/>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  export default {
    name: "app",
    components: {
      NavBar,
    },
    data() {
      return {}
    }
  }
</script>
