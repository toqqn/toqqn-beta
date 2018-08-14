<template>
    <!-- Single sidebar widget -->
    <div class="wms-sidebar-widget">
        <h3>Trending Communities</h3>
        <ul class="wms-hall-fame">
            <li v-for="community of getData.trendingCommunityList" :key="community.id">
                <div class="wms-single-feed wms-community-name">
                    <i class="fas fa-user-friends"></i>
                    <h4>{{community.name}}
                        <br>
                        <span>Active users:{{community.users}}</span>
                    </h4>
                </div>
                <div class="wms-single-feed">
                    <span>{{community.posts}}</span>
                    <p>Posts</p>
                </div>
                <div class="wms-single-feed">
                    <a href="#" class="wms-follow-btn">follow</a>
                </div>
            </li>
        </ul>
        <a href="#" class="wms-see-more-btn">see more</a>
    </div>
</template>

<script>
import toqqnResource from '../../helpers/toqqnResource'
export default {
  name: 'TrendingCommunities',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      let apiUrl = basePath + '/trendingCommunities'

      toqqnResource.get(apiUrl, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('trendingCommunitiesListSuccess', response.data.communities)
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
  mounted () {
    this.init()
  }
}
</script>
