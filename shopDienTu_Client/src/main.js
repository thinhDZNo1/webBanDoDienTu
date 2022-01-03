// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import { EmojiPickerPlugin } from 'vue-emoji-picker'

Vue.config.productionTip = false
Vue.use(EmojiPickerPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify,
  store,
})
