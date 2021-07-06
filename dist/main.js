const menuButton = document.querySelector('#menu-button');
const closeMenuButton = document.querySelector('#close-menu')

function toggleClicked() {
    const projects = document.querySelector('#projects');
    projects.classList.toggle('clicked');
}

function toggleClickedOutside() {
    toggleClicked();
    const backdrop = document.querySelector('#backdrop');
    backdrop.remove();
}

menuButton.addEventListener('click', function () {
    toggleClicked()
    const div = document.createElement('div');
    div.id = 'backdrop';
    div.onclick = toggleClickedOutside;
    document.body.appendChild(div);
})
closeMenuButton.addEventListener('click', function () {
    toggleClicked()
    const backdrop = document.querySelector('#backdrop');
    backdrop.remove();
})

