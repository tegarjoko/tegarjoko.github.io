//Hamburger Line

const hamburger = document.querySelector("#hamburger");
const navbarmenu = document.querySelector("#navbar-menu");

// show the menu when user clicks on the hamburger line
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navbarmenu.classList.toggle("hidden");
});

// Hide the floating menu when user clicks on anywhere

document.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navbarmenu) {
    hamburger.classList.remove("hamburger-active");
    navbarmenu.classList.add("hidden");
  }
});

//Navbar Fixed when scrolled

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.scrollY > fixedNav) {
    header.classList.add("navbar-fixed");
    mybutton.style.display = "block";
  } else {
    header.classList.remove("navbar-fixed");
    mybutton.style.display = "none";
  }
};

// Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// image show when on window view
const targetImg = document.querySelectorAll("#hero-img, #contact-button, #contact-buttonfooter, #myproject-button");
for (const elementImg of targetImg) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        elementImg.classList.add("visible-img");
        observer.unobserve(elementImg);
      }
    });
  });
  observer.observe(elementImg);
}

// card show when on window animation to the left side
const targetCardLeft = document.querySelectorAll("#title-side,#card-1,#card-3");
for (const elementCardLeft of targetCardLeft) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        elementCardLeft.classList.add("visible-card");
        observer.unobserve(elementCardLeft);
      }
    });
  });
  observer.observe(elementCardLeft);
}

// card show when on window animation to the right side
const targetCardRight = document.querySelectorAll("#card-2, #card-4");
for (const elementCardRight of targetCardRight) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        elementCardRight.classList.add("visible-card");
        observer.unobserve(elementCardRight);
      }
    });
  });
  observer.observe(elementCardRight);
}
