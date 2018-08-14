<template>
  <!-- Start main content -->
  <div id="wms-main-content-area">
    <!-- Start Single post content -->
    <div class="row" style="margin-left:0px;">
      <div class="wms-single-content" v-for="(post, index) of getData.postList.data" :key="post.id">
        <div class="wms-single-content-img" v-if="post.type!=='text' && post.type!=='link'">
          <a href="#" v-if="post.type ==='image'">
            <img v-bind:src="getData.basePath + post.mediaFile" alt="img" height="250">
          </a>
          <video v-if="post.type ==='video'" style="max-width:100%;" height="200" controls v-bind:src="getData.basePath + post.mediaFile">
            Your browser does not support HTML5 video.
          </video>
        </div>
        <div class="wms-single-content-description">
          <div class="wms-single-content-title">
            <h2> {{post.title | truncate(500)}}</h2>
            <p v-if="post.type==='link'"><a :href="post.link">{{post.link | truncate(90)}}</a></p>
            <span>{{new Date(post.createdAt).toString().replace(/GMT.*/g,"")}}</span>
            <p v-if="post.type !=='image' && post.type !=='video'">{{post.description | truncate(400)}}</p>
            <p v-if="post.type !=='image' && post.type !=='video'">&nbsp;</p>
          </div>
          <div class="wms-single-content-bottom">
            <ul class="wms-single-content-meta">
              <li class="wms-posted-tag">Posted at {{new Date(post.createdAt).toString().replace(/GMT.*/g,"")}} by</li>
              <li>&nbsp;
                <i class="fas fa-user-circle"></i>{{post.userName}}
                <a href="#" class="wms-seal" v-if="post.isUserFollowing">followed</a>
                <a href="#" v-if="!post.isUserFollowing">follow</a>
              </li>
              <li>&nbsp;
                <i class="fas fa-user-friends"></i>{{post.communityName | truncate(10)}}
                <a href="#" class="wms-seal" v-if="post.isCommunityFollowing">followed</a>
                <a href="#" v-if="!post.isCommunityFollowing">follow</a>
              </li>
            </ul>
            <div class="wms-single-content-footer">
              <ul>
                <!-- <li class="wms-list-view-show"><a href="#"><i class="fas fa-play-circle"></i></a></li> -->
                <li>
                  <i class="fas fa-thumbs-up"></i>
                  <span>{{post.likes}}</span>
                </li>
                <li>
                  <i class="fas fa-thumbs-down"></i>
                  <span>{{post.disLikes}}</span>
                </li>
                <li>
                  <i class="far fa-comment-alt"></i>
                  <span>{{post.comments}}</span>
                </li>
                <li class="wms-grid-view-show">
                  <a href="#">
                    <i class="fas fa-share-alt"></i>
                  </a>
                </li>
                <li class="wms-grid-view-show">
                  <a href="#">
                    <i class="fas fa-ellipsis-h"></i>
                  </a>
                </li>
                <li class="wms-list-view-show">
                  <a href="#">Share</a>
                </li>
                <li class="wms-list-view-show">
                  <a href="#">Save</a>
                </li>
                <li class="wms-list-view-show">
                  <a href="#">Report</a>
                </li>
                <li class="wms-list-view-show">
                  <a href="#">Hide</a>
                </li>
                <li class="wms-list-view-show">
                  <a href="#" @click="remove(post.id,index)">Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-center" v-if="!hasData && finishedLoading">No posts available!!</div>
    </div>
    <div class="row" style="float: right;margin-right: 5px;bottom: 0px;" v-if="getData.postList">
      <paginate v-if="getData.postList.noOfPages>1"
      :page-count="getData.postList.noOfPages"
      :container-class="'pagination'"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :click-handler="clickCallback">
      </paginate>
    </div>
  </div>
</template>

<script>
import toqqnResource from '../../helpers/toqqnResource'
export default {
  name: 'PostList',
  data: () => ({
    customActions: '',
    limit: 9,
    communityId: 0,
    finishedLoading: false
  }),
  computed: {
    getData () {
      return this.$store.state
    },
    hasData () {
      return this.$store.state.postList && this.$store.state.postList.data && this.$store.state.postList.data.length > 0
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.customActions = {
        getPostList: {url: basePath + '/post/list'},
        removePost: {url: basePath + '/post'}
      }
    },
    loadPosts: function (offset, communityId) {
      this.communityId = communityId
      let queyString = '?offset=' + offset + '&limit=' + this.limit + '&communityId=' + communityId
      toqqnResource.get(this.customActions.getPostList.url + queyString, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('postListSuccess', response)
        } else {
          this.$toaster.warning(response.message)
          this.$store.dispatch('errorResponse', response.message)
        }
        this.$emit('postListLoaded', true)
      }).catch(error => {
        this.$toaster.error(error)
        this.$store.dispatch('errorResponse', error)
        this.$emit('postListLoaded', true)
      })
    },
    remove (postId, index) {
      this.$dialog.confirm('Please confirm to continue').then(response => {
        toqqnResource.delete(this.customActions.removePost.url + '/' + postId, {}).then(response => {
          if (response.status) {
            this.$toaster.success(response.message)
            this.$store.dispatch('postDeleted', index)
          } else {
            this.$toaster.warning(response.message)
            this.$store.dispatch('errorResponse', response.message)
          }
        }).catch(error => {
          this.$toaster.error(error)
          this.$store.dispatch('errorResponse', error)
        })
      })
    },
    clickCallback (pageNum) {
      this.loadPosts(pageNum, this.communityId)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style>
ul.pagination {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #016da3;
}

ul.pagination li {
    float: left;
    list-style: none;
    font-size: 13px !important;
}

ul.pagination li a {
    display: block;
    color: white;
    text-align: center;
    padding: 5px;
    text-decoration: none;
}

ul.pagination li a:hover {
    background-color: #111111;
}
</style>
