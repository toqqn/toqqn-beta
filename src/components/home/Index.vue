<template>
  <div>
    <toqqn-header></toqqn-header>
    <toqqn-navigation></toqqn-navigation>
    <main id="wms-main-content-wrapper">
      <toqqn-post-list ref="postList" @postListLoaded="postListLoaded"></toqqn-post-list>
      <toqqn-home-sidebar></toqqn-home-sidebar>
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
import ToqqnHomeSidebar from './Sidebar'
import ToqqnCreatePost from '../posts/Create'
import ToqqnCreateCommunity from '../community/Create'

export default {
  name: 'Home',
  components: {
    'toqqnHeader': ToqqnHeader,
    'toqqnFooter': ToqqnFooter,
    'toqqnNavigation': ToqqnNavigation,
    'toqqnPostList': ToqqnPostList,
    'toqqnHomeSidebar': ToqqnHomeSidebar,
    'toqqnCreatePost': ToqqnCreatePost,
    'toqqnCreateCommunity': ToqqnCreateCommunity
  },
  mounted () {
    this.$store.dispatch('postListSuccess', '')
    let postListComponent = this.$refs.postList
    postListComponent.loadPosts(1, 0)
  },
  methods: {
    postListLoaded: function () {
      this.finishedLoading = true
    }
  }
}
</script>
