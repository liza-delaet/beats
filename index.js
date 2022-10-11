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


console.log(slider);



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

$(".interactive-avatar__link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const ItemShow = findBlockAlias(target);
  const curItem = $this.closest(".reviews__switcher-item");

  ItemShow.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
});



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

$(".form").submit(e => {
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
        content.text("Ошибка. Повторите отправку позже.");
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
});

$(".app-submit-button").click(e => {
  e.preventDefault();

  $.fancybox.close();
});



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

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    // height: '390',
    // width: '660',
    videoId: 'nsBP4T15PZ4',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}