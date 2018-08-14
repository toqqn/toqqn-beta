<template>
    <!-- Single sidebar widget -->
    <div class="wms-sidebar-widget">
        <h3>Hall of Fame</h3>
        <ul class="wms-hall-fame">
            <li v-for="user of getData.hallOfFameList" :key="user.id">
                <div class="wms-single-feed">
                    <i class="fas fa-user-circle"></i>
                    <h4>{{user.name}}
                        <br>
                        <span>Rank:{{user.rank}}</span>
                    </h4>
                </div>
                <div class="wms-single-feed">
                    <span>{{user.toqqns}}</span>
                    <p>toqqns</p>
                </div>
                <div class="wms-single-feed">
                    <span>{{user.posts}}</span>
                    <p>Posts</p>
                </div>
                <div class="wms-single-feed wms-single-follow-feed">
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
  name: 'HallOfFame',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      let apiUrl = basePath + '/hallOfFame'

      toqqnResource.get(apiUrl, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('hallOfFameListSuccess', response.data.users)
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
