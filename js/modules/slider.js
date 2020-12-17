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

export default slider;