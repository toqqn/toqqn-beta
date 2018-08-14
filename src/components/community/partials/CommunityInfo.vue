<template>
    <div class="wms-sidebar-widget">
        <h3>Community Information</h3>
        <div class="wms-community-information-area">
            <ul class="wms-community-nav">
                <li>
                    <div class="media">
                        <i class="fas fa-user-friends align-self-start"></i>
                        <div class="media-body">
                        <h5 class="mt-0">{{getData.communityDetails.name}}</h5>
                        <span>{{getData.communityDetails.totalFollowers}} Subscribers</span>
                        <p>{{getData.postList.count}} Posts</p>
                        </div>
                    </div>
                </li>
            </ul>
            <p>{{getData.communityDetails.description}}</p>
            <div class="wms-community-follow-area">
                <a href="#" class="wms-primary-btn">Follow</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommunityInfo',
  computed: {
    getData () {
      return this.$store.state
    }
  }
}
</script>
