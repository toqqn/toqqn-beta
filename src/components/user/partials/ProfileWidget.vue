<template>
    <!-- Single sidebar widget -->
    <div class="wms-user-sidebar-widget">
        <!-- User Profile Nav -->
        <div class="dropdown wms-profile-nav">
            <a href="#" class="wms-user-btn" id="dLabel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-h"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="dLabel">
                <ul>
                    <li>
                        <a href="#">
                            <i class="fas fa-pencil-alt"></i>Edit Profile</a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-ban"></i>Block User</a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-flag"></i>Report User</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- User Profile -->
        <div class="wms-user-profile">
            <span>
                <i class="fas fa-user-circle"></i>
            </span>
            <p class="wms-user-profile-title">{{userInfo.firstName + '' + userInfo.lastName}}</p>
        </div>
        <div class="wms-user-profile-badge-area">
            <div class="wms-user-profile-single-badge float-left">
                <h4>
                    <i class="fas fa-star"></i>Hall of Fame</h4>
                <p>Rank:
                    <span>{{userInfo.rank}}</span>
                </p>
            </div>
            <div class="wms-user-profile-single-badge float-right">
                <h4>
                    <i class="fab fa-btc"></i>toqqn Acquired</h4>
                <p>
                    <span>{{userInfo.toqqnBalance}}</span>
                </p>
            </div>
            <div class="wms-user-profile-single-badge wms-user-moderator-badge">
                <p>Moderator Privileges
                    <span>
                        <i class="fas fa-star"></i>King</span>
                </p>
            </div>
            <div class="wms-community-follow-area">
                <a href="#" class="wms-primary-btn">Follow</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProfileWidget',
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>
