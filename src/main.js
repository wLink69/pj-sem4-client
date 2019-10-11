import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.config.productionTip = false
Vue.use( CKEditor );

Vue.mixin({
  data: function() {
    return {
      baseUrl: 'http://ada7665c.ngrok.io',
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
