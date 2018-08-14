<template>
    <div class="wms-communities">
        <span>Top Communities</span>
        <ul class="wms-communities-slide">
        <li v-for="community of getData.communityList" :key="community.id">
            <router-link :to="`/community/${community.id}`">{{community.name}}</router-link>
        </li>
        </ul>
    </div>
</template>

<script>
// import toqqnStorage from '../../helpers/storageService'
import toqqnResource from '../../../helpers/toqqnResource'

export default {
  name: 'TopCommunities',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      let customActions = {
        getCommunityList: {url: basePath + '/community/list'}
      }
      toqqnResource.get(customActions.getCommunityList.url, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('communityListSuccess', response.data)
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
