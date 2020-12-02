// test smooth scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scrollContainer"),
  smooth: true,
  multiplier: 1.3,
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
gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();
  //to enable and disable burger based on scroll
  const menuBurger = document.querySelector(".burger__open");

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
    const burgerOne = document.querySelector(".burger__open--one");
    const burgerTwo = document.querySelector(".burger__open--two");
    const burgerThree = document.querySelector(".burger__open--three");
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
    start: 400,
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
  const menuBurger = document.querySelector(".burger__open");

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

  menuBurger.addEventListener("click", (e) => {
    if (menuBurger.classList.contains("closed")) {
      burgerAnimation("open");
      menu.style.display = "block";
      gsap.to(menu, { duration: 0.4, y: 0, ease: "power4.out" });
      menuBurger.classList.remove("closed");
      menuBurger.style.outline = "none";
      //instead of stopping scroll on move, scrolling now closes the menu, done in onscroll outside
      // document.body.style.maxHeight = "100%";
      // document.body.style.overflow = "hidden";
      // menuBurger.classList.add("open");
    } else {
      burgerAnimation("close");
      gsap.set(menu, { y: -800 });
      menu.style.display = "none";
      menuBurger.classList.add("closed");
      // document.body.style.maxHeight = "";
      // document.body.style.overflow = "";
    }
  });
}
function burgerAnimation(flag) {
  const burgerOne = document.querySelector(".burger__open--one");
  const burgerTwo = document.querySelector(".burger__open--two");
  const burgerThree = document.querySelector(".burger__open--three");
  if (flag === "open") {
    gsap.to(burgerTwo, { duration: 0.2, ease: "expo.out", scale: 0.1 });
    gsap.to(burgerThree, {
      duration: 0.2,
      ease: "expo.out",
      // y: "9px",
      y: "-8",
      rotationZ: 45,
      transformOrigin: "50% 50%",
    });
    gsap.to(burgerOne, {
      duration: 0.2,
      ease: "expo.out",
      rotationZ: -45,
      y: "8",
      transformOrigin: "50% 50%",
    });
  } else {
    gsap.to(burgerTwo, { duration: 0.2, ease: "expo.out", scale: 1 });
    gsap.to(burgerThree, {
      duration: 0.2,
      ease: "expo.out",
      // y: "9px",
      y: "0",
      rotationZ: 0,
      transformOrigin: "50% 50%",
    });
    gsap.to(burgerOne, {
      duration: 0.2,
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

//scroll bar fill
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
  // document.documentElement.style.setProperty("--scroll-fill", scrolled);
  document.querySelector(".fill").style.transform = `translateY(${scrolled})`;
}

// test smooth scroll
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
