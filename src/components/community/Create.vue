<template>
  <!-- Create Community Modal -->
  <div class="modal fade" id="createCommunity" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Create community</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="modalClose">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="wms-ccommunity-content-left">
            <div class="upload-btn-wrapper">
              <button class="wms-upload-btn">
                <i class="fas fa-image"></i>
                <br>Upload
              </button>
              <input type="file" class="form-control" id="file" ref="file" accept="image/*,video/*" v-validate="'required'" v-on:change="handleFileUpload()"/>
              <i v-show="errors.has('media')" class="fa fa-warning"></i>
              <span v-show="errors.has('media')" class="error text-danger">{{ errors.first('media') }}</span>
              <img v-bind:src="imagePreview" v-show="showPreview"/>
            </div>
          </div>
          <div class="wms-ccommunity-content-right">
            <form class="wms-form" @submit.prevent="validateBeforeSubmit" autocomplete="false">
              <div class="form-group">
                <label for="communityName">Community Name</label>
                <input type="text" data-vv-name="communityName" v-model="communityName" v-validate="'required|min:3|max:50'" class="form-control" id="communityName" aria-describedby="nameHelp" placeholder="Community Name">
                <i v-show="errors.has('communityName')" class="fa fa-warning"></i>
                <span v-show="errors.has('communityName')" class="error text-danger">{{ errors.first('communityName') }}</span>
              </div>
              <div class="form-group wms-radio-btn-area">
                <label>Community Type</label>
                <div class="form-check form-check-inline">
                  <input data-vv-name="communityType" v-model="communityType" class="form-check-input" type="radio" name="communityType" id="inlineRadio1" value="private">
                  <label class="form-check-label" for="inlineRadio1">Private</label>
                </div>
                <div class="form-check form-check-inline">
                  <input data-vv-name="communityType" v-model="communityType" class="form-check-input" type="radio" name="communityType" id="inlineRadio2" value="public">
                  <label class="form-check-label" for="inlineRadio2">Public</label>
                </div>
                <div class="form-check form-check-inline">
                  <input data-vv-name="communityType" v-model="communityType" class="form-check-input" type="radio" name="communityType" id="inlineRadio3" value="paid" disabled>
                  <label class="form-check-label" for="inlineRadio3">Paid</label>
                </div>
              </div>
              <div class="form-group">
                <label for="communityDescription">Description</label>
                <textarea data-vv-name="communityDescription" v-model="communityDescription" v-validate="'required|min:20|max:500'" name="communityDescription" class="form-control" id="communityDescription" cols="30" rows="6" placeholder="What your community does"></textarea>
                <i v-show="errors.has('communityDescription')" class="fa fa-warning"></i>
                <span v-show="errors.has('communityDescription')" class="error text-danger">{{ errors.first('communityDescription') }}</span>
              </div>
              <div class="form-group">
                <label for="communitySlug">Slug</label>
                <input data-vv-name="communitySlug" v-model="communitySlug" v-validate="'required|min:10|max:100'" type="text" class="form-control" id="communitySlug" aria-describedby="slugHelp" placeholder="Community slug">
                <i v-show="errors.has('communitySlug')" class="fa fa-warning"></i>
                <span v-show="errors.has('communitySlug')" class="error text-danger">{{ errors.first('communitySlug') }}</span>
              </div>
              <button type="submit" class="btn btn-primary wms-primary-btn">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toqqnResource from '../../helpers/toqqnResource'
export default {
  name: 'CreateCommunity',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  data: () => ({
    communityName: '',
    communityDescription: '',
    communityType: 'private',
    communitySlug: '',
    mediaFile: '',
    createCommunityApiUrl: '',
    showPreview: false,
    imagePreview: ''
  }),
  methods: {

    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.createCommunityApiUrl = basePath + '/community/create'
    },
    handleFileUpload () {
      this.showPreview = false
      this.mediaFile = this.$refs.file.files[0]
      let reader = new FileReader()

      reader.addEventListener('load', function () {
        this.showPreview = true
        this.imagePreview = reader.result
      }.bind(this), false)

      if (this.mediaFile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.mediaFile.name)) {
          reader.readAsDataURL(this.mediaFile)
        }
      }
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let formData = new FormData()
          formData.append('image', this.mediaFile)
          formData.append('name', this.communityName)
          formData.append('description', this.communityDescription)
          formData.append('type', this.communityType)
          formData.append('slug', this.communitySlug)
          let headers = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          toqqnResource.post(this.createCommunityApiUrl, formData, headers).then(response => {
            if (response.data) {
              this.closeModal()
              this.$toaster.success(response.message)
              this.$store.dispatch('communityDetails', response.data)
              this.$store.dispatch('communityAdded', response.data)
            } else {
              this.$toaster.warning(response.message)
              this.$store.dispatch('errorResponse', response.message)
            }
          }).catch(error => {
            this.$toaster.error(error)
            this.$store.dispatch('errorResponse', error)
          })
        }
      })
    },
    closeModal () {
      const elem = this.$refs.modalClose
      elem.click()
    }
  },
  beforeMount: function () {
    this.init()
  }
}
</script>
