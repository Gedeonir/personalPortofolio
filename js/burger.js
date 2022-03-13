let header = document.querySelector('.header');
let navbarToggler = document.querySelector('.navbar-toggler');
let navbar=document.querySelector('.navbar');

navbarToggler.onclick=function(){
    header.classList.toggle('active');
    navbar.classList.toggle('active');
}