$(window).on("scroll", function() {

  // Navigation
  if ($(this).scrollTop() > 600) {
    $(".navbar").addClass(" animated navbar-fixed-top animated slideInDown scroll");
    $(".navbar").removeClass("slideOutUp");
  } else if ($(this).scrollTop() <= 600 && $(this).scrollTop() > 300) {
    $(".navbar").removeClass("slideInDown");
    $(".navbar").addClass("slideOutUp");
  } else if ($(this).scrollTop() <= 300) {
    $(".navbar").removeClass(" animated navbar-fixed-top slideOutUp  scroll");
  }
});

$(window).on("load", function() {
  "use strict";


  // === Masonry blog posts ===
  var triggerM = $('.masonry-trigger');
  var container = $('.articles-wrapper');

  function startMasonry() {
    container.masonry({
      gutter: 0,
      itemSelector: '.article',
      columnWidth: '.article',
      isInitLayout: true
    });
  }
  if (triggerM.css("display") == "block") {
    startMasonry();
  }
  $(window).resize(function() {
    if (triggerM.css("display") == "block") {
      startMasonry();
    } else if (triggerM.css("display") == "none") {
      startMasonry();
      container.masonry('destroy');
    }
  });

  // portfolio masonry effect fixer
  $(".portfolio-filter li").first().click();

});

$(document).ready(function() {

  // Preloader
  $("#preloaderKDZ").delay(450).fadeOut(950);

  // Menu Dropdpwn
  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(1).fadeIn(400);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(250).fadeOut(400);
  });


  // Search
  // $(".search-nav").on("click", function() {
  //   $(".search-form").slideDown(300);
  // });
  // $("#close-btn").on("click", function() {
  //   $(".search-form").slideUp(300);
  // });


  // Counters
  if ($('.counters').length > 0) {

    var options = {  
      useEasing: true,
        useGrouping: true,
        separator: '',
        decimal: '.',
        prefix: '',
        suffix: ''
    };
    $('.counters').waypoint(function() {
      var numAnim = new CountUp("counting-1", 0, 12, 0, 6.5, options);
      numAnim.start();
      var numAnim = new CountUp("counting-2", 0, 15, 0, 6.5, options);
      numAnim.start();
      var numAnim = new CountUp("counting-3", 0, 120, 0, 6.5, options);
      numAnim.start();
      var numAnim = new CountUp("counting-4", 0, 1050, 0, 6.5, options);
      numAnim.start();
    }, {
      offset: '100%'
    });
  };


  //  Portfolio
  $(".portfolio-filter li").on("click", function() {
    $(".portfolio-filter li").removeClass("active");
    $(this).addClass("active");

    var selector = $(this).attr("data-filter");
    $(".gallery ").isotope({
      filter: selector,
    });
  });



  // Owl Carousels Setup
  if ($('#owl-about-mision').length > 0) {
    var carousel = $("#owl-about-mision");

    carousel.owlCarousel({
      singleItem: true,
      pagination: true,
      navigation: true,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [980, 1],
      itemsTablet: [768, 1],
      itemsMobile: [479, 1],
      navigationText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
      ],

      afterAction: function(el) {
        //remove class active
        this
          .$owlItems
          .removeClass('active')

        //add class active
        this
          .$owlItems //owl internal $ object containing items
          .eq(this.currentItem + 0)
          .addClass('active')

      }
    });
  };
  if ($('#owl-our-foundation').length > 0) {
    var carousel = $("#owl-our-foundation");

    carousel.owlCarousel({
      singleItem: true,
      pagination: true,
      navigation: true,
      itemsDesktop: [1199, 1],
      itemsDesktopSmall: [980, 1],
      itemsTablet: [768, 1],
      itemsMobile: [479, 1],
      navigationText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>"
      ],

      afterAction: function(el) {
        //remove class active
        this
          .$owlItems
          .removeClass('active')

        //add class active
        this
          .$owlItems //owl internal $ object containing items
          .eq(this.currentItem + 0)
          .addClass('active')

      }
    });
  };


  if ($('#owl-partners').length > 0) {

    var owl = $("#owl-partners");

    owl.owlCarousel({

      itemsCustom: [
        [0, 1],
        [485, 3],
        [600, 3],
        [700, 4],
        [1000, 5],
        [1200, 6],
      ],
      itemsScaleUp: true,
      navigation: true,
      pagination: false,
      navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
      ],
    });
  };


  if ($('#owl-article').length > 0) {

    var owl = $("#owl-article");

    owl.owlCarousel({

      itemsCustom: [
        [0, 1],
        [450, 1],
        [600, 1],
        [700, 1],
        [1000, 1],
        [1200, 1],
      ],
      itemsScaleUp: true,
      navigation: true,
      pagination: false,
      navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
      ],
    });
  };


  //  Toggle Accordion Icon
  function toggleIcon(e) {
    $(e.target)
      .prev('.panel-heading')
      .find("i.indicator")
      .toggleClass('fa-plus fa-minus');
  }
  $('#accordion').on('hidden.bs.collapse', toggleIcon);
  $('#accordion').on('shown.bs.collapse', toggleIcon);

  // To Top Btn
  $('#to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
    return false;
  });


  // Progress Bars
  (function($) {
    if (!$(".progress-bar-inner .inner").length) return;

    $('.progress-bar-inner .inner').waypoint(function() {
      $('.progress-bar-inner .inner').addClass('animate');
    }, {
      offset: '100%'
    });
  })(jQuery);

  (function($) {
    if (!$("a.nivoLightbox").length) return;

    $('a.nivoLightbox').nivoLightbox({
      effect: 'fade', // The effect to use when showing the lightbox
      theme: 'default', // The lightbox theme to use
      keyboardNav: true, // Enable/Disable keyboard navigation (left/right/escape)
      clickOverlayToClose: true, // If false clicking the "close" button will be the only way to close the lightbox
      onInit: function() {}, // Callback when lightbox has loaded
      beforeShowLightbox: function() {}, // Callback before the lightbox is shown
      afterShowLightbox: function(lightbox) {}, // Callback after the lightbox is shown
      beforeHideLightbox: function() {}, // Callback before the lightbox is hidden
      afterHideLightbox: function() {}, // Callback after the lightbox is hidden
      onPrev: function(element) {}, // Callback when the lightbox gallery goes to previous item
      onNext: function(element) {}, // Callback when the lightbox gallery goes to next item
      errorMessage: 'The requested content cannot be loaded. Please try again later.'
    });
  })(jQuery);


  //abou-us-carousel
  (function($) {
    Carousel.init({
        target: $('.carousel')
    });
  })(jQuery);
});
