"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var initial_number_slide=1,Slider=function(){function n(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,n),this.slider=document.querySelector(e),this.current=initial_number_slide,this.slideCount=this.slider.children.length,this.settings=t}return _createClass(n,[{key:"next",value:function(){this.current<this.slideCount?this.current++:this.current=initial_number_slide,this.translate()}},{key:"prev",value:function(){1<this.current?this.current--:this.current=this.slideCount,this.translate()}},{key:"translate",value:function(){this.slider.style.transform="translateX(-".concat(100*(this.current-1),"%)")}},{key:"setEventListener",value:function(){var e=this,t=document.querySelector(".products-slider__arrow--right"),n=document.querySelector(".products-slider__arrow--left");t.addEventListener("click",function(){e.next()}),n.addEventListener("click",function(){e.prev()})}},{key:"init",value:function(){this.settings.transition&&(this.slider.style.transition="".concat(this.settings.transition,"ms"))}}]),n}(),slider=new Slider("#slider",{transition:1e3}),openHamburger=(slider.setEventListener(),slider.init(),document.querySelector("#hamburger")),Hamburger=document.querySelector("#hamburger-menu"),CloseHamburger=document.querySelector("#hamburger-menu__close");function toggleMenu(){Hamburger.classList.toggle("showhamburger-menu")}openHamburger.addEventListener("click",toggleMenu),CloseHamburger.addEventListener("click",toggleMenu);var myMap,player,findBlockAlias=function(n){return $(".reviews__item").filter(function(e,t){return $(t).attr("data-linked")===n})},openItem=($(".interactive-avatar__link").on("click",function(e){e.preventDefault();var e=$(e.currentTarget),t=e.attr("data-open"),t=findBlockAlias(t),e=e.closest(".reviews__switcher-item");t.addClass("reviews__item--active").siblings().removeClass("reviews__item--active"),e.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active")}),function(e){var e=e.closest(".worker__item"),t=e.find(".worker__text"),n=t.find(".worker__text--block").height();e.addClass("active"),t.height(n)}),CloseEveryItem=function(e){var t=e.find(".worker__text");e.find(".worker__item").removeClass("active"),t.height(0)},validateFields=($(".worker__name").click(function(e){var e=$(e.currentTarget),t=e.closest(".worker__list");e.closest(".worker__item").hasClass("active")?CloseEveryItem(t):(CloseEveryItem(t),openItem(e))}),function(e,t){return t.forEach(function(e){e.removeClass("input-error"),""===e.val().trim()&&e.addClass("input-error")}),0===e.find(".input-error").length}),init=($(".form").on("submit",function(e){e.preventDefault();var e=$(e.currentTarget),t=e.find("[name='name']"),n=e.find("[name='phone']"),r=e.find("[name='comment']"),a=e.find("[name='to']"),i=$("#modal"),o=i.find(".modal__content");i.removeClass("modal-error"),validateFields(e,[t,n,r,a])&&((i=$.ajax({url:"https://webdev-api.loftschool.com/sendmail",method:"post",data:{name:t.val(),phone:n.val(),comment:r.val(),to:a.val()}})).done(function(e){o.text(e.message)}),i.fail(function(e){e=e.statusText;"error"==e?o.text("Ошибка. Попробуйте повторить отправку позже."):o.text(e),o.addClass("modal-error")}),i.always(function(){$.fancybox.open({src:"#modal",type:"inline"})})),$(".form").trigger("reset")}),$(".app-submit-button").on("click",function(e){e.preventDefault(),$.fancybox.close()}),function(){myMap=new ymaps.Map("map",{center:[55.752712,37.598291],zoom:14,controls:[]});var t=new ymaps.GeoObjectCollection({},{draggable:!1,iconLayout:"default#image",iconImageHref:"./pictures/icons/marker.svg",iconImageSize:[58,73],iconImageOffset:[-3,-73]});[[55.758123,37.624532],[55.7578,37.582981],[55.749774,37.607707],[55.744224,37.583042]].forEach(function(e){t.add(new ymaps.Placemark(e))}),myMap.geoObjects.add(t),myMap.behaviors.disable("scrollZoom")}),playerContainer=(ymaps.ready(init),$(".player")),eventsInit=function(){$(".player__start").on("click",function(e){e.preventDefault(),playerContainer.hasClass("paused")?(playerContainer.removeClass("paused"),player.pauseVideo()):(playerContainer.addClass("paused"),player.playVideo())}),$(".player__splash").on("click",function(e){e.preventDefault(),playerContainer.addClass("paused"),player.playVideo()}),$(".player__playback").on("click",function(e){var t=$(e.currentTarget),e=e.originalEvent.layerX/t.width()*100,t=player.getDuration()/100*e;$(".player__playback-button").css({left:"".concat(e,"%")}),player.seekTo(t)}),$(".player__volume").on("click",function(e){var t=$(e.currentTarget),e=e.originalEvent.layerX/t.width()*100;player.isMuted()&&player.unMute(),$(".player__volume-button").css({left:"".concat(e,"%")}),player.setVolume(e)}),$(".player__sound").on("click",function(e){player.isMuted()?(player.unMute(),$(".player__volume-button").css({left:"".concat(player.getVolume(),"%")})):(player.mute(),$(".player__volume-button").css({left:"".concat(0,"%")}))})},onPlayerReady=function(){var t=player.getDuration();setInterval(function(){var e=player.getCurrentTime()/t*100;$(".player__playback-button").css({left:"".concat(e,"%")})},1e3)},onPlayerStateChange=function(e){switch(e.data){case 1:playerContainer.addClass("active"),playerContainer.addClass("paused");break;case 2:playerContainer.removeClass("active"),playerContainer.removeClass("paused")}};function onYouTubeIframeAPIReady(){player=new YT.Player("yt-player",{height:"100%",width:"100%",videoId:"GZ7AHUbdQjk",events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange},playerVars:{controls:0,disablekb:0,showinfo:0,rel:0,autoplay:0,modestbranding:1}})}eventsInit();var mesureWidth=function(e){var t=0,n=$(window).width(),r=e.closest(".colors-menu").find(".colors-menu__title"),a=parseInt(r.css("padding-left")),i=parseInt(r.css("padding-right")),i=(r.width()+i+a)*r.length,a=e.find(".colors-menu__container"),r=parseInt(a.css("padding-left")),e=parseInt(a.css("padding-right")),t=window.matchMedia("(max-width: 768px").matches?n-i:500;return console.log("screenwidth "+n),console.log(i),{container:t,textContainer:t-r-e}},closeEveryElemInContainer=function(e){var t=e.find(".colors-menu__item"),e=e.find(".colors-menu__content");t.removeClass("active"),e.width(0)},openElem=function(e){var t=e.find(".colors-menu__content"),n=mesureWidth(e),r=e.find(".colors-menu__container");e.addClass("active"),t.width(n.container),r.width(n.textContainer)},sections=($(".colors-menu__title").on("click",function(e){e.preventDefault();var e=$(e.currentTarget),t=e.closest(".colors-menu__item"),n=t.hasClass("active"),e=e.closest(".colors-menu");n?closeEveryElemInContainer(e):(closeEveryElemInContainer(e),openElem(t))}),$(".colors-menu__close").on("click",function(e){e.preventDefault(),closeEveryElemInContainer($(".colors-menu"))}),$("section")),display=$(".maincontent"),mobileDetect=new MobileDetect(window.navigator.userAgent),isMobile=mobileDetect.mobile(),inScroll=!1,perfomTransition=(sections.first().addClass("active"),function(e){var t,n;!1===inScroll&&(inScroll=!0,t=-100*e,n=$(".fixed-menu"),display.css({transform:"translateY(".concat(t,"%)")}),sections.eq(e).addClass("active").siblings().removeClass("active"),setTimeout(function(){inScroll=!1,n.find(".fixed-menu__item").eq(e).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active")},1300))}),scrollViewport=function(e){var t=sections.filter(".active"),n=t.next(),t=t.prev();"next"===e&&n.length&&perfomTransition(n.index()),"prev"===e&&t.length&&perfomTransition(t.index())};$(window).on("wheel",function(e){e=e.originalEvent.deltaY;0<e&&scrollViewport("next"),e<0&&scrollViewport("prev")}),$(window).on("keydown",function(e){var t=e.target.tagName.toLowerCase();if("input"!==t&&"textarea"!==t)switch(e.keyCode){case 38:scrollViewport("prev");break;case 40:scrollViewport("next")}}),$(".wrapper").on("touchmove",function(e){return e.preventDefault()}),$("[data-scroll-to]").on("click",function(e){e.preventDefault();e=$(e.currentTarget).attr("data-scroll-to"),e=$("[data-section-id=".concat(e,"]"));perfomTransition(e.index()),Hamburger.classList.contains("showhamburger-menu")&&Hamburger.classList.remove("showhamburger-menu")}),isMobile&&$("body").swipe({swipe:function(e,t){scrollViewport("down"===t?"prev":"up"===t?"next":"")}});