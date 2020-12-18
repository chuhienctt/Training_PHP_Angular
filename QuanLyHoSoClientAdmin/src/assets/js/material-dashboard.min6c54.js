var mainpanel, ps, sidebar, ps1, sidebarwrapper, ps2, dropdownmenu, ps3, pageheader, ps4,
  isWindows = -1 < navigator.platform.indexOf("Win");
isWindows ? (0 != $(".main-panel").length && (mainpanel = document.querySelector(".main-panel"), ps = new PerfectScrollbar(mainpanel)), 0 != $(".sidebar").length && (sidebar = document.querySelector(".sidebar"), ps1 = new PerfectScrollbar(sidebar)), 0 != $(".sidebar-wrapper").length && (sidebarwrapper = document.querySelector(".sidebar-wrapper"), ps2 = new PerfectScrollbar(sidebarwrapper)), 0 != $(".dropdown-menu").length && (dropdownmenu = document.querySelector(".dropdown-menu"), ps3 = new PerfectScrollbar(dropdownmenu)), 0 != $(".page-header").length && (pageheader = document.querySelector(".page-header"), ps4 = new PerfectScrollbar(pageheader)), $("html").addClass("perfect-scrollbar-on")) : $("html").addClass("perfect-scrollbar-off");
var breakCards = !0, searchVisible = 0, transparent = !0, transparentDemo = !0, fixedTop = !1, mobile_menu_visible = 0,
  mobile_menu_initialized = !1, toggle_initialized = !1, bootstrap_nav_initialized = !1, seq = 0, delays = 80,
  durations = 500, seq2 = 0, delays2 = 80, durations2 = 500;

function debounce(a, i, n) {
  var o;
  return function () {
    var e = this, t = arguments;
    clearTimeout(o), o = setTimeout(function () {
      o = null, n || a.apply(e, t)
    }, i), n && !o && a.apply(e, t)
  }
}

$(document).ready(function () {
  $sidebar = $(".sidebar"), window_width = $(window).width(), $("body").bootstrapMaterialDesign({autofill: !1}), md.initSidebarsCheck(), window_width = $(window).width(), md.checkSidebarImage(), md.initMinimizeSidebar(), $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
    var t = $(this), a = $(this).offsetParent(".dropdown-menu");
    return $(this).next().hasClass("show") || $(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), $(this).next(".dropdown-menu").toggleClass("show"), $(this).closest("a").toggleClass("open"), $(this).parents("a.dropdown-item.dropdown.show").on("hidden.bs.dropdown", function (e) {
      $(".dropdown-menu .show").removeClass("show")
    }), a.parent().hasClass("navbar-nav") || t.next().css({top: t[0].offsetTop, left: a.outerWidth() - 4}), !1
  }), $(".collapse").on("show.bs.collapse", function () {
    $(this).parent().siblings().children(".collapse").each(function () {
      $(this).collapse("hide")
    })
  }), 0 != $(".selectpicker").length && $(".selectpicker").selectpicker(), $('[rel="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover();
  var e = $(".tagsinput").data("color");
  0 != $(".tagsinput").length && $(".tagsinput").tagsinput(), $(".bootstrap-tagsinput").addClass(e + "-badge"), $(".select").dropdown({
    dropdownClass: "dropdown-menu",
    optionClass: ""
  }), $(".form-control").on("focus", function () {
    $(this).parent(".input-group").addClass("input-group-focus")
  }).on("blur", function () {
    $(this).parent(".input-group").removeClass("input-group-focus")
  }), 1 == breakCards && $('[data-header-animation="true"]').each(function () {
    $(this);
    var t = $(this).parent(".card");
    t.find(".fix-broken-card").click(function () {
      console.log(this);
      var e = $(this).parent().parent().siblings(".card-header, .card-header-image");
      e.removeClass("hinge").addClass("fadeInDown"), t.attr("data-count", 0), setTimeout(function () {
        e.removeClass("fadeInDown animate")
      }, 480)
    }), t.mouseenter(function () {
      var e = $(this);
      hover_count = parseInt(e.attr("data-count"), 10) + 1 || 0, e.attr("data-count", hover_count), 20 <= hover_count && $(this).children(".card-header, .card-header-image").addClass("hinge animated")
    })
  }), $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on("click", function () {
    $(this).hasClass("error") && $(this).closest("div").removeClass("has-error")
  })
}), $(document).on("click", ".navbar-toggler", function () {
  var e;
  $toggle = $(this), mobile_menu_visible = 1 == mobile_menu_visible ? ($("html").removeClass("nav-open"), $(".close-layer").remove(), setTimeout(function () {
    $toggle.removeClass("toggled")
  }, 400), 0) : (setTimeout(function () {
    $toggle.addClass("toggled")
  }, 430), e = $('<div class="close-layer"></div>'), 0 != $("body").find(".main-panel").length ? e.appendTo(".main-panel") : $("body").hasClass("off-canvas-sidebar") && e.appendTo(".wrapper-full-page"), setTimeout(function () {
    e.addClass("visible")
  }, 100), e.click(function () {
    $("html").removeClass("nav-open"), mobile_menu_visible = 0, e.removeClass("visible"), setTimeout(function () {
      e.remove(), $toggle.removeClass("toggled")
    }, 400)
  }), $("html").addClass("nav-open"), 1)
}), $(window).resize(function () {
  md.initSidebarsCheck(), seq = seq2 = 0, setTimeout(function () {
    md.initDashboardPageCharts()
  }, 500)
}), md = {
  misc: {navbar_menu_visible: 0, active_collapse: !0, disabled_collapse_init: 0}, checkSidebarImage: function () {
    $sidebar = $(".sidebar"), image_src = $sidebar.data("image"), void 0 !== image_src && $(".sidebar-background").css("background-image", "url(" + image_src + ")")
  }, showNotification: function (e, t) {
    type = ["", "info", "danger", "success", "warning", "rose", "primary"], color = Math.floor(6 * Math.random() + 1), $.notify({
      icon: "add_alert",
      message: "Welcome to <b>Material Dashboard Pro</b> - a beautiful admin panel for every web developer."
    }, {type: type[color], timer: 3e3, placement: {from: e, align: t}})
  }, initDocumentationCharts: function () {
    0 != $("#dailySalesChart").length && 0 != $("#websiteViewsChart").length && (dataDailySalesChart = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    }, optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 0}),
      low: 0,
      high: 50,
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
    }, new Chartist.Line("#dailySalesChart", dataDailySalesChart, optionsDailySalesChart), new Chartist.Line("#websiteViewsChart", dataDailySalesChart, optionsDailySalesChart))
  }, initFormExtendedDatetimepickers: function () {
    $(".datetimepicker").datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      }
    }), $(".datepicker").datetimepicker({
      format: "MM/DD/YYYY",
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      }
    }), $(".timepicker").datetimepicker({
      format: "h:mm A",
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      }
    })
  }, initSliders: function () {
    var e = document.getElementById("sliderRegular");
    noUiSlider.create(e, {start: 40, connect: [!0, !1], range: {min: 0, max: 100}});
    var t = document.getElementById("sliderDouble");
    noUiSlider.create(t, {start: [20, 60], connect: !0, range: {min: 0, max: 100}})
  }, initSidebarsCheck: function () {
    $(window).width() <= 991 && 0 != $sidebar.length && md.initRightMenu()
  }, checkFullPageBackgroundImage: function () {
    $page = $(".full-page"), image_src = $page.data("image"), void 0 !== image_src && (image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>', $page.append(image_container))
  }, initDashboardPageCharts: function () {
    var e, t, a;
    0 == $("#dailySalesChart").length && 0 == $("#completedTasksChart").length && 0 == $("#websiteViewsChart").length || (dataDailySalesChart = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    }, optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 0}),
      low: 0,
      high: 50,
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
    }, e = new Chartist.Line("#dailySalesChart", dataDailySalesChart, optionsDailySalesChart), md.startAnimationForLineChart(e), dataCompletedTasksChart = {
      labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]]
    }, optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 0}),
      low: 0,
      high: 1e3,
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
    }, t = new Chartist.Line("#completedTasksChart", dataCompletedTasksChart, optionsCompletedTasksChart), md.startAnimationForLineChart(t), a = Chartist.Bar("#websiteViewsChart", {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
    }, {
      axisX: {showGrid: !1},
      low: 0,
      high: 1e3,
      chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
    }, [["screen and (max-width: 640px)", {
      seriesBarDistance: 5, axisX: {
        labelInterpolationFnc: function (e) {
          return e[0]
        }
      }
    }]]), md.startAnimationForBarChart(a))
  }, initMinimizeSidebar: function () {
    $("#minimizeSidebar").click(function () {
      $(this);
      1 == md.misc.sidebar_mini_active ? ($("body").removeClass("sidebar-mini"), md.misc.sidebar_mini_active = !1) : ($("body").addClass("sidebar-mini"), md.misc.sidebar_mini_active = !0);
      var e = setInterval(function () {
        window.dispatchEvent(new Event("resize"))
      }, 180);
      setTimeout(function () {
        clearInterval(e)
      }, 1e3)
    })
  }, checkScrollForTransparentNavbar: debounce(function () {
    260 < $(document).scrollTop() ? transparent && (transparent = !1, $(".navbar-color-on-scroll").removeClass("navbar-transparent")) : transparent || (transparent = !0, $(".navbar-color-on-scroll").addClass("navbar-transparent"))
  }, 17), initRightMenu: debounce(function () {
    $sidebar_wrapper = $(".sidebar-wrapper"), mobile_menu_initialized ? 991 < $(window).width() && ($sidebar_wrapper.find(".navbar-form").remove(), $sidebar_wrapper.find(".nav-mobile-menu").remove(), mobile_menu_initialized = !1) : ($navbar = $("nav").find(".navbar-collapse").children(".navbar-nav"), mobile_menu_content = "", nav_content = $navbar.html(), nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + "</ul>", navbar_form = $("nav").find(".navbar-form").get(0).outerHTML, $sidebar_nav = $sidebar_wrapper.find(" > .nav"), $nav_content = $(nav_content), $navbar_form = $(navbar_form), $nav_content.insertBefore($sidebar_nav), $navbar_form.insertBefore($nav_content), $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function (e) {
      e.stopPropagation()
    }), window.dispatchEvent(new Event("resize")), mobile_menu_initialized = !0)
  }, 200), startAnimationForLineChart: function (e) {
    e.on("draw", function (e) {
      "line" === e.type || "area" === e.type ? e.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: e.path.clone().scale(1, 0).translate(0, e.chartRect.height()).stringify(),
          to: e.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      }) : "point" === e.type && (seq++, e.element.animate({
        opacity: {
          begin: seq * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: "ease"
        }
      }))
    }), seq = 0
  }, startAnimationForBarChart: function (e) {
    e.on("draw", function (e) {
      "bar" === e.type && (seq2++, e.element.animate({
        opacity: {
          begin: seq2 * delays2,
          dur: durations2,
          from: 0,
          to: 1,
          easing: "ease"
        }
      }))
    }), seq2 = 0
  }, initFullCalendar: function () {
    $calendar = $("#fullCalendar"), today = new Date, y = today.getFullYear(), m = today.getMonth(), d = today.getDate(), $calendar.fullCalendar({
      viewRender: function (e, t) {
        "month" != e.name && $(t).find(".fc-scroller").perfectScrollbar()
      },
      header: {left: "title", center: "month,agendaWeek,agendaDay", right: "prev,next,today"},
      defaultDate: today,
      selectable: !0,
      selectHelper: !0,
      views: {
        month: {titleFormat: "MMMM YYYY"},
        week: {titleFormat: " MMMM D YYYY"},
        day: {titleFormat: "D MMM, YYYY"}
      },
      select: function (a, i) {
        swal({
          title: "Create an Event",
          html: '<div class="form-group"><input class="form-control" placeholder="Event Title" id="input-field"></div>',
          showCancelButton: !0,
          confirmButtonClass: "btn btn-success",
          cancelButtonClass: "btn btn-danger",
          buttonsStyling: !1
        }).then(function (e) {
          var t;
          event_title = $("#input-field").val(), event_title && (t = {
            title: event_title,
            start: a,
            end: i
          }, $calendar.fullCalendar("renderEvent", t, !0)), $calendar.fullCalendar("unselect")
        }).catch(swal.noop)
      },
      editable: !0,
      eventLimit: !0,
      events: [{title: "All Day Event", start: new Date(y, m, 1), className: "event-default"}, {
        id: 999,
        title: "Repeating Event",
        start: new Date(y, m, d - 4, 6, 0),
        allDay: !1,
        className: "event-rose"
      }, {
        id: 999,
        title: "Repeating Event",
        start: new Date(y, m, d + 3, 6, 0),
        allDay: !1,
        className: "event-rose"
      }, {
        title: "Meeting",
        start: new Date(y, m, d - 1, 10, 30),
        allDay: !1,
        className: "event-green"
      }, {
        title: "Lunch",
        start: new Date(y, m, d + 7, 12, 0),
        end: new Date(y, m, d + 7, 14, 0),
        allDay: !1,
        className: "event-red"
      }, {
        title: "Md-pro Launch",
        start: new Date(y, m, d - 2, 12, 0),
        allDay: !0,
        className: "event-azure"
      }, {
        title: "Birthday Party",
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: !1,
        className: "event-azure"
      }, {
        title: "Click for Creative Tim",
        start: new Date(y, m, 21),
        end: new Date(y, m, 22),
        url: "http://www.creative-tim.com/",
        className: "event-orange"
      }, {
        title: "Click for Google",
        start: new Date(y, m, 21),
        end: new Date(y, m, 22),
        url: "http://www.creative-tim.com/",
        className: "event-orange"
      }]
    })
  }, initVectorMap: function () {
    $("#worldMap").vectorMap({
      map: "world_mill_en",
      backgroundColor: "transparent",
      zoomOnScroll: !1,
      regionStyle: {
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": .9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },
      series: {
        regions: [{
          values: {
            AU: 760,
            BR: 550,
            CA: 120,
            DE: 1300,
            FR: 540,
            GB: 690,
            GE: 200,
            IN: 200,
            RO: 600,
            RU: 300,
            US: 2920
          }, scale: ["#AAAAAA", "#444444"], normalizeFunction: "polynomial"
        }]
      }
    })
  }
}, demo = {
  initContactUsMap: function () {
    var e = new google.maps.LatLng(44.43353, 26.093928), t = {
      zoom: 14,
      center: e,
      styles: [{
        featureType: "water",
        stylers: [{saturation: 43}, {lightness: -11}, {hue: "#0088ff"}]
      }, {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{hue: "#ff0000"}, {saturation: -100}, {lightness: 99}]
      }, {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{color: "#808080"}, {lightness: 54}]
      }, {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [{color: "#ece2d9"}]
      }, {featureType: "poi.park", elementType: "geometry.fill", stylers: [{color: "#ccdca1"}]}, {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{color: "#767676"}]
      }, {featureType: "road", elementType: "labels.text.stroke", stylers: [{color: "#ffffff"}]}, {
        featureType: "poi",
        stylers: [{visibility: "off"}]
      }, {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [{visibility: "on"}, {color: "#b8cb93"}]
      }, {featureType: "poi.park", stylers: [{visibility: "on"}]}, {
        featureType: "poi.sports_complex",
        stylers: [{visibility: "on"}]
      }, {featureType: "poi.medical", stylers: [{visibility: "on"}]}, {
        featureType: "poi.business",
        stylers: [{visibility: "simplified"}]
      }],
      scrollwheel: !1
    }, a = new google.maps.Map(document.getElementById("contactUsMap"), t);
    new google.maps.Marker({position: e, title: "Hello World!"}).setMap(a)
  }, initContactUs2Map: function () {
    var e = 44.43353, t = 26.093928, a = new google.maps.LatLng(e, t), i = {
      zoom: 14,
      center: new google.maps.LatLng(e, 26.068928),
      styles: [{
        featureType: "water",
        stylers: [{saturation: 43}, {lightness: -11}, {hue: "#0088ff"}]
      }, {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{hue: "#ff0000"}, {saturation: -100}, {lightness: 99}]
      }, {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{color: "#808080"}, {lightness: 54}]
      }, {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [{color: "#ece2d9"}]
      }, {featureType: "poi.park", elementType: "geometry.fill", stylers: [{color: "#ccdca1"}]}, {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{color: "#767676"}]
      }, {featureType: "road", elementType: "labels.text.stroke", stylers: [{color: "#ffffff"}]}, {
        featureType: "poi",
        stylers: [{visibility: "off"}]
      }, {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [{visibility: "on"}, {color: "#b8cb93"}]
      }, {featureType: "poi.park", stylers: [{visibility: "on"}]}, {
        featureType: "poi.sports_complex",
        stylers: [{visibility: "on"}]
      }, {featureType: "poi.medical", stylers: [{visibility: "on"}]}, {
        featureType: "poi.business",
        stylers: [{visibility: "simplified"}]
      }],
      scrollwheel: !1
    }, n = new google.maps.Map(document.getElementById("contactUs2Map"), i);
    new google.maps.Marker({position: a, title: "Hello World!"}).setMap(n)
  }, presentationAnimations: function () {
    $(function () {
      var a = $(window);

      function e() {
        $(".add-animation:not(.animated)").each(function () {
          var e = $(this);
          e.offset().top < a.scrollTop() + a.height() && e.addClass("animated")
        }), $(".add-animation.animated").each(function (e) {
          var t = $(this).offset().top;
          scrolled = a.scrollTop(), windowHeight = a.height(), win_height_padded = .8 * windowHeight, scrolled + win_height_padded < t && $(this).removeClass("animated")
        })
      }

      Modernizr.touch && $(".add-animation").addClass("animated"), a.on("scroll", e), e()
    })
  }, initDateTimePicker: function () {
    $(".datetimepicker").datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      }
    })
  }, initPickColor: function () {
    $(".pick-class-label").click(function () {
      var e, t = $(this).attr("new-class"), a = $("#display-buttons").attr("data-class"), i = $("#display-buttons");
      i.length && ((e = i.find(".btn")).removeClass(a), e.addClass(t), i.attr("data-class", t))
    })
  }, initMaterialWizard: function () {
    var i = $(".card-wizard form").validate({
      rules: {
        firstname: {required: !0, minlength: 3},
        lastname: {required: !0, minlength: 3},
        email: {required: !0, minlength: 3}
      }, highlight: function (e) {
        $(e).closest(".form-group").removeClass("has-success").addClass("has-danger")
      }, success: function (e) {
        $(e).closest(".form-group").removeClass("has-danger").addClass("has-success")
      }, errorPlacement: function (e, t) {
        $(t).append(e)
      }
    });

    function r(e, t) {
      $total = e.find(".nav li").length, $li_width = 100 / $total, total_steps = e.find(".nav li").length, move_distance = e.width() / total_steps, index_temp = t, vertical_level = 0, mobile_device = $(document).width() < 600 && 3 < $total, mobile_device && (move_distance = e.width() / 2, index_temp = t % 2, $li_width = 50), e.find(".nav li").css("width", $li_width + "%"), step_width = move_distance, move_distance *= index_temp, $current = t + 1, 1 == $current || 1 == mobile_device && t % 2 == 0 ? move_distance -= 8 : ($current == total_steps || 1 == mobile_device && t % 2 == 1) && (move_distance += 8), mobile_device && (vertical_level = parseInt(t / 2), vertical_level *= 38), e.find(".moving-tab").css("width", step_width), $(".moving-tab").css({
        transform: "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
        transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
      })
    }

    $(".card-wizard").bootstrapWizard({
      tabClass: "nav nav-pills",
      nextSelector: ".btn-next",
      previousSelector: ".btn-previous",
      onNext: function (e, t, a) {
        if (!$(".card-wizard form").valid()) return i.focusInvalid(), !1
      },
      onInit: function (e, t, a) {
        t.find("li").length;
        var i = t.closest(".card-wizard");
        $first_li = t.find("li:first-child a").html(), $moving_div = $('<div class="moving-tab">' + $first_li + "</div>"), $(".card-wizard .wizard-navigation").append($moving_div), r(i, a), $(".moving-tab").css("transition", "transform 0s")
      },
      onTabClick: function (e, t, a) {
        return !!$(".card-wizard form").valid()
      },
      onTabShow: function (e, t, a) {
        var i = t.find("li").length, n = a + 1, o = t.closest(".card-wizard");
        i <= n ? ($(o).find(".btn-next").hide(), $(o).find(".btn-finish").show()) : ($(o).find(".btn-next").show(), $(o).find(".btn-finish").hide()), button_text = t.find("li:nth-child(" + n + ") a").html(), setTimeout(function () {
          $(".moving-tab").text(button_text)
        }, 150);
        var s = $(".footer-checkbox");
        0 == !a ? $(s).css({opacity: "0", visibility: "hidden", position: "absolute"}) : $(s).css({
          opacity: "1",
          visibility: "visible"
        }), r(o, a)
      }
    }), $("#wizard-picture").change(function () {
      !function (e) {
        {
          var t;
          e.files && e.files[0] && ((t = new FileReader).onload = function (e) {
            $("#wizardPicturePreview").attr("src", e.target.result).fadeIn("slow")
          }, t.readAsDataURL(e.files[0]))
        }
      }(this)
    }), $('[data-toggle="wizard-radio"]').click(function () {
      wizard = $(this).closest(".card-wizard"), wizard.find('[data-toggle="wizard-radio"]').removeClass("active"), $(this).addClass("active"), $(wizard).find('[type="radio"]').removeAttr("checked"), $(this).find('[type="radio"]').attr("checked", "true")
    }), $('[data-toggle="wizard-checkbox"]').click(function () {
      $(this).hasClass("active") ? ($(this).removeClass("active"), $(this).find('[type="checkbox"]').removeAttr("checked")) : ($(this).addClass("active"), $(this).find('[type="checkbox"]').attr("checked", "true"))
    }), $(".set-full-height").css("height", "auto"), $(window).resize(function () {
      $(".card-wizard").each(function () {
        $wizard = $(this), index = $wizard.bootstrapWizard("currentIndex"), r($wizard, index), $(".moving-tab").css({transition: "transform 0s"})
      })
    })
  }, initCharts: function () {
    var e, t, a, i, n, o;
    0 != $("#roundedLineChart").length && 0 != $("#straightLinesChart").length && 0 != $("#colouredRoundedLineChart").length && 0 != $("#colouredBarsChart").length && 0 != $("#simpleBarChart").length && 0 != $("#multipleBarsChart").length && (dataRoundedLineChart = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    }, optionsRoundedLineChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 10}),
      axisX: {showGrid: !1},
      low: 0,
      high: 50,
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
      showPoint: !1
    }, e = new Chartist.Line("#roundedLineChart", dataRoundedLineChart, optionsRoundedLineChart), md.startAnimationForLineChart(e), dataStraightLinesChart = {
      labels: ["'07", "'08", "'09", "'10", "'11", "'12", "'13", "'14", "'15"],
      series: [[10, 16, 8, 13, 20, 15, 20, 34, 30]]
    }, optionsStraightLinesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 0}),
      low: 0,
      high: 50,
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
      classNames: {point: "ct-point ct-white", line: "ct-line ct-white"}
    }, t = new Chartist.Line("#straightLinesChart", dataStraightLinesChart, optionsStraightLinesChart), md.startAnimationForLineChart(t), dataColouredRoundedLineChart = {
      labels: ["'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13", "'14", "'15"],
      series: [[287, 480, 290, 554, 690, 690, 500, 752, 650, 900, 944]]
    }, optionsColouredRoundedLineChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 10}),
      axisY: {showGrid: !0, offset: 40},
      axisX: {showGrid: !1},
      low: 0,
      high: 1e3,
      showPoint: !0,
      height: "300px"
    }, a = new Chartist.Line("#colouredRoundedLineChart", dataColouredRoundedLineChart, optionsColouredRoundedLineChart), md.startAnimationForLineChart(a), dataColouredBarsChart = {
      labels: ["'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13", "'14", "'15"],
      series: [[287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944], [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647], [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509]]
    }, optionsColouredBarsChart = {
      lineSmooth: Chartist.Interpolation.cardinal({tension: 10}),
      axisY: {showGrid: !0, offset: 40},
      axisX: {showGrid: !1},
      low: 0,
      high: 1e3,
      showPoint: !0,
      height: "300px"
    }, i = new Chartist.Line("#colouredBarsChart", dataColouredBarsChart, optionsColouredBarsChart), md.startAnimationForLineChart(i), Chartist.Pie("#chartPreferences", {
      labels: ["62%", "32%", "6%"],
      series: [62, 32, 6]
    }, {height: "230px"}), n = Chartist.Bar("#simpleBarChart", {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
    }, {seriesBarDistance: 10, axisX: {showGrid: !1}}, [["screen and (max-width: 640px)", {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (e) {
          return e[0]
        }
      }
    }]]), md.startAnimationForBarChart(n), o = Chartist.Bar("#multipleBarsChart", {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895], [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]]
    }, {
      seriesBarDistance: 10,
      axisX: {showGrid: !1},
      height: "300px"
    }, [["screen and (max-width: 640px)", {
      seriesBarDistance: 5, axisX: {
        labelInterpolationFnc: function (e) {
          return e[0]
        }
      }
    }]]), md.startAnimationForBarChart(o))
  }, showSwal: function (e) {
    "basic" == e ? swal({
      title: "Here's a message!",
      buttonsStyling: !1,
      confirmButtonClass: "btn btn-success"
    }).catch(swal.noop) : "title-and-text" == e ? swal({
      title: "Here's a message!",
      text: "It's pretty, isn't it?",
      buttonsStyling: !1,
      confirmButtonClass: "btn btn-info"
    }).catch(swal.noop) : "success-message" == e ? swal({
      title: "Good job!",
      text: "You clicked the button!",
      buttonsStyling: !1,
      confirmButtonClass: "btn btn-success",
      type: "success"
    }).catch(swal.noop) : "warning-message-and-confirmation" == e ? swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Yes, delete it!",
      buttonsStyling: !1
    }).then(function () {
      swal({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "success",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: !1
      })
    }).catch(swal.noop) : "warning-message-and-cancel" == e ? swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: !1
    }).then(function () {
      swal({
        title: "Deleted!",
        text: "Your imaginary file has been deleted.",
        type: "success",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: !1
      }).catch(swal.noop)
    }, function (e) {
      "cancel" === e && swal({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        type: "error",
        confirmButtonClass: "btn btn-info",
        buttonsStyling: !1
      }).catch(swal.noop)
    }) : "custom-html" == e ? swal({
      title: "HTML example",
      buttonsStyling: !1,
      confirmButtonClass: "btn btn-success",
      html: 'You can use <b>bold text</b>, <a href="http://github.com">links</a> and other HTML tags'
    }).catch(swal.noop) : "auto-close" == e ? swal({
      title: "Auto close alert!",
      text: "I will close in 2 seconds.",
      timer: 2e3,
      showConfirmButton: !1
    }).catch(swal.noop) : "input-field" == e && swal({
      title: "Input something",
      html: '<div class="form-group"><input id="input-field" type="text" class="form-control" /></div>',
      showCancelButton: !0,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: !1
    }).then(function (e) {
      swal({
        type: "success",
        html: "You entered: <strong>" + $("#input-field").val() + "</strong>",
        confirmButtonClass: "btn btn-success",
        buttonsStyling: !1
      })
    }).catch(swal.noop)
  }
  // , initGoogleMaps: function () {
  //   var e = new google.maps.LatLng(40.748817, -73.985428), t = {
  //     zoom: 13,
  //     center: e,
  //     scrollwheel: !1,
  //     styles: [{
  //       featureType: "water",
  //       stylers: [{saturation: 43}, {lightness: -11}, {hue: "#0088ff"}]
  //     }, {
  //       featureType: "road",
  //       elementType: "geometry.fill",
  //       stylers: [{hue: "#ff0000"}, {saturation: -100}, {lightness: 99}]
  //     }, {
  //       featureType: "road",
  //       elementType: "geometry.stroke",
  //       stylers: [{color: "#808080"}, {lightness: 54}]
  //     }, {
  //       featureType: "landscape.man_made",
  //       elementType: "geometry.fill",
  //       stylers: [{color: "#ece2d9"}]
  //     }, {featureType: "poi.park", elementType: "geometry.fill", stylers: [{color: "#ccdca1"}]}, {
  //       featureType: "road",
  //       elementType: "labels.text.fill",
  //       stylers: [{color: "#767676"}]
  //     }, {featureType: "road", elementType: "labels.text.stroke", stylers: [{color: "#ffffff"}]}, {
  //       featureType: "poi",
  //       stylers: [{visibility: "off"}]
  //     }, {
  //       featureType: "landscape.natural",
  //       elementType: "geometry.fill",
  //       stylers: [{visibility: "on"}, {color: "#b8cb93"}]
  //     }, {featureType: "poi.park", stylers: [{visibility: "on"}]}, {
  //       featureType: "poi.sports_complex",
  //       stylers: [{visibility: "on"}]
  //     }, {featureType: "poi.medical", stylers: [{visibility: "on"}]}, {
  //       featureType: "poi.business",
  //       stylers: [{visibility: "simplified"}]
  //     }]
  //   }, a = new google.maps.Map(document.getElementById("map"), t);
  //   new google.maps.Marker({position: e, title: "Hello World!"}).setMap(a)
  // }
  // , initSmallGoogleMaps: function () {
  //   var e = new google.maps.LatLng(40.748817, -73.985428), t = {zoom: 8, center: e, scrollwheel: !1},
  //     a = new google.maps.Map(document.getElementById("regularMap"), t);
  //   new google.maps.Marker({position: e, title: "Regular Map!"}).setMap(a);
  //   t = {
  //     zoom: 13,
  //     center: e = new google.maps.LatLng(40.748817, -73.985428),
  //     scrollwheel: !1,
  //     disableDefaultUI: !0,
  //     zoomControl: !0,
  //     styles: [{
  //       featureType: "water",
  //       stylers: [{saturation: 43}, {lightness: -11}, {hue: "#0088ff"}]
  //     }, {
  //       featureType: "road",
  //       elementType: "geometry.fill",
  //       stylers: [{hue: "#ff0000"}, {saturation: -100}, {lightness: 99}]
  //     }, {
  //       featureType: "road",
  //       elementType: "geometry.stroke",
  //       stylers: [{color: "#808080"}, {lightness: 54}]
  //     }, {
  //       featureType: "landscape.man_made",
  //       elementType: "geometry.fill",
  //       stylers: [{color: "#ece2d9"}]
  //     }, {featureType: "poi.park", elementType: "geometry.fill", stylers: [{color: "#ccdca1"}]}, {
  //       featureType: "road",
  //       elementType: "labels.text.fill",
  //       stylers: [{color: "#767676"}]
  //     }, {featureType: "road", elementType: "labels.text.stroke", stylers: [{color: "#ffffff"}]}, {
  //       featureType: "poi",
  //       stylers: [{visibility: "off"}]
  //     }, {
  //       featureType: "landscape.natural",
  //       elementType: "geometry.fill",
  //       stylers: [{visibility: "on"}, {color: "#b8cb93"}]
  //     }, {featureType: "poi.park", stylers: [{visibility: "on"}]}, {
  //       featureType: "poi.sports_complex",
  //       stylers: [{visibility: "on"}]
  //     }, {featureType: "poi.medical", stylers: [{visibility: "on"}]}, {
  //       featureType: "poi.business",
  //       stylers: [{visibility: "simplified"}]
  //     }]
  //   }, a = new google.maps.Map(document.getElementById("customSkinMap"), t);
  //   new google.maps.Marker({position: e, title: "Custom Skin & Settings Map!"}).setMap(a);
  //   t = {
  //     zoom: 3,
  //     scrollwheel: !1,
  //     center: e = new google.maps.LatLng(40.748817, -73.985428),
  //     mapTypeId: google.maps.MapTypeId.SATELLITE
  //   }, a = new google.maps.Map(document.getElementById("satelliteMap"), t);
  //   new google.maps.Marker({position: e, title: "Satellite Map!"}).setMap(a)
  // }
};
//# sourceMappingURL=_site_dashboard_pro/assets/js/dashboard-pro.js.map
