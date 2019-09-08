<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div class="container">
          <a class="navbar-brand" href="index.html">dirEngine.</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="oi oi-menu"></span> Menu
          </button>

          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav ml-auto">
              <li v-for="(value, key) in pages" v-bind:key="key" v-bind:class="currentPage==value ? 'active' : ''" class="nav-item"><a v-bind:href="'/'+value" class="nav-link">{{key}}</a></li>
              <li class="nav-item cta"><a href="contact.html" class="nav-link"><span>Add listing</span></a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      pages: {
        Home: '',
        Tour: 'tour',
        Car: 'car',
        Hotel: 'hotel',
        Flight: 'flight',
        About: 'about',
        Contact: 'contact'
      },
      currentPage: '',
    }
  },
  created: function() {
    var url = new URL(window.location).pathname;
    this.currentPage = url.split("/")[1];
  }
}
</script>
