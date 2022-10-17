//Слайдер секция products

const initial_number_slide = 1;

class Slider {
  constructor(selector, settings = {}) {
    this.slider = document.querySelector(selector);
    this.current = initial_number_slide;
    this.slideCount = this.slider.children.length;
    this.settings = settings;
  }

  next() {
    if (this.current < this.slideCount) {
        this.current++;
    } else {
      this.current = initial_number_slide;
    }
    this.translate()
  }

  prev() {
    if (this.current > 1) {
      this.current--;
    } else {
      this.current = this.slideCount;
    }
    this.translate()
  }

  translate() {
    this.slider.style.transform = `translateX(-${(this.current - 1) * 100}%)`;
  }

  setEventListener() {
    const buttonSlideRight = document.querySelector('.products-slider__arrow--right');
    const buttonSlideLeft = document.querySelector('.products-slider__arrow--left');
    buttonSlideRight.addEventListener('click', () => {
      this.next()
    })
    buttonSlideLeft.addEventListener('click', () => {
      this.prev()
    })
  }

  init () {
    if(!!this.settings.transition) {
      this.slider.style.transition = `${this.settings.transition}ms`
    }
  //   if (this.settings.auto) {
  //     setInterval(()=>{
  //       this.next()
  //     }, this.settings.autoInterval)
  //   }
  //   this.setEventListener();
   }
}

const slider = new Slider('#slider', {
  transition: 1000,
  // auto: true,
  // autoInterval: 5000,
});

slider.setEventListener();
slider.init()

// Hamburger меню

const openHamburger = document.querySelector("#hamburger");
const Hamburger = document.querySelector("#hamburger-menu");
const CloseHamburger = document.querySelector("#hamburger-menu__close");

function toggleMenu () {
  Hamburger.classList.toggle("showhamburger-menu");
  // if (Hamburger.classList.contains("showhamburger-menu")) {
  //   Hamburger.classList.remove("showhamburger-menu");
  // } else {
  //   Hamburger.classList.add("showhamburger-menu");
  // }
};

openHamburger.addEventListener("click", toggleMenu);
CloseHamburger.addEventListener("click", toggleMenu);



// Секция reviews

const findBlockAlias = (alias) => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked") === alias;
  });
};

$(".interactive-avatar__link").on("click",(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const ItemShow = findBlockAlias(target);
  const curItem = $this.closest(".reviews__switcher-item");

  ItemShow.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
}));



// Секция worker аккордеон

const openItem = item => {
  const container = item.closest(".worker__item");
  const contentBlock = container.find(".worker__text");
  const textBlock = contentBlock.find(".worker__text--block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
}

const CloseEveryItem = container => {
  const items = container.find(".worker__text");
  const itemContainer = container.find(".worker__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$(".worker__name").click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".worker__list");
  const elemContainer = $this.closest(".worker__item");

  if (elemContainer.hasClass("active")) {
    CloseEveryItem(container);
  } else {
    CloseEveryItem(container);
    openItem($this);
  }
});



//Секция delivery форма

const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$(".form").on("submit",(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("modal-error");

  const isValid = validateFields(form, [name, phone, comment, to])


  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },
    });

    request.done(data => {
      content.text(data.message);
    });

    request.fail(data => {
      const message = data.statusText;
      if (message == "error") {
        content.text("Ошибка. Попробуйте повторить отправку позже.");
      } else {
        content.text(message);
      }

      content.addClass("modal-error");
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline"
      });
    })
  }
  $(".form").trigger('reset');
}));

$(".app-submit-button").on("click",(e => {
  e.preventDefault();

  $.fancybox.close();
}));



//Карта 

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752712, 37.598291],
    zoom: 14,
    controls: []
  });

  var coords = [
    [55.758123, 37.624532],
    [55.757800, 37.582981],
    [55.749774, 37.607707],
    [55.744224, 37.583042]
  ];

  var myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./pictures/icons/marker.svg",
    iconImageSize: [58, 73],
    iconImageOffset: [-3, -73]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);



//Плеер

let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").on("click",(e => {
    e.preventDefault();

  if (playerContainer.hasClass("paused")) {
    playerContainer.removeClass("paused");
    player.pauseVideo();
  } else {
    playerContainer.addClass("paused");
    player.playVideo();
    }
  }));  

  $(".player__playback").on("click",(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
  }));

  $(".player__volume").on("click",(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    if(player.isMuted()) {
      player.unMute();
    }
    $(".player__volume-button").css({
      left: `${newButtonPositionPercent}%`
    });

    player.setVolume(newButtonPositionPercent);
  }));

  $(".player__sound").on("click",( e => {
    if(player.isMuted()) {
      player.unMute();
      $(".player__volume-button").css({
        left: `${player.getVolume()}%`
      });
    }
    else {
      player.mute();
      $(".player__volume-button").css({
        left: `${0}%`
      });
    }
  }));
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

  }, 1000);
};

const onPlayerStateChange = event => {
  /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;
  
    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
 };

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '100%',
    width: '100%',
    videoId: 'kLppaLNw7d0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 1,
    }
  });
}

eventsInit();



// Секция colors аккордеон

const mesureWidth = (elem) => {
  let reqElemWidth = 0;

  const screenWidth = $(window).width();
  const container = elem.closest('.colors-menu');
  const titlesBlocks = container.find('.colors-menu__title');
  const titlePaddingLeft = parseInt(titlesBlocks.css('padding-left'));
  const titlePaddingRight = parseInt(titlesBlocks.css('padding-right'));
  const titlesWidth = (titlesBlocks.width() + titlePaddingRight + titlePaddingLeft) * titlesBlocks.length;

  const textContainer = elem.find('.colors-menu__container');
  const paddingLeft = parseInt(textContainer.css('padding-left'));
  const paddingRight = parseInt(textContainer.css('padding-right'));

  const isMobile = window.matchMedia('(max-width: 768px').matches;

  if (isMobile) {
    reqElemWidth = screenWidth - titlesWidth;
  } else {
    reqElemWidth = 500;
  }
  console.log("screenwidth " + screenWidth);
    console.log(titlesWidth);

  return {
    container: reqElemWidth,
    textContainer: reqElemWidth - paddingLeft - paddingRight
  }
};

const closeEveryElemInContainer = (container) => {
  const elems = container.find('.colors-menu__item');
  const content = container.find('.colors-menu__content');

  elems.removeClass('active');
  content.width(0);
};

const openElem = (elem) => {
  const hiddenContent = elem.find('.colors-menu__content');
  const reqWidth = mesureWidth(elem);
  const textBlock = elem.find('.colors-menu__container');

  elem.addClass('active');
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$('.colors-menu__title').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const elem = $this.closest('.colors-menu__item');
  const elemOpened = elem.hasClass('active');
  const container = $this.closest('.colors-menu');

  if (elemOpened) {
    closeEveryElemInContainer(container)
  } else {
    closeEveryElemInContainer(container)
    openElem(elem);
  }
});

$('.colors-menu__close').on('click', e => {
  e.preventDefault();

  closeEveryElemInContainer($('.colors-menu'));
});



// Скролл по секциям

const sections = $('section');
const display = $('.maincontent');

//https://hgoebl.github.io/mobile-detect.js/ - определим устройтсво моб или нет
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('active');

const perfomTransition = sectionEq => {

  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;

    const sideMenu = $('.fixed-menu');

    display.css({
    transform: `translateY(${position}%)`
  });

  sections.eq(sectionEq).addClass('active').siblings().removeClass('active');


  setTimeout(() => {
    inScroll = false;

    sideMenu
    .find('.fixed-menu__item')
    .eq(sectionEq)
    .addClass('fixed-menu__item--active')
    .siblings()
    .removeClass('fixed-menu__item--active');
  }, 1300);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    perfomTransition(nextSection.index())
  }

  if (direction === 'prev' && prevSection.length) {
    perfomTransition(prevSection.index())
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport('next');
  }

  if (deltaY < 0) {
    scrollViewport('prev');
  }
});

//Обработка скролла по клавиатуре
$(window).on('keydown', e => {
  
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {
    switch (e.keyCode) {
      case 38: //prev
        scrollViewport('prev');
        break;
  
      case 40: //next
        scrollViewport('next');
        break;
    }
  }
})

//Навигация по секциям
$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').on("click",(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  perfomTransition(reqSection.index());
}));

if (isMobile) {
//Скролл на мобильных устройствах
//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $("body").swipe( {
    swipe: function (event, direction,) {
      let = scrollDirection = '';

      if (direction === 'up') scrollDirection = 'next';
      if (direction === 'down') scrollDirection = 'prev';

      scrollViewport(scrollDirection);
      }
    });
  }