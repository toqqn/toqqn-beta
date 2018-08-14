<template>
    <div id="wms-main-content-area">
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-post" role="tabpanel" aria-labelledby="pills-post-tab">
                <!-- Start Single post content -->
                <div class="wms-user-profile-graph-post">
                    <h2>Posts</h2>
                </div>

            </div>
            <div class="tab-pane fade" id="pills-comments" role="tabpanel" aria-labelledby="pills-comments-tab">
                <!-- Start Single post content -->
                <div class="wms-user-profile-graph-post">
                    <h2>Comments</h2>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-bookmrked" role="tabpanel" aria-labelledby="pills-bookmrked-tab">

                <!-- Start Single post content -->
                <div class="wms-user-profile-graph-post">
                    <h2>Bookmarked</h2>
                </div>

            </div>
            <div class="tab-pane fade" id="pills-activitylog" role="tabpanel" aria-labelledby="pills-activitylog-tab">
                <!-- Start Single post content -->
                <div class="wms-user-profile-graph-post">
                    <h2>mybblog Acquired in the last 30 days</h2>
                    <div class="wms-user-profile-graph">
                        <img src="static/images/user-graph.jpg" alt="Graph img">
                    </div>
                </div>
                <!-- Start Single post content -->
                <div class="wms-user-profile-graph-post">
                    <h2>Activities</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ProfileContents'
}
</script>
