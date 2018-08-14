<template>
    <div>
        <toqqn-header></toqqn-header>
        <toqqn-navigation></toqqn-navigation>
        <main id="wms-main-content-wrapper">
            <div class="wms-community-card-board" v-if="finishedLoading">
                <div class="wms-single-community-card">
                    <div class="wms-single-community-card-img">
                        <img v-bind:src="getData.basePath + getData.communityDetails.image" alt="img">
                    </div>
                    <div class="wms-single-community-card-content">
                        <h2>{{getData.communityDetails.name}}</h2>
                        <p>225K Subscribers</p>
                    </div>
                </div>
            </div>
            <toqqn-post-list ref="postList" @postListLoaded="postListLoaded"></toqqn-post-list>
            <toqqn-community-sidebar v-if="finishedLoading"></toqqn-community-sidebar>
        </main>
        <toqqn-create-post></toqqn-create-post>
        <toqqn-create-community></toqqn-create-community>
        <toqqn-footer></toqqn-footer>
  </div>
</template>

<script>
import ToqqnHeader from '../shared/Header'
import ToqqnFooter from '../shared/Footer'
import ToqqnNavigation from '../shared/Navigation'
import ToqqnPostList from '../posts/List'
import toqqnCommunitySidebar from './Sidebar'
import ToqqnCreatePost from '../posts/Create'
import ToqqnCreateCommunity from '../community/Create'
import toqqnResource from '../../helpers/toqqnResource'
export default {
  name: 'Community',
  props: ['id'],
  components: {
    'toqqnHeader': ToqqnHeader,
    'toqqnFooter': ToqqnFooter,
    'toqqnNavigation': ToqqnNavigation,
    'toqqnPostList': ToqqnPostList,
    'toqqnCommunitySidebar': toqqnCommunitySidebar,
    'toqqnCreatePost': ToqqnCreatePost,
    'toqqnCreateCommunity': ToqqnCreateCommunity
  },
  data () {
    return {
      loading: true,
      customActions: '',
      finishedLoading: false
    }
  },
  computed: {
    getData () {
      return this.$store.state
    }
  },
  created () {
    this.init()
  },
  watch: {
    '$route': 'getPageData'
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.customActions = {
        getCommunityInfo: {url: basePath + '/community/'},
        getPostList: {url: basePath + '/post/list'}
      }
    },
    getPageData: function () {
      this.$store.dispatch('communityDetails', '')
      this.$store.dispatch('postListSuccess', '')
      this.finishedLoading = false
      toqqnResource.get(this.customActions.getCommunityInfo.url + this.id, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('communityDetails', response.data)
          this.getPosts()
        } else {
          this.$toaster.warning(response.message)
          this.$store.dispatch('errorResponse', response.message)
        }
      }).catch(error => {
        this.$toaster.error(error)
        this.$store.dispatch('errorResponse', error)
      })
    },
    getPosts: function () {
      let postListComponent = this.$refs.postList
      postListComponent.loadPosts(1, this.id)
    },
    postListLoaded: function () {
      this.finishedLoading = true
    }
  },
  mounted () {
    this.getPageData()
  }
}
</script>
