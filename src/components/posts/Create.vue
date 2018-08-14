<template>
  <!-- Create Post Modal -->
  <div class="modal fade" id="createPost" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Create a Post</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="modalClose">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-pills mb-3 wms-create-post-nav" id="pills-tab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="pills-note-tab" @click="activeTab = 'note'" data-toggle="pill" href="#pills-note" role="tab" aria-controls="pills-note" aria-selected="true">
                <i class="fas fa-sticky-note"></i>Note</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-image-tab" @click="activeTab = 'media'" data-toggle="pill" href="#pills-image" role="tab" aria-controls="pills-image" aria-selected="false">
                <i class="fas fa-image"></i>Image/Video</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-link-tab" @click="activeTab = 'link'" data-toggle="pill" href="#pills-link" role="tab" aria-controls="pills-link" aria-selected="false">
                <i class="fas fa-link"></i>Link</a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <toqqn-link-post v-if="activeTab==='link'" @closeModal="closeModal"></toqqn-link-post>
            <toqqn-media-post v-if="activeTab==='media'" @closeModal="closeModal"></toqqn-media-post>
            <toqqn-note-post v-if="activeTab==='note'" @closeModal="closeModal"></toqqn-note-post>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToqqnNotePost from './partials/CreateNote'
import ToqqnMediaPost from './partials/CreateMedia'
import ToqqnLinkPost from './partials/CreateLink'

export default {
  name: 'CreatePost',
  components: {
    ToqqnNotePost,
    ToqqnMediaPost,
    ToqqnLinkPost
  },
  data: () => ({
    activeTab: 'note'
  }),
  methods: {
    closeModal () {
      const elem = this.$refs.modalClose
      elem.click()
    }
  }
}
</script>
