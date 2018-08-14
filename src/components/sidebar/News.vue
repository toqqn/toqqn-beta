<template>
    <!-- Single sidebar widget News-->
    <div class="wms-sidebar-widget">
        <h3>News</h3>
        <ul class="wms-news">
            <li v-for="news of getData.newsList" :key="news.postId">
                <img class="wms-news-img" src="static/images/post-img.jpeg" alt="img">
                <div class="wms-single-news-content">
                    <h4>{{news.title}}</h4>
                    <p>{{news.description}}</p>
                    <p class="wms-single-news-meta">Posted on {{news.postedOn}} by
                        <span>
                            <i class="fas fa-user-circle"></i>{{news.postedBy}}</span>
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
  name: 'News',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      let getNewsListApiUrl = basePath + '/toqqnNews?offset=1&limit=5'

      toqqnResource.get(getNewsListApiUrl, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('newsListSuccess', response.data.news)
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
