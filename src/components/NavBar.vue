<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom py-0">
      <router-link class="navbar-brand" to="/snippets" tag="a">
        <img src="../assets/logo.png" alt="logo" class="logopicture">
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"/>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav nav nav-pills ml-auto mt-2 mt-lg-0">
          <router-link class="nav-item btn" to="/about" tag="li">About</router-link>
          <li class="nav-item btn" @click="signOut" v-if="isUserSignedIn">Sign out</li>
          <li
            class="nav-item btn"
            v-if="!isUserSignedIn"
            id="dropdownMenuButton"
            data-toggle="dropdown">
            <div>Sign in</div>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <ul class="nav nav-fill">
                <li class="nav-item">
                  <i class="fab fa-facebook" style="font-size:24px; color: blue;"/>
                </li>
                <li class="nav-item">
                  <i class="fab fa-google"
                     v-on:click="signInViaGoogle"
                     style="font-size:24px;color:red"/>
                </li>
                <li class="nav-item">
                  <i class="fab fa-github" style="font-size:24px"/>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  computed: {
    isUserSignedIn() {
      return !!this.$store.getters.getCurrentUser;
    }
  },

  methods: {
    signInViaGoogle: function() {
      this.$store.dispatch("signInViaGoogle");
    },

    signOut: function() {
      this.$store.dispatch("signUserOut");
    }
  }
};
</script>

<style>
.logopicture {
  height: 65px;
  width: auto;
}
</style>
