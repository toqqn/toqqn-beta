<template>
  <div id="app">
    <router-view v-if="hasLoadedData"/>
    <toqqn-loading-app v-if="!hasLoadedData"></toqqn-loading-app>
    <vue-progress-bar></vue-progress-bar>
    <toqqn-contactus></toqqn-contactus>
    <toqqn-signup-modal></toqqn-signup-modal>
    <toqqn-login-modal></toqqn-login-modal>
  </div>
</template>

<script>
import Contactus from '@/components/shared/Contactus.vue'
import ToqqnSignupModal from '@/components/auth/Signup'
import ToqqnLoginModal from '@/components/auth/Login'
import LoadingApp from '@/components/shared/LoadingApp.vue'

import toqqnResource from './helpers/toqqnResource'
import toqqnStorage from './helpers/storageService'

export default {
  name: 'App',
  components: {
    'toqqnSignupModal': ToqqnSignupModal,
    'toqqnLoginModal': ToqqnLoginModal,
    'toqqnContactus': Contactus,
    'toqqnLoadingApp': LoadingApp
  },
  computed: {
    hasLoadedData () {
      return this.$store.state.initialiseInfo
    }
  },
  beforeMount: function () {
    let basePath = this.$store.state.apiBasePath
    let initialiseApiUrl = basePath + '/users/initialise'
    if (!this.$store.state.initialiseInfo) {
      toqqnResource.post(initialiseApiUrl, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('initialiseSuccess', response.data)
          toqqnStorage.set('initialiseInfo', response.data)
        } else {
          this.$toaster.warning(response.message)
          toqqnStorage.delete('initialiseInfo')
          this.$store.dispatch('initialiseError', response.message)
        }
      }).catch(error => {
        this.$toaster.error(error)
        this.$store.dispatch('errorResponse', error)
        toqqnStorage.delete('initialiseInfo')
      })
    }
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
}
</script>
