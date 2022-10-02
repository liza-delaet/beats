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