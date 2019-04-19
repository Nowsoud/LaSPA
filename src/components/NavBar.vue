<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom">
      <!-- <h3 class="navbar-brand">Snippets</h3> -->

      <img src="../assets/logo.png" alt="logo" class="logopicture">
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
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<style>
.logopicture {
  height: 65px;
  width: auto;
}
</style>
