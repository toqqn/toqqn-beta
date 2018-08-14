<template>
    <!-- Sign Up Modal -->
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">toqqn</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="modalClose">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="wms-form wms-signup-form" @submit.prevent="validateBeforeSubmit" autocomplete="false">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" data-vv-name="firstName" v-model="firstName" v-validate="'required|alpha'" :class="{'form-control': true}" id="firstName" aria-describedby="nameHelp" placeholder="First Name">
                            <i v-show="errors.has('firstName')" class="fa fa-warning"></i>
                            <span v-show="errors.has('firstName')" class="error text-danger">{{ errors.first('firstName') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" data-vv-name="lastName" v-model="lastName" v-validate="'required|alpha'" :class="{'form-control': true}" id="lastName" aria-describedby="nameHelp" placeholder="Last Name">
                            <i v-show="errors.has('lastName')" class="fa fa-warning"></i>
                            <span v-show="errors.has('lastName')" class="error text-danger">{{ errors.first('lastName') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" data-vv-name="email" v-model="email" v-validate="'required|email'" :class="{'form-control': true}" id="email" aria-describedby="emailHelp" placeholder="Email" autocomplete="false">
                            <i v-show="errors.has('email')" class="fa fa-warning"></i>
                            <span v-show="errors.has('email')" class="error text-danger">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="password">Create Password</label>
                            <input type="password" data-vv-name="password" v-model="password" v-validate="'required|min:4'" :class="{'form-control': true}" id="password" aria-describedby="passwordHelp" placeholder="Create Password" autocomplete="off">
                            <i v-show="errors.has('password')" class="fa fa-warning"></i>
                            <span v-show="errors.has('password')" class="error text-danger">{{ errors.first('password') }}</span>
                        </div>
                        <button type="submit" class="btn btn-primary wms-primary-btn">Sign Up</button>

                        <div class="wms-modal-footer">
                            <p>Already have an account?
                                <a href="#" class="login-switcher-btn" data-toggle="modal" data-target="#loginmodal">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import toqqnResource from '../../helpers/toqqnResource'
import toqqnStorage from '../../helpers/storageService'

export default {
  name: 'Signup',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    signupApiUrl: ''
  }),
  methods: {

    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.signupApiUrl = basePath + '/users/create'
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let params = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          }

          toqqnResource.post(this.signupApiUrl, params).then(response => {
            if (response.data) {
              this.closeModal()
              this.$toaster.success(response.message)
              this.$store.dispatch('signupSuccess', response)
              this.$store.dispatch('loginSuccess', response.data)
              toqqnStorage.set('userInfo', response.data)
            } else {
              this.$toaster.warning(response.message)
              this.$store.dispatch('signupError', response.message)
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
