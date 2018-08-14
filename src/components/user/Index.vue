<template>
  <div>
    <toqqn-header></toqqn-header>
    <toqqn-profile-navigation></toqqn-profile-navigation>
    <main id="wms-main-content-wrapper" class="wms-container">
      <toqqn-profile-content></toqqn-profile-content>
      <toqqn-profile-sidebar></toqqn-profile-sidebar>
    </main>
    <toqqn-footer></toqqn-footer>
  </div>
</template>

<script>
import ToqqnHeader from '../shared/Header.vue'
import Navigation from './Navigation.vue'
import Content from './Content.vue'
import Sidebar from './Sidebar.vue'
import ToqqnFooter from '../shared/Footer.vue'

export default {
  name: 'Profile',
  components: {
    'toqqnHeader': ToqqnHeader,
    'toqqnFooter': ToqqnFooter,
    'toqqnProfileContent': Content,
    'toqqnProfileSidebar': Sidebar,
    'toqqnProfileNavigation': Navigation
  }
}
</script>
