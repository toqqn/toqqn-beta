<template>
    <div  id="pills-image" role="tabpanel" aria-labelledby="pills-image-tab">
        <form class="wms-form"  @submit.prevent="validateBeforeSubmit" autocomplete="false">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" data-vv-name="title" v-model="title" v-validate="'required|min:20|max:100'" id="title" aria-describedby="titleHelp" placeholder="Title">
                <i v-show="errors.has('title')" class="fa fa-warning"></i>
                <span v-show="errors.has('title')" class="error text-danger">{{ errors.first('title') }}</span>
            </div>
            <div class="form-group">
              <label>Image/Video</label>
              <input type="file" class="form-control" id="file" ref="file" accept="image/*,video/*" v-validate="'required'" v-on:change="handleFileUpload()"/>
              <i v-show="errors.has('media')" class="fa fa-warning"></i>
              <span v-show="errors.has('media')" class="error text-danger">{{ errors.first('media') }}</span>
              <img v-bind:src="imagePreview" v-show="showPreview"/>
              <video width="200" height="200" controls v-bind:src="videoPreview" v-show="showVideoPreview">
                Your browser does not support HTML5 video.
              </video>
            </div>
            <div class="form-group">
                <label for="messageBox">Description</label>
                <textarea name="message" data-vv-name="description" v-model="description" v-validate="'required|min:50|max:500'" class="form-control" id="messageBox" cols="30" rows="6" placeholder="Type in whats in your mind."></textarea>
                <i v-show="errors.has('description')" class="fa fa-warning"></i>
                <span v-show="errors.has('description')" class="error text-danger">{{ errors.first('description') }}</span>
            </div>
            <div class="form-group">
                <label for="selectBox">Select Community</label>
                <select name="community" data-vv-name="community" v-model="community" v-validate="'required'" class="form-control" id="selectBox">
                    <option v-for="community in getData.communityList" :value="community.id" :key="community.id">
                      {{ community.name }}
                    </option>
                </select>
                <i v-show="errors.has('community')" class="fa fa-warning"></i>
                <span v-show="errors.has('community')" class="error text-danger">{{ errors.first('community') }}</span>
            </div>
            <button type="submit" class="btn btn-primary wms-primary-btn">Post</button>
        </form>
    </div>
</template>
<script>
import toqqnResource from '../../../helpers/toqqnResource'
export default {
  name: 'CreateMedia',
  data: () => ({
    type: '',
    community: '',
    description: '',
    mediaFile: '',
    title: '',
    showPreview: false,
    showVideoPreview: false,
    imagePreview: '',
    videoPreview: ''
  }),
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.createPostApiUrl = basePath + '/post/create'
    },
    handleFileUpload () {
      this.showPreview = false
      this.showVideoPreview = false

      this.mediaFile = this.$refs.file.files[0]
      let reader = new FileReader()

      reader.addEventListener('load', function () {
        if (this.type === 'image') {
          this.showPreview = true
          this.imagePreview = reader.result
        } else if (this.type === 'video') {
          this.showVideoPreview = true
          this.videoPreview = reader.result
        }
      }.bind(this), false)

      if (this.mediaFile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.mediaFile.name)) {
          reader.readAsDataURL(this.mediaFile)
          this.type = 'image'
        } else if (/\.(avi|mov|mp4|flv)$/i.test(this.mediaFile.name)) {
          reader.readAsDataURL(this.mediaFile)
          this.type = 'video'
        }
      }
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let formData = new FormData()
          formData.append('file', this.mediaFile)
          formData.append('type', this.type)
          formData.append('description', this.description)
          formData.append('communityId', this.community)
          formData.append('title', this.title)
          let headers = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          toqqnResource.post(this.createPostApiUrl, formData, headers).then(response => {
            if (response.data) {
              this.$store.dispatch('postDetails', response.data)
              this.$store.dispatch('postAdded', response.data)
              this.$toaster.success(response.message)
              this.$emit('closeModal')
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
    }
  },
  beforeMount: function () {
    this.init()
  }
}
</script>
<style>
  div.container img{
    max-width: 200px;
    max-height: 200px;
  }
</style>
