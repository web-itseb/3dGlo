window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;

      let hours = Math.floor(timeRemaining / 60 / 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let seconds = Math.floor(timeRemaining % 60);

      return {timeRemaining, hours, minutes, seconds};
    }

    function check(n) {
      if (n < 10 && n >= 0) {
        n = '0' + n;
      }
      return n;
    }

    function updateClock() {
      let timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        timerHours.textContent = `${check(timer.hours)}`;
        timerMinutes.textContent = `${check(timer.minutes)}`;
        timerSeconds.textContent = `${check(timer.seconds)}`;
      } else {
        return countTimer(new Date(deadline).getTime() + 86400000);
      }
    }

    updateClock();
  }

  setInterval(countTimer, 1000, '18 february 2020 22:07:00');
  countTimer('18 february 2020 22:07:00');

  // Menu
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu');

    const menu = document.querySelector('menu');
    const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    menu.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else {
        target = target.closest('ul>li');
        if (target) {
          menuItems.forEach((item, i) => {
            if (item === target) {
              handlerMenu();
            }
          });
        }
      }
    });

  };
  toggleMenu();

  // PopUp (modal window)
  const togglePopUp = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    const popUpContent = document.querySelector('.popup-content');
    let count = 0;
    let popUpInterval;

    const popUpAnimate = () => {
      popUpInterval = requestAnimationFrame(popUpAnimate);
      count++;
      if (count < 45) {
        popUpContent.style.left = count + '%';
      }
    };

    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popUp.style.display = 'block';
        if (screen.width > 768) {
          popUpAnimate();
        }
      });
    });

    const cancelAnimation = () => {
      count = 0;
      cancelAnimationFrame(popUpInterval);
    };

    popUp.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popUp.style.display = 'none';
        cancelAnimation();
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popUp.style.display = 'none';
          cancelAnimation();
        }
      }
    });

  };
  togglePopUp();

  // Scroll
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const blockID = anchor.getAttribute('href').substring(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    })
  }

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }

    });
  };
  tabs();

});