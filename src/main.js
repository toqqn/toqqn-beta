// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import VueProgressBar from 'vue-progressbar'
import interceptorsSetup from './helpers/interceptors'
import Paginate from 'vuejs-paginate'
import VuejsDialog from 'vuejs-dialog'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
Vue.use(Toaster, {timeout: 3000})
const options = {
  color: '#ff1701',
  failedColor: '#874b4b',
  thickness: '3px'
}
Vue.use(VueProgressBar, options)
interceptorsSetup()
Vue.component('paginate', Paginate)
Vue.use(VuejsDialog)

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

/* eslint-disable no-new */
export default new Vue({
  el: '#toqqn-app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
