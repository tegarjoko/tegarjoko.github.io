//Humberger Line

const hamburger = document.querySelector("#hamburger");
const navbarmenu = document.querySelector("#navbar-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navbarmenu.classList.toggle("hidden");
});

//Navbar Fixed

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
const targetElement = document.querySelectorAll("#image-show1, #image-show2, #image-show3, #image-show4, #hero-img, #contact-button, #contact-buttonfooter, #myproject-button,#title-side");
for (const element of targetElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.classList.add("visible-img");
        observer.unobserve(element);
      }
    });
  });
  observer.observe(element);
}
