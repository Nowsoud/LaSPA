<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div class="list-group mt-3">
          <button
            type="button"
            class="list-group-item list-group-item-action active d-flex justify-content-between"
          >
            Greetings
            <span class="badge badge-light badge-pill">14</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex justify-content-between"
          >
            Inquery
            <span class="badge badge-primary badge-pill">2</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action d-flex justify-content-between"
          >
            Ending
            <span class="badge badge-primary badge-pill">1</span>
          </button>
        </div>
      </div>
      <div class="col container-fluid">
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">{{ snippet_info.snippet_description }}</h5>
            <!-- <h6 class="card-subtitle mb-2">Official greeting when you don't know name of a receiver</h6> -->
            <p class="card-text">{{ snippet_info.snippet_text }}</p>
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
    snippet_info: Object
  }
};
</script>
