//
//    Toggle Mobile Navigation
//
const navbarMenu = document.querySelector("#navigation #navbar-menu");
const hamburgerMenu = document.querySelector("#navigation .hamburger-menu");

// const hamburgerBtn = document.querySelector('#navigation .hamburger-menu');
// const navbarMenu = document.querySelector('#navbar-menu');

// Get the current URL path
var url = window.location.pathname;



hamburgerMenu.addEventListener('click', function() {
    const isNavOpen = navbarMenu.classList.contains("open");
    if (!isNavOpen) {
        console.log(isNavOpen)
        hamburgerMenu.setAttribute("aria-expanded", true);
        hamburgerMenu.classList.add("clicked");
        navbarMenu.classList.add("open");

    } else {
        console.log("ugh");
        hamburgerMenu.setAttribute("aria-expanded", false);
        hamburgerMenu.classList.remove("clicked");
        navbarMenu.classList.remove("open");
    }
});

