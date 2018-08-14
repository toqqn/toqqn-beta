<template>
  <header id="wms-header">
    <div class="wms-header-left">
      <!-- Start logo -->
      <div class="wms-logo-area">
        <!-- text based logo -->
        <!-- <router-link :to="'/'" class="wms-logo">toqqn</router-link> -->
        <!-- image based logo -->
        <router-link :to="'/'" class="wms-logo"><img src="static/images/toqqn-logo.jpg" alt="Logo" height="27">toqqn</router-link>
      </div>
      <!-- Start Communities Slider Area -->
      <div class="wms-communities-area">
        <toqqn-top-communities></toqqn-top-communities>
      </div>
    </div>
    <div class="wms-header-right" v-if="!getData.isLoggedIn">
      <a href="#" class="wms-primary-btn" data-toggle="modal" data-target="#signup"> Sign Up</a>
      <a href="#" class="wms-login-btn" data-toggle="modal" data-target="#loginmodal">Login</a>
    </div>
    <div class="wms-header-right" v-if="getData.isLoggedIn">
      <a href="#" class="wms-primary-btn" data-toggle="modal" data-target="#createPost"> Create a post</a>
      <div class="dropdown wms-user-area">
      <a href="#" class="wms-user-btn" id="dLabel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user-circle"></i></a>
        <div class="dropdown-menu" aria-labelledby="dLabel">
          <ul>
            <li class="username">{{userName}}</li>
            <li><router-link to = "/profile"><i class="fas fa-user-circle"></i>Profile</router-link></li>
            <li><a href="#"><i class="fas fa-cog"></i>Settings</a></li>
            <li><a href="#" v-on:click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import toqqnStorage from '../../helpers/storageService'
import toqqnResource from '../../helpers/toqqnResource'
import TopCommunities from './partials/TopCommunities.vue'

export default {
  name: 'Header',
  components: {
    'ToqqnTopCommunities': TopCommunities
  },
  computed: {
    getData () {
      return this.$store.state
    },
    userName () {
      return this.$store.state.userInfo.firstName + ' ' + this.$store.state.userInfo.lastName
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.logoutApiUrl = basePath + '/users/logout'
    },
    logout () {
      toqqnResource.post(this.logoutApiUrl, {}).then(response => {
        if (response.status) {
          this.$store.dispatch('logout')
          this.$toaster.success(response.message)
          toqqnStorage.delete('userInfo')
          this.$router.push({path: '/'})
        } else {
          this.$toaster.warning(response.message)
          this.$store.dispatch('errorResponse', response.message)
        }
      }).catch(error => {
        this.$toaster.error(error)
        this.$store.dispatch('errorResponse', error)
      })
    }
  },
  beforeMount: function () {
    this.init()
  }
}
</script>
