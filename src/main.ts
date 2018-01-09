import Vue from 'vue'
import App from '~/components/App.vue'
import store from '~/store'

import './assets/style/base.styl'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
