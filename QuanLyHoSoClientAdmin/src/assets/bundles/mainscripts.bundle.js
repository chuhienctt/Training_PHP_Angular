function initSparkline() { $(".sparkline").each(function() { var a = $(this);
        a.sparkline("html", a.data()) }) }

function initCounters() { $(".count-to").countTo() }

function skinChanger() { $(".right-sidebar .choose-skin li").on("click", function() { var a = $("body"),
            b = $(this),
            c = $(".right-sidebar .choose-skin li.active").data("theme");
        $(".right-sidebar .choose-skin li").removeClass("active"), a.removeClass("theme-" + c), b.addClass("active"), a.addClass("theme-" + b.data("theme")) }) }

function CustomScrollbar() { $(".sidebar .menu .list").slimscroll({ height: "calc(100vh - 65px)", color: "rgba(0,0,0,0.2)", position: "left", size: "2px", alwaysVisible: !1, borderRadius: "3px", railBorderRadius: "0" }), $(".navbar-left .dropdown-menu .body .menu").slimscroll({ height: "300px", color: "rgba(0,0,0,0.2)", size: "3px", alwaysVisible: !1, borderRadius: "3px", railBorderRadius: "0" }), $(".cwidget-scroll").slimscroll({ height: "306px", color: "rgba(0,0,0,0.4)", size: "2px", alwaysVisible: !1, borderRadius: "3px", railBorderRadius: "2px" }), $(".right_chat .chat_body .chat-widget").slimscroll({ height: "calc(100vh - 145px)", color: "rgba(0,0,0,0.1)", size: "2px", alwaysVisible: !1, borderRadius: "3px", railBorderRadius: "2px", position: "left" }), $(".right-sidebar .slim_scroll").slimscroll({ height: "calc(100vh - 60px)", color: "rgba(0,0,0,0.4)", size: "2px", alwaysVisible: !1, borderRadius: "3px", railBorderRadius: "0" }) }

function CustomPageJS() { $(".boxs-close").on("click", function() { $(this).parents(".card").addClass("closed").fadeOut() }), $(".theme-light-dark .t-light").on("click", function() { $("body").removeClass("menu_dark") }), $(".theme-light-dark .t-dark").on("click", function() { $("body").addClass("menu_dark") }), $(".menu-sm").on("click", function() { $("body").toggleClass("menu_sm") }), $(document).ready(function() { $(".btn_overlay").on("click", function() { $(".overlay_menu").fadeToggle(200), $(this).toggleClass("btn-open").toggleClass("btn-close") }) }), $(".overlay_menu").on("click", function() { $(".overlay_menu").fadeToggle(200), $(".overlay_menu button.btn").toggleClass("btn-open").toggleClass("btn-close"), open = !1 }), $(".form-control").on("focus", function() { $(this).parent(".input-group").addClass("input-group-focus") }).on("blur", function() { $(this).parent(".input-group").removeClass("input-group-focus") }) }
if ("undefined" == typeof jQuery) throw new Error("jQuery plugins need to be before this file");
$(function() { "use strict";
    $.AdminsQuare.browser.activate(), $.AdminsQuare.leftSideBar.activate(), $.AdminsQuare.rightSideBar.activate(), $.AdminsQuare.rightchat.activate(), $.AdminsQuare.navbar.activate(), $.AdminsQuare.select.activate(), setTimeout(function() { $(".page-loader-wrapper").fadeOut() }, 50) }), $.AdminsQuare = {}, $.AdminsQuare.options = { colors: { red: "#ec3b57", pink: "#E91E63", purple: "#ba3bd0", deepPurple: "#673AB7", indigo: "#3F51B5", blue: "#2196f3", lightBlue: "#03A9F4", cyan: "#00bcd4", green: "#4CAF50", lightGreen: "#8BC34A", yellow: "#ffe821", orange: "#FF9800", deepOrange: "#f83600", grey: "#9E9E9E", blueGrey: "#607D8B", black: "#000000", blush: "#dd5e89", white: "#ffffff" }, leftSideBar: { scrollColor: "rgba(0,0,0,0.5)", scrollWidth: "4px", scrollAlwaysVisible: !1, scrollBorderRadius: "0", scrollRailBorderRadius: "0" }, dropdownMenu: { effectIn: "fadeIn", effectOut: "fadeOut" } }, $.AdminsQuare.leftSideBar = { activate: function() { var a = this,
            b = $("body"),
            c = $(".overlay");
        $(window).on("click", function(d) { var e = $(d.target); "i" === d.target.nodeName.toLowerCase() && (e = $(d.target).parent()), !e.hasClass("bars") && a.isOpen() && 0 === e.parents("#leftsidebar").length && (e.hasClass("js-right-sidebar") || c.fadeOut(), b.removeClass("overlay-open")) }), $.each($(".menu-toggle.toggled"), function(a, b) { $(b).next().slideToggle(0) }), $.each($(".menu .list li.active"), function(a, b) { var c = $(b).find("a:eq(0)");
            c.addClass("toggled"), c.next().show() }), $(".menu-toggle").on("click", function(a) { var b = $(this),
                c = b.next(); if ($(b.parents("ul")[0]).hasClass("list")) { var d = $(a.target).hasClass("menu-toggle") ? a.target : $(a.target).parents(".menu-toggle");
                $.each($(".menu-toggle.toggled").not(d).next(), function(a, b) { $(b).is(":visible") && ($(b).prev().toggleClass("toggled"), $(b).slideUp()) }) }
            b.toggleClass("toggled"), c.slideToggle(320) }), a.checkStatuForResize(!0), $(window).resize(function() { a.checkStatuForResize(!1) }), Waves.attach(".menu .list a", ["waves-block"]), Waves.init() }, checkStatuForResize: function(a) { var b = $("body"),
            c = $(".navbar .navbar-header .bars"),
            d = b.width();
        a && b.find(".content, .sidebar").addClass("no-animate").delay(1e3).queue(function() { $(this).removeClass("no-animate").dequeue() }), d < 1170 ? (b.addClass("ls-closed"), c.fadeIn()) : (b.removeClass("ls-closed"), c.fadeOut()) }, isOpen: function() { return $("body").hasClass("overlay-open") } }, $.AdminsQuare.rightSideBar = { activate: function() { var a = this,
            b = $("#rightsidebar"),
            c = $(".overlay");
        $(window).on("click", function(d) { var e = $(d.target); "i" === d.target.nodeName.toLowerCase() && (e = $(d.target).parent()), !e.hasClass("js-right-sidebar") && a.isOpen() && 0 === e.parents("#rightsidebar").length && (e.hasClass("bars") || c.fadeOut(), b.removeClass("open")) }), $(".js-right-sidebar").on("click", function() { b.toggleClass("open"), a.isOpen() ? c.fadeIn() : c.fadeOut() }) }, isOpen: function() { return $(".right-sidebar").hasClass("open") } }, $.AdminsQuare.rightchat = { activate: function() { var a = this,
            b = $("#rightchat"),
            c = $(".overlay");
        $(window).on("click", function(d) { var e = $(d.target); "i" === d.target.nodeName.toLowerCase() && (e = $(d.target).parent()), !e.hasClass("js-right-chat") && a.isOpen() && 0 === e.parents("#rightchat").length && (e.hasClass("bars") || c.fadeOut(), b.removeClass("open")) }), $(".js-right-chat").on("click", function() { b.toggleClass("open"), a.isOpen() ? c.fadeIn() : c.fadeOut() }) }, isOpen: function() { return $(".right_chat").hasClass("open") } }, $.AdminsQuare.navbar = { activate: function() { var a = $("body"),
            b = $(".overlay");
        $(".bars").on("click", function() { a.toggleClass("overlay-open"), a.hasClass("overlay-open") ? b.fadeIn() : b.fadeOut() }), $('.nav [data-close="true"]').on("click", function() { var a = $(".navbar-toggle").is(":visible"),
                b = $(".navbar-collapse");
            a && b.slideUp(function() { b.removeClass("in").removeAttr("style") }) }) } }, $.AdminsQuare.select = { activate: function() { $.fn.selectpicker && $("select:not(.ms)").selectpicker() } };
var edge = "Microsoft Edge",
    ie10 = "Internet Explorer 10",
    ie11 = "Internet Explorer 11",
    opera = "Opera",
    firefox = "Mozilla Firefox",
    chrome = "Google Chrome",
    safari = "Safari";
$.AdminsQuare.browser = { activate: function() { var a = this; "" !== a.getClassName() && $("html").addClass(a.getClassName()) }, getBrowser: function() { var a = navigator.userAgent.toLowerCase(); return /edge/i.test(a) ? edge : /rv:11/i.test(a) ? ie11 : /msie 10/i.test(a) ? ie10 : /opr/i.test(a) ? opera : /chrome/i.test(a) ? chrome : /firefox/i.test(a) ? firefox : navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) ? safari : void 0 }, getClassName: function() { var a = this.getBrowser(); return a === edge ? "edge" : a === ie11 ? "ie11" : a === ie10 ? "ie10" : a === opera ? "opera" : a === chrome ? "chrome" : a === firefox ? "firefox" : a === safari ? "safari" : "" } }, $(function() { "use strict";
    skinChanger(), CustomScrollbar(), initSparkline(), initCounters(), CustomPageJS() });
var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date;
! function() { var a = document.createElement("script"),
        b = document.getElementsByTagName("script")[0];
    a.async = !0, a.src = "https://embed.tawk.to/59f5afbbbb0c3f433d4c5c4c/default", a.charset = "UTF-8", a.setAttribute("crossorigin", "*"), b.parentNode.insertBefore(a, b) }(), $(function() { "use strict";

    function a() { var a = screenfull.element;
        $("#status").text("Is fullscreen: " + screenfull.isFullscreen), a && $("#element").text("Element: " + a.localName + (a.id ? "#" + a.id : "")), screenfull.isFullscreen || ($("#external-iframe").remove(), document.body.style.overflow = "auto") } if ($("#supported").text("Supported/allowed: " + !!screenfull.enabled), !screenfull.enabled) return !1;
    $("#request").on("click", function() { screenfull.request($("#container")[0]) }), $("#exit").on("click", function() { screenfull.exit() }), $('[data-provide~="boxfull"]').on("click", function() { screenfull.toggle($(".box")[0]) }), $('[data-provide~="fullscreen"]').on("click", function() { screenfull.toggle($("#container")[0]) }); var b = '[data-provide~="boxfull"]',
        b = '[data-provide~="fullscreen"]';
    $(b).each(function() { $(this).data("fullscreen-default-html", $(this).html()) }), document.addEventListener(screenfull.raw.fullscreenchange, function() { screenfull.isFullscreen ? $(b).each(function() { $(this).addClass("is-fullscreen") }) : $(b).each(function() { $(this).removeClass("is-fullscreen") }) }), screenfull.on("change", a), a() });
