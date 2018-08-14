<template>
    <!-- Start Navigation area -->
    <div id="wms-navigation">
        <div class="row">
            <div class="col-md-4 col-sm-5">
                <div class="wms-navigation-left">
                    <ul class="wms-left-nav nav nav-pills" id="pills-tab1" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-post-tab" data-toggle="pill" href="#pills-post" role="tab" aria-controls="pills-post"
                                aria-selected="true">Posts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-comments-tab" data-toggle="pill" href="#pills-comments" role="tab" aria-controls="pills-comments"
                                aria-selected="false">Comments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-bookmrked-tab" data-toggle="pill" href="#pills-bookmrked" role="tab" aria-controls="pills-bookmrked"
                                aria-selected="false">Bookmarked</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-activitylog-tab" data-toggle="pill" href="#pills-activitylog" role="tab" aria-controls="pills-activitylog"
                                aria-selected="false">Activity Log</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-md-8 col-sm-7">
                <div class="wms-navigation-right">
                    <ul class="wms-rigth-nav">
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
export default {
  name: 'ProfileNavbar'
}
</script>
