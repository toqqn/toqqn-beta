<template>
    <div id="pills-link" role="tabpanel" aria-labelledby="pills-link-tab">
        <form class="wms-form"  @submit.prevent="validateBeforeSubmit" autocomplete="false">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" data-vv-name="title" v-model="title" v-validate="'required|min:20|max:100'" id="title" aria-describedby="titleHelp" placeholder="Title">
                <i v-show="errors.has('title')" class="fa fa-warning"></i>
                <span v-show="errors.has('title')" class="error text-danger">{{ errors.first('title') }}</span>
            </div>
            <div class="form-group">
                <label for="link">Link</label>
                <input type="text" name="link" data-vv-name="link" v-model="link" v-validate="'required|url'" class="form-control" id="link" aria-describedby="linkHelp" placeholder="Copy Paste Link here">
                <i v-show="errors.has('link')" class="fa fa-warning"></i>
                <span v-show="errors.has('link')" class="error text-danger">{{ errors.first('link') }}</span>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" data-vv-name="description" v-model="description" v-validate="'required|min:50|max:500'" class="form-control" id="description" cols="30" rows="6" placeholder="Describe about the link"></textarea>
                <i v-show="errors.has('description')" class="fa fa-warning"></i>
                <span v-show="errors.has('description')" class="error text-danger">{{ errors.first('description') }}</span>
            </div>
            <div class="form-group">
                <label for="community">Select Community</label>
                <select name="community" data-vv-name="community" v-model="community" v-validate="'required'" class="form-control" id="community">
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
  name: 'CreateLink',
  data: () => ({
    type: 'link',
    community: '',
    description: '',
    link: '',
    title: '',
    createPostApiUrl: ''
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
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let params = {
            type: this.type,
            title: this.title,
            link: this.link,
            description: this.description,
            communityId: this.community
          }

          toqqnResource.post(this.createPostApiUrl, params).then(response => {
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
