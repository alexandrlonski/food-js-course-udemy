/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
    // calculator

  const result = document.querySelector('.calculating__result span');

  
  let sex, height, weight, age, radio;

    if(localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
    } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }  
    
    if(localStorage.getItem('radio')) {
      radio = localStorage.getItem('radio');
    } else {
      radio = 1.375;
      localStorage.setItem('radio', 1.375);
    }  

  function initLocalSettings(selector, activeClass) {
     const elements = document.querySelectorAll(selector);

     elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id') === localStorage.getItem('sex')){
          elem.classList.add(activeClass);
        }
        if(elem.getAttribute('data-radio') === localStorage.getItem('radio')){
          elem.classList.add(activeClass);
        }
     });
  }  
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !radio) {
      result.textContent = "____";
      return;
    }

    if(sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * radio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * radio);
    }
  }
  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-radio')) {
          radio = +e.target.getAttribute('data-radio');
          localStorage.setItem('radio', +e.target.getAttribute('data-radio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      }); 

    });

  }
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation (selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
       if (input.value.match(/\D/g)){
         input.style.border = '1px solid red';
       } else {
         input.style.border = 'none';
       }

      switch(input.getAttribute('id')) {
        case 'height':
            height = +input.value;
            break;
        case 'weight':
            weight = +input.value;
            break;
        case 'age':
            age = +input.value;
            break;
      }
      calcTotal();
    });
  }
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
   // Class for cards

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
       this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if(this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
          this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
      `;
      this.parent.append(element);
    }

  }

  

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
       data.forEach(({img, altimg, title, descr, price}) => {
         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
       })
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
   // Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Ошибка отправки данных'
  };
   
  forms.forEach(item => {
    bindPostData(item);
  });
  
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const obj = {};
      formData.forEach(function(value, key) {
        obj[key] = value;
      });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
      .then((data) => {
            console.log(data);
            showThanksMadal(message.success);
            statusMessage.remove();
      })
      .catch(() => {
            showThanksMadal(message.failure);
      })
      .finally(() => {
            form.reset(); 
      });
    });
  }

  function showThanksMadal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId );

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 2000)
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    // .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
 
  function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) {
         clearInterval(modalTimerId);
    }
   
  }

  function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
     modal.classList.add('hide');
     modal.classList.remove('show');
     document.body.style.overflow = '';
  }

function modal(triggerSelector, modalSelector, modalTimerId) {

  const btnsopenModal = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  btnsopenModal.forEach(item => item.addEventListener('click', () => openModal(modalSelector, modalTimerId))); 
 
  
  modal.addEventListener('click', (e) => {
    const target =  e.target;
    if(target === modal || target.getAttribute('data-close') == ''){
      closeModal(modalSelector);
    } 
    });
    
  document.addEventListener('keydown', (e) => {
    if(e.code === "Escape" && modal.classList.contains('show')) {
       closeModal(modalSelector);
    }
  })  

  function showModalByScroll() {
     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider
  
  const slider = () => {
    const prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          slider = document.querySelector(container),
          slides = document.querySelectorAll(slide),
          current = document.getElementById(currentCounter),
          total = document.getElementById(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesInner = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
          
    let slideIndex = 1,
        offset = 0;

    const addZero = () => {
        if(slides.length < 10) {
          total.textContent = `0${slides.length}`;
          current.textContent = `0${slideIndex}`;
        } else{
          total.textContent = slides.length;
          current.textContent = slideIndex;
        }  
    };
    addZero();

    const activeDot = () => {
        dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    };
       

    slidesInner.style.width = 100 * slides.length + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = 'all 0.5s';
 
    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
      slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }
    
    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }
    next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }
      slidesInner.style.transform = `translateX(-${offset}px)`;

      if(slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }

      addZero(); 
      activeDot();

    });

    prev.addEventListener('click', () => {
      if ( offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }
      slidesInner.style.transform = `translateX(-${offset}px)`;

      if(slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }

      addZero();
      activeDot(); 
    });
 
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = deleteNotDigits(width) * (slideTo - 1);
         slidesInner.style.transform = `translateX(-${offset}px)`;
         
         addZero();
         activeDot();
      })
    })
  }
  slider();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass ) {

  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
      tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
        item.classList.remove(activeClass);
       });
  } 

  function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  
  tabsParent.addEventListener('click', (e) => {
     const target = e.target;

     if(target && target.classList.contains(tabsSelector.slice(1))) {
       tabs.forEach((item, i) => {
           if(target == item) {
              hideTabContent();
              showTabContent(i);
           }
       });
     } 
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadline) {
   
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t /(1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);
      
      return {
         "total": t, 
         days,
         hours,
         minutes,
         seconds
      };    

  }
  
  function addZero(num) {
    if(num >= 0 && num < 10){
      return  `0${num}`;
    } else {
      return num;
    }
  } 

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInerval = setInterval(updateClock, 1000);

    updateClock();      
    
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0){
        clearInterval(timeInerval);
      }
    }      
  }

  setClock(id, deadline);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");


      
      
      
      
      
      
      
      

window.addEventListener('DOMContentLoaded', () => {
   const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(modalSelector, modalTimerId), 50000);   

   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__.default)('.timer', '2021-01-01');
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
         container: '.offer__slider',
         nextArrow: '.offer__slider-next',
         prevArrow: '.offer__slider-prev',
         slide: '.offer__slide',
         totalCounter: 'total',
         currentCounter: 'current',
         wrapper: '.offer__slider-wrapper',
         field: '.offer__slider-inner'
   });
   (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');    
}); 



/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        'Content-type': 'application/json'
      }
    });

    return await res.json();
  };

const getResource = async (url) => {
    const res = await fetch(url);
    
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };  

  
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map