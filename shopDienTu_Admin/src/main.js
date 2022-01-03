// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
/* eslint-disable no-new */
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify,
  store,
})
