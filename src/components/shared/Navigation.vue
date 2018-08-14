<template>
    <!-- Start Navigation area -->
    <div id="wms-navigation">
        <div class="row">
            <div class="col-md-4 col-sm-4">
                <div class="wms-navigation-left">
                    <ul class="wms-left-nav">
                        <li>
                            <a href="#">
                                <i class="fas fa-chart-line"></i>Trending</a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-square-full"></i>Top</a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-certificate"></i>Just In</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8 col-sm-8">
                <div class="wms-navigation-right">
                    <ul class="wms-rigth-nav">
                        <li>
                            <i class="fas fa-square"></i>Toqqn Distribution: {{getData.toqqnStats.toqqnDistribution}}</li>
                        <li>
                            <i class="fas fa-square"></i>Total Users : {{getData.toqqnStats.totalUsers}}</li>
                        <li>
                            <i class="fas fa-square"></i>Total Posts : {{getData.toqqnStats.totalPosts}}</li>
                        <li>
                            <a class="wms-grid-btn" href="#">
                                <i class="fas fa-th-large"></i>
                            </a>
                        </li>
                        <li>
                            <a class="wms-list-btn" href="#">
                                <i class="fas fa-align-justify"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="far fa-moon"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Navigation area -->
</template>
<script>
import toqqnResource from '../../helpers/toqqnResource'
export default {
  name: 'Navigation',
  computed: {
    getData () {
      return this.$store.state
    }
  },
  methods: {
    init: function () {
      let basePath = this.$store.state.apiBasePath
      let customActions = {
        getToqqnStats: {url: basePath + '/stats'}
      }
      toqqnResource.get(customActions.getToqqnStats.url, {}).then(response => {
        if (response.data) {
          this.$store.dispatch('toqqnStatsSuccess', response.data)
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
  beforeMount: function () {
    this.init()
  }
}
</script>
