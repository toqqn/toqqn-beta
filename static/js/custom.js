



(function( $ ){

	/* ----------------------------------------------------------- */
  /*  1. Community Slider
  /* ----------------------------------------------------------- */

	$('.wms-communities-slide').slick({
		  slidesToShow: 6,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 2000,
		  // variableWidth: true,
		  responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1
		      }
		    }
		  ]
		});
	

	$(".wms-list-btn").click(function(e){
		e.preventDefault();
	  // Add list view
	  $('#wms-main-content-area').addClass('wms-list-view');
	});

	$(".wms-grid-btn").click(function(e){
		e.preventDefault();
	  // Add list view
	  $('#wms-main-content-area').removeClass('wms-list-view');
	});

	/* ----------------------------------------------------------- */
  /*  2. MATCH HEIGHT
  /* ----------------------------------------------------------- */

    $(function() {
      $('.wms-single-content').matchHeight();
    });

    /* ----------------------------------------------------------- */
  /*  3. MODAL SWITCHER
  /* ----------------------------------------------------------- */

  	// Login Switcher
    $(".login-switcher-btn").click(function(e){
		e.preventDefault();
	  $('#signup').modal('hide');
	  $('#forgotPassModal').modal('hide');
	});

    // Signup Swithcer
	$(".signup-switcher-btn").click(function(e){
		e.preventDefault();
	  $('#loginmodal').modal('hide')
	});

	// Forgot Pass Swithcer
	$(".wms-forgot-passbtn").click(function(e){
		e.preventDefault();
	  $('#loginmodal').modal('hide')
	});

	



    
    
  
   
	/* ----------------------------------------------------------- */
  	/*  1. SCROLL TOP BUTTON
  	/* ----------------------------------------------------------- */

	  //Check to see if the window is top if not then display button

	    // jQuery(window).scroll(function(){
	    //   if (jQuery(this).scrollTop() > 300) {
	    //     jQuery('.scrollToTop').fadeIn();
	    //   } else {
	    //     jQuery('.scrollToTop').fadeOut();
	    //   }
	    // });
	     
	    //Click event to scroll to top

	    // jQuery('.scrollToTop').click(function(){
	    //   jQuery('html, body').animate({scrollTop : 0},800);
	    //   return false;
	    // });
	 
		
	/* ----------------------------------------------------------- */
	/*  5. CLIENTS SLIDEER ( SLICK SLIDER )
	/* ----------------------------------------------------------- */
		
		
	
})( jQuery );



  
	