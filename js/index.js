gsap.registerPlugin(ScrollTrigger);

// test smooth scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scrollContainer"),
  smooth: true,
  multiplier: 1.3,
  reloadOnContextChange: true,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".scrollContainer", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollContainer").style.transform
    ? "transform"
    : "fixed",
});

// loading animation

// function startLoading() {
//   const t1 = gsap.timeline();

//   t1.to(
//     ".villdev__vill",
//     { duration: 0.7, x: 240, scale: 0.99, ease: "expo.inOut" },
//     "start1"
//   )
//     .to(".villdev__dev", { duration: 0.7, x: 0, ease: "expo.inOut" }, "start1")
//     .to(
//       ".villdev__vill",
//       { duration: 1, x: -240, ease: "expo.inOut", delay: 1 },
//       "start2"
//     )
//     .to(
//       ".villdev__dev",
//       { duration: 1, x: -560, ease: "expo.inOut", scale: 0.7, delay: 1 },
//       "start2"
//     )
//     .to(
//       ".villdev__vill",
//       { duration: 0.7, x: 0, ease: "back.inOut(3)", delay: 1 },
//       "start3"
//     )
//     .to(
//       ".villdev__dev",
//       { duration: 0.7, x: -240, scale: 1, ease: "back.inOut(3)", delay: 1 },
//       "start3"
//     );
// }
// document.querySelector(".loading").addEventListener("click", startLoading);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();
  //to enable and disable burger based on scroll
  const menuBurger = document.querySelector(".burger__desk");

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      link.classList.add("animate-out");
      setTimeout(() => {
        link.classList.remove("animate-out");
      }, 300);
    });
    // link.ontransitionend = function () {
    //   //use this instead of settimeout so that the timeout is in sync with css transition duration
    //   link.classList.remove("animate-out");
    // };
  });

  function navAnimation(direction) {
    const scrollingDown = direction === 1;
    //disavble burger
    menuBurger.disabled = !scrollingDown;

    //make sure it changes back based on scroll not just css
    const burgerOne = document.querySelector(
      ".burger__desk .burger__open--one"
    );
    const burgerTwo = document.querySelector(
      ".burger__desk .burger__open--two"
    );
    const burgerThree = document.querySelector(
      ".burger__desk .burger__open--three"
    );
    if (scrollingDown) {
      gsap.to(burgerOne, { duration: 0.3, scaleX: 1, x: 0 });
      gsap.to(burgerTwo, { duration: 0.3, scaleX: 1, x: 0 });
      gsap.to(burgerThree, { duration: 0.3, scaleX: 1, x: 0 });
    } else {
      // gsap.to(burgerOne, { duration: 0.3, scaleX: 1, x: 0});
      gsap.to(burgerTwo, { duration: 0.3, scaleX: 1.3, x: "-5px" });
      gsap.to(burgerThree, { duration: 0.3, scaleX: 0.8, x: "4px" });
    }

    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      // autoAplha: () => (scrollingDown ? 0 : 1),
      opacity: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: "Power4.out",
    });
  }

  ScrollTrigger.create({
    start: 150,
    end: "bottom bottom-=40",
    scroller: ".scrollContainer",
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: false,
  });
}

// function initBurger() {

// }

function initMenuNavigation() {
  const mainNavLinks = gsap.utils.toArray(".menu a");
  // const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();
  //to enable and disable burger based on scroll
  // const temp = document.querySelectorAll(".burger__open");
  // console.log(temp);
  // if (temp[0].style.display != "none") {
  //   menuBurger = temp[0];
  // } else {
  //   menuBurger = temp[1];
  // }
  const menuBurger = document.querySelectorAll(".burger__open");

  const menu = document.querySelector(".menu");

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      link.classList.add("animate-out");
      setTimeout(() => {
        link.classList.remove("animate-out");
      }, 300);
    });
    // link.ontransitionend = function () {
    //   //use this instead of settimeout so that the timeout is in sync with css transition duration
    //   link.classList.remove("animate-out");
    // };
  });

  // menuBurger.addEventListener("click", (e) => {
  //   if (menuBurger.classList.contains("closed")) {

  //     burgerAnimation("open");
  //     menu.style.display = "block";
  //     gsap.to(menu, { duration: 0.4, y: 0, ease: "power4.out" });
  //     menuBurger.classList.remove("closed");
  //     menuBurger.style.outline = "none";
  //     //instead of stopping scroll on move, scrolling now closes the menu, done in onscroll outside
  //     // document.body.style.maxHeight = "100%";
  //     // document.body.style.overflow = "hidden";
  //     // menuBurger.classList.add("open");
  //   } else {
  //     burgerAnimation("close");
  //     gsap.set(menu, { y: -800 });
  //     menu.style.display = "none";
  //     menuBurger.classList.add("closed");
  //     // document.body.style.maxHeight = "";
  //     // document.body.style.overflow = "";
  //   }
  // });
  menuBurger.forEach((burger) => {
    burger.addEventListener("click", (e) => {
      // console
      if (burger.classList.contains("closed")) {
        burgerAnimation(burger, "open");
        // menu.style.display = "block";
        menu.style.display = "flex";
        // gsap.to(menu, { duration: 0.4, y: 0, ease: "power4.out" });
        gsap.to(menu, {
          duration: 0.5,
          scaleY: 1,
          transformOrigin: "top top",
          ease: "power4.inOut",
        });
        // burger.classList.remove("closed");
        menuBurger[0].classList.remove("closed");
        menuBurger[1].classList.remove("closed");
        // menuBurger.forEach((b) => {
        //   b.classList.remove("closed");
        // })
      } else {
        burgerAnimation(burger, "close");
        // gsap.set(menu, { y: -800 });
        gsap.to(menu, {
          duration: 0.5,
          scaleY: -1,
          transformOrigin: "top top",
          ease: "powe4.inOut",
        });
        // menu.style.display = "none";
        // burger.classList.add("closed");
        menuBurger[0].classList.add("closed");
        menuBurger[1].classList.add("closed");
        // menuBurger.forEach((b) => {
        //   b.classList.add("closed");
        // })
      }
    });
  });
}
function burgerAnimation(element, flag) {
  const menuBurger = document.querySelectorAll(".burger__open");
  // const hiddenBurger = menuBurger[0] == element ? menuBurger[1] : menuBurger[0];

  // change the hidden burger state as well
  // let burgerOne = hiddenBurger.querySelector(".burger__open--one");
  // let burgerTwo = hiddenBurger.querySelector(".burger__open--two");
  // let burgerThree = hiddenBurger.querySelector(".burger__open--three");
  // if (flag === "open") {
  //   gsap.set(burgerTwo, { scale: 0.1 });
  //   gsap.set(burgerThree, {
  //     y: "-8",
  //     rotationZ: 45,
  //     transformOrigin: "50% 50%",
  //   });
  //   gsap.set(burgerOne, {
  //     rotationZ: -45,
  //     y: "8",
  //     transformOrigin: "50% 50%",
  //   });
  // } else {
  //   gsap.set(burgerTwo, { scale: 1 });
  //   gsap.set(burgerThree, {
  //     y: "0",
  //     rotationZ: 0,
  //     transformOrigin: "50% 50%",
  //   });
  //   gsap.set(burgerOne, {
  //     rotationZ: 0,
  //     y: "0",
  //     transformOrigin: "50% 50%",
  //   });
  // }

  burgerOne = element.querySelector(".burger__open--one");
  burgerTwo = element.querySelector(".burger__open--two");
  burgerThree = element.querySelector(".burger__open--three");
  if (flag === "open") {
    gsap.to(burgerTwo, { duration: 0.1, ease: "expo.out", scale: 0.1 });
    gsap.to(burgerThree, {
      duration: 0.1,
      ease: "expo.out",
      // y: "9px",
      y: "-8",
      rotationZ: 45,
      transformOrigin: "50% 50%",
    });
    gsap.to(burgerOne, {
      duration: 0.1,
      ease: "expo.out",
      rotationZ: -45,
      y: "8",
      transformOrigin: "50% 50%",
    });
  } else {
    gsap.to(burgerTwo, { duration: 0.1, ease: "expo.out", scale: 1 });
    gsap.to(burgerThree, {
      duration: 0.1,
      ease: "expo.out",
      // y: "9px",
      y: "0",
      rotationZ: 0,
      transformOrigin: "50% 50%",
    });
    gsap.to(burgerOne, {
      duration: 0.1,
      ease: "expo.out",
      rotationZ: 0,
      y: "0",
      transformOrigin: "50% 50%",
    });
  }
}

function init() {
  initNavigation();
  initMenuNavigation();
}

window.addEventListener("load", function () {
  init();
});

// scroll bar fill
window.onscroll = function () {
  fillScrollbar();
  const menuBurger = document.querySelector(".burger__open");
  const menu = document.querySelector(".menu");
  if (!menuBurger.classList.contains("closed")) {
    burgerAnimation("close");
    menu.style.display = "none";
    menuBurger.classList.add("closed");
  }
};

function fillScrollbar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  scrolled = -100 + scrolled;
  scrolled = scrolled + "%";
  document.querySelector(".fill").style.transform = `translateY(${scrolled})`;
}

// const vw = Math.max(
//   document.documentElement.clientWidth || 0,
//   window.innerWidth || 0
// );
// if (vw < 575.98) {
//   document.querySelector(".burger__desk").style.display = "none";
//   document.querySelector(".burger__mobile").style.display = "block";
// } else {
//   document.querySelector(".burger__desk").style.display = "block";
//   document.querySelector(".burger__mobile").style.display = "none";
// }

const scrollPercBar = document.querySelector(".scroll-perc");

scrollPercBar.addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  let y = e.clientY - rect.top;
  y = (y / 160) * 100;
  const done = percentScrolled + 100;
  const jumpTo = Math.floor((y * scrollValue) / 100);
  locoScroll.scrollTo(jumpTo);
});

let percentScrolled = 0;
let scrollValue = 0;
// test smooth scroll
locoScroll.on("scroll", ({ scroll, limit }) => {
  scrollValue = limit.y;
  percentScrolled = -100 + (scroll.y / limit.y) * 100;
  // const percentScrolled = -100 + (scroll.y / limit.y) * 100;
  const translateValue = percentScrolled + "%";
  gsap.set(".fill", { y: translateValue });
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
