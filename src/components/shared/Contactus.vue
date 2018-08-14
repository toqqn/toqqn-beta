<template>
    <!-- Contact Us Modal -->
    <div class="modal fade" id="contactUs" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Contact Us</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="wms-form">
                        <div class="form-group">
                            <label for="yourName">Your Name</label>
                            <input type="text" class="form-control" id="yourName" aria-describedby="nameHelp" placeholder="Your Name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="messageBox">Message</label>
                            <textarea name="message" class="form-control" id="messageBox" cols="30" rows="6" placeholder="Type in whats in your mind."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary wms-primary-btn">Send</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ContactUs'
}
</script>
