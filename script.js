'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

// btnsOpenModal.addEventListener('click',function(){
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// });
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll button

btnScrollTo.addEventListener('click',function(){

  section1.scrollIntoView({behavior : 'smooth'
  });
})

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'
    });
  }
});



tabsContainer.addEventListener('click',function(e){
  e.preventDefault();
  // console.log(e.target);
  // if(e.target.classList.contains('operations__tab')){
  //   const id = e.target.getAttribute('data-tab');
  //   console.log(id);
  //   document.querySelector.add(`btn operations__tab operations__tab--${id}`);
  // }

  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if(!clicked) return;
  //active tab
  tabs.forEach(tb => tb.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  //remove tabs
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));

  //activate content area

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

const handleHover = function(e){
  // console.log(e.target);
  // console.log(this);
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el!==link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}
// we can do this
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

// nav.addEventListener('mouseout', function(e){
  // handleHover(e,1)});

  const initialChords = section1.getBoundingClientRect();

  window.addEventListener('scroll',function(e){
    // if(window.scrollY>initialChords.top){
      nav.classList.add('sticky');
  //   }
  //   else{
  //     nav.classList.remove('sticky');
  //   }
  })

  //intersection of server api for same sticky navigation

  const allSections = document.querySelectorAll('.section');

  const revealSection = function(entries,observer){
    const [entry] = entries;

    if(!entry.isIntersecting){
    entry.target.classList.add('section--hidden');
    }else{
    entry.target.classList.remove('section--hidden');
    }
 
  };


  const sectionObserver = new IntersectionObserver(revealSection, {
    root : null,
    threshold : 0.15,
    // rootMargin : `-`/

  })

  allSections.forEach(function(section){
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  })


const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const[entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
  
    entry.target.classList.remove('lazy-img');
  
  });

  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root : null,
  threshold : 0,
  rootMargin: '-100px',
});

imgTargets.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = slides.length;
// console.log(maxSlide);
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

slides.forEach((s,i)=>(s.style.transform = `translateX(${100*i}%)`));


const createDots = function(){
  slides.forEach((_,i) => dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`));

}

const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

createDots();
activateDots(0);


const transformation = function(curSlide){
  slides.forEach((s,i)=>(s.style.transform = `translateX(${100 * (i-curSlide)}%)`));
}

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    transformation(slide);
    activateDots(slide);
  }
})
btnRight.addEventListener('click',function(){
// console.log(maxSlide);
  if(curSlide === maxSlide-1){
    curSlide = 0;

  }
  else{
    curSlide++;
  }

 transformation(curSlide);
//  createDots();
 activateDots(curSlide);

})

btnLeft.addEventListener('click',function(){
  // console.log(maxSlide);
  if(curSlide===0){
    curSlide=maxSlide-1;
  }
  else{
    curSlide--;

  }

 transformation(curSlide);
 activateDots(curSlide);

})