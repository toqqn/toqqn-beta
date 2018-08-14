<template>
  <div id="wms-sidebar">
    <toqqn-search></toqqn-search>
    <!-- <toqqn-hall-of-fame></toqqn-hall-of-fame>
    <toqqn-trending-communities></toqqn-trending-communities>
    <toqqn-news></toqqn-news>
    <toqqn-announcements></toqqn-announcements> -->
  </div>
</template>

<script>
import Search from '../sidebar/Search'
import HallOfFame from '../sidebar/HallOfFame'
import TrendingCommunities from '../sidebar/TrendingCommunities'
import News from '../sidebar/News.vue'
import Announcements from '../sidebar/Announcements'

export default {
  name: 'HomeSidebar',
  components: {
    'toqqnSearch': Search,
    'toqqnHallOfFame': HallOfFame,
    'toqqnTrendingCommunities': TrendingCommunities,
    'toqqnNews': News,
    'toqqnAnnouncements': Announcements
  }
}
</script>
