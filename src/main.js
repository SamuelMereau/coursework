//old code, pls copy new from dist

const menuButton = document.querySelector('#menu-button');
const projects = document.querySelector('#projects');
menuButton.addEventListener('click', function () {
    projects.classList.toggle('clicked');
})

