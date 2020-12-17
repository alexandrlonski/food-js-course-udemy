'use strict';
   require('es6-promise').polyfill(); 
   import 'nodelist-foreach-polyfill';    

      import tabs from './modules/tabs';
      import cards from './modules/cards';
      import modal from './modules/modal';
      import timer from './modules/timer';
      import form from './modules/form';
      import slider from './modules/slider';
      import calc from './modules/calc';
      import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
   const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);   

   timer('.timer', '2021-01-01');
   calc();
   modal('[data-modal]', '.modal', modalTimerId);
   slider({
         container: '.offer__slider',
         nextArrow: '.offer__slider-next',
         prevArrow: '.offer__slider-prev',
         slide: '.offer__slide',
         totalCounter: 'total',
         currentCounter: 'current',
         wrapper: '.offer__slider-wrapper',
         field: '.offer__slider-inner'
   });
   form('form', modalTimerId);
   cards();
   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');    
}); 

