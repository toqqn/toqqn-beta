<template>
  <!-- Start Sidebar -->
  <div id="wms-sidebar">
    <toqqn-profile-widget></toqqn-profile-widget>
    <toqqn-following-widget></toqqn-following-widget>
    <toqqn-followers-widget></toqqn-followers-widget>
    <toqqn-communities-following-widget></toqqn-communities-following-widget>
  </div>
  <!-- End Sidebar -->
</template>

<script>
import ProfileWidget from './partials/ProfileWidget'
import FollowingWidget from './partials/FollowingWidget'
import FollowersWidget from './partials/FollowersWidget'
import CommunitiesFollowingWidget from './partials/CommunitiesFollowingWidget'

export default {
  name: 'ProfileSidebar',
  components: {
    'toqqnProfileWidget': ProfileWidget,
    'toqqnFollowingWidget': FollowingWidget,
    'toqqnFollowersWidget': FollowersWidget,
    'toqqnCommunitiesFollowingWidget': CommunitiesFollowingWidget
  }
}
</script>
