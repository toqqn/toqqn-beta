<template>
    <!-- Login Modal -->
    <div class="modal fade" id="loginmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">toqqn</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="modalClose">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="wms-form wms-login-form" @submit.prevent="validateBeforeSubmit" autocomplete="false">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" data-vv-name="email" v-model="email" v-validate="'required|email'" class="form-control" id="email" aria-describedby="usernameHelp" placeholder="Email">
                            <i v-show="errors.has('email')" class="fa fa-warning"></i>
                            <span v-show="errors.has('email')" class="error text-danger">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" data-vv-name="password" v-model="password" v-validate="'required|min:4'" class="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password">
                            <i v-show="errors.has('password')" class="fa fa-warning"></i>
                            <span v-show="errors.has('password')" class="error text-danger">{{ errors.first('password') }}</span>

                            <!-- <p class="wms-forgot-password">
                                <a href="#" class="wms-forgot-passbtn" data-toggle="modal" data-target="#forgotPassModal">Forgot Password</a>
                            </p> -->
                        </div>
                        <button type="submit" class="btn btn-primary wms-primary-btn">Login</button>

                        <div class="wms-modal-footer">
                            <p>
                                <a href="#" class="signup-switcher-btn" data-toggle="modal" data-target="#signup">Don't have an account?</a>
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
  name: 'Login',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  data: () => ({
    email: '',
    password: '',
    loginApiUrl: ''
  }),
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      this.loginApiUrl = basePath + '/users/login'
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let params = {
            email: this.email,
            password: this.password
          }

          toqqnResource.post(this.loginApiUrl, params).then(response => {
            if (response.data) {
              this.closeModal()
              this.$toaster.success(response.message)
              this.$store.dispatch('loginSuccess', response.data)
              toqqnStorage.set('userInfo', response.data)
            } else {
              toqqnStorage.delete('userInfo')
              this.$toaster.warning(response.message)
              this.$store.dispatch('loginError', response.message)
            }
          }).catch(error => {
            toqqnStorage.delete('userInfo')
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
