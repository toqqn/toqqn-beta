<template>
    <!-- Single sidebar widget Annoucements -->
    <div class="wms-sidebar-widget">
        <h3>Annoucements</h3>
        <ul class="wms-news">
            <li v-for="announcement of getData.announcementList" :key="announcement.postId">
                <img class="wms-news-img" src="static/images/post-img.jpeg" alt="img">
                <div class="wms-single-news-content">
                    <h4>{{announcement.title}}</h4>
                    <p>{{announcement.description}}</p>
                    <p class="wms-single-news-meta">Posted on {{announcement.postedOn}} by
                        <span>
                            <i class="fas fa-user-circle"></i>{{announcement.postedBy}}</span>
                    </p>
                </div>
            </li>
        </ul>
        <a href="#" class="wms-see-more-btn">see more</a>
    </div>
</template>

<script>
import toqqnResource from '../../helpers/toqqnResource'
export default {
  name: 'Announcements',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      let apiUrl = basePath + '/announcements?offset=1&limit=5'

      toqqnResource.get(apiUrl, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('announcementListSuccess', response.data.announcements)
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
