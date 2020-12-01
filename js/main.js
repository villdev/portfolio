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
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: false,
  });
}

function init() {
  initNavigation();
}

window.addEventListener("load", function () {
  init();
});

//scroll bar fill
window.onscroll = function () {
  fillScrollbar();
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
