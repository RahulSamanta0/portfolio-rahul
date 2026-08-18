/*=============== Show menu =============== */
const navmenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navmenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navmenu.classList.remove('show-menu');
    });
}

/*=============== Active Link =============== */
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));
function activeLink() {
    navLink.forEach((a) => a.classList.remove('active-link'));
    this.classList.add('active-link');
}
navLink.forEach((a) => a.addEventListener('click', activeLink));

/*=============== Background Header =============== */
function scrollHeader() {
    const header = document.getElementById("header");
    if (this.scrollY >= 50) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== Testimonials Swiper =============== */
var testiSwiper = new Swiper(".testimonial__container", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
});


/*=============== EmailJS =============== */

const sendEmail = (e) => {
  e.preventDefault();

  if (contactName.value === '' || contactEmail.value === '' || message.value === '') {
    contactMessage.classList.remove('color-light');
    contactMessage.classList.add('color-dark');
    contactMessage.textContent = 'Write All the Input fields.';
    return;
  }

  console.log("Sending email...");

  emailjs.sendForm('service_psih2bf', 'template_nu9t8d6', '#contact-form', '12VbpHsuiZkFgYAQo')
    .then(() => {
      contactMessage.classList.add('color-light');
      contactMessage.textContent = 'Message Sent ✔';
      console.log("Email sent successfully.");
      setTimeout(() => {
        contactMessage.textContent = '';
      }, 4000);
    }, (error) => {
      contactMessage.classList.remove('color-light');
      contactMessage.classList.add('color-dark');
      contactMessage.textContent = 'OOPs! SOMETHING WENT WRONG...';
      console.error("EmailJS Error:", error);
    });

  contactName.value = '';
  contactEmail.value = '';
  message.value = '';
};
