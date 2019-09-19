import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      baseUrl: 'http://d817fcd9.ngrok.io',
      token: '',
    }
  },
  created: function() {
    var match = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
    if (match) this.token = match[2];
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
