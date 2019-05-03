<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom py-0">
      <!-- <h3 class="navbar-brand">Snippets</h3> -->

      <router-link to="/">
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
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <router-link class="nav-item" to="/snippets" tag="li">
            <a>Snippets</a>
          </router-link>
          <router-link class="nav-item" to="/about" tag="li">
            <a>About</a>
          </router-link>
          <li class="nav-item">
            <a href="#" @click="signOut" v-if="isUserSignedIn">Sign out</a>
          </li>

          <div class="dropdown" v-if="!isUserSignedIn">
            <a class="dropdown-toggle"
            type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
              Sign in via
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <ul class="nav nav-fill">
                <li class="nav-item">
                  <i class='fab fa-facebook' style='font-size:24px; color: blue;'></i>
                </li>
                <li class="nav-item">
                  <i class='fab fa-google' v-on:click="signInViaGoogle" style='font-size:24px;color:red'></i>
                </li>
                <li class="nav-item">
                  <i class='fab fa-github' style='font-size:24px'></i>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },

    created() {
    },

    computed: {
      isUserSignedIn() {
        return !!this.$store.getters.getCurrentUser
      }
    },

    methods: {
      signInViaGoogle: function () {
        this.$store.dispatch('signInViaGoogle')
      },

      signOut: function () {
        this.$store.dispatch('signUserOut')
      }
    }
  }
</script>

<style>
.logopicture {
  height: 65px;
  width: auto;
}
</style>
