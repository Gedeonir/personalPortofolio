let toggle = document.querySelector('.navbar-toggler');
let sidebar = document.querySelector('.sidebar');
let main = document.querySelector('.admin-body-contents');

toggle.onclick = function(){
sidebar.classList.toggle('active');
main.classList.toggle('active');
}

